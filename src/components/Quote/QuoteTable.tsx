import React from 'react';

interface OrderBookRow {
  bidQty: number;
  bidPrice: number;
  askQty: number;
  askPrice: number;
}

const dummyOrderBook: OrderBookRow[] = [
  { bidQty: 236, bidPrice: 0, askQty: 0, askPrice: 285500 },
  { bidQty: 189, bidPrice: 0, askQty: 0, askPrice: 285000 },
  { bidQty: 111, bidPrice: 0, askQty: 0, askPrice: 284500 },
  { bidQty: 13, bidPrice: 0, askQty: 0, askPrice: 284000 },
  { bidQty: 46, bidPrice: 0, askQty: 0, askPrice: 283500 },
  { bidQty: 130, bidPrice: 0, askQty: 0, askPrice: 283000 },
  { bidQty: 391, bidPrice: 0, askQty: 0, askPrice: 282500 },
  { bidQty: 55, bidPrice: 282000, askQty: 0, askPrice: 0 }, // Current price
  { bidQty: 0, bidPrice: 281500, askQty: 65, askPrice: 0 },
  { bidQty: 0, bidPrice: 281000, askQty: 110, askPrice: 0 },
  { bidQty: 0, bidPrice: 280500, askQty: 194, askPrice: 0 },
  { bidQty: 0, bidPrice: 280000, askQty: 170, askPrice: 0 },
  { bidQty: 0, bidPrice: 279500, askQty: 139, askPrice: 0 },
];

const priceMetrics = [
  { label: '매입등락', value: '-2.75%' },
  { label: '매입가격', value: '282,500' },
  { label: '매입수량', value: '233' },
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

export const QuoteTable: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Main Order Book */}
      <div style={styles.orderBookGrid}>
        {/* Left side - Bid info columns */}
        <div style={styles.leftMetrics}>
          {priceMetrics.map((metric, index) => (
            <div key={index} style={styles.metricRow}>
              <span style={styles.metricLabel}>{metric.label}</span>
              <span style={styles.metricValue}>{metric.value}</span>
            </div>
          ))}
        </div>

        {/* Center - Order Book */}
        <div style={styles.orderBook}>
          {dummyOrderBook.map((row, index) => {
            const isCurrentPrice = row.bidPrice === 282000;
            const isBid = row.bidPrice > 0;
            const isAsk = row.askPrice > 0;

            return (
              <div 
                key={index} 
                style={{
                  ...styles.orderRow,
                  ...(isCurrentPrice ? styles.currentPriceRow : {}),
                  ...(isBid && !isCurrentPrice ? styles.bidRow : {}),
                  ...(isAsk ? styles.askRow : {}),
                }}
              >
                {/* Bid quantity */}
                <div style={styles.qtyCell}>
                  {row.bidQty > 0 && (
                    <span style={styles.bidQty}>{row.bidQty}</span>
                  )}
                </div>

                {/* Price */}
                <div style={styles.priceCell}>
                  {isBid && (
                    <span style={isCurrentPrice ? styles.currentPrice : styles.bidPrice}>
                      {row.bidPrice.toLocaleString()}
                    </span>
                  )}
                  {isAsk && (
                    <span style={styles.askPrice}>
                      {row.askPrice.toLocaleString()}
                    </span>
                  )}
                  {isCurrentPrice && (
                    <span style={styles.indicatorDot}>●</span>
                  )}
                </div>

                {/* Ask quantity */}
                <div style={styles.qtyCell}>
                  {row.askQty > 0 && (
                    <span style={styles.askQty}>{row.askQty}</span>
                  )}
                  {index === 6 && row.askQty === 0 && (
                    <span style={styles.totalBadge}>총</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Volume Summary Rows */}
          <div style={styles.volumeRows}>
            <div style={styles.volumeRow}>
              <span style={styles.volumeLabel}>체결강도</span>
              <span style={styles.volumeValueRed}>105.70%</span>
            </div>
            
            {[
              { price: '282,000', qty: 1 },
              { price: '281,500', qty: 1 },
              { price: '281,500', qty: 1 },
              { price: '281,500', qty: 20 },
              { price: '281,500', qty: 5, badge: '시' },
              { price: '281,500', qty: 10 },
              { price: '282,000', qty: 3 },
              { price: '281,500', qty: 4 },
            ].map((item, index) => (
              <div key={index} style={styles.volumeDetailRow}>
                <span style={styles.volumePrice}>{item.price}</span>
                <span style={styles.volumeQty}>{item.qty}</span>
                {item.badge && <span style={styles.volumeBadge}>{item.badge}</span>}
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
    display: 'flex',
    minHeight: '600px',
  },
  leftMetrics: {
    width: '140px',
    borderRight: '1px solid #e0e0e0',
    padding: '4px 8px',
    display: 'flex',
    flexDirection: 'column',
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 4px',
    borderBottom: '1px solid #f5f5f5',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#666',
  },
  metricValue: {
    fontSize: '12px',
    color: '#000',
  },
  orderBook: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  orderRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 8px',
    borderBottom: '1px solid #f5f5f5',
  },
  currentPriceRow: {
    backgroundColor: '#fff',
    border: '1px solid #ff4444',
  },
  bidRow: {
    backgroundColor: 'rgba(255, 235, 238, 0.3)',
  },
  askRow: {
    backgroundColor: 'rgba(227, 242, 253, 0.3)',
  },
  qtyCell: {
    width: '50px',
    textAlign: 'center',
  },
  priceCell: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  bidQty: {
    fontSize: '13px',
    color: '#000',
  },
  askQty: {
    fontSize: '13px',
    color: '#000',
  },
  bidPrice: {
    fontSize: '15px',
    color: '#000',
  },
  askPrice: {
    fontSize: '15px',
    color: '#2196F3',
  },
  currentPrice: {
    fontSize: '15px',
    color: '#ff4444',
  },
  indicatorDot: {
    color: '#ff4444',
    fontSize: '8px',
  },
  totalBadge: {
    fontSize: '11px',
    color: '#666',
  },
  volumeRows: {
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderTop: '1px solid #e0e0e0',
  },
  volumeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 0',
  },
  volumeLabel: {
    fontSize: '12px',
    color: '#666',
  },
  volumeValueRed: {
    fontSize: '13px',
    color: '#ff4444',
  },
  volumeDetailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '4px 0',
    gap: '8px',
  },
  volumePrice: {
    fontSize: '12px',
    color: '#000',
    flex: 1,
  },
  volumeQty: {
    fontSize: '12px',
    color: '#2196F3',
  },
  volumeBadge: {
    fontSize: '11px',
    color: '#666',
  },
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

