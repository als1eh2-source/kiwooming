import React, {useEffect} from 'react';
import { currentPrice, toOrderBookRows } from '../../Data/QuoteData';

interface ViewRow { price: number; quantity: number; }

const SYMBOL = '키움증권';
const ROW_H = 60; 

const book = toOrderBookRows(); 
const currentIndex = book.findIndex(r => r.price === currentPrice);
const start = Math.max(0, currentIndex - 7);       
const end   = Math.min(book.length, currentIndex + 1 + 8); 
const visibleBook = book.slice(start, end);
const orderBookRows: ViewRow[] = visibleBook.map(r => ({
  price: r.price,
  quantity: r.price >= currentPrice ? r.askQty : r.bidQty,
}));

const maxQty = Math.max(1, ...visibleBook.map(r => Math.max(r.askQty, r.bidQty)));

export const OrderForm: React.FC = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

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

      <div style={styles.mainContent}>
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

        <div style={styles.orderEntrySection}>
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
              <div /> 
            )}
          </div>

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

          <div style={styles.rowMerge}>
            <label style={{ ...styles.checkCellBare, ...styles.mergeFill }}>
              <input type="checkbox" checked={autoPrice} onChange={(e) => setAutoPrice(e.target.checked)} />
              <span>가격 자동(현재가)</span>
            </label>
            <button style={styles.smallButton}>호가</button>
          </div>

          <div style={styles.rowEmpty} />

          <div style={styles.rowBottom}>
            <div style={styles.sorLabel}>SOR 주문금액</div>
            <div />
            <div style={styles.sorValue}>{(price * quantity).toLocaleString()}원</div>
          </div>

          <div style={styles.row9}>
            <button type="button" style={styles.submitWide} onClick={handleSubmit}>현금매수</button>
          </div>
        </div>
      </div>

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

      {showToast && (
        <>
          <div style={styles.toastTop}>
            <span style={styles.toastTitle}>매수 체결 [KRX]</span>
            <div style={styles.toastInfoRow}>
              <span style={styles.toastSymbol}>{SYMBOL}</span>
              <span style={styles.toastPrice}>{(price*quantity).toLocaleString()}원</span>
              <span style={styles.toastQty}>{quantity.toLocaleString()}주</span>
            </div>
          </div>
          <div style={styles.toastBottom}>
            <span style={styles.toastFooter}>KRX 매수주문이 완료되었습니다.</span>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 0,
  },

  tabBar: { display: 'flex', borderBottom: '1px solid #e0e0e0', flexShrink: 0 },
  tab: { flex: 1, padding: '14px 8px', border: 'none', background: '#fff', fontSize: 14, color: '#666', cursor: 'pointer', borderBottom: '2px solid transparent' },
  tabActiveBuy: { color: '#c2185b', borderBottom: '2px solid #c2185b' },
  tabActiveSell: { color: '#2196F3', borderBottom: '2px solid #2196F3' },

  mainContent: { display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' },

  orderBookSection: {
    width: 168, maxWidth: 190, minWidth: 160,
    maxHeight:440,
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
    height: ROW_H * 9,             
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
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
    padding: '12px 12px 0px 12px',
  },

  row3col: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, alignItems: 'center' },
  rowMerge: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, alignItems: 'center' },
  mergeBox: { display: 'flex', alignItems: 'stretch' },
  mergeBoxBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', padding: '0 12px' },
  mergeBoxRatio: { display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', alignItems: 'stretch', height: 40, gap: 0 },

  cellButtonTightLeft:  { flex: 1, height: 40, border: '1px solid #e0e0e0', borderRadius: '6px 0 0 6px', background: '#fff', fontSize: 14, cursor: 'pointer' },
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

  rowBottom: { gridColumn: '1 / span 3', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, alignItems: 'center' },
  sorLabel: { fontSize: 12, color: '#666' },
  sorValue: { fontSize: 15, color: '#c2185b', textAlign: 'right', fontWeight: 600 },

  row9: { gridColumn: '1 / span 3', marginLeft:'-12px', marginRight:'-12px' },
  submitWide: { width: 'calc(100% + 0px)', height: 44, border: 'none', padding:10, background: '#c2185b', color: '#fff', fontSize: 16, cursor: 'pointer' },

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
