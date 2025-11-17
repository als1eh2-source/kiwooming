import React from 'react';

export const ChartControls: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('일');

  const tabs = ['지표', '일', '1분', '1틱'];

  return (
    <div style={styles.container}>
      {/* Period Tabs */}
      <div style={styles.controls}>
        <div style={styles.periodTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.periodTab,
                ...(activeTab === tab ? styles.periodTabActive : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={styles.iconButtons}>
          <button style={styles.iconButton} onClick={() => {/* Toggle grid */}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="#666" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="#666" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="#666" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="#666" strokeWidth="2"/>
            </svg>
          </button>
          
          <button style={styles.iconButton} onClick={() => {/* Toggle fullscreen */}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button style={styles.iconButton} onClick={() => {/* Open settings */}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#666" strokeWidth="2"/>
              <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <button style={styles.iconButton} onClick={() => {/* Open tools */}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14.7 6.3L19.7 11.3M3 21L8 16L13 21L21 13L13 5L5 13L3 21Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 10px',
    gap: '10px',
  },
  periodTabs: {
    display: 'flex',
    gap: '2px',
  },
  periodTab: {
    width: '55px',
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
  },
  periodTabActive: {
    backgroundColor: '#f5f5f5',
    borderColor: '#000',
    color: '#000',
  },
  iconButtons: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodSelector: {
    marginLeft: 'auto',
    padding: '4px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '13px',
    cursor: 'pointer',
  },
};
