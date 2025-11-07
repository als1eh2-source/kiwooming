import React from 'react';

export const QuoteDisplay: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Stock Selector */}
      <div style={styles.stockSelector}>
        <div style={styles.favoriteIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L9 8.5L12 2Z" stroke="#666" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        <div style={styles.stockInfo}>
          <span style={styles.stockName}>키움증권</span>
          <div style={styles.stockDetails}>
            <span style={styles.badgeGreen}>상장</span>
            <span style={styles.stockCode}>039490 NXT거래가능</span>
          </div>
        </div>

        <button style={styles.dropdownButton} onClick={() => {/* Open stock selector */}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button style={styles.searchButton} onClick={() => {/* Open search */}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#666" strokeWidth="2"/>
            <path d="M21 21L16.5 16.5" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Price Display */}
      <div style={styles.priceSection}>
        <div style={styles.priceRow}>
          <span style={styles.currentPrice}>282,000</span>
          <button style={styles.badge10}>10단</button>
        </div>
        
        <div style={styles.changeRow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 14L12 9L17 14" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.changeValue}>8,500</span>
          <span style={styles.changePercent}>2.93%</span>
          <button style={styles.badge}>예상</button>
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
  stockSelector: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    gap: '8px',
    borderBottom: '1px solid #e0e0e0',
  },
  favoriteIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stockName: {
    fontSize: '16px',
    color: '#000',
  },
  stockDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badgeGreen: {
    fontSize: '11px',
    color: '#4caf50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: '2px 6px',
    borderRadius: '3px',
  },
  stockCode: {
    fontSize: '12px',
    color: '#666',
  },
  dropdownButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceSection: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: '28px',
    color: '#2196F3',
  },
  badge10: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '13px',
    cursor: 'pointer',
  },
  changeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  changeValue: {
    fontSize: '15px',
    color: '#ff4444',
  },
  changePercent: {
    fontSize: '15px',
    color: '#ff4444',
  },
  badge: {
    padding: '2px 6px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    backgroundColor: '#fff',
    fontSize: '11px',
    color: '#666',
  },
};

