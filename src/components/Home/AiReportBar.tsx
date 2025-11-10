import React, { useState } from 'react';

type ReportTab = '시황리포트' | '종목리포트';

export const AiReportCard: React.FC = () => {
const [selectedTab, setSelectedTab] = useState<ReportTab>('시황리포트');

const reportContent = {
시황리포트: {
    date: '2025.11.06 오후 2시',
    content:
    '09:30AM 코스닥 지수 오늘과 코스피 4.02% (기준 60.56%) 보다의 51 (40.19%) 보다 훨씬 상승하였습니다.',
},
종목리포트: {
    date: '2025.11.06 오후 3시',
    content: '삼성전자 주가가 전일 대비 상승세를 보이고 있습니다.',
},
};

return (
<div style={styles.container}>
    {/* 헤더 */}
    <div style={styles.header}>
    <span style={styles.icon}>🤖</span>
    <h3 style={styles.title}>AI가 들려주는 리포트</h3>
    </div>

    {/* 언더라인 탭 */}
    <div style={styles.tabContainer}>
    {(['시황리포트', '종목리포트'] as ReportTab[]).map((tab) => (
        <button
        key={tab}
        onClick={() => setSelectedTab(tab)}
        style={{
            ...styles.tab,
            ...(selectedTab === tab ? styles.activeTab : styles.inactiveTab),
        }}
        >
        {tab}
        {selectedTab === tab && <div style={styles.underline} />}
        </button>
    ))}
    </div>

    {/* 리포트 내용 */}
    <div style={styles.reportContent}>
    <p style={styles.date}>{reportContent[selectedTab].date}</p>
    <p style={styles.content}>{reportContent[selectedTab].content}</p>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '100%',
backgroundColor: '#FFFFFF',
borderRadius: '16px',
padding: '20px 16px',
margin: '0 auto 20px auto',
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
boxSizing: 'border-box',
},
header: {
display: 'flex',
alignItems: 'center',
gap: '8px',
paddingBottom: '10px',
borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
marginBottom: '16px',
},
icon: {
fontSize: '20px',
},
title: {
margin: 0,
fontSize: '18px',
fontWeight: 700,
color: '#000',
},
tabContainer: {
display: 'flex',
justifyContent: 'flex-start',
alignItems: 'flex-end',
gap: '20px',
borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
height: '52px',
marginBottom: '16px',
},
tab: {
position: 'relative',
justifyContent:'center',
background: 'none',
border: 'none',
fontSize: '15px',
fontWeight: 600,
cursor: 'pointer',
padding: '8px 0',
marginLeft:'5px',
transition: 'color 0.2s ease',
},
activeTab: {
color: '#000',
},
inactiveTab: {
color: '#999',
},
underline: {
position: 'absolute',
bottom: '-1.5px',
left: 0,
right: 0,
height: '2px',
backgroundColor: '#000',
borderRadius: '2px',
},
reportContent: {
backgroundColor: '#F9FAFB',
borderRadius: '12px',
padding: '16px',
},
date: {
margin: '0 0 8px 0',
fontSize: '14px',
fontWeight: 700,
color: '#000',
},
content: {
margin: 0,
fontSize: '14px',
lineHeight: '1.6',
color: '#333',
},
};

export default AiReportCard;

