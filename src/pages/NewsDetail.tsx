import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NewsDetail Page Component
 * 
 * 뉴스 상세 페이지
 * - 뉴스 기사 전문 표시
 * - 북마크/공유 기능
 * - 모바일 최적화 (360-430px)
 */

export const NewsDetail: React.FC = () => {
const navigate = useNavigate();

const handleClose = () => {
navigate(-1);
console.log('Close news detail');
};

const handleBookmark = () => {
console.log('Bookmark article');
};

const handleShare = () => {
console.log('Share article');
};

const handleSourceClick = () => {
console.log('Navigate to Kiwoom Securities');
};

return (
<div style={styles.pageContainer}>
    {/* Header */}
    <div style={styles.header}>
    <h1 style={styles.headerTitle}>뉴스상세</h1>
    <button onClick={handleClose} style={styles.closeButton} aria-label="Close">
        ✕
    </button>
    </div>

    {/* Scrollable Content */}
    <div style={styles.scrollContainer}>
    {/* Article Title */}
    <h2 style={styles.articleTitle}>
        큐리오시스, 청약 경쟁률 2천204대 1...증거금 7조3천억원
    </h2>

    {/* Metadata Row */}
    <div style={styles.metadataRow}>
        <div style={styles.metadataLeft}>
        <span style={styles.date}>2025.11.05 16:41:56</span>
        <span style={styles.source}>연합뉴스</span>
        </div>
        <div style={styles.iconButtons}>
        <button onClick={handleBookmark} style={styles.iconButton} aria-label="Bookmark">
            🔖
        </button>
        <button onClick={handleBookmark} style={styles.iconButton} aria-label="Font size">
            가
        </button>
        <button onClick={handleShare} style={styles.iconButton} aria-label="Share">
            ⋯
        </button>
        </div>
    </div>

    {/* Divider */}
    <div style={styles.divider} />

    {/* Article Body */}
    <div style={styles.articleBody}>
        <p style={styles.paragraph}>
        큐리오시스, 청약 경쟁률 2천204대 1...증거금 7조3천억원
        </p>

        <p style={styles.paragraph}>
        (서울=연합뉴스) 배영경 기자 = 코스닥시장 상장을 추진 중인 실험실 자동화(랩오토메이션) 전문 기업 큐리오시스가 지난 4일부터 이틀간 기관 투자자를 대상으로 실행한 공모주 청약에서 2천204대 1의 경쟁률을 달성했고 5일 발표다.
        </p>

        <p style={styles.paragraph}>
        일반 투자자에 30만주를 배정할 계획인 가운데 6946천만주 이상이 청약 조건을 맞 7조2천700억원으로 집계됐다.
        </p>

        <p style={styles.paragraph}>
        큐리오시스는 남입을 거쳐 오는 13일 코스닥시장에 상장할 예정이다.
        </p>

        <p style={styles.paragraph}>
        상장 주관사는 키움증권[039490]이 맡았다.
        </p>

        <p style={styles.paragraph}>
        큐리오시스는 입상의약품 R&D 시설에 쓰이는 자동화 설비와 관련 소프트웨어를 만드는 곳이다. 삶의 자동화 설비의 관련 소프트웨어를 만드는 제품인 '셀로카가 대표 상품이다.
        </p>

        <p style={styles.paragraph}>
        ykbae@yna.co.kr
        </p>

    </div>
    </div>

    {/* Fixed Bottom Button */}
    <div style={styles.bottomButtonContainer}>
    <button onClick={handleSourceClick} style={styles.bottomButton}>
        키움증권
    </button>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
// Page Container
pageContainer: {
width: '100%',
margin: '0 auto',
backgroundColor: '#FFFFFF',
minHeight: '100vh',
display: 'flex',
flexDirection: 'column',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif',
position: 'relative',
},

// Header
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: '16px 20px',
borderBottom: '1px solid #E5E7EB',
position: 'sticky',
top: 0,
backgroundColor: '#FFFFFF',
zIndex: 10,
},
headerTitle: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#000000',
},
closeButton: {
background: 'none',
border: 'none',
fontSize: '20px',
color: '#333333',
cursor: 'pointer',
padding: '4px 8px',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},

// Scroll Container
scrollContainer: {
flex: 1,
overflowY: 'auto',
padding: '20px',
paddingBottom: '100px', // Space for fixed bottom button
},

// Article Title
articleTitle: {
margin: '0 0 16px 0',
fontSize: '18px',
fontWeight: 700,
color: '#000000',
lineHeight: '1.5',
},

// Metadata Row
metadataRow: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '16px',
},
metadataLeft: {
display: 'flex',
alignItems: 'center',
gap: '8px',
flexWrap: 'wrap',
},
date: {
fontSize: '12px',
color: '#777777',
fontWeight: 400,
},
source: {
fontSize: '12px',
color: '#777777',
fontWeight: 400,
},
iconButtons: {
display: 'flex',
gap: '8px',
alignItems: 'center',
},
iconButton: {
background: 'none',
border: 'none',
fontSize: '16px',
cursor: 'pointer',
padding: '4px',
color: '#777777',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},

// Divider
divider: {
height: '1px',
backgroundColor: '#E5E7EB',
marginBottom: '20px',
},

// Article Body
articleBody: {
display: 'flex',
flexDirection: 'column',
gap: '16px',
},
paragraph: {
margin: 0,
fontSize: '14px',
color: '#333333',
lineHeight: '1.7',
wordBreak: 'keep-all',
},
endMark: {
margin: '8px 0 0 0',
fontSize: '14px',
color: '#777777',
textAlign: 'center',
fontWeight: 400,
},

// Fixed Bottom Button Container
bottomButtonContainer: {
position: 'fixed',
bottom: 0,
left: '50%',
transform: 'translateX(-50%)',
width: '100%',
maxWidth: '430px',
padding: '16px 20px',
backgroundColor: '#FFFFFF',
borderTop: '1px solid #E5E7EB',
boxSizing: 'border-box',
},
bottomButton: {
width: '100%',
padding: '14px',
backgroundColor: '#F3F4F6',
border: 'none',
borderRadius: '8px',
fontSize: '15px',
fontWeight: 600,
color: '#333333',
cursor: 'pointer',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Noto Sans KR", sans-serif',
transition: 'background-color 0.2s ease',
},
};

export default NewsDetail;
