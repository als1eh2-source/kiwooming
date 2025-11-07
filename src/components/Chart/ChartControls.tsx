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

      {/* Indicator Settings */}
      <div style={styles.indicators}>
        <div style={styles.indicatorRow}>
          <span style={styles.indicatorLabel}>중가 단순</span>
          <span style={styles.indicatorValue5}>5</span>
          <span style={styles.indicatorValue10}>10</span>
          <span style={styles.indicatorValue20}>20</span>
          <span style={styles.indicatorValue60}>60</span>
          <span style={styles.indicatorValue120}>120</span>
          
          <button style={styles.periodSelector}>24</button>
        </div>
        
        <div style={styles.priceInfo}>
          <button style={styles.zoomButton} onClick={() => {/* Zoom */}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#666" strokeWidth="2"/>
              <path d="M21 21L16.5 16.5M8 11H14M11 8V14" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={styles.highPrice}>최고 322,500(-12.71%, 10/30) →</span>
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
    padding: '8px 12px',
    gap: '12px',
  },
  periodTabs: {
    display: 'flex',
    gap: '8px',
  },
  periodTab: {
    padding: '8px 16px',
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
  indicators: {
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  indicatorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  indicatorLabel: {
    fontSize: '13px',
    color: '#666',
  },
  indicatorValue5: {
    fontSize: '13px',
    color: '#ff4444',
  },
  indicatorValue10: {
    fontSize: '13px',
    color: '#ff9800',
  },
  indicatorValue20: {
    fontSize: '13px',
    color: '#4caf50',
  },
  indicatorValue60: {
    fontSize: '13px',
    color: '#2196F3',
  },
  indicatorValue120: {
    fontSize: '13px',
    color: '#9c27b0',
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
  priceInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  zoomButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highPrice: {
    fontSize: '13px',
    color: '#ff4444',
  },
};
