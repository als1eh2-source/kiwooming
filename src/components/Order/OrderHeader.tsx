import React from 'react';

export const OrderHeader: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('키움주문');

  const tabs = [
    { id: '키움주문', label: '키움주문' },
    { id: '호가주문', label: '호가주문' },
    { id: '자동감시주문', label: '자동감시주문' },
    { id: '체결', label: '체결' },
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
