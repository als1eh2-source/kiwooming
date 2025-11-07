import React from 'react';

interface OrderBookRow {
  askQty: number;
  price: number;
  bidQty: number;
}

const dummyOrderBook: OrderBookRow[] = [
  { askQty: 236, price: 285500, bidQty: 0 },
  { askQty: 189, price: 285000, bidQty: 0 },
  { askQty: 111, price: 284500, bidQty: 0 },
  { askQty: 13, price: 284000, bidQty: 0 },
  { askQty: 46, price: 283500, bidQty: 0 },
  { askQty: 130, price: 283000, bidQty: 0 },
  { askQty: 391, price: 282500, bidQty: 0 },
  { askQty: 55, price: 282000, bidQty: 0 }, // Current price
  { askQty: 0, price: 281500, bidQty: 65 },
  { askQty: 0, price: 281000, bidQty: 110 },
  { askQty: 0, price: 280500, bidQty: 194 },
  { askQty: 0, price: 280000, bidQty: 170 },
  { askQty: 0, price: 279500, bidQty: 139 },
  { askQty: 0, price: 279000, bidQty: 73 },
];

const priceMetrics = [
  { label: '예동등락', value: '-2.75%' },
  { label: '예수가격', value: '282,500' },
  { label: '예수수량', value: '233' },
  { label: '전일거래', value: '218,766' },
  { label: '거래량', value: '215,623' },
  { label: '전일비', value: '98.56%' },
  { label: '기준가', value: '290,500' },
  { label: '시가', value: '280,000' },
  { label: '고가', value: '288,500' },
  { label: '저가', value: '271,500' },
  { label: '상한가', value: '377,500' },
  { label: '하한가', value: '203,500' },
  { label: '거래비중', value: '509' },
];

const executionData = [
  { price: '282,000', qty: 1 },
  { price: '281,500', qty: 1 },
  { price: '281,500', qty: 1 },
  { price: '281,500', qty: 20 },
  { price: '281,500', qty: 5, badge: '시' },
  { price: '281,500', qty: 10 },
  { price: '282,000', qty: 3 },
  { price: '281,500', qty: 4 },
];

