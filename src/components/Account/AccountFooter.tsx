import React from 'react';

export const AccountFooter: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('계좌');

  const tabs = [
    { id: '관심종목', label: '관심종목' },
    { id: '현재가', label: '현재가' },
    { id: '주문', label: '주문' },
    { id: '차트', label: '차트' },
    { id: '계좌', label: '계좌' },
    { id: '종목', label: '종목' },
  ];

  return (
    <>
      {/* Index Bar (footer 바로 위, 페이지 폭과 동일) */}
      <div style={styles.indexBar}>
        <span style={styles.indexName}>코스피</span>
        <span style={styles.indexValue}>4,036.08</span>
        <div style={styles.indexChange}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M7 14L12 9L17 14" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={styles.indexChangeValue}>31.66</span>
        </div>
        <span style={styles.indexPercent}>0.79%</span>
      </div>

      {/* Bottom Navigation (menu 포함) */}
      <nav style={styles.bottomNav}>
        {/* 메뉴 버튼: nav 내부 맨 왼쪽 */}
        <button style={styles.menuButtonInNav}>
          <div style={styles.menuIcon}>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
            <div style={styles.menuLine}></div>
          </div>
          <span style={styles.menuText}>메뉴</span>
        </button>

        {/* 탭 그룹: 메뉴 오른쪽으로 일렬 배치 */}
        <div style={styles.tabGroup}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.navButton,
                ...(activeTab === tab.id ? styles.navButtonActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  /** Bottom nav: 페이지 폭과 동일(최대 430px), 가운데 정렬 */
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,

    display: 'flex',
    alignItems: 'center',
    gap: 8,

    backgroundColor: '#fff',
    borderTop: '1px solid #e0e0e0',
    zIndex: 999,

    maxWidth: 430,          // 페이지 컨테이너와 동일 폭
    margin: '0 auto',       // 가운데 정렬
    padding: 8,
    boxSizing: 'border-box',
  },

  /** 탭 컨테이너: 메뉴 버튼 오른쪽 전폭 사용 */
  tabGroup: {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flex: 1,

  overflowX: 'auto',              // ← 가로 스크롤 활성화
  overflowY: 'hidden',
  whiteSpace: 'nowrap',           // ← 줄바꿈 방지
  WebkitOverflowScrolling: 'touch',

  scrollSnapType: 'x mandatory',  // ← (선택) 스냅 스크롤
  scrollbarWidth: 'none',         // ← (Firefox) 스크롤바 숨김
},

  /** nav 내부용 메뉴 버튼 (고정 해제, 왼쪽 정렬) */
  menuButtonInNav: {
    position: 'static',
    width: 56,
    height: 40,
    backgroundColor: '#a61e50ff',
    border: 'none',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
  },

  menuIcon: { display: 'flex', flexDirection: 'column', gap: 3 },
  menuLine: { width: 18, height: 2, backgroundColor: '#fff', borderRadius: 1 },
  menuText: { fontSize: 11, color: '#fff' },

  navButton: {
    flex: 1,
    padding: '10px 6px',
    border: 'none',
    backgroundColor: '#fff',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
  },
  navButtonActive: { color: '#000' },

  /** Index Bar (footer 바로 위, 페이지 폭과 동일) */
  indexBar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 54,                 // 하단 네비 바로 위에 붙도록 (nav 높이 기준)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: '8px 0',
    backgroundColor: '#f3f4f6',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    zIndex: 998,                // bottomNav(999) 바로 아래

    maxWidth: 430,              // 페이지 컨테이너와 동일 폭
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  indexName:   { fontSize: 14, color: '#000' },
  indexValue:  { fontSize: 15, color: '#ff4444' },
  indexChange: { display: 'flex', alignItems: 'center', gap: 4 },
  indexChangeValue: { fontSize: 14, color: '#ff4444' },
  indexPercent: { fontSize: 14, color: '#ff4444' },
};
