import React from 'react';
import { useNavigate } from 'react-router-dom'; 

interface NewsItem {
id: number;
title: string;
source: string;
date: string;
}

export const StockNewsCard: React.FC = () => {
const navigate = useNavigate(); 

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
    navigate('/newsdetail');
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
                aria-label="전체 뉴스 보기"
            >
                <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
                </svg>
            </button>
    </div>
    </div>

    <div style={styles.newsList}>
    {newsData.map((news, index) => (
        <React.Fragment key={news.id}>
        <div
            onClick={() => handleNewsClick(news.title, news.id)}
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
padding: '20px 16px',
backgroundColor: '#FFFFFF',
width: '100%',
boxSizing: 'border-box',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

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
background:'transparent',
border:"none"
},
icon: {
fontSize: '22px',
color: '#666666',
},

newsList: {
display: 'flex',
flexDirection: 'column',
},

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

divider: {
height: '1px',
backgroundColor: '#E5E7EB',
margin: '0',
},
};
