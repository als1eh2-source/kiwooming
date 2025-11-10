import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

interface StockData {
name: string;
code: string;
market: string;
category: string;
price: number;
change: number;
rate: number;
termChange: number;
baseDate: string;
chartType: string;
}

interface TabItem {
id: number;
icon: string;
label: string;
}

export const StockSummaryCard: React.FC = () => {
const [isFavorite, setIsFavorite] = useState<boolean>(false);
const [selectedPeriod, setSelectedPeriod] = useState<string>('지난 1개월');
const navigate = useNavigate(); 

// 더미
const stock: StockData = {
name: '키움증권',
code: '039490',
market: 'KOSPI',
category: 'NXT거래가능',
price: 282000,
change: -8500,
rate: -2.93,
termChange: 12.13,
baseDate: '25.10.10',
chartType: '일봉(1개월)',
};

const periods = ['지난 1주일', '지난 1개월', '지난 3개월', '지난 6개월', '지난 1년'];

const bottomTabs: TabItem[] = [
{ id: 1, icon: '🗨️', label: '종목톡' },
{ id: 2, icon: '📊', label: '호가' },
{ id: 3, icon: '📈', label: '차트' },
{ id: 4, icon: '🔁', label: '주문' },
];

const formatPrice = (price: number): string => price.toLocaleString('ko-KR');

const handleFavoriteToggle = () => setIsFavorite(!isFavorite);

const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
setSelectedPeriod(e.target.value);
};

// 탭 클릭 시 페이지 이동
const handleTabClick = (tab: TabItem) => {
console.log('Tab clicked:', tab.label);
if (tab.label === '호가') navigate('/quote');
else if (tab.label === '차트') navigate('/chart');
else if (tab.label === '주문') navigate('/order');
};

return (
<div style={styles.outerBox}>
<div style={styles.container}>
    {/* 1️⃣ Header Section */}
    <div style={styles.headerSection}>
    <div style={styles.captionRow}>
        <span style={styles.captionText}>
        통합 | {stock.code} {stock.market} | {stock.category}
        </span>
    </div>
    <div style={styles.nameRow}>
        <button onClick={handleFavoriteToggle} style={styles.favoriteButton}>
        <span style={styles.favoriteIcon}>{isFavorite ? '⭐' : '☆'}</span>
        </button>
        <h2 style={styles.stockName}>{stock.name}</h2>
    </div>
    </div>

    {/* 2️⃣ 가격 + 차트 영역 */}
    <div style={styles.priceChartSection}>
    <div style={styles.priceArea}>
        <div style={styles.mainPrice}>{formatPrice(stock.price)}</div>
        <div style={styles.changeArea}>
        <span
            style={{
            ...styles.changeText,
            color: stock.change >= 0 ? '#D32F2F' : '#1976D2',
            }}
        >
            {stock.change >= 0 ? '▲' : '▼'} {formatPrice(Math.abs(stock.change))} {Math.abs(stock.rate)}%
        </span>
        </div>
    </div>

    {/* 미니 차트 복구 */}
    <div style={styles.chartArea}>
        <div style={styles.chartPlaceholder}></div>
        <div style={styles.chartLabel}>
        기준: {stock.baseDate}, {stock.chartType}
        </div>
    </div>
    </div>

    {/*기간 요약 영역 */}
    <div style={styles.periodSummarySection}>
    <div style={styles.periodDropdownWrapper}>
        <select
        value={selectedPeriod}
        onChange={handlePeriodChange}
        style={styles.periodDropdown}
        >
        {periods.map((period) => (
            <option key={period} value={period}>
            {period}
            </option>
        ))}
        </select>
        <span style={styles.dropdownArrow}>▼</span>
    </div>

    <div style={styles.termChangeText}>
        전보다 <span style={styles.termChangeValue}>{stock.termChange}% 상승했어요</span>
    </div>
    </div>

    {/* 하단 탭 메뉴 */}
    <div style={styles.bottomNavTabs}>
    {bottomTabs.map((tab) => (
        <button
        key={tab.id}
        onClick={() => handleTabClick(tab)}
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

const styles: { [key: string]: React.CSSProperties } = {
outerBox: {
padding: '10px 10px',
backgroundColor: '#FFFFFF',
width: '100%',
boxSizing: 'border-box',
borderRadius: '4px',
},
container: {
backgroundColor: "#FFFFFF",
borderRadius: "4px",
boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05)",
padding: "16px",
margin: "10px 0",
fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},
headerSection: {
display: 'flex',
flexDirection: 'column',
marginBottom: '16px',
},
captionRow: { marginBottom: '6px' },
captionText: { fontSize: '12px', color: '#757575', fontWeight: 400 },
nameRow: { display: 'flex', alignItems: 'center', gap: '8px' },
favoriteButton: {
border: 'none',
backgroundColor: 'transparent',
cursor: 'pointer',
padding: '0',
display: 'flex',
alignItems: 'center',
},
favoriteIcon: { fontSize: '20px' },
stockName: { margin: 0, fontSize: '18px', fontWeight: 700, color: '#000' },
priceChartSection: {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
marginBottom: '16px',
},
priceArea: { textAlign: 'center', marginBottom: '8px' },
mainPrice: {
fontSize: '28px',
fontWeight: 700,
color: '#1E2A78',
marginBottom: '4px',
},
changeArea: { display: 'flex', justifyContent: 'center' },
changeText: { fontSize: '14px', fontWeight: 600 },
chartArea: { width: '100%', marginTop: '8px' },
chartPlaceholder: {
width: '100%',
height: '120px',
background: 'linear-gradient(90deg, #BBDEFB 0%, #F8BBD0 100%)',
borderRadius: '8px',
marginBottom: '4px',
},
chartLabel: { fontSize: '11px', color: '#757575', textAlign: 'right' },

periodSummarySection: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '16px',
paddingBottom: '12px',
},
periodDropdownWrapper: {
position: 'relative',
display: 'inline-flex',
alignItems: 'center',
},
periodDropdown: {
border: 'none',
backgroundColor: 'transparent',
fontSize: '14px',
fontWeight: 600,
color: '#333',
cursor: 'pointer',
paddingRight: '18px',
appearance: 'none',
outline: 'none',
},
dropdownArrow: {
position: 'absolute',
right: '0',
fontSize: '10px',
color: '#666',
pointerEvents: 'none',
},
termChangeText: { fontSize: '13px', color: '#333', fontWeight: 400 },
termChangeValue: { fontWeight: 700, color: '#D32F2F' },

bottomNavTabs: {
display: 'grid',
gridTemplateColumns: 'repeat(4, 1fr)',
borderTop: '1px solid #E5E7EB',
paddingTop: '12px',
},
navTabButton: {
border: 'none',
backgroundColor: 'transparent',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
gap: '6px',
cursor: 'pointer',
padding: '8px 4px',
},
tabIcon: { fontSize: '20px' },
tabLabel: { fontSize: '13px', color: '#333', fontWeight: 500 },
};
