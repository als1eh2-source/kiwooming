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
    <div style={styles.header}>
    <span style={styles.icon}>🤖</span>
    <h3 style={styles.title}>AI가 들려주는 리포트</h3>
    </div>

    <div style={styles.tabContainer}>
    <button
        onClick={() => setSelectedTab('시황리포트')}
        style={{
        ...styles.tab,
        ...(selectedTab === '시황리포트' ? styles.activeTab : {}),
        }}
    >
        시황리포트
    </button>
    <button
        onClick={() => setSelectedTab('종목리포트')}
        style={{
        ...styles.tab,
        ...(selectedTab === '종목리포트' ? styles.activeTab : {}),
        }}
    >
        종목리포트
    </button>
    </div>

    <div style={styles.reportContent}>
    <p style={styles.date}>{reportContent[selectedTab].date}</p>
    <p style={styles.content}>{reportContent[selectedTab].content}</p>
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
backgroundColor: '#FFFFFF',
borderRadius: '16px',
padding: '20px 16px',
margin: '12px 16px',
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
maxWidth: '430px',
boxSizing: 'border-box',
},
header: {
display: 'flex',
alignItems: 'center',
gap: '8px',
marginBottom: '12px',
},
icon: {
fontSize: '20px',
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
},
tabContainer: {
display: 'flex',
gap: '8px',
marginBottom: '16px',
},
tab: {
border: '1px solid #e0e0e0',
backgroundColor: '#fff',
fontSize: '14px',
padding: '8px 16px',
cursor: 'pointer',
borderRadius: '20px',
color: '#999',
fontWeight: 500,
},
activeTab: {
backgroundColor: '#3730a3',
color: '#fff',
borderColor: '#3730a3',
},
reportContent: {
backgroundColor: '#f9f9f9',
padding: '16px',
borderRadius: '8px',
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
