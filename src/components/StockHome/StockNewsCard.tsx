import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

/**
 * StockNewsCard Component
 * 
 * 종목뉴스 카드
 * - 최신 뉴스 목록 표시
 * - 새로고침/확장 기능
 * - 모바일 최적화 (360-430px)
 */

interface NewsItem {
id: number;
title: string;
source: string;
date: string;
}

export const StockNewsCard: React.FC = () => {
const navigate = useNavigate(); // ✅ 추가

// Mock news data
const newsData: NewsItem[] = [
{
    id: 1,
    title: '큐리언시스, 정약 경쟁률 2천204대 1…증거금 7조3…',
    source: '키움증권',
    date: '11/05 04:41',
},
{
    id: 2,
    title: 'AI 거품 우려 금융시장 명작…주가·원화 동반 급락',
    source: '키움증권',
    date: '11/05 11:11',
},
{
    id: 3,
    title: "'검은 수요일' 코스피 6%↓…금등 부담 속 'AI 버블'…",
    source: '삼성전자, SK케미칼스, 키움증권',
    date: '11/05 10:51',
},
];

const handleRefresh = () => {
console.log('Refresh news');
};

const handleExpand = () => {
console.log('Expand to full news list');
};

const handleNewsClick = (newsTitle: string, id: number) => {
if (id === 1) {
    navigate('/news'); // ✅ 첫 번째 뉴스 클릭 시 /news로 이동
} else {
    console.log('Go to news article:', newsTitle);
}
};

return (
<div style={styles.container}>
    {/* Header */}
    <div style={styles.header}>
    <h3 style={styles.title}>종목뉴스</h3>
    <div style={styles.iconGroup}>
        <div onClick={handleRefresh} style={styles.iconButton}>
        <span style={styles.icon}>🔄</span>
        </div>
        <div onClick={handleExpand} style={styles.iconButton}>
        <span style={styles.icon}>→</span>
        </div>
    </div>
    </div>

    {/* News List */}
    <div style={styles.newsList}>
    {newsData.map((news, index) => (
        <React.Fragment key={news.id}>
        <div
            onClick={() => handleNewsClick(news.title, news.id)} // ✅ id 인자 추가
            style={styles.newsItem}
        >
            <p style={styles.newsTitle}>{news.title}</p>
            <div style={styles.metadata}>
            <span style={styles.source}>{news.source}</span>
            <span style={styles.separator}>·</span>
            <span style={styles.date}>{news.date}</span>
            </div>
        </div>
        {index < newsData.length - 1 && <div style={styles.divider} />}
        </React.Fragment>
    ))}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '90%',
maxWidth: '420px',
margin: '0 auto 12px auto',
backgroundColor: '#FFFFFF',
borderRadius: '16px',
boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
padding: '20px',
boxSizing: 'border-box',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

// Header
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '20px',
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},
iconGroup: {
display: 'flex',
gap: '8px',
alignItems: 'center',
},
iconButton: {
cursor: 'pointer',
padding: '4px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},
icon: {
fontSize: '16px',
color: '#BDBDBD',
},

// News List
newsList: {
display: 'flex',
flexDirection: 'column',
},

// News Item
newsItem: {
padding: '16px 0',
cursor: 'pointer',
transition: 'opacity 0.2s ease',
},
newsTitle: {
margin: '0 0 8px 0',
fontSize: '14px',
fontWeight: 700,
color: '#333333',
lineHeight: '1.4',
},

// Metadata
metadata: {
display: 'flex',
alignItems: 'center',
gap: '6px',
fontSize: '12px',
},
source: {
color: '#D62F70',
fontWeight: 500,
},
separator: {
color: '#BDBDBD',
},
date: {
color: '#BDBDBD',
fontWeight: 400,
},

// Divider
divider: {
height: '1px',
backgroundColor: '#E5E7EB',
margin: '0',
},
};
