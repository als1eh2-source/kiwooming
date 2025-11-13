import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import uppart_kiwooming from "../img/uppart_kiwooming.png";
import kiwooming from "../img/kiwooming.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSection } from "../../context/SectionContext"; 

type Pos = { x: number; y: number };

interface FloatingChatbotProps {
  onHide?: () => void;
}

export const FloatingChatbot: React.FC<FloatingChatbotProps> = ({ onHide }) => {
  const location = useLocation();
  const currentPath = location.pathname.replace("/", "") || "home";
  const {section} = useSection();
  const [isTyping, setIsTyping] = useState(false);

  const ICON_W = 100;
  const ICON_H = 100;

  const [visible, setVisible] = useState(true);
  const [position, setPosition] = useState<Pos>({
    x: window.innerWidth - ICON_W -430,
    y: window.innerHeight - ICON_H - 45,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [inDeleteZone, setInDeleteZone] = useState(false);

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "안녕하세요! 저는 키우밍이에요 🌱 함께 투자 실력을 키워볼까요?",
    },
  ]);
  const [input, setInput] = useState("");

  const offsetRef = useRef<Pos>({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartTime = useRef<number>(0);

  const DELETE_ZONE = {
    x: window.innerWidth / 2 - 40,
    y: window.innerHeight - 120,
    radius: 80,
  };

  const scrollToBottom = () => {
    const body = chatBodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  };
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const clamp = (x: number, y: number): Pos => {
    const maxX = window.innerWidth - ICON_W;
    const maxY = window.innerHeight - ICON_H;
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    };
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerIdRef.current = e.pointerId;
    offsetRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    pressStartTime.current = Date.now();

    longPressTimer.current = setTimeout(() => {
      setIsLongPress(true);
      setIsDragging(true);
    }, 400);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (isDragging && isLongPress) {
      const newPos = clamp(
        e.clientX - offsetRef.current.x,
        e.clientY - offsetRef.current.y
      );
      setPosition(newPos);

      const dx = newPos.x - DELETE_ZONE.x;
      const dy = newPos.y - DELETE_ZONE.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      setInDeleteZone(dist < DELETE_ZONE.radius);
    }
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);

    const pressDuration = Date.now() - pressStartTime.current;
    const wasDragging = isDragging;

    setIsLongPress(false);
    setIsDragging(false);

    if (inDeleteZone) {
      setVisible(false);
      onHide?.();
      setInDeleteZone(false);
      return;
    }

    if (pressDuration < 400 && !wasDragging) {
      toggleChat(); 
    }

    setInDeleteZone(false);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, isLongPress, inDeleteZone]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);

    try {
      const scrollY = window.scrollY;
      const res = await axios.post("http://localhost:8001/chat", {
        text: input,
        context: currentPath,
        section: section,
        scrollY: scrollY,
      },
      { headers: { "Content-Type": "application/json" } }
    );
      const reply = res.data.reply || "응답 없음";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ 서버 연결 실패 — FastAPI가 켜져 있나요?" },
      ]);
    }
    setIsTyping(false);
  };

  if (!visible) return null;

  return createPortal(
    <>
      <div
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
          pointerEvents: "auto",
          touchAction: "none",
        }}
      >
        <img
          src={kiwooming}
          alt="키우밍"
          style={{
            width: ICON_W,
            height: ICON_H,
            cursor: isLongPress ? "grabbing" : "pointer",
            userSelect: "none",
            transition: isDragging ? "none" : "transform 0.15s ease",
            transform: isLongPress ? "scale(0.95)" : "scale(1)",
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {isDragging && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: "40px",
            transform: "translateX(-50%)",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            backgroundColor: inDeleteZone ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9998,
            transition: "background-color 0.2s ease",
          }}
        >
          <span style={{ color: "white", fontSize: "38px", fontWeight: 700 }}>⌂</span>
        </div>
      )}

      {isOpen && (
        <div className="chat-overlay">
          <div className="chat-box">
            <div className="chat-top">
              {/* <img
                src={uppart_kiwooming}
                alt="내부 키우밍 프로필"
                className="inner-profile-img"
                onClick={toggleChat}
              /> */}
              <button className="close-btn" onClick={toggleChat}>
                ✕
              </button>
            </div>

            <div className="chat-body" ref={chatBodyRef}>
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`chat-message-wrapper ${msg.sender}`}
                >
                  <div className={`chat-bubble ${msg.sender}`}>

                    {msg.sender === "bot" && (
                      <img
                        src={uppart_kiwooming}
                        alt="bot"
                        className="bubble-profile-inside"
                      />
                    )}
                    <span className="bubble-text">{msg.text}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
  <div className="chat-message-wrapper bot">
    <div className="chat-bubble bot typing">
      <img
        src={uppart_kiwooming}
        alt="bot"
        className="bubble-profile-inside"
      />
      <div className="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
)}
            </div>
            

            <div className="chat-input">
              <input
                type="text"
                value={input}
                placeholder="키우밍에게 물어보세요..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>전송</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
      .chat-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        animation: fadeIn 0.25s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: scale(1); }
      }

      .chat-box {
        width: 100%;
        max-width: 420px;
        height: 80%;
        background: white;
        border-radius: 20px 20px 0 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
        position: relative;
      }

      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .chat-top {
        position: absolute;
        top: 12px;
        right: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: transparent;
      }
      .profile-img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        object-fit: cover;
      }

      .close-btn {
        background: rgba(255,255,255,0.5);
        border: none;
        color: #333;
        font-size: 24px;
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        transition: 0.2s;
      }

      .close-btn:hover {
        background: rgba(255,255,255,0.8);
      }

      .chat-body {
        flex: 1;
        padding: 80px 16px 16px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f9fafb;
      }

      .chat-message-wrapper {
        width: 100%;
        display: flex;
        margin-bottom: 14px;
      }

      .chat-message-wrapper.bot {
        justify-content: flex-start;
      }

      .chat-message-wrapper.user {
        justify-content: flex-end;
      }

      .chat-bubble {
        position: relative;
        max-width: 75%;
        border-radius: 14px;
        padding: 10px 10px 10px 10px; /* 프로필 자리 확보 */
        line-height: 1.5;
        font-size: 13px;
        background: #E9EFFE; /* bot default */
        color: #000;
      }

      .chat-bubble.user {
        background: #3767DD;
        color: white;
        padding: 12px;
      }

      .bubble-profile-inside {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        object-fit: cover;

        position: absolute;
        top: -30px;    
        left: -0px;   
        z-index: 2;
      }

      .bubble-text {
        font-size: 13px;
      }

      .chat-input {
        display: flex;
        border-top: 1px solid #ddd;
        padding: 10px;
        background: white;
      }

      .chat-input input {
        flex: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        font-size: 13px;
      }

      .chat-input button {
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
        margin-left: 6px;
        cursor: pointer;
        font-weight: 600;
      }

      .chat-input button:hover {
        background: #3767DD;
      }

      .typing {
  background-color: #E9EFFE;
  padding: 10px 14px;
  border-radius: 12px;
  max-width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.typing-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background-color: #6b83d3;
  border-radius: 50%;
  display: inline-block;
  animation: typingBlink 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) {
  animation-delay: 0s;
}
.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingBlink {
  0% { opacity: .2; transform: translateY(0px); }
  20% { opacity: 1; transform: translateY(-3px); }
  100% { opacity: .2; transform: translateY(0px); }
}


      `}</style>
    </>,
    document.body
  );
};
