import React from 'react';

export const OrderDisplay: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Stock Selector */}
      <div style={styles.stockSelector}>
        <div style={styles.stockLeft}>
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

        <div style={styles.priceDisplay}>
          <span style={styles.currentPrice}>281,500</span>
          <div style={styles.changeInfo}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 14L12 9L17 14" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={styles.changeValue}>1,000</span>
            <span style={styles.changePercent}>0.35%</span>
          </div>
        </div>
      </div>

      {/* Account Selector */}
      <div style={styles.accountSelector}>
        <div style={styles.accountLeft}>
          <span style={styles.accountLabel}>통합</span>
          <span style={styles.redDot}>●</span>
        </div>
        
        <button style={styles.accountDropdown} onClick={() => {/* Open account selector */}}>
          <span style={styles.accountNumber}>5244-0129 [위탁종합]</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button style={styles.moreButton} onClick={() => {/* Open more options */}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="1.5" fill="#666"/>
            <circle cx="12" cy="12" r="1.5" fill="#666"/>
            <circle cx="18" cy="12" r="1.5" fill="#666"/>
          </svg>
        </button>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    gap: '12px',
    borderBottom: '1px solid #e0e0e0',
  },
  stockLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  favoriteIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockInfo: {
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
  priceDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  currentPrice: {
    fontSize: '24px',
    color: '#2196F3',
  },
  changeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  changeValue: {
    fontSize: '13px',
    color: '#2196F3',
  },
  changePercent: {
    fontSize: '13px',
    color: '#2196F3',
  },
  accountSelector: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    gap: '12px',
  },
  accountLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  accountLabel: {
    fontSize: '14px',
    color: '#000',
  },
  redDot: {
    fontSize: '8px',
    color: '#ff4444',
  },
  accountDropdown: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  accountNumber: {
    fontSize: '14px',
    color: '#000',
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
};
