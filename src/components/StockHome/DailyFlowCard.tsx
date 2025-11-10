import React from 'react';

/**
 * DailyFlowCard Component
 * 
 * 당일수급 카드
 * - 외인/기관/개인 수급 현황 표시
 * - 수평 바 차트 형태
 * - 모바일 최적화 (360-430px)
 */

interface FlowData {
label: string;
value: number;
color: string;
}

export const DailyFlowCard: React.FC = () => {
// Mock data
const flowData: FlowData[] = [
{ label: '외인', value: 555, color: '#F38BA0' },
{ label: '기관', value: 0, color: '#E0E0E0' },
{ label: '개인', value: -277, color: '#4A7DE3' },
];

const maxValue = Math.max(...flowData.map((d) => Math.abs(d.value)));

const handleArrowClick = () => {
console.log('Navigate to detailed flow data');
};

const getBarWidth = (value: number): string => {
if (value === 0) return '0%';
return `${(Math.abs(value) / maxValue) * 100}%`;
};

const formatValue = (value: number): string => {
if (value > 0) return `+${value}`;
if (value < 0) return `${value}`;
return '0';
};

return (
<div style={styles.container}>
    {/* Header */}
    <div style={styles.header}>
    <div style={styles.headerLeft}>
        <h3 style={styles.title}>당일수급</h3>
        <span style={styles.timeInfo}>13:10:00 (백만)</span>
    </div>
    <div onClick={handleArrowClick} style={styles.arrowButton}>
        <span style={styles.arrow}>›</span>
    </div>
    </div>

    {/* Chart Area */}
    <div style={styles.chartArea}>
    {flowData.map((data, index) => (
        <div key={index} style={styles.barRow}>
        <div style={styles.barContainer}>
            {/* Left side - for negative values */}
            <div style={styles.leftSection}>
            {data.value < 0 && (
                <>
                <span style={styles.valueLabel}>{formatValue(data.value)}</span>
                <div
                    style={{
                    ...styles.bar,
                    backgroundColor: data.color,
                    width: getBarWidth(data.value),
                    }}
                />
                </>
            )}
            </div>

            {/* Center line */}
            <div style={styles.centerLine} />

            {/* Right side - for positive values */}
            <div style={styles.rightSection}>
            {data.value > 0 && (
                <>
                <div
                    style={{
                    ...styles.bar,
                    backgroundColor: data.color,
                    width: getBarWidth(data.value),
                    }}
                />
                <span style={styles.valueLabel}>{formatValue(data.value)}</span>
                </>
            )}
            {data.value === 0 && (
                <span style={{ ...styles.valueLabel, color: '#BDBDBD' }}>0</span>
            )}
            </div>
        </div>

        {/* Category Label */}
        <div style={styles.labelContainer}>
            <span style={styles.categoryLabel}>{data.label}</span>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
padding: '20px 16px',
backgroundColor: '#FFFFFF',
width: '100%',
boxSizing: 'border-box',
borderRadius: '4px',
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
headerLeft: {
display: 'flex',
alignItems: 'baseline',
gap: '8px',
},
title: {
margin: 0,
fontSize: '16px',
fontWeight: 700,
color: '#333333',
},
timeInfo: {
fontSize: '12px',
color: '#BDBDBD',
fontWeight: 400,
},
arrowButton: {
cursor: 'pointer',
padding: '4px',
display: 'flex',
alignItems: 'center',
},
arrow: {
fontSize: '20px',
color: '#BDBDBD',
},

// Chart Area
chartArea: {
backgroundColor: '#FAFAFA',
borderRadius: '12px',
padding: '20px 16px',
display: 'flex',
flexDirection: 'column',
gap: '16px',
},

// Bar Row
barRow: {
display: 'flex',
alignItems: 'center',
gap: '12px',
},

// Bar Container
barContainer: {
flex: 1,
display: 'flex',
alignItems: 'center',
height: '28px',
},

// Left Section (negative values)
leftSection: {
flex: 1,
display: 'flex',
alignItems: 'center',
justifyContent: 'flex-end',
gap: '6px',
},

// Center Line
centerLine: {
width: '2px',
height: '28px',
backgroundColor: '#E0E0E0',
},

// Right Section (positive values)
rightSection: {
flex: 1,
display: 'flex',
alignItems: 'center',
justifyContent: 'flex-start',
gap: '6px',
},

// Bar
bar: {
height: '24px',
borderRadius: '4px',
transition: 'width 0.3s ease',
},

// Value Label
valueLabel: {
fontSize: '13px',
fontWeight: 700,
color: '#333333',
minWidth: '45px',
textAlign: 'center',
},

// Category Label
labelContainer: {
minWidth: '36px',
},
categoryLabel: {
fontSize: '13px',
color: '#333333',
fontWeight: 500,
},
};
