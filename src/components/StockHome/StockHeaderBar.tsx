import React from "react";

/**
 * StockHeaderBar Component
 *
 * 종목 상세 페이지 상단 네비게이션 바
 * - 홈, 메뉴, 닫기 버튼 포함
 * - 모바일 최적화 (360-430px)
 */

export const StockHeaderBar: React.FC = () => {
const handleHomeClick = () => {
console.log("Go home");
};

const handleMenuClick = () => {
console.log("Open menu");
};

const handleCloseClick = () => {
console.log("Close page");
};

return (
<div style={styles.container}>
    {/* Left: Home Icon */}
    <button
    onClick={handleHomeClick}
    style={styles.iconButton}
    >
    <span style={styles.icon}>🏠</span>
    </button>

    {/* Center: Title */}
    <h1 style={styles.title}>종목홈</h1>

    {/* Right: Menu and Close Icons */}
    <div style={styles.rightGroup}>
    <button
        onClick={handleMenuClick}
        style={styles.iconButton}
    >
        <span style={styles.icon}>⋮</span>
    </button>
    <button
        onClick={handleCloseClick}
        style={styles.iconButton}
    >
        <span style={styles.icon}>✕</span>
    </button>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
backgroundColor: "#FFFFFF",
height: "50px",
padding: "0 12px",
borderBottom: "1px solid #E5E7EB",
boxSizing: "border-box",
},
iconButton: {
border: "none",
backgroundColor: "transparent",
cursor: "pointer",
padding: "8px",
display: "flex",
alignItems: "center",
justifyContent: "center",
},
icon: {
fontSize: "22px",
color: "#333333",
lineHeight: "1",
},
title: {
margin: 0,
fontSize: "16px",
fontWeight: 700,
color: "#333333",
position: "absolute",
left: "50%",
transform: "translateX(-50%)",
},
rightGroup: {
display: "flex",
gap: "4px",
},
};