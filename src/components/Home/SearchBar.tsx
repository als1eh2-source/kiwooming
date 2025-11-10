import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * SearchBar Component
 * 
 * Android 모바일 웹 최적화 검색창 (360-430px)
 * - 둥근 모서리 디자인
 * - 왼쪽: 돋보기 아이콘
 * - 중앙: 플레이스홀더 텍스트
 * - 오른쪽: 마이크 아이콘
 */
export const SearchBar: React.FC = () => {

const navigate = useNavigate();

const handleSearchClick = () => {
    navigate('/search');
} // search.tsx로 이동

const handleVoiceClick = () => {
    console.log('Voice search clicked');
    // TODO: 음성 검색 기능 구현
};

return (
    <div style={styles.container}>
<div style={styles.searchWrapper}>
        {/* 왼쪽 돋보기 아이콘 */}
        <button
        onClick={handleSearchClick}
        style={styles.iconButton}
        aria-label="검색"
        >
        <span style={styles.searchIcon}>🔍</span>
        </button>

        {/* 중앙 검색 입력창 */}
        <input
        type="text"
        placeholder="종목·메뉴를 검색해주세요"
        style={styles.input}
        aria-label="검색 입력"
        onFocus={handleSearchClick}
        />

        {/* 오른쪽 마이크 아이콘 */}
        <button
        onClick={handleVoiceClick}
        style={styles.iconButton}
        aria-label="음성 검색"
        >
        <span style={styles.micIcon}>🎤</span>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: '4px',
    flexShrink: 0,
    minWidth: '24px',
    minHeight: '24px',
},
searchIcon: {
    fontSize: '18px',
    lineHeight: 1,
    display: 'block',
    color: '#666666',
},
micIcon: {
    fontSize: '18px',
    lineHeight: 1,
    display: 'block',
    color: '#666666',
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

// Placeholder 텍스트 색상을 위한 스타일 추가
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

// 스타일 태그를 헤드에 추가
if (typeof document !== 'undefined') {
const styleId = 'search-bar-styles';
if (!document.getElementById(styleId)) {
const style = document.createElement('style');
style.id = styleId;
style.textContent = globalStyle;
document.head.appendChild(style);
}
}
