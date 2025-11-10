import React, { useState } from 'react';

export const MarketTabs: React.FC = () => {
const [activeTab, setActiveTab] = useState<'국내' | '해외' | '상품'>('국내');

const tabs = ['국내', '해외', '상품'] as const;

return (
<div style={styles.container}>
    <div style={styles.tabGroup}>
    {tabs.map((tab) => (
        <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        style={{
            ...styles.tab,
            ...(activeTab === tab ? styles.tabActive : styles.tabInactive),
        }}
        >
        {tab}
        </button>
    ))}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '100%',
margin: '0 auto',
backgroundColor: '#F9FAFB',
padding: '0 16px',
},

tabGroup: {
display: 'flex',
gap: '15px',
alignItems: 'center',
},

tab: {
background: 'none',
border: 'none',
padding: '5px 10px',
fontSize: '16px',
cursor: 'pointer',
position: 'relative',
transition: 'all 0.3s ease',
},

tabActive: {
fontWeight: 700,
color: '#000000',
borderBottom: '3px solid #000000',
},

tabInactive: {
fontWeight: 400,
color: '#9CA3AF',
borderBottom: '3px solid transparent',
},
};

export default MarketTabs;
