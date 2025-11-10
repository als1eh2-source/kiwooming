import React, { useState } from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';

interface HeaderBarProps {
onMenuClick: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onMenuClick }) => {
const [activeMode, setActiveMode] = useState<'일반' | '간편'>('일반');

const handleBackClick = () => {
console.log('Back button clicked - would close/exit app');
};

const handleToggleMode = (mode: '일반' | '간편') => {
setActiveMode(mode);
console.log(`Mode switched to: ${mode}`);
};

return (
<div style={styles.container}>
    {/* 뒤로가기 + 토글 */}
    <div style={styles.leftGroup}>
    <button
        onClick={handleBackClick}
        style={styles.backButton}
        aria-label="뒤로가기"
    >
        <ChevronLeft size={24} color="#333333" />
    </button>

    <div style={styles.toggleGroup}>
        <button
        onClick={() => handleToggleMode('일반')}
        style={{
            ...styles.toggleButton,
            ...(activeMode === '일반' ? styles.toggleButtonActive : {}),
        }}
        >
        일반
        </button>
        <button
        onClick={() => handleToggleMode('간편')}
        style={{
            ...styles.toggleButton,
            ...(activeMode === '간편' ? styles.toggleButtonActive : {}),
        }}
        >
        간편
        </button>
    </div>
    </div>

    {/* ⋮ 오른쪽 끝: 더보기 */}
    <button
    onClick={onMenuClick}
    style={styles.moreButton}
    aria-label="더보기 메뉴"
    >
    <MoreVertical size={24} color="#333333" />
    </button>
</div>
);
};

const styles: { [key: string]: React.CSSProperties } = {
container: {
display: 'flex',
justifyContent: 'space-between', // 왼쪽 그룹 + 오른쪽 버튼
alignItems: 'center',
padding: '12px 16px',
backgroundColor: '#FFFFFF',
width: '100%',
margin: '0 auto',
},

// 뒤로가기 + 토글
leftGroup: {
display: 'flex',
alignItems: 'center',
gap: '4px',
},

backButton: {
background: 'none',
border: 'none',
padding: '0',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
transition: 'opacity 0.2s',
},

toggleGroup: {
display: 'flex',
justifyContent: 'flex-start',
backgroundColor: 'white',
border: '1px solid #E5E7EB',
borderRadius: '30px',
padding: '2px',
},

toggleButton: {
padding: '5px 10px',
border: 'none',
borderRadius: '30px',
fontSize: '14px',
fontWeight: 500,
cursor: 'pointer',
transition: 'all 0.3s ease',
backgroundColor: 'transparent',
color: '#6B7280',
},

toggleButtonActive: {
background: 'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)',
color: '#FFFFFF',
boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)',
},

moreButton: {
background: 'none',
border: 'none',
padding: '8px',
cursor: 'pointer',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
transition: 'opacity 0.2s',
},
};

export default HeaderBar;
