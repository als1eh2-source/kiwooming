import React from 'react';

export const AccountHeader: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.topNav}>
        <button style={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <nav style={styles.navTabs}>
          <button style={{...styles.navTab, ...styles.navTabActive}}>국내잔고</button>
          <button style={styles.navTab}>미체결</button>
          <button style={styles.navTab}>예수금</button>
          <button style={styles.navTab}>주문가능금액</button>
        </nav>

        <button style={styles.moreButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="white"/>
            <circle cx="12" cy="12" r="1.5" fill="white"/>
            <circle cx="12" cy="18" r="1.5" fill="white"/>
          </svg>
        </button>
      </div>

      <div style={styles.subTabs}>
        <button style={{...styles.subTab, ...styles.subTabActive}}>키움 잔고</button>
        <button style={styles.subTab}>타사 잔고</button>
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
  topNav: {
    backgroundColor: '#3d4273',
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
  navTabs: {
    display: 'flex',
    gap: '16px',
    flex: 1,
    overflow: 'auto',
  },
  navTab: {
    background: 'none',
    border: 'none',
    color: '#a8aac4',
    padding: '4px 0',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '15px',
  },
  navTabActive: {
    color: '#fff',
  },
  moreButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTabs: {
    display: 'flex',
    borderBottom: '1px solid #e0e0e0',
  },
  subTab: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '16px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#666',
    borderBottom: '2px solid transparent',
  },
  subTabActive: {
    color: '#000',
    borderBottom: '2px solid #000',
  },
};
