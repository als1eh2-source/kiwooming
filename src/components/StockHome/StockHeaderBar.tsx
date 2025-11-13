import React, { useState } from "react";
import { MoreVertical, X } from "lucide-react";
import MoreMenu from "../Global/MoreMenu";

export const StockHeaderBar: React.FC = () => {
const [showMenu, setShowMenu] = useState(false);

const handleHomeClick = () => console.log("Go home");
const handleMenuClick = () => setShowMenu(true);
const handleCloseClick = () => console.log("Close page");

return (
<div style={styles.container}>
    <button onClick={handleHomeClick} style={styles.iconButton} aria-label="홈으로">
    <svg
        style={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 10v10h14V10" />
    </svg>
    </button>

    <h1 style={styles.title}>종목홈</h1>

    <div style={styles.rightGroup}>
    <button onClick={handleMenuClick} style={styles.iconButton}>
        <MoreVertical size={22} color="#333" />
    </button>
    <button onClick={handleCloseClick} style={styles.iconButton}>
        <X size={22} color="#333" />
    </button>
    </div>

    <MoreMenu show={showMenu} onClose={() => setShowMenu(false)}>
    <div style={styles.menuContent}>
        <div style={styles.menuItem}>
        SOR 사용설정 <span style={styles.menuTag}>[ON]</span>
        </div>
        <div style={styles.menuItem}>
        시세 설정 <span style={styles.menuTag}>[통합]</span>
        </div>
        <hr style={styles.divider} />
        <div style={styles.menuItem}>MY알림</div>
        <div style={styles.menuItem}>내맘대로 등록</div>
        <div style={styles.menuItem}>화면 공유</div>
        <div style={styles.menuItem}>키우밍 불러오기</div>
    </div>
    </MoreMenu>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
position: "relative", 
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
width: "25px",
height: "25px",
display: "block",
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
alignItems: "center",
gap: "4px",
},
menuContent: {
display: "flex",
flexDirection: "column",
gap: "8px",
},
menuItem: {
padding: "10px 16px",
fontSize: "14px",
color: "#333",
display: "flex",
cursor:'pointer',
justifyContent: "space-between",
},
menuTag: {
color: "#C2185B",
fontWeight: 600,
},
divider: {
border: "none",
borderTop: "1px solid #E5E7EB",
margin: "4px 0",
},
};
