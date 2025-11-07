import React, { useState } from 'react';

/**
 * BigDataList Component
 * 
 * 빅데이터 기반 주식 리스트 컴포넌트
 * - 3개 카테고리 탭: 실시간 조회, 조회수 급증, 매매 상위
 * - 순위별 종목 표시
 * - 가격 및 등락률 표시
 */

interface StockData {
id: number;
rank: number;
name: string;
price: number;
change: number;
}

type CategoryTab = '실시간 조회' | '조회수 급증' | '매매 상위';

export const BigDataList: React.FC = () => {
const [activeTab, setActiveTab] = useState<CategoryTab>('실시간 조회');

// 카테고리별 더미 데이터
const stockDataByCategory: Record<CategoryTab, StockData[]> = {
'실시간 조회': [
    { id: 1, rank: 1, name: '삼성전자', price: 99900, change: -4.77 },
    { id: 2, rank: 2, name: 'SK하이닉스', price: 575000, change: -1.88 },
    { id: 3, rank: 3, name: '두산에너빌리티', price: 81700, change: -8.72 },
    { id: 4, rank: 4, name: 'NAVER', price: 275000, change: 3.00 },
    { id: 5, rank: 5, name: '한화솔루션', price: 28650, change: -15.24 },
],
'조회수 급증': [
    { id: 6, rank: 1, name: 'LG에너지솔루션', price: 450000, change: 5.23 },
    { id: 7, rank: 2, name: '카카오', price: 62500, change: -2.15 },
    { id: 8, rank: 3, name: '현대차', price: 246000, change: 1.85 },
    { id: 9, rank: 4, name: '기아', price: 98500, change: 2.34 },
    { id: 10, rank: 5, name: '셀트리온', price: 183000, change: -3.45 },
],
'매매 상위': [
    { id: 11, rank: 1, name: '포스코홀딩스', price: 385000, change: 4.12 },
    { id: 12, rank: 2, name: 'KB금융', price: 72300, change: 0.83 },
    { id: 13, rank: 3, name: '신한지주', price: 48950, change: -1.21 },
    { id: 14, rank: 4, name: '하나금융지주', price: 56800, change: 2.15 },
    { id: 15, rank: 5, name: 'LG화학', price: 420000, change: -2.87 },
],
};

const currentStocks = stockDataByCategory[activeTab];

const handleRefresh = () => {
console.log('Refresh clicked');
// TODO: 데이터 새로고침 로직
};

const handleExpand = () => {
console.log('Expand clicked');
// TODO: 전체보기 페이지 이동
};

const handleStockClick = (stock: StockData) => {
console.log('Stock clicked:', stock.name);
// TODO: 종목 상세 페이지 이동
};

const formatPrice = (price: number): string => {
return price.toLocaleString('ko-KR');
};

const formatChange = (change: number): string => {
const absChange = Math.abs(change);
return absChange.toFixed(2);
};

return (
<div style={styles.container}>
    {/* 헤더 영역 */}
    <div style={styles.header}>
    <h3 style={styles.title}>빅데이터</h3>
    <div style={styles.iconGroup}>
        <button
        onClick={handleRefresh}
        style={styles.iconButton}
        aria-label="새로고침"
        >
        <span style={styles.icon}>🔄</span>
        </button>
        <button
        onClick={handleExpand}
        style={styles.iconButton}
        aria-label="전체보기"
        >
        <span style={styles.icon}>→</span>
        </button>
    </div>
    </div>

    {/* 카테고리 탭 */}
    <div style={styles.tabContainer}>
    {(['실시간 조회', '조회수 급증', '매매 상위'] as CategoryTab[]).map(
        (tab) => (
        <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
            ...styles.tabButton,
            ...(activeTab === tab ? styles.activeTab : styles.inactiveTab),
            }}
        >
            {tab}
        </button>
        )
    )}
    </div>

    {/* 종목 리스트 */}
    <div style={styles.stockList}>
    {currentStocks.map((stock) => (
        <div
        key={stock.id}
        onClick={() => handleStockClick(stock)}
        style={styles.stockRow}
        >
        {/* 순위 */}
        <span style={styles.rank}>{stock.rank}</span>

        {/* 종목명 */}
        <span style={styles.stockName}>{stock.name}</span>

        {/* 가격 및 등락률 */}
        <div style={styles.priceContainer}>
            <span style={styles.price}>{formatPrice(stock.price)}</span>
            <span
            style={{
                ...styles.changeRate,
                color: stock.change >= 0 ? '#FF0000' : '#0000FF',
            }}
            >
            {stock.change >= 0 ? '▲' : '▼'} {formatChange(stock.change)}%
            </span>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: "90%",                     // 반응형 폭 (모바일 기준)
maxWidth: "420px",                // 카드 최대 폭 제한
margin: "0 auto 20px auto",       // 가운데 정렬 + 아래쪽 간격
backgroundColor: "#FFFFFF",
borderRadius: "16px",
padding: "20px 16px",
boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
boxSizing: "border-box",
},
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '16px',
},
title: {
margin: 0,
fontSize: '18px',
fontWeight: 700,
color: '#000000',
},
iconGroup: {
display: 'flex',
gap: '8px',
alignItems: 'center',
},
iconButton: {
border: 'none',
backgroundColor: 'transparent',
cursor: 'pointer',
padding: '4px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},
icon: {
fontSize: '16px',
color: '#666666',
display: 'block',
},
tabContainer: {
display: 'flex',
gap: '8px',
marginBottom: '16px',
},
tabButton: {
flex: 1,
border: 'none',
borderRadius: '20px',
padding: '10px 12px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.2s ease',
whiteSpace: 'nowrap',
},
activeTab: {
backgroundColor: '#1E2A78',
color: '#FFFFFF',
},
inactiveTab: {
backgroundColor: '#F5F5F5',
color: '#999999',
},
stockList: {
display: 'flex',
flexDirection: 'column',
gap: '14px',
},
stockRow: {
display: 'flex',
alignItems: 'center',
gap: '12px',
cursor: 'pointer',
padding: '4px 0',
},
rank: {
fontSize: '14px',
color: '#999999',
fontWeight: 500,
minWidth: '20px',
textAlign: 'center',
},
stockName: {
flex: 1,
fontSize: '14px',
color: '#000000',
fontWeight: 500,
},
priceContainer: {
display: 'flex',
flexDirection: 'column',
alignItems: 'flex-end',
gap: '4px',
},
price: {
fontSize: '14px',
color: '#000000',
fontWeight: 700,
},
changeRate: {
fontSize: '12px',
fontWeight: 600,
},
};
