import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Search Page Component
 * 
 * 검색 페이지
 * - 주식/메뉴 검색 기능
 * - 실시간 인기 검색어 표시
 * - 모바일 최적화 (360-430px)
 */

interface StockResult {
id: number;
name: string;
icon: string;
}

interface MenuResult {
id: number;
title: string;
path: string;
}

export const Search: React.FC = () => {
const navigate = useNavigate();
const [searchQuery, setSearchQuery] = useState('');

// Trending search tags
const trendingTags = [
'#삼성전자',
'#SK하이닉스',
'#두산에너빌리티',
'#NAVER',
'#카카오',
];

// Mock search result data
const stockResults: StockResult[] = [
{ id: 1, name: '키움제10호스팩', icon: '📊' },
{ id: 2, name: '키움제11호스팩', icon: '📊' },
{ id: 3, name: '키움증권', icon: '📊' },
];

const menuResults: MenuResult[] = [
{
    id: 1,
    title: '키움주문',
    path: '국내주식 > 주문 >',
},
{
    id: 2,
    title: '키움상위',
    path: '국내주식 > 관심종목 >',
},
{
    id: 3,
    title: '키움리서치',
    path: '해외주식 > 리서치 >',
},
];

const handleBack = () => {
navigate(-1);
};

const handleMicClick = () => {
console.log('Voice search activated');
};

const handleTagClick = (tagName: string) => {
console.log('Tag clicked:', tagName);
setSearchQuery(tagName);
};

const handleStockClick = (stockName: string) => {
console.log('Navigate to stock:', stockName);

if (stockName === '키움증권') {
navigate('/stocks'); // StockHome으로 이동
} else {
navigate(`/quote/${encodeURIComponent(stockName)}`); // 다른 종목 상세 페이지 이동
}
};

const handleMenuClick = (menuTitle: string) => {
console.log('Navigate to menu:', menuTitle);
};

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchQuery(e.target.value);
};

const handleSearchSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (searchQuery.trim()) {
    console.log('Search submitted:', searchQuery);
}
};

