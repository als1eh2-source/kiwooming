// src/components/Order/OrderForm.tsx
import React from 'react';

interface OrderBookRow { price: number; quantity: number; }

const CURRENT_PRICE = 282000;
const SYMBOL = '키움증권';
const ROW_H = 60; // 왼쪽 호가 리스트 한 행 고정 높이(약 9행 고정 뷰)

const makeOrderBook = (): OrderBookRow[] => {
  const rows: OrderBookRow[] = [];
  for (let i = 7; i >= 1; i--) rows.push({ price: CURRENT_PRICE + i * 500, quantity: Math.floor(Math.random() * 900) + 10 });
  rows.push({ price: CURRENT_PRICE, quantity: Math.floor(Math.random() * 900) + 10 });
  for (let i = 1; i <= 7; i++) rows.push({ price: CURRENT_PRICE - i * 500, quantity: Math.floor(Math.random() * 900) + 10 });
  return rows;
};
const orderBookRows = makeOrderBook();
const maxQty = Math.max(...orderBookRows.map(r => r.quantity));

export const OrderForm: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'매수'|'매도'|'정정/취소'|'미체결'|'잔고'>('매수');
  const [orderType, setOrderType] = React.useState<'현금'|'신용'>('현금');
  const [priceType] = React.useState('보통(지정가)');
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(CURRENT_PRICE);
  const [useMargin, setUseMargin] = React.useState(false);
  const [autoPrice, setAutoPrice] = React.useState(false);
  const [percentDropdownOpen, setPercentDropdownOpen] = React.useState(false);
  const [selectedPercent, setSelectedPercent] = React.useState(100);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [hoverPrice, setHoverPrice] = React.useState<number | null>(null);

  const onPickBook = (p: number) => setPrice(p);
  const handleSubmit = () => setShowConfirm(true);
  const handleConfirm = () => { setShowConfirm(false); setShowToast(true); window.setTimeout(() => setShowToast(false), 2000); };

  const rowBg1stCol = (p: number): React.CSSProperties => (p >= CURRENT_PRICE ? styles.bgSky : styles.bgPink);
  const priceColor = (p: number): React.CSSProperties =>
    p === CURRENT_PRICE ? styles.txtBlack : (p > CURRENT_PRICE ? styles.txtUp : styles.txtDown);

  return (
    <div style={styles.container}>
      {/* 탭바 */}
      <div style={styles.tabBar}>
        {(['매수','매도','정정/취소','미체결','잔고'] as const).map((tab) => (
          <button
            key={tab}
            style={{ ...styles.tab, ...(activeTab === tab ? (tab === '매수' ? styles.tabActiveBuy : styles.tabActiveSell) : {}) }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 메인 2열 */}
      <div style={styles.mainContent}>
        {/* Left: 2:1, 왼쪽만 스크롤 */}
        <div style={styles.orderBookSection}>
          <div style={styles.orderBookHeader}>
            <span style={styles.headerLabel}>호가</span>
            <span style={styles.headerLabelRight}>잔량</span>
          </div>

          <div style={styles.orderBook}>
            {orderBookRows.map((row) => {
              const isCurrent = row.price === CURRENT_PRICE;
              const barWidth = Math.max(0.06, row.quantity / maxQty);
              return (
                <div key={row.price} style={styles.orderRow} onClick={() => onPickBook(row.price)}>
                  {/* 1열: 가격 (배경은 1열만), 현재가 outline, hover 어둡게 */}
                  <div
                    style={{
                      ...styles.priceCell,
                      ...rowBg1stCol(row.price),
                      ...(isCurrent ? styles.priceCellHighlight : {}),
                      ...(hoverPrice === row.price ? styles.priceCellHover : {}),
                    }}
                    onMouseEnter={() => setHoverPrice(row.price)}
                    onMouseLeave={() => setHoverPrice(null)}
                  >
                    <span style={{ ...styles.colPrice, ...priceColor(row.price) }}>
                      {row.price.toLocaleString()}
                    </span>
                  </div>

                  {/* 2열: 잔량 숫자 + 왼쪽 막대 (배경 없음) */}
                  <div style={styles.qtyCell}>
                    <div
  style={{
    ...styles.qtyBarLeft,
    ...(row.price >= CURRENT_PRICE
      ? styles.qtyBarAbove
      : styles.qtyBarBelow),
    width: `${Math.min(1, barWidth) * 100}%`,
  }}
/>
                    <span style={styles.qtyNumber}>{row.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 3열 그리드 (기존 레이아웃 유지) */}
        <div style={styles.orderEntrySection}>
          {/* 1행: (1~2열 병합) 현금|신용 */}
          <div style={styles.rowMerge}>
            <div style={styles.mergeBox}>
              <button
                style={{ ...styles.cellButtonTightLeft, ...(orderType === '현금' ? styles.cellButtonActive : {}) }}
                onClick={() => setOrderType('현금')}
              >현금</button>
              <button
                style={{ ...styles.cellButtonTightRight, ...(orderType === '신용' ? styles.cellButtonActive : {}) }}
                onClick={() => setOrderType('신용')}
              >신용</button>
            </div>
            <div />
          </div>

          {/* 2행: (1~2열 병합) 텍스트 좌/토글 우 */}
          <div style={styles.rowMerge}>
            <div style={styles.mergeBoxBetween}>
              <span style={styles.leftText}>{priceType}</span>
              <button style={styles.iconButton} aria-label="주문유형 선택">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div />
          </div>

          {/* 3행: (1~2열 병합) - | 인풋 | + (1:3:1) */}
          <div style={styles.rowMerge}>
            <div style={styles.mergeBoxRatio}>
              <button style={styles.smallMinus} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <div style={styles.longInputBox}>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={styles.longInput}
                />
                <span style={styles.qtyUnit}>주</span>
              </div>
              <button style={styles.smallPlus} onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div />
          </div>

          {/* 4행: 체크+미수수량 | %드롭다운 | 가능 */}
          <div style={styles.row3col}>
            <label style={styles.checkCellBare}>
              <input type="checkbox" checked={useMargin} onChange={(e) => setUseMargin(e.target.checked)} />
              <span>미수수량</span>
            </label>

            <div style={{ position: 'relative' }}>
              <button style={styles.percentDropdown} onClick={() => setPercentDropdownOpen(!percentDropdownOpen)}>
                <span>{selectedPercent}%</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {percentDropdownOpen && (
                <div style={styles.percentMenu}>
                  {[100,90,80,70,60,50,40,30,20,10].map((p) => (
                    <button
                      key={p}
                      style={{ ...styles.percentOption, ...(selectedPercent === p ? styles.percentOptionActive : {}) }}
                      onClick={() => { setSelectedPercent(p); setPercentDropdownOpen(false); }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button style={styles.smallButton}>가능</button>
          </div>

          {/* 5행: (1~2열 병합) - | 가격 | +  / 3열: 시장가 */}
          <div style={styles.rowMerge}>
            <div style={styles.mergeBoxRatio}>
              <button style={styles.smallMinus} onClick={() => setPrice(price - 500)}>−</button>
              <div style={styles.longPriceBox}>
                <span style={styles.priceValue}>{price.toLocaleString()}원</span>
              </div>
              <button style={styles.smallPlus} onClick={() => setPrice(price + 500)}>+</button>
            </div>
            <button style={styles.marketButton}>시장가</button>
          </div>

          {/* 6행: (1~2열 병합) 체크+가격 자동(현재가) / 3열: 호가 */}
          <div style={styles.rowMerge}>
            <label style={{ ...styles.checkCellBare, ...styles.mergeFill }}>
              <input type="checkbox" checked={autoPrice} onChange={(e) => setAutoPrice(e.target.checked)} />
              <span>가격 자동(현재가)</span>
            </label>
            <button style={styles.smallButton}>호가</button>
          </div>

          {/* 아래로 밀기 → 8/9행이 footer와 맞닿아 보이도록 */}
          <div style={styles.bottomSpacer} />
          <div style={styles.rowEmpty} />

          {/* 8행: SOR 주문금액(= 가격 × 수량) */}
          <div style={styles.rowBottom}>
            <div style={styles.sorLabel}>SOR 주문금액</div>
            <div />
            <div style={styles.sorValue}>{(price * quantity).toLocaleString()}원</div>
          </div>

          {/* 9행: 현금매수 */}
          <div style={styles.row9}>
            <button type="button" style={styles.submitWide} onClick={handleSubmit}>현금매수</button>
          </div>
        </div>
      </div>

      {/* 확인 모달 */}
      {showConfirm && (
        <>
          <div style={styles.modalBackdrop} onClick={() => setShowConfirm(false)} />
          <div style={styles.modalWrap} role="dialog" aria-modal="true" aria-labelledby="orderConfirmTitle">
            <div style={styles.modalCard}>
              <div style={styles.modalHeader}>
                <h3 id="orderConfirmTitle" style={styles.modalTitle}>현금 매수 주문 확인</h3>
              </div>
              <div style={styles.modalDivider} />
              <div style={styles.modalTable}>
                <div style={styles.modalRow}><div style={styles.modalTh}>종목명</div><div style={styles.modalTd}>{SYMBOL}</div></div>
                <div style={styles.modalRow}><div style={styles.modalTh}>매매종류</div><div style={styles.modalTd}>{priceType}</div></div>
                <div style={styles.modalRow}><div style={styles.modalTh}>주문수량</div><div style={styles.modalTd}>{quantity.toLocaleString()}주</div></div>
                <div style={styles.modalRow}><div style={styles.modalTh}>주문가격</div><div style={{ ...styles.modalTd, background: '#fff7cc' }}>{price.toLocaleString()}원</div></div>
                <div style={styles.modalRow}><div style={styles.modalTh}>총 주문금액</div><div style={{ ...styles.modalTd, fontWeight: 700 }}>{(price * quantity).toLocaleString()}원</div></div>
                <div style={styles.modalRow}><div style={styles.modalTh}>거래소</div><div style={styles.modalTd}>SOR (스마트주문)</div></div>
              </div>
              <div style={styles.modalFooter}>
                <button style={styles.modalCancel} onClick={() => setShowConfirm(false)}>취소</button>
                <button style={styles.modalOk} onClick={handleConfirm}>확인</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 상단 토스트 */}
      {showToast && (
  <>
    {/* 위쪽: 매수 체결 */}
    <div style={styles.toastTop}>
  <span style={styles.toastTitle}>매수 체결 [KRX]</span>
  <div style={styles.toastInfoRow}>
    <span style={styles.toastSymbol}>{SYMBOL}</span>
    <span style={styles.toastPrice}>{price.toLocaleString()}원</span>
    <span style={styles.toastQty}>{quantity.toLocaleString()}주</span>
  </div>
</div>

{/* 아래쪽: 주문 완료 */}
<div style={styles.toastBottom}>
  <span style={styles.toastFooter}>KRX 매수주문이 완료되었습니다.</span>
</div>
  </>
)}
    </div>
  );
};

/* =================== 스타일 =================== */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 0,
  },

  /* 탭바 */
  tabBar: { display: 'flex', borderBottom: '1px solid #e0e0e0', flexShrink: 0 },
  tab: { flex: 1, padding: '14px 8px', border: 'none', background: '#fff', fontSize: 14, color: '#666', cursor: 'pointer', borderBottom: '2px solid transparent' },
  tabActiveBuy: { color: '#c2185b', borderBottom: '2px solid #c2185b' },
  tabActiveSell: { color: '#2196F3', borderBottom: '2px solid #2196F3' },

  /* 메인 2열 */
  mainContent: { display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' },

  /* ===== Left ===== */
  orderBookSection: {
    width: 168, maxWidth: 190, minWidth: 160,
    borderRight: '1px solid #e0e0e0',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
  },
  orderBookHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 8px',
    borderBottom: '1px solid #e0e0e0',
    flexShrink: 0,
  },
  headerLabel: { fontSize: 13, color: '#666' },
  headerLabelRight: { fontSize: 13, color: '#666', textAlign: 'right' },

  orderBook: {
    height: ROW_H * 9,              // 9행 고정 뷰
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },

  orderRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    alignItems: 'center',
    height: ROW_H,
    padding: 0,
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer',
    userSelect: 'none',
  },

  // 1열
  priceCell: {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '0 10px',
  boxSizing: 'border-box',
  transition: 'filter 120ms ease',
},
priceCellHighlight: {
  boxShadow: 'inset 0 0 0 2px #c2185b',
},
priceCellHover: { filter: 'brightness(0.96)' },                         
  bgSky:  { background: '#eef6ff' },
  bgPink: { background: '#ffdff4ff' },
  colPrice: { fontSize: 15 },
  txtUp:   { color: '#c2185b' },
  txtDown: { color: '#2196F3' },
  txtBlack:{ color: '#000' },

  // 2열
  qtyCell: {
    position: 'relative',
    height: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  qtyNumber: { position: 'relative', zIndex: 2, fontSize: 14, color: '#333' },
  qtyBarLeft: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    background: 'rgba(33,150,243,0.18)',
    zIndex: 1,
  },
  qtyBarAbove: {
  background: 'rgba(33,150,243,0.25)',  // 🔹 기존 파란색 유지 (현재가 포함 위쪽)
},
qtyBarBelow: {
  background: 'rgba(255,182,193,0.35)', // 🔹 연한 분홍 (현재가 아래쪽)
},

  /* ===== Right ===== */
  orderEntrySection: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridAutoRows: 'minmax(40px, auto)',
    gap: 8,
    alignContent: 'start',
    overflow: 'hidden',
    padding: '12px 12px 104px 12px', // 하단 패딩으로 footer와 붙어 보이게
  },

  row3col: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, alignItems: 'center' },
  rowMerge: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, alignItems: 'center' },
  mergeBox: { display: 'flex', alignItems: 'stretch' },
  mergeBoxBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', padding: '0 12px' },
  mergeBoxRatio: { display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', alignItems: 'stretch', height: 40, gap: 0 },

  cellButtonTightLeft:  { flex: 1, height: 40, border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '6px 0 0 6px', background: '#fff', fontSize: 14, cursor: 'pointer' },
  cellButtonTightRight: { flex: 1, height: 40, border: '1px solid #e0e0e0', borderRadius: '0 6px 6px 0', background: '#fff', fontSize: 14, cursor: 'pointer' },
  cellButtonActive: { border: '2px solid #000' },

  leftText: { fontSize: 14, color: '#000' },
  iconButton: { width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  smallMinus: { border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '6px 0 0 6px', background: '#fff', fontSize: 16, cursor: 'pointer' },
  smallPlus:  { border: '1px solid #e0e0e0', borderLeft: 'none', borderRadius: '0 6px 6px 0', background: '#fff', fontSize: 16, cursor: 'pointer' },
  longInputBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid #e0e0e0', background: '#fff' },
  longInput: { width: '70%', border: 'none', outline: 'none', textAlign: 'center', fontSize: 16 },
  qtyUnit: { fontSize: 14, color: '#666' },

  checkCellBare: { display: 'flex', alignItems: 'center', gap: 6, height: 40, border: 'none', background: 'transparent', padding: 0, justifyContent: 'flex-start', fontSize: 11 },

  percentDropdown: { width: '100%', height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 14, cursor: 'pointer' },
  percentMenu: { position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 20, maxHeight: 200, overflowY: 'auto', minWidth: 80 },
  percentOption: { width: '100%', padding: '8px 12px', border: 'none', background: '#fff', textAlign: 'left', fontSize: 14, cursor: 'pointer' },
  percentOptionActive: { background: '#e3f2fd', color: '#1e88e5' },

  smallButton: { height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', fontSize: 14, cursor: 'pointer' },

  longPriceBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0', background: '#fffbea' },
  priceValue: { fontSize: 16, fontWeight: 600 },
  marketButton: { height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', fontSize: 14, cursor: 'pointer' },

  mergeFill: { width: '100%' },
  bottomSpacer: { gridColumn: '1 / span 3', minHeight: 0, marginTop: 'auto' },
  rowEmpty: { gridColumn: '1 / span 3', height: 8 },

  rowBottom: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, alignItems: 'center' },
  sorLabel: { fontSize: 12, color: '#666' },
  sorValue: { fontSize: 15, color: '#c2185b', textAlign: 'right', fontWeight: 600 },

  row9: { gridColumn: '1 / span 3' },
  submitWide: { width: '100%', height: 44, border: 'none', borderRadius: 8, background: '#c2185b', color: '#fff', fontSize: 16, cursor: 'pointer' },

  /* 모달/토스트 */
  modalBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 3000 },
  modalWrap: { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3001, pointerEvents: 'none' },
  modalCard: { width: 420, maxWidth: '90%', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.2)', pointerEvents: 'auto' },
  modalHeader: { padding: '14px 16px', background: '#ffe6ea' },
  modalTitle: { margin: 0, fontSize: 18, color: '#c2185b', fontWeight: 700, textAlign: 'center' },
  modalDivider: { height: 1, background: '#e5e5e5' },
  modalTable: { padding: '12px 14px' },
  modalRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #f1f1f1' },
  modalTh: { padding: '12px 10px', background: '#fafafa', color: '#333', fontSize: 14 },
  modalTd: { padding: '12px 10px', color: '#111', fontSize: 14 },
  modalFooter: { display: 'grid', gridTemplateColumns: '1fr 1fr' },
  modalCancel: { height: 48, border: 'none', background: '#eeeeee', color: '#333', fontSize: 16, cursor: 'pointer' },
  modalOk: { height: 48, border: 'none', background: '#e36a93', color: '#fff', fontSize: 16, cursor: 'pointer' },

  toastTop: {
  position: 'fixed',
  top: 10,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 300,                  // 고정폭
  background: '#c2185b',       // 진한 분홍
  color: '#fff',
  borderRadius: 10,
  boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
  padding: '10px 12px',
  textAlign: 'left',           // 🔹 왼쪽 정렬
  fontSize: 15,
  fontWeight: 700,
  zIndex: 4000,
},
toastTitle: {
  display: 'block',
  fontSize: 15,
  fontWeight: 800,
  marginBottom: 6,             // 🔹 한 줄 띄움
},
toastInfoRow: {
  display: 'grid',
  gridTemplateColumns: '1fr auto auto', // 종목 | 가격 | 수량
  alignItems: 'center',
  columnGap: 16,               // 🔹 tab 느낌 간격
},
toastSymbol: {
  justifySelf: 'start',
  fontSize: 14,
  fontWeight: 600,
},
toastPrice: {
  justifySelf: 'center',
  fontSize: 14,
  fontWeight: 600,
},
toastQty: {
  justifySelf: 'end',
  fontSize: 14,
  fontWeight: 700,
},

// ✅ 하단 팝업
toastBottom: {
  position: 'fixed',
  bottom: 60,
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(50,50,50,0.5)', // 진한 회색 + 투명도
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  padding: '8px 14px',      // ✅ 내부 여백만 남기기
  textAlign: 'center',
  fontSize: 13,
  fontWeight: 600,
  zIndex: 4000,

  // 🔽 추가: 텍스트 길이에 맞게 박스 크기 자동 조정
  display: 'inline-block',
  width: 'auto',            // ✅ 고정폭 제거
  whiteSpace: 'nowrap',     // ✅ 줄바꿈 방지
},
};
