import React from 'react';

/**
 * RelatedThemeCard Component
 * 
 * 연관테마 카드
 * - 테마별 수익률 표시
 * - 연관 종목 목록
 * - 모바일 최적화 (360-430px)
 */

interface Theme {
id: number;
title: string;
subtitle?: string;
returnRate: number;
}

interface RelatedStock {
id: number;
name: string;
returnRate: number;
}

export const RelatedThemeCard: React.FC = () => {
// Dummy theme data
const themes: Theme[] = [
{
    id: 1,
    title: '자동형로봇/인공지능(AI)',
    returnRate: 1.25,
},
{
    id: 2,
    title: '온디바이스 AI',
    returnRate: 4.08,
},
{
    id: 3,
    title: '2025 하반기 전망',
    returnRate: 6.90,
},
];

// Dummy related stocks data
const relatedStocks: RelatedStock[] = [
{ id: 1, name: 'SK하이닉스', returnRate: 1.71 },
{ id: 2, name: '미래에셋증권', returnRate: 3.51 },
{ id: 3, name: '삼성전자', returnRate: 4.77 },
];

const handleThemeClick = (themeTitle: string) => {
console.log('Go to theme details:', themeTitle);
};

const handleStockClick = (stockName: string) => {
console.log('Go to stock details:', stockName);
};

return (
<div style={styles.container}>
    {/* Header Row */}
    <div style={styles.header}>
    <h3 style={styles.title}>연관테마</h3>
    <span style={styles.subtext}>20일간 수익률</span>
    </div>

    {/* Theme Tiles Grid */}
    <div style={styles.themesGrid}>
    {themes.map((theme) => (
        <div
        key={theme.id}
        onClick={() => handleThemeClick(theme.title)}
        style={styles.themeTile}
        >
        <div style={styles.themeContent}>
            <p style={styles.themeTitle}>{theme.title}</p>
            {theme.subtitle && <p style={styles.themeSubtitle}>{theme.subtitle}</p>}
        </div>
        <div style={styles.themeValue}>
            {/* {theme.returnRate > 0 ? '+' : ''} */}
            {theme.returnRate.toFixed(2)}%
        </div>
        </div>
    ))}
    </div>

    {/* Related Stocks Section */}
    <div style={styles.stocksSection}>
    <div style={styles.stocksHeader}>
        <span style={styles.stocksLabel}>연관종목</span>
    </div>
    <div style={styles.stocksList}>
        {relatedStocks.map((stock) => (
        <div
            key={stock.id}
            onClick={() => handleStockClick(stock.name)}
            style={styles.stockItem}
        >
            <span style={styles.stockName}>{stock.name}</span>
            <span style={styles.stockValue}>
            {/* {stock.returnRate > 0 ? '+' : ''} */}
            {stock.returnRate.toFixed(2)}%
            </span>
        </div>
        ))}
    </div>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
padding: '20px 16px',
backgroundColor: '#FFFFFF',
width: '100%',
boxSizing: 'border-box',
borderRadius: '4px',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

header: {
display: 'flex',
justifyContent: 'flex-start',
alignItems: 'center',
marginBottom: '16px',
gap:"10px"
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},
subtext: {
fontSize: '12px',
color: '#757575',
fontWeight: 400,
},

themesGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
gap: '10px',
marginBottom: '20px',
},
themeTile: {
border: '1px solid #E5E7EB',
borderRadius: '8px',
padding: '12px 10px',
cursor: 'pointer',
transition: 'background-color 0.2s ease',
display: 'flex',
flexDirection: 'column',
justifyContent: 'space-between',
minHeight: '80px',
},
themeContent: {
marginBottom: '8px',
},
themeTitle: {
margin: 0,
fontSize: '13px',
color: '#333333',
fontWeight: 500,
lineHeight: '1.3',
wordBreak: 'keep-all',
},
themeSubtitle: {
margin: '4px 0 0 0',
fontSize: '11px',
color: '#757575',
},
themeValue: {
fontSize: '16px',
fontWeight: 700,
color: '#1E2A78',
},

stocksSection: {
borderTop: '1px solid #F5F5F5',
paddingTop: '16px',
},
stocksHeader: {
marginBottom: '12px',
display:'flex',
},
stocksLabel: {
fontSize: '13px',
color: '#757575',
fontWeight: 500,
border:'2px solid #F5F5F5',
padding: '5px 5px',
borderRadius:'5px',
whiteSpace:'wrap'
},
stocksList: {
display: 'flex',
gap: '12px',
flexWrap: 'wrap',
},
stockItem: {
display: 'flex',
flexDirection: 'column',
gap: '4px',
cursor: 'pointer',
padding: '4px 0',
},
stockName: {
fontSize: '13px',
color: '#333333',
fontWeight: 500,
},
stockValue: {
fontSize: '12px',
fontWeight: 600,
color: '#1E2A78',
},
};