return (
<div style={styles.pageContainer}>
    {/* Top Search Bar */}
    <div style={styles.searchBarContainer}>
    <form onSubmit={handleSearchSubmit} style={styles.searchForm}>
        {/* Back Arrow */}
        <button
        type="button"
        onClick={handleBack}
        style={styles.backButton}
        aria-label="Go back"
        >
        <span style={styles.backIcon}>←</span>
        </button>

        {/* Search Input */}
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="메뉴, 종목(초성) 검색 가능"
        style={styles.searchInput}
        />

        {/* Microphone Icon */}
        <button
        type="button"
        onClick={handleMicClick}
        style={styles.micButton}
        aria-label="Voice search"
        >
        <span style={styles.micIcon}>🎤</span>
        </button>
    </form>
    </div>

    {/* Content Area */}
    <div style={styles.contentContainer}>
    {searchQuery.trim() === '' ? (
        // Default State: Trending Tags and Instruction
        <>
        {/* Trending Section */}
        <div style={styles.trendingSection}>
            <h3 style={styles.trendingTitle}>실시간 조회 상위</h3>
            <div style={styles.tagsContainer}>
            {trendingTags.map((tag, index) => (
                <button
                key={index}
                onClick={() => handleTagClick(tag)}
                style={styles.tag}
                >
                {tag}
                </button>
            ))}
            </div>
        </div>

        {/* Instruction Text */}
        <div style={styles.instructionContainer}>
            <p style={styles.instructionText}>
            검색 키워드를 입력해주세요.
            <br />
            검색 키워드에 주식명 또는 메뉴와
            <br />
            연관된 키워드를 검색 가능합니다.
            </p>
        </div>
        </>
    ) : (
        // Search Result State
        <>
        {/* Section 1: 국내주식 */}
        <div style={styles.resultSection}>
            <h3 style={styles.resultSectionTitle}>국내주식</h3>
            <div style={styles.resultList}>
            {stockResults.map((stock) => (
                <div
                key={stock.id}
                onClick={() => handleStockClick(stock.name)}
                style={styles.stockResultItem}
                >
                <span style={styles.stockIcon}>{stock.icon}</span>
                <span style={styles.stockName}>{stock.name}</span>
                </div>
            ))}
            </div>
        </div>

        {/* Section 2: 메뉴 */}
        <div style={styles.resultSection}>
            <h3 style={styles.resultSectionTitle}>메뉴</h3>
            <div style={styles.resultList}>
            {menuResults.map((menu) => (
                <div
                key={menu.id}
                onClick={() => handleMenuClick(menu.title)}
                style={styles.menuResultItem}
                >
                <div style={styles.menuContent}>
                    <span style={styles.menuTitle}>{menu.title}</span>
                    <span style={styles.menuPath}>{menu.path}</span>
                </div>
                </div>
            ))}
            </div>
        </div>
        </>
    )}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
// Page Container
pageContainer: {
width: '100%',
maxWidth: '430px',
margin: '0 auto',
backgroundColor: '#FFFFFF',
minHeight: '100vh',
overflowY: 'auto',
paddingTop: '16px',
paddingBottom: '40px',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
},

// Search Bar Container
searchBarContainer: {
width: '100%',
padding: '0 16px',
marginBottom: '24px',
boxSizing: 'border-box',
},

// Search Form
searchForm: {
display: 'flex',
alignItems: 'center',
gap: '8px',
width: '100%',
backgroundColor: '#FFFFFF',
border: '1px solid #E5E5E5',
borderRadius: '24px',
padding: '10px 16px',
boxSizing: 'border-box',
},

// Back Button
backButton: {
background: 'none',
border: 'none',
padding: '4px',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
flexShrink: 0,
},
backIcon: {
fontSize: '20px',
color: '#333333',
},

// Search Input
searchInput: {
flex: 1,
border: 'none',
outline: 'none',
fontSize: '14px',
color: '#333333',
backgroundColor: 'transparent',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
},

// Microphone Button
micButton: {
background: 'none',
border: 'none',
padding: '4px',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
flexShrink: 0,
},
micIcon: {
fontSize: '18px',
},

// Content Container
contentContainer: {
padding: '0 20px',
},

// Trending Section
trendingSection: {
marginBottom: '40px',
},
trendingTitle: {
margin: '0 0 16px 0',
fontSize: '14px',
fontWeight: 700,
color: '#333333',
},

// Tags Container
tagsContainer: {
display: 'flex',
flexWrap: 'wrap',
gap: '8px',
},

// Individual Tag
tag: {
padding: '6px 12px',
backgroundColor: '#E8F0FE',
color: '#1E2A78',
border: 'none',
borderRadius: '16px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.2s ease',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
},

// Instruction Container
instructionContainer: {
marginTop: '40px',
},

// Instruction Text
instructionText: {
margin: 0,
fontSize: '13px',
color: '#777777',
textAlign: 'center',
lineHeight: '1.6',
},

// Result Section
resultSection: {
marginBottom: '32px',
},
resultSectionTitle: {
margin: '0 0 16px 0',
fontSize: '14px',
fontWeight: 700,
color: '#333333',
},

// Result List
resultList: {
display: 'flex',
flexDirection: 'column',
},

// Stock Result Item
stockResultItem: {
display: 'flex',
alignItems: 'center',
gap: '12px',
padding: '12px 0',
borderBottom: '1px solid #F2F2F2',
cursor: 'pointer',
transition: 'background-color 0.2s ease',
},
stockIcon: {
fontSize: '20px',
},
stockName: {
fontSize: '14px',
color: '#000000',
fontWeight: 400,
},

// Menu Result Item
menuResultItem: {
display: 'flex',
padding: '12px 0',
borderBottom: '1px solid #F2F2F2',
cursor: 'pointer',
transition: 'background-color 0.2s ease',
},
menuContent: {
display: 'flex',
flexDirection: 'column',
gap: '4px',
width: '100%',
},
menuTitle: {
fontSize: '14px',
color: '#1E2A78',
fontWeight: 700,
},
menuPath: {
fontSize: '12px',
color: '#BDBDBD',
fontWeight: 400,
},
};

export default Search;
