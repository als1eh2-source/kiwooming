import React from 'react';

/**
 * KiwoomInsightCard Component
 * 
 * 키움인사이트 카드
 * - 투자자 수익률 인사이트 표시
 * - 더보기 링크
 * - 모바일 최적화 (360-430px)
 */

interface InsightData {
profitablePercentage: number;
message: string;
}

export const KiwoomInsightCard: React.FC = () => {
// Dummy insight data
const insightData: InsightData = {
profitablePercentage: 77,
message: '이 종목의 투자자들 중',
};

const handleLinkClick = () => {
console.log('Navigating to more insights');
};

return (
<div style={styles.container}>
    {/* Title */}
    <h3 style={styles.title}>키움인사이트</h3>

    {/* Insight Content Box */}
    <div style={styles.insightBox}>
    {/* Main Insight Text */}
    <p style={styles.insightText}>
        {insightData.message}{' '}
        <span style={styles.highlightNumber}>{insightData.profitablePercentage}%</span>가{' '}
        <span style={styles.highlightText}>수익</span>을 내고 있어요.
    </p>

    {/* Link Text */}
    <div onClick={handleLinkClick} style={styles.linkContainer}>
        <span style={styles.linkText}>더 많은 인사이트 보러가기 ›</span>
    </div>
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

// Title
title: {
margin: '0 0 16px 0',
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},

// Insight Content Box
insightBox: {
backgroundColor: '#FAFAFA',
borderRadius: '12px',
padding: '20px 16px',
display: 'flex',
flexDirection: 'column',
gap: '12px',
},

// Main Insight Text
insightText: {
margin: 0,
fontSize: '14px',
color: '#333333',
lineHeight: '1.5',
textAlign: 'center',
},
highlightNumber: {
fontWeight: 700,
color: '#D62F70',
},
highlightText: {
fontWeight: 700,
color: '#D62F70',
},

// Link
linkContainer: {
display: 'flex',
justifyContent: 'center',
cursor: 'pointer',
},
linkText: {
fontSize: '12px',
color: '#757575',
fontWeight: 400,
},
};
