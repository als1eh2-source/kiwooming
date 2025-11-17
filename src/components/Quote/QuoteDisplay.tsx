import React, { useEffect, useState } from "react";
import axios from 'axios';
import { symbol } from "d3-shape";

export const QuoteDisplay: React.FC = () => {
  const SYMBOL = "039490";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        setError(null);

        const API = process.env.REACT_APP_BACKEND_URL;
        const res = await axios.get(`${API}/quote/${SYMBOL}`);

        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("호가 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  
  if (loading) return <div style={{ padding: 20 }}>⏳ 불러오는 중…</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!data) return null;

  // 수신 데이터 가공
  const currentPrice = Math.abs(Number(data.buy_fpr_bid));
  const askQty1 = Number(data.sel_fpr_req);
  const bidQty1 = Number(data.buy_fpr_req);

  return (
    <div style={styles.container}>
      <div style={styles.selectorRow}>
        <div style={styles.selectorGroup}>
          <div style={styles.selectorBox}>
            <div style={styles.selectorLeft}>
              <div style={styles.favoriteIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15 8.5L22 9.3L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.3L9 8.5L12 2Z"
                    stroke="#666"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <div style={styles.stockInfo}>
                <span style={styles.stockName}>키움증권</span>
                <div style={styles.stockDetails}>
                  <span style={styles.badgeGreen}>상장</span>
                  <span style={styles.stockCode}>{SYMBOL}</span>
                </div>
              </div>
            </div>

            <button style={styles.dropdownButton} aria-label="종목 선택">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* 네모형 검색 버튼: 검색박스와 높이 동일, 양쪽이 맞닿도록 */}
          <button style={styles.searchButtonSquare} aria-label="검색">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#666" strokeWidth="2" />
              <path d="M21 21L16.5 16.5" stroke="#666" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* 오른쪽: 가격표시 */}
        <div style={styles.priceSection}>
          {/* priceBox를 inline-block으로 두어, 내부 가장 넓은 줄(=282,000)에 맞춰 컨테이너가 축소됨 */}
          <div style={styles.priceBox}>
            <div style={styles.priceRow}>
              <span style={styles.currentPrice}>288,000</span>
            </div>

            {/* 아래 작은 글씨 줄: 상단 텍스트(282,000)와 정확히 같은 너비 */}
            <div style={styles.subLine}>
              <span style={styles.subArrow}>▼</span>
              <span style={styles.subChange}>24,500</span>
              <span style={styles.subPercent}>0.54%</span>
            </div>
          </div>

          {/* 10단/예상: 세로로 '간격 없이' 접합 */}
          <div style={styles.badgeColumn}>
            <button style={{ ...styles.badgeTop }}>10단</button>
            <button style={{ ...styles.badgeBottom }}>예상</button>
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

  /* ===== 레이아웃 ===== */
  selectorRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  /* ===== 왼쪽: 검색 영역 ===== */
  selectorGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 0, // ← 간격 없이
    flex: 1,
    minWidth: 0,
  },

  // 검색박스(왼쪽) — 오른쪽 모서리는 0, 버튼과 연결되도록
  selectorBox: {
    flex: 1,
    minWidth: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #e0e0e0',
    borderRight: 'none', // ← 버튼과 이중 보더 제거
    borderRadius: '8px 0 0 8px', // ← 왼쪽만 라운드
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

  // 검색 버튼(오른쪽) — 왼쪽 모서리 0, 검색박스와 연결되도록
  searchButtonSquare: {
    width: 40,
    height: 50, // ← 검색박스와 동일 높이
    borderRadius: '0 8px 8px 0', // ← 오른쪽만 라운드
    border: '1px solid #e0e0e0',
    borderLeft: 'none', // ← 이중 보더 제거
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },

  /* ===== 오른쪽: 가격 영역 ===== */
  priceSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },

  // 폭을 282,000 텍스트에 '딱 맞게' 고정하기 위한 컨테이너
  priceBox: {
    display: 'inline-block', // ← 컨텐츠 너비만큼만 차지
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

  // 아래 줄(▼ 8,500  2.93%)은 priceBox의 '100% 너비' => 위 텍스트와 정확히 동일한 폭
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

  // 10단/예상: 세로로 '간격 없이' 붙이기
  badgeColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0, // ← 간격 0
  },
  badgeBase: {
    padding: '2px 8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: 12,
    cursor: 'pointer',
    lineHeight: 1.0,
  },
  badgeTop: {
    padding: '2px 2px',
    border: '1px solid #ccc',
    borderBottom: 'none', // ← 이중 보더 제거
    borderRadius: '4px 4px 0 0',
    backgroundColor: '#fff',
    fontSize: 12,
    cursor: 'pointer',
    lineHeight: 1.0,
  },
  badgeBottom: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '0 0 4px 4px',
    backgroundColor: '#fff',
    fontSize: 12,
    cursor: 'pointer',
    lineHeight: 1.0,
  },
};
