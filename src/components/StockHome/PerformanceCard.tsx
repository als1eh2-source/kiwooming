import React, { useState } from 'react';

/**
 * PerformanceCard Component
 * 
 * 실적 카드
 * - 영업손익/당기순이익 표시
 * - 표/차트 토글 뷰
 * - 모바일 최적화 (360-430px)
 */

type ViewMode = 'table' | 'chart';

interface PerformanceData {
period: string;
operatingProfit: number;
netProfit: number;
}

export const PerformanceCard: React.FC = () => {
const [viewMode, setViewMode] = useState<ViewMode>('table');

// Mock performance data
const performanceData: PerformanceData[] = [
{ period: '2023.12', operatingProfit: 5647, netProfit: 4407 },
{ period: '2024.12', operatingProfit: 10982, netProfit: 8349 },
{ period: '2025.06', operatingProfit: 7338, netProfit: 5457 },
];

const handleToggle = (mode: ViewMode) => {
setViewMode(mode);
console.log('View mode changed to:', mode);
};

const formatNumber = (num: number): string => {
return num.toLocaleString('ko-KR');
};

return (
<div style={styles.container}>
    {/* Header Row */}
    <div style={styles.header}>
    <h3 style={styles.title}>실적</h3>
    <div style={styles.toggleButtons}>
        <button
        onClick={() => handleToggle('table')}
        style={{
            ...styles.toggleButton,
            ...(viewMode === 'table' ? styles.activeButton : styles.inactiveButton),
        }}
        >
        표
        </button>
        <button
        onClick={() => handleToggle('chart')}
        style={{
            ...styles.toggleButton,
            ...(viewMode === 'chart' ? styles.activeButton : styles.inactiveButton),
        }}
        >
        차트
        </button>
    </div>
    </div>

    {/* Table View */}
    {viewMode === 'table' && (
    <div style={styles.tableContainer}>
        <table style={styles.table}>
        <thead>
            <tr>
            <th style={{ ...styles.th, ...styles.firstColumn }}></th>
            {performanceData.map((data, index) => (
                <th key={index} style={styles.th}>
                {data.period}
                </th>
            ))}
            </tr>
        </thead>
        <tbody>
            <tr style={styles.row}>
            <td style={{ ...styles.td, ...styles.firstColumn }}>영업손익</td>
            {performanceData.map((data, index) => (
                <td key={index} style={styles.td}>
                {formatNumber(data.operatingProfit)}
                </td>
            ))}
            </tr>
            <tr style={styles.row}>
            <td style={{ ...styles.td, ...styles.firstColumn }}>당기순이익</td>
            {performanceData.map((data, index) => (
                <td key={index} style={styles.td}>
                {formatNumber(data.netProfit)}
                </td>
            ))}
            </tr>
        </tbody>
        </table>
    </div>
    )}

    {/* Chart View */}
    {viewMode === 'chart' && (
    <div style={styles.chartPlaceholder}>
        <p style={styles.placeholderText}>차트 뷰</p>
        <p style={styles.placeholderSubtext}>차트 기능 준비 중</p>
    </div>
    )}
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
padding: '20px',
boxSizing: 'border-box',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},

// Header
header: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: '20px',
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},

// Toggle Buttons
toggleButtons: {
display: 'flex',
gap: '6px',
},
toggleButton: {
padding: '6px 16px',
border: 'none',
borderRadius: '6px',
fontSize: '13px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.2s ease',
fontFamily:
    'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},
activeButton: {
backgroundColor: '#1E2A78',
color: '#FFFFFF',
},
inactiveButton: {
backgroundColor: '#E5E7EB',
color: '#757575',
},

// Table
tableContainer: {
backgroundColor: '#FAFAFA',
borderRadius: '12px',
padding: '16px 12px',
overflowX: 'auto',
},
table: {
width: '100%',
borderCollapse: 'collapse',
},

// Table Header
th: {
padding: '12px 8px',
textAlign: 'center',
fontSize: '13px',
fontWeight: 500,
color: '#757575',
borderBottom: '1px solid #E5E7EB',
},

// Table Row
row: {
borderBottom: '1px solid #F5F5F5',
},

// Table Data
td: {
padding: '16px 8px',
textAlign: 'center',
fontSize: '14px',
fontWeight: 700,
color: '#333333',
},

// First Column (Row Labels)
firstColumn: {
textAlign: 'left',
fontWeight: 500,
color: '#333333',
fontSize: '13px',
paddingLeft: '4px',
},

// Chart Placeholder
chartPlaceholder: {
backgroundColor: '#FAFAFA',
borderRadius: '12px',
padding: '60px 20px',
textAlign: 'center',
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
},
placeholderText: {
margin: 0,
fontSize: '16px',
fontWeight: 600,
color: '#333333',
marginBottom: '8px',
},
placeholderSubtext: {
margin: 0,
fontSize: '13px',
color: '#BDBDBD',
},
};
