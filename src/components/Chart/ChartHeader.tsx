import React from 'react';

export const ChartHeader: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('종목차트');

  const tabs = [
    { id: '종목차트', label: '종목차트' },
    { id: '재무차트', label: '재무차트' },
    { id: '지수차트', label: '지수차트' },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        <button style={styles.backButton} onClick={() => {/* Navigate back */}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <nav style={styles.tabNav}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="8" width="6" height="13" fill="currentColor" opacity="0.8"/>
                <rect x="9" y="3" width="6" height="18" fill="currentColor"/>
                <rect x="15" y="12" width="6" height="9" fill="currentColor" opacity="0.6"/>
              </svg>
              {tab.label}
            </button>
          ))}
        </nav>

        <button style={styles.menuButton} onClick={() => {/* Open menu */}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="18" r="1.5" fill="white"/>
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
    backgroundColor: '#4a5a8e',
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
    gap: '12px',
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
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
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
