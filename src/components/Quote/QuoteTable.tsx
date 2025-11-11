// src/components/Quote/QuoteTable.tsx
import React from 'react';
import {
  currentPrice,
  totalAskQty,
  totalBidQty,
  priceMetrics,
  mergedExecutions,
  FIXED_PRICES,
  toOrderBookRows,
} from '../../Data/QuoteData';

interface OrderBookRow {
  askQty: number; // 위쪽(매도) 수량
  price: number;  // 호가
  bidQty: number; // 아래쪽(매수) 수량
}

// === 데이터: QuoteData에서 가격/수량만 주입 ===
const orderBook: OrderBookRow[] = toOrderBookRows();

export const QuoteTable: React.FC = () => {
  const currentIndex = orderBook.findIndex(r => r.price === currentPrice);

  const handlePriceClick = (price: number) => {
    console.log('price clicked:', price);
  };

  // [추가] 막대 너비 계산용 최대값 (0 방지)
  const maxAsk = Math.max(1, ...orderBook.map(r => r.askQty));
  const maxBid = Math.max(1, ...orderBook.map(r => r.bidQty));

  // [추가] 가격 Hover 처리
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);

  // 병합 영역(픽셀) 계산
  const ROW_H = UI.ROW_H;
  // [변경] 오른쪽 대각선 위 — "기준호가까지" 포함되도록 +1 행
  const rightMergedHeight = Math.max(0, currentIndex + 1) * ROW_H;
  // 왼쪽 대각선 아래 — 기준호가 바로 다음 행부터 시작
  const leftMergedTop = (currentIndex + 1) * ROW_H;
  const leftMergedHeight = Math.max(0, orderBook.length - currentIndex - 1) * ROW_H;

  return (
    <div style={UI.container}>
      {/* ===== 3열 1:1:1 ===== */}
      <div style={UI.grid}>
        {/* ===== 왼쪽 열: 매도잔량 (오른쪽 고정 막대) ===== */}
        <div style={UI.colLeft}>
          {orderBook.map((row, i) => {
            // [변경] 기준호가(현재가)도 "매도쪽"에 포함시키기 위해 <= 로 변경
            const isAboveOrCurrent = i <= currentIndex;
            const barWidthPct = isAboveOrCurrent ? Math.min(1, row.askQty / maxAsk) * 100 : 0;

            return (
              <div
                key={`L-${row.price}`}
                style={{
                  ...UI.cell,
                  position: 'relative',
                  justifyContent: 'flex-end',
                  borderBottom: i === orderBook.length - 1 ? 'none' : UI.cell.borderBottom,
                  ...(isAboveOrCurrent ? UI.bgBlueLight : {}),
                }}
              >
                {/* [추가] 오른쪽 붙는 막대 */}
                {isAboveOrCurrent && row.askQty > 0 && (
                  <div
                    style={{
                      ...UI.qtyBarRightAnchored,
                      width: `${Math.max(6, barWidthPct)}%`, // 최소 6% 보정
                    }}
                  />
                )}
                {/* 수량 텍스트 */}
                {isAboveOrCurrent && row.askQty > 0 ? (
                  <span style={UI.textDefault}>{row.askQty.toLocaleString()}</span>
                ) : (
                  <span style={UI.textMuted}> </span>
                )}
              </div>
            );
          })}

          {/* [병합] 왼쪽 대각선 아래 — 체결리스트 */}
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

        {/* ===== 가운데 열: 가격 (hover 시 어둡게) ===== */}
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
          borderBottom: i === orderBook.length - 1 ? 'none' : UI.cell.borderBottom,
          ...(isAbove ? UI.bgBlueLighter : {}),
          ...(isBelow ? UI.bgPinkLighter : {}),
          ...(hoverIdx === i ? UI.centerHoverShade : {}),
          // [추가] 현재가 셀 전체 하이라이트 (표 셀 크기 그대로)
          ...(isCurrent ? UI.currentCellHighlight : {}),
        }}
      >
        <button
          style={{
            ...UI.priceButton,
            // [삭제] 버튼에 테두리 주던 코드 제거
            // ...(isCurrent ? UI.currentBorder : {}),
          }}
          onClick={() => handlePriceClick(row.price)}
          aria-label={`호가 ${row.price.toLocaleString()}`}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <span
            style={{
              ...(isCurrent ? UI.textCurrent : isAbove ? UI.textBlue : UI.textDefault),
              fontSize: 18,
            }}
          >
            {row.price.toLocaleString()}
          </span>
        </button>
      </div>
    );
  })}
