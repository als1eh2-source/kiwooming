// src/components/Order/OrderDisplay.tsx
// [변경] OrderDisplay 섹션이 줄어들지 않도록 flexShrink:0 추가 (크기 유지)
import React from 'react';
import { getQuoteDisplayData } from '../../Data/ChartData'; // ✅ 데이터만 교체

export const OrderDisplay: React.FC = () => {
  // ✅ 데이터 바인딩 (UI/툴/스타일 변경 없음)
  const { code, name, nxtAvailable } = getQuoteDisplayData();
  const codeText = nxtAvailable ? `${code} NXT거래가능` : code;

  const [pin, setPin] = React.useState('');
  const [showPad, setShowPad] = React.useState(false);

  const handlePadClick = (key: string) => {
    if (key === '⌫') { setPin((p) => p.slice(0, -1)); return; }
    if (key === '확인') { setShowPad(false); return; }
    if (/^\d$/.test(key) && pin.length < 4) setPin((p) => p + key);
  };
  const closePad = () => setShowPad(false);

  return (
    <div style={styles.container}>
      {/* 상단: 검색박스 + 돋보기 (왼쪽), 가격표시 (오른쪽) */}
      <div style={styles.selectorRow}>
        <div style={styles.selectorGroup}>
          <div style={styles.selectorBox}>
            <div style={styles.selectorLeft}>
              <div style={styles.favoriteIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L9 8.5L12 2Z" stroke="#666" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div style={styles.stockInfo}>
                {/* ✅ 데이터만 교체: 종목명/코드(+NXT 가능 시 문구) */}
                <span style={styles.stockName}>{name}</span>
                <div style={styles.stockDetails}>
                  <span style={styles.badgeGreen}>상장</span>
                  <span style={styles.stockCode}>{codeText}</span>
                </div>
              </div>
            </div>
            <button style={styles.dropdownButton} aria-label="종목 선택">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <button style={styles.searchButtonSquare} aria-label="검색">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#666" strokeWidth="2"/>
              <path d="M21 21L16.5 16.5" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={styles.priceSection}>
          <div style={styles.priceBox}>
            <div style={styles.priceRow}>
              <span style={styles.currentPrice}>282,000</span>
            </div>
            <div style={styles.subLine}>
              <span style={styles.subArrow}>▼</span>
              <span style={styles.subChange}>0</span>
              <span style={styles.subPercent}>0.02%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Selector */}
      <div style={styles.accountSelector}>
        <div style={styles.accountLeft}>
          <span style={styles.accountLabel}>통합</span>
          <span style={styles.redDot}>●</span>
        </div>

        <div style={styles.accountDropdownGroup}>
          <button style={styles.accountDropdown}>
            <span style={styles.accountNumber}>5244-0129 [위탁종합]</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* PIN 슬롯 */}
          <div style={styles.pinSlot} onClick={() => setShowPad(true)} role="button" aria-label="비밀번호 입력">
            <div style={styles.pinChars}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} style={styles.pinChar}>{i < pin.length ? '●' : '_'}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 숫자 키패드(선택) */}
      {showPad && (
        <>
          <div style={styles.keypadBackdrop} onClick={closePad} />
          <div style={styles.keypadSheetWrap} onMouseDown={(e) => e.preventDefault()}>
            <div style={styles.keypadSheet}>
              <div style={styles.keypadHeader}><button style={styles.closeBtn} onClick={closePad}>닫음</button></div>
              <div style={styles.keypadGrid}>
                {['1','2','3','4','5','6','7','8','9','⌫','0','확인'].map((k) => (
                  <button key={k} style={k === '확인' ? styles.keyBtnConfirmFull : styles.keyBtnFull} onClick={() => handlePadClick(k)}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: 4,
    flexShrink: 0, // [추가] 위 영역 크기 유지
  },
  /* 이하 동일 (원본 유지) */
  selectorRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  selectorGroup: { display: 'flex', alignItems: 'center', gap: 0, flex: 1, minWidth: 0 },
  selectorBox: {
    flex: 1, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '8px 0 0 8px', backgroundColor: '#fff', padding: '0 10px',
  },
  selectorLeft: { display: 'flex', alignItems: 'center', gap: 8 },
  favoriteIcon: { display: 'flex', alignItems: 'center' },
  stockInfo: { display: 'flex', flexDirection: 'column', gap: 2 },
  stockName: { fontSize: 16, color: '#000', lineHeight: 1.2 },
  stockDetails: { display: 'flex', alignItems: 'center', gap: 6 },
  badgeGreen: { fontSize: 11, color: '#4caf50', backgroundColor: 'rgba(76,175,80,0.12)', padding: '2px 6px', borderRadius: 3 },
  stockCode: { fontSize: 12, color: '#666' },
  dropdownButton: { background: 'none', border: 'none', padding: 4, cursor: 'pointer' },
  searchButtonSquare: {
    width: 40, height: 50, borderRadius: '0 8px 8px 0', border: '1px solid #e0e0e0', borderLeft: 'none',
    backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  },
  priceSection: { display: 'flex', alignItems: 'center', gap: 8 },
  priceBox: { display: 'inline-block' },
  priceRow: { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' },
  currentPrice: { fontSize: 26, fontWeight: 600, color: '#2196F3', lineHeight: 1.0 },
  subLine: { width: '100%', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6, marginTop: 2 },
  subArrow: { fontSize: 12, color: '#2196F3' },
  subChange: { fontSize: 12, color: '#2196F3' },
  subPercent: { fontSize: 12, color: '#2196F3' },

  accountSelector: { display: 'flex', alignItems: 'center', padding: '12px', gap: 12 },
  accountLeft: { display: 'flex', alignItems: 'center', gap: 6 },
  accountLabel: { fontSize: 14, color: '#000' },
  redDot: { fontSize: 8, color: '#ff4444' },

  accountDropdownGroup: { flex: 1, width: '100%', display: 'flex', alignItems: 'center', gap: 0, minWidth: 0 },
  accountDropdown: {
    flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 12px', border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '8px 0 0 8px', backgroundColor: '#fff', cursor: 'pointer',
  },
  accountNumber: { fontSize: 14, color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  pinSlot: {
    position: 'relative', height: 36, width: 110, padding: '0 10px', border: '1px solid #e0e0e0',
    borderRadius: '0 8px 8px 0', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', userSelect: 'none',
  },
  pinChars: { display: 'flex', gap: 8, fontFamily: 'monospace', letterSpacing: 2 },
  pinChar: { fontSize: 16, color: '#333' },
  keypadBackdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 3000 },
  keypadSheetWrap: { position: 'fixed', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', zIndex: 3001, pointerEvents: 'none' },
  keypadSheet: { width: 420, height: 300, background: '#fff', borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden', boxShadow: '0 -8px 24px rgba(0,0,0,0.18)', pointerEvents: 'auto' },
  keypadHeader: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: 44, padding: '0 12px', borderBottom: '1px solid #eee' },
  closeBtn: { border: 'none', background: 'none', fontSize: 14, color: '#333', cursor: 'pointer' },
  keypadGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridAutoRows: '64px', gap: 0, width: '100%' },
  keyBtnFull: { width: '100%', height: '100%', border: '1px solid #e5e5e5', borderRight: 'none', borderBottom: 'none', background: '#fff', fontSize: 18, color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  keyBtnConfirmFull: { width: '100%', height: '100%', border: '1px solid #3d4273', borderRight: 'none', borderBottom: 'none', background: '#3d4273', fontSize: 18, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
};
