import React from 'react';

interface CandleData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const dummyCandleData: CandleData[] = [
  { date: '10/13', open: 235000, high: 240000, low: 233500, close: 238000, volume: 45000 },
  { date: '10/14', open: 238000, high: 242000, low: 236000, close: 239000, volume: 38000 },
  { date: '10/15', open: 239000, high: 245000, low: 237000, close: 244000, volume: 52000 },
  { date: '10/16', open: 244000, high: 248000, low: 242000, close: 245000, volume: 48000 },
  { date: '10/17', open: 245000, high: 250000, low: 243000, close: 247000, volume: 42000 },
  { date: '10/18', open: 247000, high: 252000, low: 245000, close: 249000, volume: 55000 },
  { date: '10/21', open: 249000, high: 268000, low: 247000, close: 265000, volume: 125000 },
  { date: '10/22', open: 265000, high: 275000, low: 262000, close: 271000, volume: 98000 },
  { date: '10/23', open: 271000, high: 278000, low: 268000, close: 270000, volume: 76000 },
  { date: '10/24', open: 270000, high: 280000, low: 267000, close: 276000, volume: 82000 },
  { date: '10/25', open: 276000, high: 285000, low: 273000, close: 279000, volume: 88000 },
  { date: '10/28', open: 279000, high: 322500, low: 276000, close: 315000, volume: 215000 },
  { date: '10/29', open: 315000, high: 320000, low: 308000, close: 312000, volume: 142000 },
  { date: '10/30', open: 312000, high: 318000, low: 305000, close: 308000, volume: 118000 },
  { date: '11/01', open: 308000, high: 315000, low: 302000, close: 310000, volume: 95000 },
  { date: '11/02', open: 310000, high: 318000, low: 307000, close: 316000, volume: 102000 },
  { date: '11/05', open: 316000, high: 295000, low: 282000, close: 281500, volume: 156000 },
];

