import React, { useState } from 'react';

/**
 * StockCompanyInfoCard Component
 * 
 * 기업개요 표시 카드
 * - 회사 소개 텍스트
 * - 더보기/접기 토글 기능
 * - 모바일 최적화 (360-430px)
 */

export const StockCompanyInfoCard: React.FC = () => {
const [expanded, setExpanded] = useState<boolean>(false);

// Dummy company info text
const companyInfo = {
short: '키움증권은 금융투자회사로서 투자중개업, 자산관리업, 신용공여업 등을 영위하고 있습니다.',
full: '키움증권은 금융투자회사로서 투자중개업, 자산관리업, 신용공여업 등을 영위하고 있습니다. 1999년 설립 이후 온라인 트레이딩 시스템을 선도하며 국내 대표 증권사로 성장하였습니다. 현재 전국 50여개 지점을 운영하며 고객 자산관리 및 투자자문 서비스를 제공하고 있습니다. 파생상품, 해외주식, 연금저축 등 다양한 금융상품을 취급하며, 디지털 플랫폼 혁신을 통해 고객 편의성을 지속적으로 개선하고 있습니다.',
};

const handleToggle = () => {
setExpanded(!expanded);
console.log('Company info expanded:', !expanded);
};

return (
<div style={styles.container}>
    {/* Title */}
    <h3 style={styles.title}>기업개요</h3>

    {/* Company Info Text */}
    <p style={styles.infoText}>
    {expanded ? companyInfo.full : companyInfo.short}
    </p>

    {/* Toggle Button */}
    <button onClick={handleToggle} style={styles.toggleButton}>
    {expanded ? '접기' : '더보기'}
    </button>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
width: '90%',
maxWidth: '420px',
margin: '0 auto 16px auto',
backgroundColor: '#FFFFFF',
borderRadius: '16px',
boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
padding: '16px',
boxSizing: 'border-box',
fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif',
},
title: {
margin: '0 0 12px 0',
fontSize: '16px',
fontWeight: 700,
color: '#000000',
},
infoText: {
margin: '0 0 12px 0',
fontSize: '13px',
color: '#666666',
lineHeight: '1.6',
},
toggleButton: {
border: 'none',
backgroundColor: 'transparent',
color: '#742284',
fontSize: '13px',
fontWeight: 600,
cursor: 'pointer',
padding: '4px 0',
textAlign: 'left',
},
};
