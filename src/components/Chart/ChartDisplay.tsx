import React from 'react';
import { ChartData } from '../../Data/ChartData';

interface StkData {
  dt: string;       // 날짜
  stk_cd: string;   // 종목코드
  cur_prc: number;  // 종가
  pred_pre: String; //전일 대비 가격 변동
  trde_tern_rt: String; //변동률
}

const rawData = ChartData.stk_dt_pole_chart_qry;

const stockInfo: StkData[] = rawData.map((item: any) => ({
  dt: item.dt,
  stk_cd: String(ChartData.stk_cd),
  cur_prc: Number(item.cur_prc),
  pred_pre: String(item.pred_pre), //전일 대비 가격 변동
  trde_tern_rt: String(item.trde_tern_rt) //변동률
}));


export const ChartDisplay: React.FC = () => {
  return (
    <div style={styles.container}>
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
                <span style={styles.stockName}>키움증권</span>
                <div style={styles.stockDetails}>
                  <span style={styles.badgeGreen}>상장</span>
                  <span style={styles.stockCode}>{stockInfo[0]?.stk_cd} NXT거래가능</span>
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
              <span style={styles.currentPrice}>{stockInfo[0].cur_prc.toLocaleString()}</span>
            </div>

            <div style={styles.subLine}>
              <span style={styles.subArrow}>{Number(stockInfo[0].pred_pre)>=0? '▲':'▼'}</span>
              <span style={styles.subChange}>{stockInfo[0].pred_pre}</span>
              <span style={styles.subPercent}>{stockInfo[0].trde_tern_rt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: 4,
  },

  selectorRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  selectorGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,               
    flex: 1,
    minWidth: 0,
  },

  selectorBox: {
    flex: 1,
    minWidth: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #e0e0e0',
    borderRight: 'none',                      
    borderRadius: '8px 0 0 8px',             
    backgroundColor: '#fff',
    padding: '0 10px',
    boxSizing: 'border-box',
  },
  selectorLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  favoriteIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center' },

  stockInfo: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 },
  stockName: { fontSize: 16, color: '#000', lineHeight: 1.2 },
  stockDetails: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'nowrap' },

  badgeGreen: {
    fontSize: 11,
    color: '#4caf50',
    backgroundColor: 'rgba(76,175,80,0.12)',
    padding: '2px 6px',
    borderRadius: 3,
  },
  stockCode: { fontSize: 12, color: '#666' },

  dropdownButton: {
    background: 'none',
    border: 'none',
    padding: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonSquare: {
    width: 40,
    height: 50,                                  
    borderRadius: '0 8px 8px 0',                 
    border: '1px solid #e0e0e0',
    borderLeft: 'none',                          
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },

  priceBox: {
    display: 'inline-block', 
  },

  priceRow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  currentPrice: {
    fontSize: 26,
    fontWeight: 600,
    color: '#2196F3',
    lineHeight: 1.0,
  },

  subLine: {
    width: '100%',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 6,
    marginTop: 2,
  },
  subArrow: {
    fontSize: 12,
    color: '#2196F3',
  },
  subChange: {
    fontSize: 12,
    color: '#2196F3',
  },
  subPercent: {
    fontSize: 12,
    color: '#2196F3',
  },
};
