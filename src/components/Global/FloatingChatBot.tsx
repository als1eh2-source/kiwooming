import React, { useEffect, useRef, useState } from "react";
import kiwooming from "../img/kiwooming.png";
import axios from "axios";
import { useLocation } from "react-router-dom";



type Pos = { x: number; y: number };

export const FloatingChatbot: React.FC = () => {
  const location = useLocation(); // ✅ 현재 경로 감지
  const currentPath = location.pathname.replace("/", "") || "home"; 
  const ICON_W = 150;
  const ICON_H = 150;

  const [position, setPosition] = useState<Pos>({
    x: window.innerWidth - ICON_W - 24,
    y: window.innerHeight - ICON_H - 24,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: "bot",
      text: "안녕하세요! 저는 키우밍이에요 🌱 함께 투자 실력을 키워볼까요? 궁금한 게 있으시면 편하게 물어보세요!",
    },
  ]);
  const [input, setInput] = useState("");

  const offsetRef = useRef<Pos>({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const pressStartTime = useRef<number>(0);

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
      setPosition(
        clamp(e.clientX - offsetRef.current.x, e.clientY - offsetRef.current.y)
      );
    }
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    const pressDuration = Date.now() - pressStartTime.current;

    if (pressDuration < 400 && !isLongPress) {
      toggleChat();
    }

    setIsLongPress(false);
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging, isLongPress]);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMsg = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await axios.post("http://127.0.0.1:8000/chat", {
      text: input,
      context: currentPath,
    });

    const reply = res.data.reply || "응답 없음";
    setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ 서버 연결 실패 — FastAPI가 켜져 있나요?" },
    ]);
  }
};

  return (
    <>
      {/* 플로팅 버튼 */}
      <div
        className="floating-chatbot"
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 9999,
        }}
      >
        <img
          src={kiwooming}
          alt="키우밍 챗봇"
          style={{
            width: ICON_W,
            height: ICON_H,
            cursor: isLongPress ? "grabbing" : "pointer",
            userSelect: "none",
            transition: isDragging ? "none" : "transform 0.15s ease",
            transform: isLongPress ? "scale(0.9)" : "scale(1)",
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      </div>

      {/* 전체화면 챗봇 */}
{isOpen && (
  <div className="chat-overlay">
    <div className="chat-box">

      {/* 상단 프로필 영역 */}
      <div className="chat-top">
        <img
          src={kiwooming}
          alt="키우밍 프로필"
          className="profile-img"
          onClick={toggleChat}
        />
        <button className="close-btn" onClick={toggleChat}>✕</button>
      </div>

      {/* 메시지 표시 */}
      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
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


      {/* 스타일 */}
      <style>{`
        .floating-chatbot {
          transition: transform 0.2s ease;
        }

        .chat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          animation: fadeIn 0.25s ease;
        //   backdrop-filter: blur(3px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        .chat-box {
          width: 92%;
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

        /* 상단 프로필 */
        .chat-top {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          display: flex;
          justify-content: space-between;
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

        /* 메시지 */
        .chat-body {
          flex: 1;
          padding: 80px 16px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #f9fafb;
        }

        .chat-bubble {
          padding: 10px 14px;
          border-radius: 12px;
          max-width: 80%;
          line-height: 1.5;
          font-size: 15px;
        }

        .chat-bubble.user {
          align-self: flex-end;
          background-color: #3767DD;
          color: white;
        }

        .chat-bubble.bot {
          align-self: flex-start;
          background-color: #E9EFFE;
          color: black;
        }

        /* 입력창 */
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
          font-size: 15px;
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
      `}</style>
    </>
  );
};
