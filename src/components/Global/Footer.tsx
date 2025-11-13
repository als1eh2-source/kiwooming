import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('none');
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: '관심종목', label: '관심종목' },
    { id: '현재가', label: '현재가', path: '/quote' },
    { id: '주문', label: '주문', path: '/order' },
    { id: '차트', label: '차트', path: '/chart' },
    { id: '계좌', label: '계좌', path: '/account' },
    { id: '종목', label: '종목' },
  ];

  
  React.useEffect(() => {
    const current = tabs.find(tab => tab.path === location.pathname);
    if (current) {
      setActiveTab(current.id);
    }
  }, [location.pathname]);
  
  const handleTabClick = (tab: typeof tabs[number]) => {
    setActiveTab(tab.id);
    if (tab.path) navigate(tab.path);
  };
  
  return (
    <>
      <div style={styles.indexBar}>
        <span style={styles.indexName}>코스피</span>
        <span style={styles.indexValue}>4,036.08</span>
        <div style={styles.indexChange}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 14L12 9L17 14"
              stroke="#ff4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={styles.indexChangeValue}>31.66</span>
        </div>
        <span style={styles.indexPercent}>0.79%</span>
      </div>

      <nav style={styles.bottomNav}>
        <button style={styles.menuButtonInNav}>
          <div style={styles.menuIcon}>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
          </div>
          <span style={styles.menuText}>메뉴</span>
        </button>

        <div style={styles.tabGroup}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.navButton,
                ...(activeTab === tab.id ? styles.navButtonActive : {}),
              }}
              onClick={() => handleTabClick(tab)} 
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderTop: '1px solid #e0e0e0',
    zIndex: 999,
    maxWidth: 420,
    margin: '0 auto',
    padding: 8,
    boxSizing: 'border-box',
  },

  tabGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    WebkitOverflowScrolling: 'touch',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
  },

  menuButtonInNav: {
    position: 'static',
    width: 56,
    height: 40,
    backgroundColor: '#a61e50ff',
    border: 'none',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
  },

  menuIcon: { display: 'flex', flexDirection: 'column', gap: 3 },
  menuLine: { width: 18, height: 2, backgroundColor: '#fff', borderRadius: 1 },
  menuText: { fontSize: 11, color: '#fff' },

  navButton: {
    flex: 1,
    padding: '10px 6px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
  },
  navButtonActive: { color: '#000'},

  indexBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 54,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: '8px 0',
    backgroundColor: '#f3f4f6',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    zIndex: 998,
    maxWidth: 420,
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  indexName: { fontSize: 14, color: '#000' },
  indexValue: { fontSize: 15, color: '#ff4444' },
  indexChange: { display: 'flex', alignItems: 'center', gap: 4 },
  indexChangeValue: { fontSize: 14, color: '#ff4444' },
  indexPercent: { fontSize: 14, color: '#ff4444' },
};
