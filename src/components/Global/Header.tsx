import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MoreMenu from "./MoreMenu";
import { MoreVertical } from "lucide-react";

interface HeaderProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
  onShowKiwooming?: () => void; 
}

export const Header: React.FC<HeaderProps> = ({
  tabs,
  defaultTab,
  onTabChange,
  onShowKiwooming, // 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // --- 드래그 가능한 탭 스크롤 ---
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

  const handleMouseLeave = () => (isDragging.current = false);
  const handleMouseUp = () => (isDragging.current = false);

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
        <button style={styles.backButton} onClick={() => navigate(-1)}>
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

        {/* ⋮ 더보기 버튼 */}
        <div style={styles.rightGroup}>
          <button onClick={() => setShowMenu(true)} style={styles.iconButton}>
            <MoreVertical size={22} color="#fff" />
          </button>
        </div>

        {/* 더보기 메뉴 */}
        <MoreMenu
          show={showMenu}
          onClose={() => setShowMenu(false)}
          position={{ top: 50, right: 8 }}
        >
          <div style={styles.menuContent}>
            <div style={styles.menuItem}>
              SOR 사용설정 <span style={styles.menuTag}>[ON]</span>
            </div>
            <div style={styles.menuItem}>
              시세 설정 <span style={styles.menuTag}>[통합]</span>
            </div>
            <hr style={styles.divider} />
            <div style={styles.menuItem}>평균매입가 설정</div>
            <div style={styles.menuItem}>사용자지표 내려받기</div>
            <div style={styles.menuItem}>보조지표 내려받기</div>
            <hr style={styles.divider} />
            <div style={styles.menuItem}>MY알림</div>
            <div style={styles.menuItem}>내맘대로 등록</div>
            <div style={styles.menuItem}>화면 공유</div>

            <div
              style={{
                ...styles.menuItem,
                fontWeight: 600,
                color: "#2563EB",
              }}
              onClick={() => {
                setShowMenu(false);
                onShowKiwooming?.(); // 부모(App)에서 상태 변경
              }}
            >
              키우밍 불러오기
            </div>
          </div>
        </MoreMenu>
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
    position: "relative",
    backgroundColor: "#5468b5",
    display: "flex",
    alignItems: "center",
    padding: "12px 8px",
    gap: "10px",
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
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    animation: "fadeIn 0.2s ease-in-out",
  },
  menuItem: {
    padding: "10px 16px",
    fontSize: "12px",
    color: "#333",
    display: "flex",
    cursor: "pointer",
    justifyContent: "space-between",
  },
  menuTag: {
    color: "#C2185B",
    fontWeight: 600,
  },
  divider: {
    border: "none",
    borderTop: "1px solid #E5E7EB",
    margin: "4px 0",
  },
};
