import React from 'react';

interface OrderBookRow {
  askQty: number; // 위쪽(매도) 수량
  price: number;  // 호가
  bidQty: number; // 아래쪽(매수) 수량
}

/** 고정 구간: 285,500 ~ 277,500 (500원 간격, 내림차순) */
const FIXED_PRICES: number[] = [
  285500, 285000, 284500, 284000, 283500, 283000, 282500,
  282000,
  281500, 281000, 280500, 280000, 279500, 279000, 278500, 278000, 277500,
];

/** 기본 더미(요청 주신 기존 값 유지) */
const baseRows: OrderBookRow[] = [
  { askQty: 236, price: 285500, bidQty: 0 },
  { askQty: 189, price: 285000, bidQty: 0 },
  { askQty: 111, price: 284500, bidQty: 0 },
  { askQty: 13,  price: 284000, bidQty: 0 },
  { askQty: 46,  price: 283500, bidQty: 0 },
  { askQty: 130, price: 283000, bidQty: 0 },
  { askQty: 391, price: 282500, bidQty: 0 },
  { askQty: 55,  price: 282000, bidQty: 0 }, // 현재가
  { askQty: 0,   price: 281500, bidQty: 65 },
  { askQty: 0,   price: 281000, bidQty: 110 },
  { askQty: 0,   price: 280500, bidQty: 194 },
  { askQty: 0,   price: 280000, bidQty: 170 },
  { askQty: 0,   price: 279500, bidQty: 139 },
  { askQty: 0,   price: 279000, bidQty: 73 },
  { askQty: 0,   price: 278500, bidQty: 60 },
  { askQty: 0,   price: 278000, bidQty: 85 },
  { askQty: 0,   price: 277500, bidQty: 100 },
];

/** 가격→행 매핑 후, 고정 구간만 추출 */
function buildFixedOrderBook(): OrderBookRow[] {
  const map = new Map<number, OrderBookRow>();
  baseRows.forEach(r => map.set(r.price, r));
  return FIXED_PRICES.map(p => map.get(p) ?? { askQty: 0, price: p, bidQty: 0 });
}
const orderBook = buildFixedOrderBook();

/** 오른쪽 상단 메트릭(병합 영역에 표시) */
const priceMetrics = [
  { label: '예상등락', value: '-2.75%' },
  { label: '예상가격', value: '282,500' },
  { label: '예상수량', value: '233' },
  { label: '전일거래', value: '218,766' },
  { label: '거래량',  value: '215,623' },
  { label: '전일비',  value: '98.56%' },
  { label: '기준가',  value: '290,500' },
  { label: '시가',    value: '280,000' },
  { label: '고가',    value: '288,500' },
  { label: '저가',    value: '271,500' },
  { label: '상한가',  value: '377,500' },
  { label: '하한가',  value: '203,500' },
  { label: '거래비용', value: '509' },
];

/** 왼쪽 하단 병합 영역에 들어갈 임의 체결 데이터 */
const mergedExecutions = [
  { price: '282,000', qty: 3 },
  { price: '281,500', qty: 5 },
  { price: '281,500', qty: 7 },
  { price: '281,500', qty: 9 },
  { price: '282,000', qty: 4 },
  { price: '282,000', qty: 6 },
  { price: '281,500', qty: 7 },
  { price: '281,500', qty: 9 },
  { price: '282,000', qty: 4 },
  { price: '282,000', qty: 6 },
];

