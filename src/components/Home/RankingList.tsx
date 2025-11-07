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
    { id: 3, rank: 3, name: '알파칩스', price: 9080, change: 29.90 },
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
// TODO: 데이터 새로고침 로직
};

const handleExpand = () => {
console.log('Expand clicked');
// TODO: 전체 순위 페이지 이동
};

const handleRankingClick = (item: RankingData) => {
console.log('Ranking item clicked:', item.name);
// TODO: 종목/섹터 상세 페이지 이동
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
        <button
        onClick={handleRefresh}
        style={styles.iconButton}
        aria-label="새로고침"
        >
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
        <button
        onClick={handleExpand}
        style={styles.iconButton}
        aria-label="전체보기"
        >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
            d="M7.5 5L12.5 10L7.5 15"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        </button>
    </div>
    </div>

    {/* 카테고리 탭 - 가로 스크롤 */}
    <div style={styles.tabScrollContainer}>
    <div style={styles.tabContainer}>
        {(['상승률', '하락률', '거래량 상위', '섹터 상위'] as RankingTab[]).map(
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
    </div>

    {/* 순위 리스트 */}
    <div style={styles.rankingList}>
    {currentRankings.map((item) => (
        <div
        key={item.id}
        onClick={() => handleRankingClick(item)}
        style={styles.rankingRow}
        >
        {/* 순위 */}
        <span style={styles.rank}>{item.rank}</span>

        {/* 종목명/섹터명 */}
        <span style={styles.itemName}>{item.name}</span>

        {/* 가격 및 등락률 (가로 배치) */}
        <div style={styles.priceInfo}>
            {activeTab !== '섹터 상위' && (
            <span style={styles.price}>{formatPrice(item.price)}</span>
            )}
            <span
            style={{
                ...styles.changeRate,
                color: item.change >= 0 ? '#FF4D4F' : '#0066FF',
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
backgroundColor: '#FFFFFF',
borderRadius: '16px',
padding: '20px 16px',
margin: '12px 16px',
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
maxWidth: '430px',
boxSizing: 'border-box',
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
gap: '12px',
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
tabScrollContainer: {
marginBottom: '16px',
overflowX: 'auto',
scrollbarWidth: 'none',
msOverflowStyle: 'none',
},
tabContainer: {
display: 'flex',
gap: '8px',
minWidth: 'max-content',
},
tabButton: {
border: 'none',
borderRadius: '20px',
padding: '10px 20px',
fontSize: '14px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.2s ease',
whiteSpace: 'nowrap',
flexShrink: 0,
},
activeTab: {
backgroundColor: '#1E2A78',
color: '#FFFFFF',
},
inactiveTab: {
backgroundColor: '#F5F5F5',
color: '#999999',
},
rankingList: {
display: 'flex',
flexDirection: 'column',
gap: '14px',
},
rankingRow: {
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
itemName: {
flex: 1,
fontSize: '14px',
color: '#000000',
fontWeight: 500,
},
priceInfo: {
display: 'flex',
alignItems: 'center',
gap: '12px',
flexShrink: 0,
},
price: {
fontSize: '14px',
color: '#FF4D4F',
fontWeight: 700,
minWidth: '60px',
textAlign: 'right',
},
changeRate: {
fontSize: '12px',
fontWeight: 600,
minWidth: '60px',
textAlign: 'right',
},
};

// 스크롤바 숨기기 스타일
const globalStyle = `
.tab-scroll-container::-webkit-scrollbar {
display: none;
}
`;

if (typeof document !== 'undefined') {
const styleId = 'ranking-list-styles';
if (!document.getElementById(styleId)) {
const style = document.createElement('style');
style.id = styleId;
style.textContent = globalStyle;
document.head.appendChild(style);
}
}
