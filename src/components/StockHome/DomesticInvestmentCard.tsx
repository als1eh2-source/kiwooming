import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import exampleImage from '../img/exampleImage.png';

/**
 * DomesticInvestmentCard Component
 * 
 * 국내투자정보 카드
 * - 투자 정보 아티클 캐러셀
 * - 수평 스크롤 지원
 * - 모바일 최적화 (360-430px)
 */

interface InvestmentArticle {
id: number;
image: string;
label: string;
title: string;
date: string;
}

export const DomesticInvestmentCard: React.FC = () => {
// Mock investment article data
const articles: InvestmentArticle[] = [
{
    id: 1,
    image: exampleImage,
    label: '11월 1주차',
    title: '키움증권 애널리스트가 선별한 이번주 해…',
    date: '2025.11.03',
},
{
    id: 2,
    image: exampleImage,
    label: '10월 5주차',
    title: '키움증권 애널리스트가 선별한 이번주 해…',
    date: '2025.10.27',
},
{
    id: 3,
    image: exampleImage,
    label: '10월 4주차',
    title: '키움증권 애널리스트가 선별한 이번주 해…',
    date: '2025.10.20',
},
];

const handleArticleClick = (articleTitle: string) => {
console.log('Go to investment article:', articleTitle);
};

const handleViewAll = () => {
console.log('View all domestic investment info');
};

// Slider settings
const sliderSettings = {
dots: false,
infinite: false,
speed: 300,
slidesToShow: 2.2,
slidesToScroll: 1,
arrows: false,
swipeToSlide: true,
responsive: [
    {
    breakpoint: 430,
    settings: {
        slidesToShow: 2.2,
        slidesToScroll: 1,
    },
    },
    {
    breakpoint: 380,
    settings: {
        slidesToShow: 1.8,
        slidesToScroll: 1,
    },
    },
],
};

return (
<div style={styles.container}>
    {/* Header */}
    <div style={styles.header}>
    <h3 style={styles.title}>국내투자정보</h3>
    <div onClick={handleViewAll} style={styles.arrowButton}>
        <span style={styles.arrow}>›</span>
    </div>
    </div>

    {/* Carousel */}
    <div style={styles.carouselContainer}>
    <Slider {...sliderSettings}>
        {articles.map((article) => (
        <div key={article.id} style={styles.slideWrapper}>
            <div
            onClick={() => handleArticleClick(article.title)}
            style={styles.articleCard}
            >
            {/* Image */}
            <div style={styles.imageContainer}>
                <img src={article.image} alt={article.title} style={styles.image} />
            </div>

            {/* Content */}
            <div style={styles.content}>
                <p style={styles.label}>{article.label}</p>
                <p style={styles.articleTitle}>{article.title}</p>
                <p style={styles.date}>{article.date}</p>
            </div>
            </div>
        </div>
        ))}
    </Slider>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
// 현비언니! maxWidth 없애면 무한확장해여
container: {
width: '100%',
maxWidth:'550px',
margin: '0 auto',
backgroundColor: '#FFFFFF',
padding: '20px 16px',
boxSizing: 'border-box',
overflow:'hidden',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

// Header
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '16px',
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},
arrowButton: {
cursor: 'pointer',
padding: '4px',
display: 'flex',
alignItems: 'center',
},
arrow: {
fontSize: '20px',
color: '#BDBDBD',
},

// Carousel
carouselContainer: {
margin: '0 -8px',
},
slideWrapper: {
padding: '0 6px',
},

// Article Card
articleCard: {
backgroundColor: '#FFFFFF',
borderRadius: '12px',
overflow: 'hidden',
cursor: 'pointer',
border: '1px solid #E5E7EB',
transition: 'transform 0.2s ease, box-shadow 0.2s ease',
},

// Image
imageContainer: {
width: '100%',
height: '100px',
overflow: 'hidden',
backgroundColor: '#F5F5F5',
},
image: {
width: '100%',
height: '100%',
objectFit: 'cover',
},

// Content
content: {
padding: '12px',
},
label: {
margin: '0 0 6px 0',
fontSize: '11px',
color: '#D32F2F',
fontWeight: 500,
},
articleTitle: {
margin: '0 0 8px 0',
fontSize: '13px',
fontWeight: 700,
color: '#333333',
lineHeight: '1.3',
overflow: 'hidden',
textOverflow: 'ellipsis',
display: '-webkit-box',
WebkitLineClamp: 2,
WebkitBoxOrient: 'vertical',
},
date: {
margin: 0,
fontSize: '11px',
color: '#BDBDBD',
fontWeight: 400,
},
};
