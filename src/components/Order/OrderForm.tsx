// src/components/Order/OrderForm.tsx
// [변경] Left: 2열(2:1), 위 7개 파랑/아래 7개 연한빨강, 현재가 282,000 강조 + 높이 넘치면 스크롤
//        Right: 3열 그리드(요구한 1~9행 배치), 버튼/입력군은 서로 간격 없이 붙게 처리
import React from 'react';

interface OrderBookRow { price: number; quantity: number; }

const CURRENT_PRICE = 282000;

// 위로 7개(상방), 현재가, 아래로 7개(하방) = 총 15행
const makeOrderBook = (): OrderBookRow[] => {
  const rows: OrderBookRow[] = [];
  // 위로 7개 (현재가보다 높은 가격)
  for (let i = 7; i >= 1; i--) rows.push({ price: CURRENT_PRICE + i * 500, quantity: Math.floor(Math.random() * 900) + 10 });
  // 현재가
  rows.push({ price: CURRENT_PRICE, quantity: Math.floor(Math.random() * 900) + 10 });
  // 아래로 7개 (현재가보다 낮은 가격)
  for (let i = 1; i <= 7; i++) rows.push({ price: CURRENT_PRICE - i * 500, quantity: Math.floor(Math.random() * 900) + 10 });
  return rows;
};

