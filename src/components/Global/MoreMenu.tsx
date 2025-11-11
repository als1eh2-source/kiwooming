import React from "react";

interface MoreMenuProps {
show: boolean;
onClose: () => void;
children?: React.ReactNode; // 안쪽 내용 props로 전달
position?: { top?: number; right?: number };
}

export const MoreMenu: React.FC<MoreMenuProps> = ({
show,
onClose,
children,
position,
}) => {
if (!show) return null;

return (
<>
    {/* 반투명 배경 (클릭 시 닫기) */}
    <div style={styles.overlay} onClick={onClose}></div>

    {/* 메뉴 박스 */}
    <div
    style={{
        ...styles.menuContainer,
        ...position,
    }}
    >
    {children}
    </div>
</>
);
};

const styles: { [key: string]: React.CSSProperties } = {
overlay: {
position: "fixed",
top: 0,
left: 0,
width: "100vw",
height: "100vh",
backgroundColor: "rgba(0,0,0,0.1)",
zIndex: 50,
},
menuContainer: {
position: "absolute",
top: 60,
right: 10,
width: "220px",
backgroundColor: "#FFFFFF",
borderRadius: "12px",
boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
padding: "12px 0",
zIndex: 100,
animation: "fadeIn 0.2s ease",
},
};

export default MoreMenu;
