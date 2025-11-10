import React, { useState } from 'react';

/**
 * RankingList Component
 *
 * 순위 검색 섹션
 * - 4개 카테고리 탭: 상승률, 하락률, 거래량 상위, 섹터 상위
 * - 순위별 종목 표시 (가로 레이아웃)
 * - 가격 및 등락률 표시
 */

interface RankingData {
id: number;
rank: number;
name: string;
price: number;
change: number;
}

type RankingTab = '상승률' | '하락률' | '거래량 상위' | '섹터 상위';

export const RankingList: React.FC = () => {
const [activeTab, setActiveTab] = useState<RankingTab>('상승률');

// 카테고리별 더미 데이터
const rankingDataByCategory: Record<RankingTab, RankingData[]> = {
상승률: [
    { id: 1, rank: 1, name: '한성크린텍', price: 1465, change: 29.99 },
    { id: 2, rank: 2, name: '서울바이오시스', price: 2840, change: 29.98 },
    { id: 3, rank: 3, name: '알파칩스', price: 9080, change: 29.9 },
    { id: 4, rank: 4, name: '윙스퍽', price: 2000, change: 29.87 },
    { id: 5, rank: 5, name: '유투바이오', price: 6050, change: 29.83 },
],
하락률: [
    { id: 6, rank: 1, name: '한국전자홀딩스', price: 8520, change: -29.99 },
    { id: 7, rank: 2, name: '대성홀딩스', price: 3150, change: -29.95 },
    { id: 8, rank: 3, name: '모베이스전자', price: 5640, change: -29.87 },
    { id: 9, rank: 4, name: '아이센스', price: 18900, change: -29.78 },
    { id: 10, rank: 5, name: 'SBS', price: 42500, change: -29.65 },
],
'거래량 상위': [
    { id: 11, rank: 1, name: '삼성전자', price: 99900, change: -4.77 },
    { id: 12, rank: 2, name: 'SK하이닉스', price: 575000, change: -1.88 },
    { id: 13, rank: 3, name: 'LG에너지솔루션', price: 450000, change: 5.23 },
    { id: 14, rank: 4, name: '현대차', price: 246000, change: 1.85 },
    { id: 15, rank: 5, name: '기아', price: 98500, change: 2.34 },
],
'섹터 상위': [
    { id: 16, rank: 1, name: 'IT/반도체', price: 0, change: 12.45 },
    { id: 17, rank: 2, name: '자동차/운송', price: 0, change: 8.92 },
    { id: 18, rank: 3, name: '금융', price: 0, change: 5.67 },
    { id: 19, rank: 4, name: '화학/에너지', price: 0, change: 3.21 },
    { id: 20, rank: 5, name: '건설/건자재', price: 0, change: -2.34 },
],
};

const currentRankings = rankingDataByCategory[activeTab];

const handleRefresh = () => {
console.log('Refresh clicked');
};

const handleExpand = () => {
console.log('Expand clicked');
};

const handleRankingClick = (item: RankingData) => {
console.log('Ranking item clicked:', item.name);
};

const formatPrice = (price: number): string => {
if (price === 0) return '-';
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
    <h3 style={styles.title}>순위 검색</h3>
    <div style={styles.iconGroup}>
        <button onClick={handleRefresh} style={styles.iconButton} aria-label="새로고침">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
            d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C12.0711 2.5 13.9462 3.33214 15.3033 4.69672"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            />
            <path
            d="M15 2.5V5H12.5"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        </button>
        <button onClick={handleExpand} style={styles.iconButton} aria-label="전체보기">
        <span style={styles.icon}>&gt;</span>
        </button>
    </div>
    </div>

    {/* 카테고리 탭 */}
    <div style={styles.tabContainer}>
    {(['상승률', '하락률', '거래량 상위', '섹터 상위'] as RankingTab[]).map((tab) => (
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
    ))}
    </div>

    {/* 순위 리스트 */}
    <div style={styles.stockList}>
    {currentRankings.map((item) => (
        <div key={item.id} onClick={() => handleRankingClick(item)} style={styles.stockRow}>
        <span style={styles.rank}>{item.rank}</span>
        <span style={styles.stockName}>{item.name}</span>

        <div style={styles.priceContainer}>
            {activeTab !== '섹터 상위' && (
            <span style={styles.price}>{formatPrice(item.price)}</span>
            )}
            <span
            style={{
                ...styles.changeRate,
                color: item.change >= 0 ? '#DB2777' : '#0000FF',
            }}
            >
            {formatChange(item.change)}%
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
width: '100%',
margin: '0 auto 20px auto',
backgroundColor: '#FFFFFF',
borderRadius: '16px',
padding: '20px 16px',
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
boxSizing: 'border-box',
},
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: '10px 0px',
borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
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
alignItems: 'center',
justifyContent: 'center',
gap: '8px',
borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
height: '52px',
},
tabButton: {
flex: 1,
border: 'none',
borderRadius: '7px',
padding: '5px 10px',
height: '30px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.2s ease',
alignSelf: 'center',
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
justifyContent: 'space-between',
gap: '10px',
},
stockRow: {
display: 'flex',
alignItems: 'center',
gap: '12px',
cursor: 'pointer',
borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
height: '52px',
boxSizing: 'border-box',
},
rank: {
fontSize: '14px',
color: '#999999',
fontWeight: 500,
minWidth: '20px',
textAlign: 'center',
lineHeight: '1',
},
stockName: {
flex: 1,
fontSize: '14px',
color: '#000000',
fontWeight: 500,
alignItems: 'center',
},
priceContainer: {
display: 'flex',
alignItems: 'center',
gap: '10px',
},
price: {
fontSize: '14px',
color: '#DB2777',
fontWeight: 500,
},
changeRate: {
fontSize: '14px',
fontWeight: 500,
},
};