export const QuoteTable: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Main Order Book Grid */}
      <div style={styles.orderBookGrid}>
        {/* Left Column - Ask Quantities (Diagonal Top) + Execution Data (Diagonal Bottom) */}
        <div style={styles.leftColumn}>
          {/* Top section - Ask quantities */}
          <div style={styles.askQtySection}>
            {dummyOrderBook.slice(0, 8).map((row, index) => (
              <div key={index} style={styles.qtyRow}>
                {row.askQty > 0 && (
                  <>
                    <span style={styles.askQty}>{row.askQty}</span>
                    {index === 6 && <span style={styles.totalBadge}>총</span>}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom section - Execution strength and data */}
          <div style={styles.executionSection}>
            <div style={styles.executionHeader}>
              <span style={styles.executionLabel}>체결강도</span>
              <span style={styles.executionValue}>105.70%</span>
            </div>
            
            {executionData.map((item, index) => (
              <div key={index} style={styles.executionRow}>
                <span style={styles.executionPrice}>{item.price}</span>
                <span style={styles.executionQty}>{item.qty}</span>
                {item.badge && <span style={styles.executionBadge}>{item.badge}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Prices */}
        <div style={styles.centerColumn}>
          {dummyOrderBook.map((row, index) => {
            const isCurrentPrice = row.price === 282000;
            const isAsk = row.askQty > 0;
            const isBid = row.bidQty > 0;

            return (
              <div
                key={index}
                style={{
                  ...styles.priceRow,
                  ...(isCurrentPrice ? styles.currentPriceRow : {}),
                  ...(isAsk && !isCurrentPrice ? styles.askPriceRow : {}),
                  ...(isBid ? styles.bidPriceRow : {}),
                }}
              >
                <span
                  style={{
                    ...styles.priceText,
                    ...(isCurrentPrice ? styles.currentPriceText : {}),
                    ...(isAsk && !isCurrentPrice ? styles.askPriceText : {}),
                  }}
                >
                  {row.price.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column - Price Metrics (Diagonal Top) + Bid Quantities (Diagonal Bottom) */}
        <div style={styles.rightColumn}>
          {/* Top section - Price metrics */}
          <div style={styles.metricsSection}>
            {priceMetrics.map((metric, index) => (
              <div key={index} style={styles.metricRow}>
                <span style={styles.metricLabel}>{metric.label}</span>
                <span style={styles.metricValue}>{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Bottom section - Bid quantities */}
          <div style={styles.bidQtySection}>
            {dummyOrderBook.slice(8).map((row, index) => (
              <div key={index} style={styles.qtyRow}>
                {row.bidQty > 0 && (
                  <span style={styles.bidQty}>{row.bidQty}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div style={styles.bottomSummary}>
        <div style={styles.summaryItem}>
          <span style={styles.summaryValue}>1,356</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>종잔량</span>
          <button style={styles.summaryDropdown}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryValue}>1,453</span>
        </div>
      </div>

      {/* Index Info */}
      <div style={styles.indexBar}>
        <span style={styles.indexName}>코스닥</span>
        <span style={styles.indexValue}>901.89</span>
        <div style={styles.indexChange}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M7 14L12 9L17 14" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.indexChangeValue}>24.68</span>
        </div>
        <span style={styles.indexPercent}>2.66%</span>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
    overflow: 'auto',
  },
  orderBookGrid: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 140px',
    minHeight: '600px',
  },
  
  // Left Column Styles
  leftColumn: {
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
  },
  askQtySection: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  executionSection: {
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderTop: '1px solid #e0e0e0',
  },
  executionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
    marginBottom: '4px',
  },
  executionLabel: {
    fontSize: '11px',
    color: '#666',
  },
  executionValue: {
    fontSize: '12px',
    color: '#ff4444',
  },
  executionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3px 0',
    gap: '4px',
  },
  executionPrice: {
    fontSize: '11px',
    color: '#000',
    flex: 1,
  },
  executionQty: {
    fontSize: '11px',
    color: '#2196F3',
  },
  executionBadge: {
    fontSize: '10px',
    color: '#666',
  },
  
  // Center Column Styles
  centerColumn: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e0e0e0',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderBottom: '1px solid #f5f5f5',
    minHeight: '36px',
  },
  currentPriceRow: {
    backgroundColor: '#fff',
    border: '2px solid #ff4444',
    borderLeft: 'none',
    borderRight: 'none',
  },
  askPriceRow: {
    backgroundColor: 'rgba(227, 242, 253, 0.3)',
  },
  bidPriceRow: {
    backgroundColor: 'rgba(255, 235, 238, 0.15)',
  },
  priceText: {
    fontSize: '16px',
    color: '#000',
  },
  currentPriceText: {
    fontSize: '16px',
    color: '#ff4444',
  },
  askPriceText: {
    fontSize: '16px',
    color: '#2196F3',
  },
  
  // Right Column Styles
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  metricsSection: {
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'column',
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 4px',
    borderBottom: '1px solid #f5f5f5',
    minHeight: '36px',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#666',
  },
  metricValue: {
    fontSize: '11px',
    color: '#000',
  },
  bidQtySection: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  
  // Quantity Styles
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    borderBottom: '1px solid #f5f5f5',
    minHeight: '36px',
    gap: '6px',
  },
  askQty: {
    fontSize: '14px',
    color: '#000',
  },
  bidQty: {
    fontSize: '14px',
    color: '#000',
  },
  totalBadge: {
    fontSize: '11px',
    color: '#666',
  },
  
  // Bottom Summary Styles
  bottomSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryLabel: {
    fontSize: '13px',
    color: '#666',
  },
  summaryValue: {
    fontSize: '14px',
    color: '#000',
  },
  summaryDropdown: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Index Bar Styles
  indexBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: '#f5f5f5',
  },
  indexName: {
    fontSize: '13px',
    color: '#000',
  },
  indexValue: {
    fontSize: '14px',
    color: '#2196F3',
  },
  indexChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  indexChangeValue: {
    fontSize: '13px',
    color: '#2196F3',
  },
  indexPercent: {
    fontSize: '13px',
    color: '#2196F3',
  },
};
