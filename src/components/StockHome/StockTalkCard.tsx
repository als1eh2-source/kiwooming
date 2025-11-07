import React, { useState } from 'react';

/**
 * StockTalkCard Component
 * 
 * 종목톡 섹션 카드
 * - 클릭 가능한 카드 형태
 * - 안내 메시지 및 배지 표시
 * - 모바일 최적화 (360-430px)
 */

export const StockTalkCard: React.FC = () => {
const [isHovered, setIsHovered] = useState<boolean>(false);

const handleClick = () => {
console.log('Navigating to StockTalk');
};

return (
<div
    onClick={handleClick}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
    ...styles.container,
    backgroundColor: isHovered ? '#FAFAFA' : '#FFFFFF',
    }}
>
    {/* Section 1️⃣ — Header */}
    <div style={styles.header}>
    <h3 style={styles.title}>종목톡</h3>
    <span style={styles.arrowIcon}>›</span>
    </div>

    {/* Section 2️⃣ — Message Row */}
    <div style={styles.messageRow}>
    {/* Circular Badge */}
    <div style={styles.badge}>
        <span style={styles.badgeText}>!</span>
    </div>

    {/* Message Text */}
    <p style={styles.messageText}>종목톡에서 당신의 이야기를 들려주세요!</p>
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
padding: '16px 20px',
boxSizing: 'border-box',
cursor: 'pointer',
transition: 'background-color 0.2s ease',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

// Section 1️⃣ — Header
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
},
title: {
margin: 0,
fontSize: '15px',
fontWeight: 700,
color: '#333333',
},
arrowIcon: {
fontSize: '20px',
color: '#999999',
fontWeight: 300,
},

// Section 2️⃣ — Message Row
messageRow: {
display: 'flex',
alignItems: 'center',
marginTop: '12px',
},
badge: {
width: '24px',
height: '24px',
borderRadius: '50%',
backgroundColor: '#EFE9F8',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
flexShrink: 0,
},
badgeText: {
fontSize: '14px',
fontWeight: 700,
color: '#742284',
},
messageText: {
margin: 0,
marginLeft: '10px',
fontSize: '13px',
color: '#555555',
lineHeight: '1.4',
},
};