</div>

        {/* ===== 오른쪽 열: 매수잔량 (왼쪽 고정 막대) ===== */}
        <div style={UI.colRight}>
          {orderBook.map((row, i) => {
            const isBelow = i > currentIndex;
            const barWidthPct = isBelow ? Math.min(1, row.bidQty / maxBid) * 100 : 0;

            return (
              <div
                key={`R-${row.price}`}
                style={{
                  ...UI.cell,
                  position: 'relative',
                  justifyContent: 'flex-start',
                  borderBottom: i === orderBook.length - 1 ? 'none' : UI.cell.borderBottom,
                  ...(isBelow ? UI.bgPinkLight : {}),
                }}
              >
                {/* [추가] 왼쪽 붙는 막대 */}
                {isBelow && row.bidQty > 0 && (
                  <div
                    style={{
                      ...UI.qtyBarLeftAnchored,
                      width: `${Math.max(6, barWidthPct)}%`, // 최소 6% 보정
                    }}
                  />
                )}
                {/* 수량 텍스트 */}
                {isBelow && row.bidQty > 0 ? (
                  <span style={UI.textDefault}>{row.bidQty.toLocaleString()}</span>
                ) : (
                  <span style={UI.textMuted}> </span>
                )}
              </div>
            );
          })}

          {/* [병합] 오른쪽 대각선 위 — 가격 메트릭 (기준호가까지 포함) */}
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

      {/* ===== 총잔량 ===== */}
      <div style={UI.bottomSticky}>
        <div style={UI.summaryItem}><span style={UI.summaryValue}>{totalAskQty.toLocaleString()}</span></div>
        <div style={UI.summaryItem}>
          <span style={UI.summaryLabel}>총잔량</span>
          <button style={UI.summaryDropdown} aria-label="총잔량 옵션">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={UI.summaryItem}><span style={UI.summaryValue}>{totalBidQty.toLocaleString()}</span></div>
      </div>
    </div>
  );
};

/* =================== 스타일 (기존 + 추가) =================== */
const UI = {
  ROW_H: 48,

  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    paddingBottom: 0,
  } as React.CSSProperties,

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    flex: 1,
    overflow: 'visible',
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

  // [추가] 가운데 가격 hover 시 어둡게
  centerHoverShade: { filter: 'brightness(0.6)' } as React.CSSProperties,

  currentCellHighlight: {
  boxShadow: 'inset 0 0 0 2px #ff4444',
  borderRadius: 0, // 셀 모서리 라운드를 주고 싶으면 적절히 조정
} as React.CSSProperties,

  // OrderForm의 색 레퍼런스 맞춤 (위=파랑, 아래=핑크)
  bgBlueLight:   { backgroundColor: 'rgba(255, 255, 255, 1)' } as React.CSSProperties,
  bgBlueLighter: { backgroundColor: 'rgba(33,150,243,0.06)' } as React.CSSProperties,
  bgPinkLight:   { backgroundColor: 'rgba(255, 255, 255, 1)' } as React.CSSProperties,
  bgPinkLighter: { backgroundColor: 'rgba(255,82,82,0.06)' } as React.CSSProperties,

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

  // [추가] 막대 그래프 스타일
  qtyBarRightAnchored: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(33,150,243,0.25)', // 위(매도) 계열
    zIndex: 1,
  } as React.CSSProperties,

  qtyBarLeftAnchored: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(255,182,193,0.35)', // 아래(매수) 계열
    zIndex: 1,
  } as React.CSSProperties,

  leftMerged: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: '8px 8px 10px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.95))',
    borderTop: '1px solid #eaeaea',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  executionHeaderRow: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 } as React.CSSProperties,
  executionLabel: { fontSize: 12, color: '#666' } as React.CSSProperties,
  executionValue: { fontSize: 13, color: '#ff4444', fontWeight: 600 } as React.CSSProperties,
  executionList: { display: 'flex', flexDirection: 'column', gap: 4, maxHeight: '100%', overflow: 'auto' } as React.CSSProperties,
  executionItem: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } as React.CSSProperties,
  executionPrice: { color: '#000' } as React.CSSProperties,
  executionQty: { color: '#2196F3' } as React.CSSProperties,

  rightMerged: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.96), rgba(255,255,255,0.92))',
    borderBottom: '1px solid #eaeaea',
    boxSizing: 'border-box',
    padding: '8px 8px 10px',
    overflow: 'hidden',
  } as React.CSSProperties,
  metricsWrap: { display: 'flex', flexDirection: 'column', gap: 8 } as React.CSSProperties,
  metricRow: { display: 'flex', justifyContent: 'space-between', fontSize: 12 } as React.CSSProperties,
  metricLabel: { color: '#666' } as React.CSSProperties,
  metricValue: { color: '#000' } as React.CSSProperties,

  bottomSticky: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderTop: '1px solid #e0e0e0',
    margin: 0,
    marginBottom: -2,
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
