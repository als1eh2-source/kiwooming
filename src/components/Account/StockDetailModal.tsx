import React from 'react';

interface StockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('메도');

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <span style={styles.stockCode}>039490</span>
            <span style={styles.stockName}>코스피 / 증권</span>
            <span style={styles.stockTitle}>NXT거래가능</span>
          </div>
          <button style={styles.favoriteButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#ffa726"/>
            </svg>
            <span style={styles.favoriteText}>종목독</span>
          </button>
        </div>

        {/* Action Tabs */}
        <div style={styles.actionTabs}>
          <button style={styles.actionTab}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L9 8.5L12 2Z" stroke="#666" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            관심
          </button>
          <button style={styles.actionTab}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2"/>
              <path d="M8 3V7M16 3V7M3 10H21" stroke="#666" strokeWidth="2"/>
            </svg>
            메모
          </button>
          <button style={styles.actionTab}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 17H20L18.595 15.595M3 15L6 12M21 12L18 9M9 5H4L5.405 6.405M12 3C16.9706 3 21 7.02944 21 12M12 21C7.02944 21 3 16.9706 3 12" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            알림
          </button>
          <button style={styles.actionTab}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2"/>
              <path d="M9 3V21M15 3V21M3 9H21M3 15H21" stroke="#666" strokeWidth="2"/>
            </svg>
            계산기
          </button>
          <button style={{...styles.actionTab, ...styles.actionTabActive}}>
            종목홈
          </button>
        </div>

        {/* Stock Info */}
        <div style={styles.stockInfo}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>시총</span>
            <span style={styles.infoValue}>75,037억</span>
            <span style={styles.infoLabel}>증거금률</span>
            <span style={styles.infoValue}>20%</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>신용 A균, 대출 A균, 대주 A균</span>
            <span style={styles.ratingValue}>신용비율</span>
            <span style={styles.infoValue}>0.42%</span>
          </div>
          <div style={styles.indicatorLine}></div>
        </div>

        {/* Bottom Tabs */}
        <div style={styles.bottomTabs}>
          <button 
            style={styles.bottomTab}
            onClick={() => setActiveTab('호가')}
          >
            호가
          </button>
          <button 
            style={styles.bottomTab}
            onClick={() => setActiveTab('차트')}
          >
            차트
          </button>
          <button 
            style={styles.bottomTab}
            onClick={() => setActiveTab('뉴스')}
          >
            뉴스
          </button>
          <button 
            style={{...styles.bottomTab, ...styles.bottomTabActive}}
            onClick={() => setActiveTab('메도')}
          >
            메도
          </button>
          <button 
            style={{...styles.bottomTab, ...styles.bottomTabBuy}}
            onClick={() => setActiveTab('매수')}
          >
            매수
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'flex-end',
  },
  modal: {
    width: '100%',
    maxHeight: '70vh',
    backgroundColor: '#fff',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    overflow: 'auto',
  },
  header: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid #e0e0e0',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stockCode: {
    fontSize: '13px',
    color: '#666',
  },
  stockName: {
    fontSize: '13px',
    color: '#666',
  },
  stockTitle: {
    fontSize: '15px',
    color: '#000',
  },
  favoriteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    border: 'none',
    backgroundColor: '#fff',
    borderRadius: '16px',
    cursor: 'pointer',
  },
  favoriteText: {
    fontSize: '13px',
    color: '#000',
  },
  actionTabs: {
    display: 'flex',
    padding: '12px',
    gap: '8px',
    borderBottom: '1px solid #e0e0e0',
    overflowX: 'auto',
  },
  actionTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#666',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  actionTabActive: {
    backgroundColor: '#3d4273',
    color: '#fff',
    border: '1px solid #3d4273',
  },
  stockInfo: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#666',
  },
  infoValue: {
    fontSize: '13px',
    color: '#000',
  },
  ratingValue: {
    fontSize: '13px',
    color: '#000',
  },
  indicatorLine: {
    height: '3px',
    backgroundColor: '#ff4444',
    borderRadius: '2px',
    width: '60%',
  },
  bottomTabs: {
    display: 'flex',
    borderTop: '1px solid #e0e0e0',
  },
  bottomTab: {
    flex: 1,
    padding: '16px 12px',
    border: 'none',
    backgroundColor: '#f5f5f5',
    fontSize: '14px',
    color: '#666',
    cursor: 'pointer',
    borderRight: '1px solid #fff',
  },
  bottomTabActive: {
    backgroundColor: '#5468b5',
    color: '#fff',
  },
  bottomTabBuy: {
    backgroundColor: '#e57373',
    color: '#fff',
  },
};

