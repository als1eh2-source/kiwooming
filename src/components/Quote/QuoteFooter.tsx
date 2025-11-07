import React from 'react';

export const QuoteFooter: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('현재가');

  const tabs = [
    { id: '관심종목', label: '관심종목' },
    { id: '현재가', label: '현재가' },
    { id: '주문', label: '주문' },
    { id: '차트', label: '차트' },
    { id: '계좌', label: '계좌' },
    { id: '종', label: '종' },
  ];

  return (
    <>
      {/* Menu Button */}
      <button style={styles.menuButton} onClick={() => {/* Open menu */}}>
        <div style={styles.menuIcon}>
          <div style={styles.menuLine}></div>
          <div style={styles.menuLine}></div>
          <div style={styles.menuLine}></div>
        </div>
        <span style={styles.menuText}>메뉴</span>
      </button>

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.navButton,
              ...(activeTab === tab.id ? styles.navButtonActive : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  menuButton: {
    position: 'fixed',
    bottom: '70px',
    left: '12px',
    width: '56px',
    height: '56px',
    backgroundColor: '#c2185b',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  menuLine: {
    width: '18px',
    height: '2px',
    backgroundColor: '#fff',
    borderRadius: '1px',
  },
  menuText: {
    fontSize: '11px',
    color: '#fff',
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    backgroundColor: '#fff',
    borderTop: '1px solid #e0e0e0',
    zIndex: 999,
  },
  navButton: {
    flex: 1,
    padding: '12px 8px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
  },
  navButtonActive: {
    color: '#000',
  },
};

