import React, { useState } from 'react';

interface Keyword {
id: number;
tag: string;
}

export const StockSearchBar: React.FC = () => {
const [searchText, setSearchText] = useState<string>('');

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

const handleVoiceClick = () => {
    console.log('Voice search clicked');
};

const handleKeywordClick = (keyword: string) => {
console.log('Keyword clicked:', keyword);
};

return (
<div style={styles.container}>
    <div style={styles.searchInputWrapper}>
    
    <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="키움증권"
        style={styles.input}
    />

    <button
    onClick={handleVoiceClick}
    style={styles.iconButton}
    aria-label="음성 검색"
    >
    <svg
        style={styles.micIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="8" y="1" width="8" height="12" rx="3" />
        <line x1="12" y1="14" x2="12" y2="19" />
        <path d="M5 11a7 6 0 0 0 14 0" />
        <line x1="8" y1="19" x2="16" y2="19" />
    </svg>
    </button>

    </div>

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
padding: '15px 10px',
backgroundColor: '#FFFFFF',
width: '100%',
boxSizing: 'border-box',
},
searchInputWrapper: {
display: 'flex',
alignItems: 'center',
backgroundColor: 'white',
border: '2px solid #E5E7EB',
borderRadius: '8px',
padding: '3px 12px',
gap: '4px',
marginBottom: '10px',
},
input: {
flex: 1,
border: 'none',
backgroundColor: 'transparent',
fontSize: '16px',
color: '#080808ff',
outline: 'none',
fontFamily: 'inherit',
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
width: '20px',
height: '20px',
display: 'block',
},

keywordsSection: {
display: 'flex',
alignItems: 'center',
gap: '8px',
flexWrap: 'nowrap',
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
flexWrap: 'nowrap',
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
