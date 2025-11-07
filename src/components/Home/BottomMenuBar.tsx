import React, { useState } from 'react';

/**
 * BottomMenuBar Component
 * 
 * 하단 고정 메뉴 네비게이션 바
 * - 5개 메뉴 아이템: 메뉴, 종합뉴스, 투자정보, 주식분석, 투자자별
 * - 선택된 메뉴는 magenta 배경으로 강조
 * - 모바일 최적화 (360-430px)
 */

interface MenuItem {
id: number;
label: string;
icon: string;
}

export const BottomMenuBar: React.FC = () => {
const [selectedMenu, setSelectedMenu] = useState<number>(1);

const menuItems: MenuItem[] = [
{ id: 1, label: '메뉴', icon: '☰' },
{ id: 2, label: '종합뉴스', icon: '📰' },
{ id: 3, label: '투자정보', icon: '💹' },
{ id: 4, label: '주식분석', icon: '📊' },
{ id: 5, label: '투자자별', icon: '👥' },
];

const handleMenuClick = (id: number) => {
setSelectedMenu(id);
console.log('Menu clicked:', menuItems.find(item => item.id === id)?.label);
};

return (
<div style={styles.container}>
    {menuItems.map((item) => {
    const isActive = selectedMenu === item.id;
    
    return (
        <button
        key={item.id}
        onClick={() => handleMenuClick(item.id)}
        style={{
            ...styles.menuItem,
            ...(isActive ? styles.activeMenuItem : {}),
        }}
        >
        <span style={{
            ...styles.icon,
            color: isActive ? '#FFFFFF' : '#999999',
        }}>
            {item.icon}
        </span>
        <span style={{
            ...styles.label,
            color: isActive ? '#FFFFFF' : '#999999',
        }}>
            {item.label}
        </span>
        </button>
    );
    })}
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
display: 'flex',
justifyContent: 'space-around',
alignItems: 'center',
backgroundColor: '#FFFFFF',
borderTop: '1px solid #E5E7EB',
padding: '10px 8px',
position: 'fixed',
bottom: 0,
left: '50%',
transform: 'translateX(-50%)',
width: '100%',
maxWidth: '430px',
boxSizing: 'border-box',
zIndex: 1000,
},
menuItem: {
border: 'none',
backgroundColor: 'transparent',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
gap: '6px',
cursor: 'pointer',
padding: '8px 12px',
borderRadius: '8px',
transition: 'all 0.2s ease',
minWidth: '60px',
boxSizing: 'border-box',
},
activeMenuItem: {
backgroundColor: '#A0124A',
},
icon: {
fontSize: '18px',
lineHeight: '1',
},
label: {
fontSize: '11px',
fontWeight: 500,
whiteSpace: 'nowrap',
lineHeight: '1.2',
},
};
