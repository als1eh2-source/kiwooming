import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  tabs: string[]; 
  defaultTab?: string;
  onTabChange?: (tab: string) => void; 
}

export const Header: React.FC<HeaderProps> = ({
  tabs,
  defaultTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]);
  const navigate = useNavigate();


  const navRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - navRef.current.offsetLeft;
    scrollLeft.current = navRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    navRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        {/* 뒤로가기 버튼 */}
        <button
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 탭 내비게이션 */}
        <nav
          ref={navRef}
          style={styles.tabNav}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : {}),
              }}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* 메뉴 버튼 */}
        <button style={styles.menuButton} onClick={() => {/* open menu */}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="white" />
            <circle cx="12" cy="12" r="1.5" fill="white" />
            <circle cx="12" cy="18" r="1.5" fill="white" />
          </svg>
        </button>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topBar: {
    backgroundColor: "#5468b5",
    display: "flex",
    alignItems: "center",
    padding: "12px 8px",
    gap: "12px",
  },
  backButton: {
    background: "none",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tabNav: {
    display: "flex",
    gap: "16px",
    flex: 1,
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
  },
  tab: {
    background: "none",
    border: "none",
    color: "rgba(255, 255, 255, 0.6)",
    padding: "4px 0",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontSize: "15px",
    userSelect: "none",
  },
  tabActive: {
    color: "#fff",
    fontWeight: 600,
  },
  menuButton: {
    background: "none",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
