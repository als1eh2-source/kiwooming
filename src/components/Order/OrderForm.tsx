// src/components/Order/OrderForm.tsx
import React from 'react';
import { currentPrice, toOrderBookRows } from '../../Data/QuoteData';

interface ViewRow { price: number; quantity: number; }

const SYMBOL = '키움증권';
const ROW_H = 60; // 왼쪽 호가 리스트 한 행 고정 높이(약 9행 고정 뷰)

// === QuoteData 연동: 호가/잔량 로딩 ===
const book = toOrderBookRows(); // [{ price, askQty, bidQty }]
// 현재가 포함 위쪽(매도)은 askQty, 아래쪽(매수)은 bidQty 사용
const currentIndex = book.findIndex(r => r.price === currentPrice);
const start = Math.max(0, currentIndex - 7);               // 위로 7개
const end   = Math.min(book.length, currentIndex + 1 + 8);  // (현재가 포함) + 아래로 8개
const visibleBook = book.slice(start, end);
const orderBookRows: ViewRow[] = visibleBook.map(r => ({
  price: r.price,
  quantity: r.price >= currentPrice ? r.askQty : r.bidQty,
}));

// 막대 비율 산정도 화면에 보이는 구간 기준으로
const maxQty = Math.max(1, ...visibleBook.map(r => Math.max(r.askQty, r.bidQty)));

export const OrderForm: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'매수'|'매도'|'정정/취소'|'미체결'|'잔고'>('매수');
  const [orderType, setOrderType] = React.useState<'현금'|'신용'>('현금');
  const [priceType] = React.useState('보통(지정가)');
  const [quantity, setQuantity] = React.useState(1);
  const [price, setPrice] = React.useState(currentPrice);
  const [useMargin, setUseMargin] = React.useState(false);
  const [autoPrice, setAutoPrice] = React.useState(false);
  const [percentDropdownOpen, setPercentDropdownOpen] = React.useState(false);
  const [selectedPercent, setSelectedPercent] = React.useState(100);

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [hoverPrice, setHoverPrice] = React.useState<number | null>(null);

  // ✅ [추가] 신용 클릭 시에만 노출되는 3열 드롭다운 상태
  const [creditOpen, setCreditOpen] = React.useState(false);
  const [creditType, setCreditType] = React.useState<'융자' | '대주상환'>('융자');

  const onPickBook = (p: number) => setPrice(p);
  const handleSubmit = () => setShowConfirm(true);
  const handleConfirm = () => {
    setShowConfirm(false);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2000);
  };

  const rowBg1stCol = (p: number): React.CSSProperties => (p >= currentPrice ? styles.bgSky : styles.bgPink);
  const priceColor = (p: number): React.CSSProperties =>
    p === currentPrice ? styles.txtBlack : (p > currentPrice ? styles.txtUp : styles.txtDown);

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
        {/* Left: 2:1, 왼쪽만 스크롤 — QuoteData 기반 호가/잔량 */}
        <div style={styles.orderBookSection}>
          <div style={styles.orderBookHeader}>
            <span style={styles.headerLabel}>호가</span>
            <span style={styles.headerLabelRight}>잔량</span>
          </div>

          <div style={styles.orderBook}>
            {orderBookRows.map((row) => {
              const isCurrent = row.price === currentPrice;
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
                        ...(row.price >= currentPrice ? styles.qtyBarAbove : styles.qtyBarBelow),
                        width: `${Math.min(1, barWidth) * 100}%`,
                      }}
                    />
                    <span style={styles.qtyNumber}>{row.quantity.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 3열 그리드 (기존 레이아웃/툴 유지) */}
        <div style={styles.orderEntrySection}>
          {/* 1행: (1~2열 병합) 현금|신용 + 3열 조건부 드롭다운 */}
          <div style={styles.rowMerge}>
            <div style={styles.mergeBox}>
              <button
                style={{ ...styles.cellButtonTightLeft, ...(orderType === '현금' ? styles.cellButtonActive : {}) }}
                onClick={() => { setOrderType('현금'); setCreditOpen(false); }}
              >현금</button>
              <button
                style={{ ...styles.cellButtonTightRight, ...(orderType === '신용' ? styles.cellButtonActive : {}) }}
                onClick={() => setOrderType('신용')}
              >신용</button>
            </div>

            {/* ✅ 신용일 때만 3열에 '융자/대주상환' 드롭다운 표시 */}
            {orderType === '신용' ? (
              <div style={{ position: 'relative' }}>
                <button
                  style={styles.percentDropdown}
                  onClick={() => setCreditOpen(!creditOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={creditOpen}
                >
                  <span>{creditType}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {creditOpen && (
                  <div style={styles.percentMenu} role="listbox">
                    {(['융자', '대주상환'] as const).map(opt => (
                      <button
                        key={opt}
                        style={{ ...styles.percentOption, ...(creditType === opt ? styles.percentOptionActive : {}) }}
                        onClick={() => { setCreditType(opt); setCreditOpen(false); }}
                        role="option"
                        aria-selected={creditType === opt}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div />  /* 현금일 때는 기존과 동일하게 빈칸 */
            )}
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

          {/* 5행: (1~2열 병합) - | 가격(클릭 반영) | +  / 3열: 시장가 */}
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

      {/* 확인 모달 (showConfirm) */}
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

      {/* 상단/하단 토스트 */}
      {showToast && (
        <>
          {/* 위쪽: 매수 체결 */}
          <div style={styles.toastTop}>
            <span style={styles.toastTitle}>매수 체결 [KRX]</span>
            <div style={styles.toastInfoRow}>
              <span style={styles.toastSymbol}>{SYMBOL}</span>
              <span style={styles.toastPrice}>{(price*quantity).toLocaleString()}원</span>
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

/* =================== 스타일 (기존 유지) =================== */
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
  priceCellHighlight: { boxShadow: 'inset 0 0 0 2px #c2185b' },
  priceCellHover: { filter: 'brightness(0.96)' },
  bgSky:  { background: '#eef6ff' },
  bgPink: { background: 'rgba(255,82,82,0.06)' },
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
  qtyBarLeft: { position: 'absolute', left: 0, top: 0, bottom: 0, background: 'rgba(33,150,243,0.18)', zIndex: 1 },
  qtyBarAbove: { background: 'rgba(33,150,243,0.25)' },
  qtyBarBelow: { background: 'rgba(255,182,193,0.35)' },

  /* ===== Right ===== */
  orderEntrySection: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridAutoRows: 'minmax(40px, auto)',
    gap: 8,
    alignContent: 'start',
    overflow: 'hidden',
    padding: '12px 12px 104px 12px',
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
    width: 300,
    background: '#c2185b',
    color: '#fff',
    borderRadius: 10,
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    padding: '10px 12px',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 700,
    zIndex: 4000,
  },
  toastTitle: { display: 'block', fontSize: 15, fontWeight: 800, marginBottom: 6 },
  toastInfoRow: { display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', columnGap: 16 },
  toastSymbol: { justifySelf: 'start', fontSize: 14, fontWeight: 600 },
  toastPrice: { justifySelf: 'center', fontSize: 14, fontWeight: 600 },
  toastQty: { justifySelf: 'end', fontSize: 14, fontWeight: 700 },
  toastBottom: {
    position: 'fixed',
    bottom: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(50,50,50,0.5)',
    color: '#fff',
    borderRadius: 12,
    padding: '8px 14px',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 600,
    zIndex: 4000,
    display: 'inline-block',
    width: 'auto',
    whiteSpace: 'nowrap',
  },
  toastFooter: { fontSize: 13, fontWeight: 600, color: '#fff' },
};