export const ChartCanvas: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* Candlestick Chart */}
      <div style={styles.chartSection}>
        <div style={styles.chart}>
          {/* Price labels on the right */}
          <div style={styles.priceLabels}>
            <span style={styles.priceLabel}>322,500</span>
            <span style={styles.priceLabel}>290,234</span>
            <div style={styles.currentPriceLabel}>
              <span>281,500</span>
              <span style={styles.currentPercent}>-1.92%</span>
            </div>
            <span style={styles.priceLabel}>257,968</span>
            <span style={styles.priceLabel}>225,703</span>
            <span style={styles.priceLabel}>193,437</span>
          </div>

          {/* Candlestick visualization */}
          <svg width="100%" height="360" style={styles.svg}>
            {/* Moving average lines */}
            <polyline
              points="10,180 40,175 70,165 100,160 130,155 160,150 190,120 220,110 250,112 280,108 310,105 340,95 370,92 400,94 430,96 460,98 490,140"
              fill="none"
              stroke="#ff4444"
              strokeWidth="1"
            />
            <polyline
              points="10,185 40,182 70,172 100,168 130,162 160,158 190,128 220,118 250,120 280,116 310,113 340,105 370,102 400,104 430,106 460,108 490,145"
              fill="none"
              stroke="#ff9800"
              strokeWidth="1"
            />
            <polyline
              points="10,195 40,192 70,185 100,180 130,175 160,170 190,145 220,135 250,137 280,133 310,130 340,122 370,120 400,122 430,124 460,126 490,158"
              fill="none"
              stroke="#2196F3"
              strokeWidth="1"
            />

            {/* Candlesticks */}
            {dummyCandleData.map((candle, index) => {
              const x = 30 + index * 28;
              const isRed = candle.close < candle.open;
              const high = 350 - ((candle.high - 193437) / (322500 - 193437)) * 320;
              const low = 350 - ((candle.low - 193437) / (322500 - 193437)) * 320;
              const open = 350 - ((candle.open - 193437) / (322500 - 193437)) * 320;
              const close = 350 - ((candle.close - 193437) / (322500 - 193437)) * 320;
              
              const bodyTop = Math.min(open, close);
              const bodyHeight = Math.abs(open - close);
              
              return (
                <g key={index}>
                  {/* High-low line */}
                  <line
                    x1={x}
                    y1={high}
                    x2={x}
                    y2={low}
                    stroke={isRed ? '#2196F3' : '#ff4444'}
                    strokeWidth="1"
                  />
                  {/* Body */}
                  <rect
                    x={x - 8}
                    y={bodyTop}
                    width="16"
                    height={bodyHeight || 1}
                    fill={isRed ? '#2196F3' : '#ff4444'}
                  />
                </g>
              );
            })}

            {/* Annotations */}
            <text x="180" y="80" fontSize="11" fill="#ff4444">
              최고 322,500(-12.71%, 10/30)
            </text>
            <text x="120" y="310" fontSize="11" fill="#2196F3">
              ← 최저 233,500(20.56%, 10/13)
            </text>
            
            {/* Price info box */}
            <rect x="410" y="130" width="80" height="60" fill="#5468b5" rx="4"/>
            <text x="420" y="148" fontSize="11" fill="#fff">290,234</text>
            <text x="420" y="165" fontSize="11" fill="#fff">281,500</text>
            <text x="420" y="182" fontSize="11" fill="#fff">-1.92%</text>
          </svg>

          {/* Date labels */}
          <div style={styles.dateLabels}>
            <span>2025/10/13</span>
            <span>2025/10/21</span>
            <span>2025/10/28</span>
            <span>11/05</span>
            <button style={styles.dateDropdown}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Volume Chart */}
      <div style={styles.volumeSection}>
        <div style={styles.volumeHeader}>
          <button style={styles.closeButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span style={styles.volumeLabel}>거래량 단순</span>
          <span style={styles.volumeValue5}>5</span>
          <span style={styles.volumeValue20}>20</span>
          <span style={styles.volumeValue60}>60</span>
          <span style={styles.volumeValue120}>120</span>
        </div>

        <div style={styles.volumeChart}>
          {/* Volume labels on the right */}
          <div style={styles.volumeLabels}>
            <span style={styles.volumeLabelText}>475,655</span>
            <span style={styles.volumeLabelText}>356,741</span>
            <div style={styles.currentVolumeLabel}>215,676</div>
            <span style={styles.volumeLabelText}>118,914</span>
            <span style={styles.volumeLabelText}>0</span>
          </div>

          {/* Volume bars */}
          <div style={styles.volumeBars}>
            {dummyCandleData.map((candle, index) => {
              const isRed = candle.close < candle.open;
              const height = (candle.volume / 215000) * 100;
              
              return (
                <div
                  key={index}
                  style={{
                    width: '14px',
                    height: `${height}%`,
                    backgroundColor: isRed ? '#2196F3' : '#ff4444',
                    alignSelf: 'flex-end',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  chartSection: {
    padding: '0',
    position: 'relative',
  },
  chart: {
    position: 'relative',
    width: '100%',
  },
  svg: {
    display: 'block',
  },
  priceLabels: {
    position: 'absolute',
    right: '8px',
    top: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '320px',
    pointerEvents: 'none',
  },
  priceLabel: {
    fontSize: '11px',
    color: '#666',
    textAlign: 'right',
  },
  currentPriceLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '11px',
    color: '#000',
    textAlign: 'right',
  },
  currentPercent: {
    fontSize: '10px',
    color: '#2196F3',
  },
  dateLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    fontSize: '11px',
    color: '#666',
    borderTop: '1px solid #f0f0f0',
  },
  dateDropdown: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeSection: {
    borderTop: '1px solid #e0e0e0',
    paddingBottom: 0,     // ← 불필요한 하단 여백 제거
    marginBottom: -2,
  },
  volumeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    padding: '2px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeLabel: {
    fontSize: '12px',
    color: '#666',
  },
  volumeValue5: {
    fontSize: '12px',
    color: '#ff4444',
  },
  volumeValue20: {
    fontSize: '12px',
    color: '#ff9800',
  },
  volumeValue60: {
    fontSize: '12px',
    color: '#4caf50',
  },
  volumeValue120: {
    fontSize: '12px',
    color: '#2196F3',
  },
  volumeChart: {
    position: 'relative',
    height: '120px',
    padding: '0 8px',
  },
  volumeLabels: {
    position: 'absolute',
    right: '8px',
    top: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    pointerEvents: 'none',
  },
  volumeLabelText: {
    fontSize: '10px',
    color: '#666',
    textAlign: 'right',
  },
  currentVolumeLabel: {
    fontSize: '10px',
    color: '#fff',
    backgroundColor: '#2196F3',
    padding: '2px 6px',
    borderRadius: '3px',
    textAlign: 'right',
  },
  volumeBars: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: '100%',
    gap: '2px',
    paddingRight: '60px',
  },
};
