import React from 'react';

interface HoldingData {
  name: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  availableQty: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface AccountTableProps {
  onRowClick?: () => void;
}

/** 더미 보유 종목 — 키움증권 1행만 표기 */
const dummyHoldings: HoldingData[] = [
  {
    name: '키움증권',
    buyPrice: 283500,
    currentPrice: 283500,
    quantity: 1,
    availableQty: 1,
    profitLoss: -505,
    profitLossPercent: -0.18,
  },
];

export const AccountTable: React.FC<AccountTableProps> = ({ onRowClick }) => {
  const h = dummyHoldings[0];

  return (
    <div style={styles.container}>
      {/* ===== 2행 × 4열 헤더 =====
         (1,1)~(1,2) 병합 = 종목명
         (2,1) 매입가 / (2,2) 현재가
         (3,1) 보유수량 / (3,2) 가능수량
         (4,1) 평가손익 / (4,2) 수익률 */}
      <div style={styles.headerGrid}>
        <div style={styles.headerNameCell}>종목명</div>

        <div style={{ ...styles.headerCell, gridColumn: '2 / 3', gridRow: '1 / 2' }}>매입가</div>
        <div style={{ ...styles.headerCell, gridColumn: '2 / 3', gridRow: '2 / 3' }}>현재가</div>

        <div style={{ ...styles.headerCell, gridColumn: '3 / 4', gridRow: '1 / 2' }}>보유수량</div>
        <div style={{ ...styles.headerCell, gridColumn: '3 / 4', gridRow: '2 / 3' }}>가능수량</div>

        <div style={{ ...styles.headerCell, gridColumn: '4 / 5', gridRow: '1 / 2' }}>평가손익</div>
        <div style={{ ...styles.headerCell, gridColumn: '4 / 5', gridRow: '2 / 3' }}>수익률</div>
      </div>

      {/* ===== 2행 × 4열 데이터 행 =====
         (1,1)~(1,2) 병합 = 종목명
         (2,1) 283,500 / (2,2) 283,500(분홍)
         (3,1) 1 / (3,2) 1
         (4,1) -505(파랑) / (4,2) -0.18%(파랑) */}
      <div style={styles.rowGrid} onClick={onRowClick}>
        <div style={styles.rowNameCell}>
          <span style={styles.stockName}>{h.name}</span>
        </div>

        <div style={{ ...styles.rowCell, gridColumn: '2 / 3', gridRow: '1 / 2' }}>
          <span style={styles.priceText}>{h.buyPrice.toLocaleString()}</span>
        </div>
        <div style={{ ...styles.rowCell, gridColumn: '2 / 3', gridRow: '2 / 3' }}>
          <span style={styles.currentPricePink}>{h.currentPrice.toLocaleString()}</span>
        </div>

        <div style={{ ...styles.rowCell, gridColumn: '3 / 4', gridRow: '1 / 2' }}>
          <span style={styles.qtyText}>{h.quantity}</span>
        </div>
        <div style={{ ...styles.rowCell, gridColumn: '3 / 4', gridRow: '2 / 3' }}>
          <span style={styles.qtyText}>{h.availableQty}</span>
        </div>

        <div style={{ ...styles.rowCell, gridColumn: '4 / 5', gridRow: '1 / 2' }}>
          <span style={styles.profitBlue}>{h.profitLoss.toLocaleString()}</span>
        </div>
        <div style={{ ...styles.rowCell, gridColumn: '4 / 5', gridRow: '2 / 3' }}>
          <span style={styles.profitBlue}>{h.profitLossPercent}%</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
  },

  /** ===== 헤더 (2행×4열, (1,1)~(1,2) 병합) ===== */
  headerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr repeat(3, 1fr)', // 4열
    gridTemplateRows: '28px 28px',               // 2행
    alignItems: 'center',
    backgroundColor: '#f7f7f8',
    borderRadius: 6,
    overflow: 'hidden',
    borderBottom: '1px solid #e5e7eb',
    fontSize: 12,
  },
  headerNameCell: {
    gridColumn: '1 / 2',
    gridRow: '1 / 3',         // 세로 병합
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontWeight: 600,
    borderRight: '1px solid #eeeeee',
  },
  headerCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
  },

  /** ===== 데이터 행 (2행×4열, (1,1)~(1,2) 병합) ===== */
  rowGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr repeat(3, 1fr)',
    gridTemplateRows: '32px 32px',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  rowNameCell: {
    gridColumn: '1 / 2',
    gridRow: '1 / 3',         // 세로 병합
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    borderRight: '1px solid #f5f5f5',
  },
  stockName: {
    fontSize: 15,
    color: '#000',
  },
  rowCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
  },

  /** ===== 텍스트 스타일 ===== */
  priceText: { fontSize: 13, color: '#000' },            // 매입가
  currentPricePink: { fontSize: 13, color: '#ff4d6d' },  // 현재가(분홍)
  qtyText: { fontSize: 13, color: '#000' },
  profitBlue: { fontSize: 13, color: '#2196F3' },        // 손익/수익률(파랑)
};
