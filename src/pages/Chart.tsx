import React from 'react';
import { ChartHeader } from '../components/Chart/ChartHeader';
import { ChartDisplay } from '../components/Chart/ChartDisplay';
import { ChartControls } from '../components/Chart/ChartControls';
import { ChartCanvas } from '../components/Chart/ChartCanvas';
import { ChartFooter } from '../components/Chart/ChartFooter';
// src/pages/Chart.tsx
// [신규] 차트 페이지 최소 템플릿
export default function Chart() {
  return (
    <div style={styles.container}>
      <ChartHeader />
      <main style={styles.main}>
        <ChartDisplay />
        <ChartControls />
        <ChartCanvas />
      </main>
      <ChartFooter />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fff',
    maxWidth: '430px',
    margin: '0 auto',
    position: 'relative',
    paddingBottom: '60px',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};