const orderBookRows = makeOrderBook();

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

  const percentOptions = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];

  // 호가 클릭 시 가격 반영
  const onPickBook = (p: number) => setPrice(p);

  return (
    <div style={styles.container}>
      {/* 탭바 */}
      <div style={styles.tabBar}>
        {(['매수','매도','정정/취소','미체결','잔고'] as const).map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? (tab === '매수' ? styles.tabActiveBuy : styles.tabActiveSell) : {}),
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 메인 2열 레이아웃 */}
      <div style={styles.mainContent}>
        {/* Left: 2열(2:1), 높이 꽉 차고 이 영역만 스크롤 */}
        <div style={styles.orderBookSection}>
          <div style={styles.orderBookHeader}>
            <span style={styles.headerLabel}>호가</span>
            <span style={styles.redDot}>●</span>
            <span style={styles.headerLabel}>잔량</span>
          </div>

          <div style={styles.orderBook}>
            {/* 위 7개: 파랑 */}
            {orderBookRows.slice(0, 7).map((row, idx) => (
              <div key={`up-${idx}`} style={{ ...styles.orderRow, ...styles.rowBlue }} onClick={() => onPickBook(row.price)}>
                <span style={{ ...styles.colPrice, ...styles.blueText }}>{row.price.toLocaleString()}</span>
                <span style={{ ...styles.colQty, ...styles.blueText }}>{row.quantity}</span>
              </div>
            ))}

            {/* 현재가 */}
            <div style={{ ...styles.orderRow, ...styles.rowCurrent }} onClick={() => onPickBook(CURRENT_PRICE)}>
              <span style={{ ...styles.colPrice, ...styles.currentPriceText }}>{CURRENT_PRICE.toLocaleString()}</span>
              <span style={{ ...styles.colQty, ...styles.currentPriceText }}>
                {orderBookRows.find(r => r.price === CURRENT_PRICE)?.quantity ?? 0}
              </span>
            </div>

            {/* 아래 7개: 연한 빨강 */}
            {orderBookRows.slice(8).map((row, idx) => (
              <div key={`down-${idx}`} style={{ ...styles.orderRow, ...styles.rowRed }} onClick={() => onPickBook(row.price)}>
                <span style={{ ...styles.colPrice, ...styles.redText }}>{row.price.toLocaleString()}</span>
                <span style={{ ...styles.colQty, ...styles.redText }}>{row.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3열 그리드 */}
        <div style={styles.orderEntrySection}>
          {/* 1행: 현금 | 신용 — 같은 행, 서로 간격 없이 */}
          <div style={styles.row1}>
            <button
              style={{ ...styles.cellButtonTightLeft, ...(orderType === '현금' ? styles.cellButtonActive : {}) }}
              onClick={() => setOrderType('현금')}
            >
              현금
            </button>
            <button
              style={{ ...styles.cellButtonTightRight, ...(orderType === '신용' ? styles.cellButtonActive : {}) }}
              onClick={() => setOrderType('신용')}
            >
              신용
            </button>
            {/* 3열은 비움 */}
            <div />
          </div>

          {/* 2행: 보통(지정가) — 1~2열(span2) */}
          <div style={styles.row2}>
            <button style={styles.cellSpan2Button}>
              {priceType}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }}>
                <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div /> {/* 3열 비움 */}
          </div>

          {/* 3행: − | 1주 | + — 서로 간격 없이, 1~2열(span2) */}
          <div style={styles.row3}>
            <button style={styles.qtyMinus} onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <div style={styles.qtyCenter}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={styles.qtyInput}
              />
              <span style={styles.qtyUnit}>주</span>
            </div>
            <button style={styles.qtyPlus} onClick={() => setQuantity(quantity + 1)}>+</button>
            {/* 3열 비움 */}
            <div />
          </div>

          {/* 4행: 체크박스·미수수량(1열) | %드롭다운(2열) | 가능(3열) */}
          <div style={styles.row}>
            <label style={styles.checkCell}>
              <input
                type="checkbox"
                checked={useMargin}
                onChange={(e) => setUseMargin(e.target.checked)}
              />
              <span>미수수량</span>
            </label>

            <div style={{ position: 'relative' }}>
              <button
                style={styles.percentDropdown}
                onClick={() => setPercentDropdownOpen(!percentDropdownOpen)}
              >
                <span>{selectedPercent}%</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {percentDropdownOpen && (
                <div style={styles.percentMenu}>
                  {percentOptions.map((p) => (
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

          {/* 5행: −현재가+ (붙게, span2) | 3열: 시장가 */}
          <div style={styles.row5}>
            <button style={styles.priceMinus} onClick={() => setPrice(price - 500)}>−</button>
            <div style={styles.priceDisplay}>
              <span style={styles.priceValue}>{price.toLocaleString()}원</span>
            </div>
            <button style={styles.pricePlus} onClick={() => setPrice(price + 500)}>+</button>
            <button style={styles.marketButton}>시장가</button>
          </div>

          {/* 6행: 체크박스·가격 자동(span2) | 3열: 호가 */}
          <div style={styles.row}>
            <label style={styles.checkCell}>
              <input
                type="checkbox"
                checked={autoPrice}
                onChange={(e) => setAutoPrice(e.target.checked)}
              />
              <span>가격 자동(전체가)</span>
            </label>
            <div /> {/* span2 효과로 비움 */}
            <button style={styles.smallButton}>호가</button>
          </div>

          {/* 7행: 비움 */}
          <div style={styles.rowEmpty} />

          {/* 8행: 작게 — SOR 주문금액(1열) | (2열 비움) | 가격(3열) */}
          <div style={styles.row8}>
            <div style={styles.sorLabel}>SOR 주문금액</div>
            <div />
            <div style={styles.sorValue}>{(price * quantity).toLocaleString()}원</div>
          </div>

          {/* 9행: 현금매수 — 전체 가로 */}
          <div style={styles.row9}>
            <button style={styles.submitWide}>현금매수</button>
          </div>
        </div>
      </div>
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
    overflow: 'hidden',        // 폼 자체 스크롤 방지
    paddingBottom: '110px',    // Footer(IndexBar+BottomNav)와 겹침 방지(딱 붙어보임)
    minHeight: 0,
  },

  /* 탭바 */
  tabBar: { display: 'flex', borderBottom: '1px solid #e0e0e0', flexShrink: 0 },
  tab: { flex: 1, padding: '14px 8px', border: 'none', backgroundColor: '#fff', fontSize: '14px', color: '#666', cursor: 'pointer', borderBottom: '2px solid transparent' },
  tabActiveBuy: { color: '#c2185b', borderBottom: '2px solid #c2185b' },
  tabActiveSell: { color: '#2196F3', borderBottom: '2px solid #2196F3' },

  /* 메인 2열 */
  mainContent: {
    display: 'flex',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
  },

  /* Left: 2열(2:1) + 스크롤 */
  orderBookSection: {
    width: 168,
    maxWidth: 190,
    minWidth: 160,
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  orderBookHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    alignItems: 'center',
    gap: 8,
    padding: '10px 8px',
    borderBottom: '1px solid #e0e0e0',
    flexShrink: 0,
  },
  headerLabel: { fontSize: 13, color: '#666' },
  redDot: { fontSize: 8, color: '#ff4444', justifySelf: 'end' },

  orderBook: {
    flex: 1,
    overflowY: 'auto',              // Left만 스크롤
    WebkitOverflowScrolling: 'touch',
  },
  orderRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr', // 2:1
    alignItems: 'center',
    padding: '10px 10px',
    borderBottom: '1px solid #f5f5f5',
    cursor: 'pointer',
    userSelect: 'none',
  },
  colPrice: { fontSize: 15 },
  colQty: { fontSize: 14, textAlign: 'right' },

  // 색상들
  rowBlue: { backgroundColor: '#eef6ff' },
  blueText: { color: '#1e88e5' },

  rowRed: { backgroundColor: '#ffd6d6' },
  redText: { color: '#d32f2f' },

  rowCurrent: { backgroundColor: '#fff', borderTop: '1px solid #c2185b', borderBottom: '1px solid #c2185b' },
  currentPriceText: { color: '#c2185b', fontWeight: 700 },

  /* Right: 3열 그리드 */
  orderEntrySection: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridAutoRows: 'minmax(40px, auto)',
    gap: 8,
    padding: 12,
    overflow: 'hidden',  // Right는 스크롤 없음
    alignContent: 'start',
  },

  /* 1행: 현금|신용 (붙게), 3열 비움 */
  row1: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
  },
  cellButtonTightLeft: {
    gridColumn: '1 / span 1',
    height: 40,
    border: '1px solid #e0e0e0',
    borderRight: 'none',
    borderRadius: '6px 0 0 6px',
    background: '#fff',
    fontSize: 14,
    cursor: 'pointer',
  },
  cellButtonTightRight: {
    gridColumn: '2 / span 1',
    height: 40,
    border: '1px solid #e0e0e0',
    borderRadius: '0 6px 6px 0',
    background: '#fff',
    fontSize: 14,
    cursor: 'pointer',
  },
  cellButtonActive: { border: '2px solid #000' },

  /* 2행: 보통(지정가) span2 */
  row2: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
  },
  cellSpan2Button: {
    gridColumn: '1 / span 2',
    height: 40,
    border: '1px solid #e0e0e0',
    borderRadius: 6,
    background: '#fff',
    fontSize: 14,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 3행: - | 1주 | + (붙게), span2 */
  row3: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
  },
  qtyMinus: {
    gridColumn: '1 / span 1',
    height: 40,
    border: '1px solid #e0e0e0',
    borderRight: 'none',
    borderRadius: '6px 0 0 6px',
    background: '#fff',
    fontSize: 18,
    cursor: 'pointer',
  },
  qtyCenter: {
    gridColumn: '2 / span 1',
    height: 40,
    border: '1px solid #e0e0e0',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  qtyInput: { width: 60, border: 'none', outline: 'none', textAlign: 'center', fontSize: 16 },
  qtyUnit: { fontSize: 14, color: '#666' },
  qtyPlus: {
    gridColumn: '3 / span 1',
    height: 40,
    border: '1px solid #e0e0e0',
    borderLeft: 'none',
    borderRadius: '0 6px 6px 0',
    background: '#fff',
    fontSize: 18,
    cursor: 'pointer',
  },

  /* 공통 한 줄(3열) */
  row: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '10fr 1fr 1fr',
    gap: 8,
    alignItems: 'center',
  },

  /* 4행용 */
  checkCell: { display: 'flex', alignItems: 'center', gap: 6, height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', padding: '0 10px' },
  percentDropdown: { width: '100%', height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 14, cursor: 'pointer' },
  percentMenu: { position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 20, maxHeight: 200, overflowY: 'auto', minWidth: 80 },
  percentOption: { width: '100%', padding: '8px 12px', border: 'none', background: '#fff', textAlign: 'left', fontSize: 14, cursor: 'pointer' },
  percentOptionActive: { background: '#e3f2fd', color: '#1e88e5' },
  smallButton: { height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', fontSize: 14, cursor: 'pointer' },

  /* 5행: -현재가+ (붙게, span2) | 시장가(3열) */
  row5: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
    alignItems: 'stretch',
  },
  priceMinus: { height: 40, border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '6px 0 0 6px', background: '#fff', fontSize: 16, cursor: 'pointer' },
  priceDisplay: { display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0', background: '#fffbea' },
  priceValue: { fontSize: 16, fontWeight: 600 },
  pricePlus: { height: 40, border: '1px solid #e0e0e0', borderLeft: 'none', borderRadius: '0 6px 6px 0', background: '#fff', fontSize: 16, cursor: 'pointer' },
  marketButton: { height: 40, border: '1px solid #e0e0e0', borderRadius: 6, background: '#fff', fontSize: 14, cursor: 'pointer' },

  /* 6행: 가격자동(span2) | 호가(3열) */
  /* row 공용 스타일 사용 */

  /* 7행: 비움 */
  rowEmpty: { gridColumn: '1 / span 3', height: 8 },

  /* 8행: 작게 — SOR 주문금액(1열) | (2열) | 가격(3열, 우측 정렬) */
  row8: {
    gridColumn: '1 / span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 8,
    alignItems: 'center',
  },
  sorLabel: { fontSize: 13, color: '#666' },
  sorValue: { fontSize: 15, color: '#c2185b', textAlign: 'right', fontWeight: 600 },

  /* 9행: 현금매수 전체 */
  row9: { gridColumn: '1 / span 3' },
  submitWide: { width: '100%', height: 44, border: 'none', borderRadius: 8, background: '#c2185b', color: '#fff', fontSize: 16, cursor: 'pointer' },
};
