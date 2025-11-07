import React from 'react';

interface HoldingData {
  name: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface AccountTableProps {
  onRowClick?: () => void;
}

const dummyHoldings: HoldingData[] = [
  {
    name: '키움증권',
    buyPrice: 283500,
    currentPrice: 283500,
    quantity: 1,
    profitLoss: -505,
    profitLossPercent: -0.18,
  },
];

export const AccountTable: React.FC<AccountTableProps> = ({ onRowClick }) => {
  return (
    <div style={styles.container}>
      {/* Table Header */}
      <div style={styles.tableHeader}>
        <div style={styles.headerLeft}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#ff9800"/>
          </svg>
        </div>
        <div style={styles.headerColumns}>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>매입가</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>현재가</span>
          </div>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>보유수량</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>가능수량</span>
          </div>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>평가손익</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={styles.headerColumn}>
            <span style={styles.headerText}>수익률</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Table Rows */}
      {dummyHoldings.map((holding, index) => (
        <div 
          key={index} 
          style={styles.tableRow}
          onClick={onRowClick}
        >
          <div style={styles.rowName}>
            <span style={styles.stockName}>{holding.name}</span>
          </div>
          <div style={styles.rowColumns}>
            <div style={styles.rowColumn}>
              <span style={styles.priceText}>{holding.buyPrice.toLocaleString()}</span>
            </div>
            <div style={styles.rowColumn}>
              <span style={styles.currentPriceText}>{holding.currentPrice.toLocaleString()}</span>
            </div>
            <div style={styles.rowColumn}>
              <span style={styles.quantityText}>{holding.quantity}</span>
            </div>
            <div style={styles.rowColumn}>
              <span style={styles.quantityText}>{holding.quantity}</span>
            </div>
            <div style={styles.rowColumn}>
              <span style={styles.profitLossText}>{holding.profitLoss}</span>
            </div>
            <div style={styles.rowColumn}>
              <span style={styles.profitPercentText}>{holding.profitLossPercent}%</span>
            </div>
          </div>
        </div>
      ))}

      {/* Index Info Bar */}
      <div style={styles.indexBar}>
        <span style={styles.indexName}>코스피</span>
        <span style={styles.indexValue}>4,036.08</span>
        <div style={styles.indexChange}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M7 14L12 9L17 14" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.indexChangeValue}>31.66</span>
        </div>
        <span style={styles.indexPercent}>0.79%</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
  },
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 4px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '11px',
  },
  headerLeft: {
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerColumns: {
    flex: 1,
    display: 'flex',
    gap: '4px',
  },
  headerColumn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    minWidth: 0,
  },
  headerText: {
    fontSize: '11px',
    color: '#666',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  headerRight: {
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
  },
  rowName: {
    padding: '12px',
    borderBottom: '1px solid #f5f5f5',
  },
  stockName: {
    fontSize: '15px',
    color: '#000',
  },
  rowColumns: {
    display: 'flex',
    padding: '8px 4px',
    gap: '4px',
  },
  rowColumn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  priceText: {
    fontSize: '13px',
    color: '#000',
  },
  currentPriceText: {
    fontSize: '13px',
    color: '#ff4444',
  },
  quantityText: {
    fontSize: '13px',
    color: '#000',
  },
  profitLossText: {
    fontSize: '13px',
    color: '#2196F3',
  },
  profitPercentText: {
    fontSize: '13px',
    color: '#000',
  },
  indexBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#fff',
    borderTop: '1px solid #e0e0e0',
  },
  indexName: {
    fontSize: '14px',
    color: '#000',
  },
  indexValue: {
    fontSize: '15px',
    color: '#ff4444',
  },
  indexChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  indexChangeValue: {
    fontSize: '14px',
    color: '#ff4444',
  },
  indexPercent: {
    fontSize: '14px',
    color: '#ff4444',
  },
};
