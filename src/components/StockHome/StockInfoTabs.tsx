import React, { useState } from 'react';

/**
 * StockInfoTabs Component
 * 
 * 두 개의 탭 네비게이션 바
 * - "기업정보" / "키움 인사이트" 토글
 * - 활성 탭 하이라이트 표시
 * - 모바일 최적화 (360-430px)
 */

type TabType = '기업정보' | '키움 인사이트';

interface StockInfoTabsProps {
onTabChange?: (tab: TabType) => void;
}

export const StockInfoTabs: React.FC<StockInfoTabsProps> = ({ onTabChange }) => {
const [activeTab, setActiveTab] = useState<TabType>('기업정보');

const handleTabClick = (tab: TabType) => {
setActiveTab(tab);
console.log('Active tab changed:', tab);

if (onTabChange) {
    onTabChange(tab);
}
};

const tabs: TabType[] = ['기업정보', '키움 인사이트'];

return (
<div style={styles.container}>
    <div style={styles.tabsBar}>
    {tabs.map((tab) => {
        const isActive = activeTab === tab;
        
        return (
        <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            style={{
            ...styles.tabButton,
            ...(isActive ? styles.activeTab : styles.inactiveTab),
            }}
        >
            <span style={styles.tabLabel}>{tab}</span>
            <div
            style={{
                ...styles.bottomBorder,
                ...(isActive ? styles.activeBorder : styles.inactiveBorder),
            }}
            />
        </button>
        );
    })}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '90%',
maxWidth: '420px',
margin: '0 auto',
backgroundColor: '#FFFFFF',
fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},
tabsBar: {
display: 'flex',
width: '100%',
borderBottom: '1px solid #E5E7EB',
},
tabButton: {
flex: 1,
border: 'none',
backgroundColor: 'transparent',
padding: '16px 0',
cursor: 'pointer',
position: 'relative',
outline: 'none',
},
tabLabel: {
fontSize: '15px',
display: 'block',
},
activeTab: {
color: '#1E2A78',
fontWeight: 700,
},
inactiveTab: {
color: '#757575',
fontWeight: 500,
},
bottomBorder: {
position: 'absolute',
bottom: '-1px',
left: 0,
right: 0,
height: '2px',
},
activeBorder: {
backgroundColor: '#1E2A78',
},
inactiveBorder: {
backgroundColor: 'transparent',
},
};
