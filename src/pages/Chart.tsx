import React, {useEffect} from 'react';
import { ChartDisplay } from '../components/Chart/ChartDisplay';
import { ChartControls } from '../components/Chart/ChartControls';
import { ChartCanvas } from '../components/Chart/ChartCanvas';
import { Header } from '../components/Global/Header';
import { Footer } from '../components/Global/Footer';

interface ChartProps {
  onShowKiwooming: () => void;
}

const Chart: React.FC<ChartProps> = ({ onShowKiwooming }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { 
      document.body.style.overflow = "auto"; 
    };
  }, []);
  return (
    
    <div style={styles.container}>
      <Header tabs={['종목차트', '재무차트', '지수차트']} 
      defaultTab="종목차트"
      onShowKiwooming={onShowKiwooming}  
      />
      <main style={styles.main}>
        <ChartDisplay />
        <ChartControls />
        <ChartCanvas />
      </main>
      <Footer />
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
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default Chart;