export const QuoteTable: React.FC = () => {
  const currentPrice = 282000;
  const currentIndex = orderBook.findIndex(r => r.price === currentPrice);

  // 버튼 클릭 핸들러 (나중 기능 추가 예정)
  const handlePriceClick = (price: number) => {
    console.log('price clicked:', price);
  };

  // 병합 영역(픽셀) 계산
  const ROW_H = UI.ROW_H;
  const rightMergedHeight = currentIndex * ROW_H;                     // 오른쪽 상단(현재가 위) 높이
  const leftMergedTop = (currentIndex + 1) * ROW_H;                   // 왼쪽 하단 시작 위치(현재가 아래부터)
  const leftMergedHeight = (orderBook.length - currentIndex - 1) * ROW_H; // 왼쪽 하단 전체 높이

  return (
    <div style={UI.container}>
      {/* ===== 3열 1:1:1 ===== */}
      <div style={UI.grid}>
        {/* ===== 왼쪽 열 (position:relative) ===== */}
        <div style={UI.colLeft}>
          {/* 개별 셀은 그대로 렌더 (위쪽은 수량, 현재가/아래쪽은 비움) */}
          {orderBook.map((row, i) => {
            const isAbove = i < currentIndex;
            return (
              <div
                key={`L-${row.price}`}
                style={{
                  ...UI.cell,
                  ...(isAbove ? UI.bgBlueLight : {}),
                }}
              >
                {isAbove && row.askQty > 0 ? (
                  <span style={UI.textDefault}>{row.askQty}</span>
                ) : (
                  <span style={UI.textMuted}> </span>
                )}
              </div>
            );
          })}

          {/* [병합] 왼쪽 대각선 아래: 체결강도 + 임의 체결 리스트 */}
          <div
            style={{
              ...UI.leftMerged,
              top: leftMergedTop,
              height: leftMergedHeight,
            }}
          >
            <div style={UI.executionHeaderRow}>
              <span style={UI.executionLabel}>체결강도</span>
              <span style={UI.executionValue}>105.70%</span>
            </div>
            <div style={UI.executionList}>
              {mergedExecutions.map((e, idx) => (
                <div key={idx} style={UI.executionItem}>
                  <span style={UI.executionPrice}>{e.price}</span>
                  <span style={UI.executionQty}>{e.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 가운데 열 (가격 버튼, 282,000만 강조) ===== */}
        <div style={UI.colCenter}>
          {orderBook.map((row, i) => {
            const isAbove = i < currentIndex;
            const isBelow = i > currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <div
                key={`C-${row.price}`}
                style={{
                  ...UI.cell,
                  ...(isAbove ? UI.bgBlueLighter : {}),
                  ...(isBelow ? UI.bgPinkLighter : {}),
                }}
              >
                <button
                  style={{
                    ...UI.priceButton,
                    ...(isCurrent ? UI.currentBorder : {}),
                  }}
                  onClick={() => handlePriceClick(row.price)}
                  aria-label={`호가 ${row.price.toLocaleString()}`}
                >
                  <span
                    style={{
                      ...(isCurrent ? UI.textCurrent : isAbove ? UI.textBlue : UI.textDefault),
                      fontSize: 18, // 버튼 텍스트 크게
                    }}
                  >
                    {row.price.toLocaleString()}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* ===== 오른쪽 열 (position:relative) ===== */}
        <div style={UI.colRight}>
          {/* 개별 셀은 아래쪽 수량만 표시 */}
          {orderBook.map((row, i) => {
            const isBelow = i > currentIndex;
            return (
              <div
                key={`R-${row.price}`}
                style={{
                  ...UI.cell,
                  ...(isBelow ? UI.bgPinkLight : {}),
                }}
              >
                {isBelow && row.bidQty > 0 ? (
                  <span style={UI.textDefault}>{row.bidQty}</span>
                ) : (
                  <span style={UI.textMuted}> </span>
                )}
              </div>
            );
          })}

          {/* [병합] 오른쪽 대각선 위: 메트릭 패널 */}
          <div
            style={{
              ...UI.rightMerged,
              height: rightMergedHeight,
            }}
          >
            <div style={UI.metricsWrap}>
              {priceMetrics.map((m, i) => (
                <div key={i} style={UI.metricRow}>
                  <span style={UI.metricLabel}>{m.label}</span>
                  <span style={UI.metricValue}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Sticky 총잔량 ===== */}
      <div style={UI.bottomSticky}>
        <div style={UI.summaryItem}><span style={UI.summaryValue}>1,356</span></div>
        <div style={UI.summaryItem}>
          <span style={UI.summaryLabel}>총잔량</span>
          <button style={UI.summaryDropdown} aria-label="총잔량 옵션">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={UI.summaryItem}><span style={UI.summaryValue}>1,453</span></div>
      </div>
    </div>
  );
};

/* =================== 스타일 =================== */
const UI = {
  ROW_H: 48, // ← 행 높이(크게)
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    flex: 1,
    overflow: 'auto',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,

  colLeft:   { position: 'relative', display: 'flex', flexDirection: 'column' } as React.CSSProperties,
  colCenter: { display: 'flex', flexDirection: 'column', borderLeft: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0' } as React.CSSProperties,
  colRight:  { position: 'relative', display: 'flex', flexDirection: 'column' } as React.CSSProperties,

  cell: {
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '1px solid #f5f5f5',
    padding: '6px 8px',
    boxSizing: 'border-box',
  } as React.CSSProperties,

  // 가운데 열: 282,000 가격 버튼에만 전체 테두리
  currentBorder: {
    border: '2px solid #ff4444',
    borderRadius: 6,
  } as React.CSSProperties,

  // 배경 톤
  bgBlueLight:   { backgroundColor: 'rgba(33,150,243,0.10)' } as React.CSSProperties,
  bgBlueLighter: { backgroundColor: 'rgba(33,150,243,0.06)' } as React.CSSProperties,
  bgPinkLight:   { backgroundColor: 'rgba(255,82,82,0.10)' } as React.CSSProperties,
  bgPinkLighter: { backgroundColor: 'rgba(255,82,82,0.06)' } as React.CSSProperties,

  // 텍스트
  textDefault: { fontSize: 14, color: '#000' } as React.CSSProperties,
  textMuted:   { fontSize: 14, color: 'transparent' } as React.CSSProperties,
  textBlue:    { fontSize: 16, color: '#1976d2' } as React.CSSProperties,
  textCurrent: { fontSize: 18, color: '#ff4444', fontWeight: 700 } as React.CSSProperties,

  priceButton: {
    appearance: 'none',
    border: 'none',
    background: 'none',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  } as React.CSSProperties,

  // 왼쪽 하단 병합 패널
  leftMerged: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: '8px 8px 10px',
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
    borderTop: '1px solid #eaeaea',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  executionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  } as React.CSSProperties,
  executionLabel: { fontSize: 12, color: '#666' } as React.CSSProperties,
  executionValue: { fontSize: 13, color: '#ff4444', fontWeight: 600 } as React.CSSProperties,
  executionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    maxHeight: '100%',
    overflow: 'auto',
  } as React.CSSProperties,
  executionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
  } as React.CSSProperties,
  executionPrice: { color: '#000' } as React.CSSProperties,
  executionQty: { color: '#2196F3' } as React.CSSProperties,

  // 오른쪽 상단 병합 패널
  rightMerged: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    background:
      'linear-gradient(to bottom, rgba(255,255,255,0.96), rgba(255,255,255,0.92))',
    borderBottom: '1px solid #eaeaea',
    boxSizing: 'border-box',
    padding: '8px 8px 10px',
    overflow: 'hidden',
  } as React.CSSProperties,
  metricsWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  } as React.CSSProperties,
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
  } as React.CSSProperties,
  metricLabel: { color: '#666' } as React.CSSProperties,
  metricValue: { color: '#000' } as React.CSSProperties,

  // 총잔량 sticky
  bottomSticky: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderTop: '1px solid #e0e00',
    zIndex: 2,
  } as React.CSSProperties,
  summaryItem:  { display: 'flex', alignItems: 'center', gap: 8 } as React.CSSProperties,
  summaryLabel: { fontSize: 13, color: '#666' } as React.CSSProperties,
  summaryValue: { fontSize: 14, color: '#000' } as React.CSSProperties,
  summaryDropdown: {
    background: 'none',
    border: 'none',
    padding: 2,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
};
