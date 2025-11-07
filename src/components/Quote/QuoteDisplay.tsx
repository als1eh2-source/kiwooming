import React from 'react';

export const QuoteDisplay: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Stock Selector */}
      <div style={styles.stockSelector}>
        {/* 좌측: 셀렉터 박스(별 + 종목정보 + 드롭다운) */}
        <div style={styles.selectorBox}>
          <div style={styles.selectorLeft}>
            <div style={styles.favoriteIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
          </div>

          {/* 드롭다운 버튼 */}
          <button style={styles.dropdownButton} onClick={() => {/* open selector */}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 우측: 원형 검색 버튼 */}
        <button style={styles.searchButtonCircle} onClick={() => {/* open search */}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

  /* ====== Stock Selector ====== */
  stockSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderBottom: '1px solid #e0e0e0',
  },
  selectorBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #e0e0e0',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: '8px 10px',
    minHeight: 44,
    boxSizing: 'border-box',
  },
  selectorLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  favoriteIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
  },
  stockInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  stockName: {
    fontSize: 16,
    color: '#000',
    lineHeight: 1.2,
  },
  stockDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'nowrap',
  },
  badgeGreen: {
    fontSize: 11,
    color: '#4caf50',
    backgroundColor: 'rgba(76,175,80,0.12)',
    padding: '2px 6px',
    borderRadius: 3,
  },
  stockCode: {
    fontSize: 12,
    color: '#666',
  },
  dropdownButton: {
    background: 'none',
    border: 'none',
    padding: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
  },
  searchButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flex: '0 0 auto',
  },

  /* ====== Price Section ====== */
  priceSection: {
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentPrice: {
    fontSize: 28,
    color: '#2196F3',
  },
  badge10: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    fontSize: 13,
    cursor: 'pointer',
  },
  changeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  changeValue: {
    fontSize: 15,
    color: '#ff4444',
  },
  changePercent: {
    fontSize: 15,
    color: '#ff4444',
  },
  badge: {
    padding: '2px 6px',
    border: '1px solid #ccc',
    borderRadius: 3,
    backgroundColor: '#fff',
    fontSize: 11,
    color: '#666',
  },
};
