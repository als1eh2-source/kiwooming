import React from 'react';

interface QuoteHeaderProps {
  tabs: string[];          // 각 화면별 탭 이름 배열
  defaultTab?: string;     // 초기 활성 탭 (옵션)
  onTabChange?: (tab: string) => void; // 탭 전환 콜백 (옵션)
}

export const QuoteHeader: React.FC<QuoteHeaderProps> = ({
  tabs,
  defaultTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab); // 부모에서 콜백 받을 수 있게
  };

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        {/* 뒤로가기 버튼 */}
        <button style={styles.backButton} onClick={() => { /* Navigate back */ }}>
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
        <nav style={styles.tabNav}>
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
        <button style={styles.menuButton} onClick={() => { /* Open menu */ }}>
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
    backgroundColor: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  topBar: {
    backgroundColor: '#5468b5',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 8px',
    gap: '12px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabNav: {
    display: 'flex',
    gap: '16px',
    flex: 1,
    overflowX: 'auto',
  },
  tab: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    padding: '4px 0',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '15px',
  },
  tabActive: {
    color: '#fff',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

