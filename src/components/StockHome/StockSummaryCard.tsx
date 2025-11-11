import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stock_home } from '../../Data/StockHome';
import {
AreaChart,
Area,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
CartesianGrid,
} from 'recharts';

export const StockSummaryCard: React.FC = () => {
const [isFavorite, setIsFavorite] = useState(false);
const navigate = useNavigate();

// ✅ 최근 1개월 데이터 필터
const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

const chartData = stock_home.stk_dt_pole_chart_qry
    .filter((d) => {
    const dateStr = d.dt;
    const dateObj = new Date(
        parseInt(dateStr.slice(0, 4)),
        parseInt(dateStr.slice(4, 6)) - 1,
        parseInt(dateStr.slice(6, 8))
    );
    return dateObj >= oneMonthAgo;
    })
    .reverse()
    .map((d) => ({
    date: `${d.dt.slice(4, 6)}/${d.dt.slice(6, 8)}`,
    price: Number(d.cur_prc),
    change: Number(d.pred_pre),
    rate: parseFloat(d.trde_tern_rt.replace('+', '')),
    }));

// ✅ 최신 vs 한 달 전 비교
const latest = chartData[chartData.length - 1];
const oldest = chartData[0];
const termChange = ((latest.price - oldest.price) / oldest.price) * 100;

const stock = {
    name: '키움증권',
    code: stock_home.stk_cd,
    market: 'KOSPI',
    category: 'NXT거래가능',
    price: latest.price,
    change: latest.change,
    rate: latest.rate,
    baseDate: latest.date,
    termChange: Number(termChange.toFixed(2)), // 자동 계산된 상승률
};

const handleFavoriteToggle = () => setIsFavorite(!isFavorite);
const formatPrice = (p: number) => p.toLocaleString('ko-KR');

const bottomTabs = [
    { id: 1, icon: '💬', label: '종목톡' },
    { id: 2, icon: '📊', label: '호가' },
    { id: 3, icon: '📈', label: '차트' },
    { id: 4, icon: '🔁', label: '주문' },
];

const handleTabClick = (label: string) => {
    if (label === '호가') navigate('/quote');
    else if (label === '차트') navigate('/chart');
    else if (label === '주문') navigate('/order');
};

return (
    <div style={styles.outerBox}>
    <div style={styles.container}>
        {/* 상단 설명 */}
        <div style={styles.headerSection}>
        <span style={styles.captionText}>
            통합 | {stock.code} {stock.market} | {stock.category}
        </span>
        </div>

        {/* 종목명 + 가격 + 변동률 */}
        <div style={styles.namePriceColumn}>
        <div style={styles.nameRow}>
            <button onClick={handleFavoriteToggle} style={styles.favoriteButton}>
            <span style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</span>
            </button>
            <h2 style={styles.stockName}>{stock.name}</h2>
        </div>

        <div style={styles.priceColumn}>
            <div style={styles.mainPrice}>{formatPrice(stock.price)}</div>
            <div
            style={{
                ...styles.changeText,
                color: stock.change >= 0 ? '#D32F2F' : '#1976D2',
            }}
            >
            {stock.change >= 0 ? '▲' : '▼'} {formatPrice(Math.abs(stock.change))} {Math.abs(stock.rate)}%
            </div>
        </div>
        </div>

        {/* ✅ 부드러운 면 그래프 */}
        <div style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
            <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F48FB1" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
                </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis hide domain={['dataMin - 2000', 'dataMax + 2000']} />
            <Tooltip formatter={(v: number) => `${v.toLocaleString()}원`} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Area
                type="monotone"
                dataKey="price"
                stroke="#E91E63"
                strokeWidth={2}
                fill="url(#colorPrice)"
            />
            </AreaChart>
        </ResponsiveContainer>
        </div>

        <div style={styles.chartLabel}>
        기준 : 25.{stock.baseDate}, 일봉(1개월)
        </div>

        {/* ✅ 기간 및 상승률 문구 */}
        <div style={styles.periodSummary}>
        <div style={styles.periodLabel}>
            지난{' '}
            <span style={styles.periodUnderline}>
            1개월 <span style={styles.smallArrow}>▼</span>
            </span>{' '}
            전보다{' '}
            <span
            style={{
                ...styles.termChangeValue,
                color: stock.termChange >= 0 ? '#E91E63' : '#1976D2',
            }}
            >
            {Math.abs(stock.termChange).toFixed(2)}%{' '}
            {stock.termChange >= 0 ? '상승' : '하락'}
            </span>
            했어요
        </div>
        </div>

        {/* 하단 탭 */}
        <div style={styles.bottomNavTabs}>
        {bottomTabs.map((tab) => (
            <button
            key={tab.id}
            onClick={() => handleTabClick(tab.label)}
            style={styles.navTabButton}
            >
            <span style={styles.tabIcon}>{tab.icon}</span>
            <span style={styles.tabLabel}>{tab.label}</span>
            </button>
        ))}
        </div>
    </div>
    </div>
);
};

// ✅ 스타일
const styles: { [key: string]: React.CSSProperties } = {
outerBox: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '16px',
    boxSizing: 'border-box',
},
container: { fontFamily: 'Noto Sans KR, sans-serif' },
headerSection: { marginBottom: '8px' },
captionText: { fontSize: '12px', color: '#757575' },

// 🔹 종목명 + 가격 + 변동률
namePriceColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '10px',
},
nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '2px',
},
stockName: { fontSize: '18px', fontWeight: 700, margin: 0 },
priceColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: 1.2,
},
mainPrice: { fontSize: '36px', fontWeight: 800, color: '#1976D2' },
changeText: { fontSize: '15px', fontWeight: 600, marginTop: '4px' },

// 🔹 그래프 + 하단 문구
chartLabel: {
    fontSize: '12px',
    color: '#757575',
    textAlign: 'right',
    marginTop: '6px',
},
periodSummary: {
    marginTop: '10px',
    marginBottom: '8px',
    fontSize: '14px',
    textAlign: 'left',
},
periodLabel: { color: '#111' },
periodUnderline: {
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '1.5px',
},
smallArrow: {
    fontSize: '11px',
    position: 'relative',
    top: '-1px',
    marginLeft: '2px',
},
termChangeValue: { fontWeight: 700 },

// 🔹 하단 탭
bottomNavTabs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: '1px solid #E0E0E0',
    paddingTop: '12px',
    marginTop: '8px',
},
navTabButton: {
    background: 'none',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
},
tabIcon: { fontSize: '20px' },
tabLabel: { fontSize: '13px', marginTop: '2px' },
favoriteButton: {
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: 0,
},
favoriteIcon: { fontSize: '20px' },
};
