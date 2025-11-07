import React from 'react';

export const AccountSummary: React.FC = () => {
    return (
    <div style={styles.container}>
        {/* Stock Search Bar */}
        <div style={styles.searchBar}>
        <button style={styles.searchTypeButton}>유의</button>
        <input 
            type="text" 
            placeholder="5244-0129 [워탁종합] 홍용권"
            style={styles.searchInput}
            readOnly
        />
        <button style={styles.refreshButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.1031 21 18.5649 18.2543 19.6482 14.5M21 10V4M21 10H15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
        <button style={styles.searchToggleButton}>해외<br/>잔고</button>
        </div>
        <div style={styles.summaryCard}>
        {/* Total Profit/Loss */}
        <div style={styles.totalSection}>
        <span style={styles.label}>총 손익</span>
        <div style={styles.totalValues}>
            <span style={styles.lossAmount}>-505 원</span>
            <div style={styles.percentContainer}>
            <span style={styles.lossPercent}>-0.18%</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 14L12 9L17 14" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
        </div>
        </div>

        {/* Summary Grid */}
        <div style={styles.summaryGrid}>
        <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>총 매입</span>
            <span style={styles.summaryValue}>283,500</span>
        </div>
        <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>총 평가</span>
            <span style={styles.summaryValue}>283,500</span>
        </div>
        <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>실현손익</span>
            <span style={styles.summaryValue}>0</span>
        </div>
        <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>추정자산</span>
            <div style={styles.summaryValueWithIcon}>
            <span style={styles.summaryValue}>0</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12H20M12 4V20" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            </div>
        </div>
        </div>

        {/* MY랭킹 Section */}
        <div style={styles.rankingSection}>
        <span style={styles.rankingText}>MY랭킹</span>
        <span style={styles.rankingDesc}>월 수익률 순위 조회 (키움전체)</span>
        <button style={styles.refreshIconButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 10C21 10 18.995 7.26822 17.3662 5.63824C15.7373 4.00827 13.4864 3 11 3C6.02944 3 2 7.02944 2 12C2 16.9706 6.02944 21 11 21C15.1031 21 18.5649 18.2543 19.6482 14.5M21 10V4M21 10H15" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
        </div>
        </div>
        {/* Action Buttons */}
        <div style={styles.actionButtons}>
        <button style={styles.actionButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2"/>
            <path d="M9 3V21M15 3V21M3 9H21M3 15H21" stroke="#666" strokeWidth="2"/>
            </svg>
            계산기
        </button>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 0, marginLeft: 'auto' }}>
  <button style={{...styles.actionButton, ...styles.actionButtonPrimary}}>
      융자별
  </button>
  <button style={styles.actionButton}>융자합</button>
</div>
        <button style={{ ...styles.actionButtonBadge, marginLeft: 'auto' }}>
    2줄
    <span style={styles.badge}>●</span>
  </button>
        </div>
    </div>
    );
    };

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    padding: '0',
  },
  searchBar: {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
  },
  searchTypeButton: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  searchInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  refreshButton: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchToggleButton: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '12px',
    lineHeight: '1.2',
    cursor: 'pointer',
  },
  totalSection: {
    padding: '16px 12px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '15px',
    color: '#333',
  },
  totalValues: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  lossAmount: {
    fontSize: '20px',
    color: '#2196F3',
  },
  percentContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  summaryCard: {
    margin: '12px',               // 바깥 여백
    backgroundColor: '#fff',      // 카드 배경
    border: '1px solid #e5e7eb',  // 테두리
    borderRadius: '12px',         // 라운드
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    overflow: 'hidden',           // 둥근모서리 안쪽 자식도 클리핑
  },
  lossPercent: {
    fontSize: '16px',
    color: '#2196F3',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '16px 12px',
    gap: '16px',
    borderBottom: '1px solid #e0e0e0',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#666',
  },
  summaryValue: {
    fontSize: '16px',
    color: '#000',
  },
  summaryValueWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  rankingSection: {
    padding: '12px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rankingText: {
    fontSize: '14px',
    color: '#000',
  },
  rankingDesc: {
    fontSize: '13px',
    color: '#666',
    flex: 1,
  },
  refreshIconButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    justifyContent: 'space-between',   // [추가] ← 이 한 줄이 핵심
  alignItems: 'center',
  },
  actionGroup: {
  display: 'flex',
  gap: 0,                 // 버튼 사이 간격 0 → 붙어서 보임
},
  actionButton: {
  /* flex: 1,  ← [삭제] 좌우로 늘어나지 않게 */
  padding: '8px 10px',    // ↓ 기존 10px 12px 에서 소폭 축소
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#fff',
  fontSize: '13px',       // ↓ 기존 14px 에서 소폭 축소
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  position: 'relative',
},
  actionButtonPrimary: {
    border: '1px solid #2196F3',
    color: '#2196F3',
  },
  actionButtonBadge: {
    padding: '8px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    position: 'relative',
  },
  badge: {
    color: '#ff4444',
    fontSize: '8px',
    position: 'absolute',
    top: '4px',
    right: '4px',
  },
};
