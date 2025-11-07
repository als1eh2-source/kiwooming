import React, { useState } from 'react';

/**
 * StockSearchBar Component
 * 
 * 종목 검색 바 및 연관 검색어 섹션
 * - 검색 입력창, 클리어 버튼, 음성 검색
 * - 연관 검색어 해시태그 표시
 * - 모바일 최적화 (360-430px)
 */

interface Keyword {
id: number;
tag: string;
}

export const StockSearchBar: React.FC = () => {
const [searchText, setSearchText] = useState<string>('');

// Dummy related keywords
const relatedKeywords: Keyword[] = [
{ id: 1, tag: '#SK하이닉스' },
{ id: 2, tag: '#미래에셋증권' },
{ id: 3, tag: '#삼성전자' },
{ id: 4, tag: '#현대로템' },
];

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setSearchText(e.target.value);
console.log('Search text:', e.target.value);
};

const handleClearClick = () => {
setSearchText('');
console.log('Search cleared');
};

const handleMicClick = () => {
console.log('Voice search activated');
};

const handleKeywordClick = (keyword: string) => {
console.log('Keyword clicked:', keyword);
};

return (
<div style={styles.container}>
    {/* Search Input Section */}
    <div style={styles.searchInputWrapper}>
    <span style={styles.searchIcon}>🔍</span>
    
    <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="종목명을 검색해주세요"
        style={styles.input}
    />

    <div style={styles.rightIconsGroup}>
        {searchText && (
        <button onClick={handleClearClick} style={styles.iconButton}>
            <span style={styles.clearIcon}>❌</span>
        </button>
        )}
        <button onClick={handleMicClick} style={styles.iconButton}>
        <span style={styles.micIcon}>🎤</span>
        </button>
    </div>
    </div>

    {/* Related Keywords Section */}
    <div style={styles.keywordsSection}>
    <span style={styles.keywordsLabel}>연관검색어 :</span>
    <div style={styles.keywordsList}>
        {relatedKeywords.map((keyword) => (
        <button
            key={keyword.id}
            onClick={() => handleKeywordClick(keyword.tag)}
            style={styles.keywordTag}
        >
            {keyword.tag}
        </button>
        ))}
    </div>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '90%',
maxWidth: '400px',
margin: '0 auto',
backgroundColor: '#FFFFFF',
borderRadius: '8px',
boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
padding: '16px',
boxSizing: 'border-box',
},

// Search Input Section
searchInputWrapper: {
display: 'flex',
alignItems: 'center',
backgroundColor: '#F9FAFB',
border: '1px solid #E5E7EB',
borderRadius: '8px',
padding: '10px 12px',
gap: '8px',
marginBottom: '12px',
},
searchIcon: {
fontSize: '18px',
color: '#999999',
display: 'flex',
alignItems: 'center',
},
input: {
flex: 1,
border: 'none',
backgroundColor: 'transparent',
fontSize: '14px',
color: '#333333',
outline: 'none',
fontFamily: 'inherit',
},
rightIconsGroup: {
display: 'flex',
gap: '6px',
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
clearIcon: {
fontSize: '14px',
color: '#999999',
},
micIcon: {
fontSize: '18px',
color: '#666666',
},

// Related Keywords Section
keywordsSection: {
display: 'flex',
alignItems: 'center',
gap: '8px',
flexWrap: 'wrap',
},
keywordsLabel: {
fontSize: '12px',
color: '#555555',
fontWeight: 500,
whiteSpace: 'nowrap',
},
keywordsList: {
display: 'flex',
gap: '8px',
flexWrap: 'wrap',
flex: 1,
},
keywordTag: {
border: 'none',
backgroundColor: 'transparent',
fontSize: '12px',
color: '#555555',
fontWeight: 500,
cursor: 'pointer',
padding: '2px 4px',
whiteSpace: 'nowrap',
},
};
