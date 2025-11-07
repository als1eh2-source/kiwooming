import React, { useEffect, useRef, useState } from "react";
import kiwooming from "./img/kiwooming.png";

type Pos = { x: number; y: number };

export const FloatingChatbot: React.FC = () => {
  const ICON_W = 100;
  const ICON_H = 100;

  const [position, setPosition] = useState<Pos>({
    x: window.innerWidth - ICON_W - 24,
    y: window.innerHeight - ICON_H - 24,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);

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

  // 클릭 & 드래그 구분
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

  return (
    <>
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

      {isOpen && (
        <div className="chat-overlay">
          <div className="chat-box">
            <div className="chat-header">
              <span>키우밍</span>
              <button className="close-btn" onClick={toggleChat}>
                ✕
              </button>
            </div>

            <div className="chat-body">
              <div className="chat-bubble bot">
                안녕하세요! 키우밍이에요 💬  
                <br />
                지금 보고 있는 화면에서 어떤 기능이 궁금하신가요?
              </div>
            </div>

            <div className="chat-input">
              <input type="text" placeholder="메시지를 입력하세요..." />
              <button>전송</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* 플로팅 아이콘 */
        .floating-chatbot {
          transition: transform 0.2s ease;
        }

        /* 전체화면 오버레이 */
        .chat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 99999;
          animation: fadeIn 0.25s ease;
          backdrop-filter: blur(3px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        /* 챗봇방 박스 */
        .chat-box {
          width: 92%;
          max-width: 420px;
          height: 80%;
          background: white;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .chat-header {
          background: #2563eb;
          color: white;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 22px;
          cursor: pointer;
        }

        .chat-body {
          flex: 1;
          padding: 16px;
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

        .chat-bubble.bot {
          align-self: flex-start;
          background-color: #e5e7eb;
          color: #111827;
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
          background: #1d4ed8;
        }
      `}</style>
    </>
  );
};
