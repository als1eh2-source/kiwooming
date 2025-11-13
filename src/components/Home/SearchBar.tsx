import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar: React.FC = () => {

const navigate = useNavigate();

const handleSearchClick = () => {
    navigate('/search');
} 

const handleVoiceClick = () => {
    console.log('Voice search clicked');
};

return (
    <div style={styles.container}>
<div style={styles.searchWrapper}>
        <button
        onClick={handleSearchClick}
        style={styles.iconButton}
        aria-label="검색"
        >
        <svg
            style={styles.searchIcon}
            viewBox="0 0 64 64"
        >
            <circle
            cx="28"
            cy="28"
            r="18"
            stroke="#666666"
            strokeWidth="6"
            fill="none"
            />
            <rect
            x="38"
            y="38"
            width="28"
            height="8"
            rx="4"
            transform="rotate(43 43 43)"
            fill="#666666"
            />
        </svg>
        </button>

        <input
        type="text"
        placeholder="종목·메뉴를 검색해주세요"
        style={styles.input}
        aria-label="검색 입력"
        onFocus={handleSearchClick}
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
    </div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
    padding: '30px 10px',
    backgroundColor: '#F9FAFB',
    width: '100%',
    boxSizing: 'border-box',
},
searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '15px',
    padding: '10px 14px',
    gap: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
},
iconButton: {
    background: "none",
    border: "none",
    padding: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
},
searchIcon: {
    width: "20px",
    height: "20px",
    display: "block",
},
micIcon: {
    width: "20px",
    height: "20px",
    display: "block",
},
input: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: '14px',
    color: '#000000',
    lineHeight: '20px',
    padding: '0',
    width: '100%',
    minWidth: 0,
    fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},
};

const globalStyle = `
input::placeholder {
    color: #999999;
    opacity: 1;
}
input::-webkit-input-placeholder {
color: #999999;
}
input::-moz-placeholder {
color: #999999;
}
input:-ms-input-placeholder {
color: #999999;
}
input:-moz-placeholder {
color: #999999;
}
`;

if (typeof document !== 'undefined') {
const styleId = 'search-bar-styles';
if (!document.getElementById(styleId)) {
const style = document.createElement('style');
style.id = styleId;
style.textContent = globalStyle;
document.head.appendChild(style);
}
}
