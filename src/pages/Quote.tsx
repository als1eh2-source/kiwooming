import React from 'react';
import { useParams } from 'react-router-dom';
import { QuoteDisplay } from '../components/Quote/QuoteDisplay';
import { QuoteTable } from '../components/Quote/QuoteTable';
import { Header } from '../components/Global/Header';
import { Footer } from "../components/Global/Footer";

interface QuoteProps {
  onShowKiwooming: () => void;
}

export default function Quote({ onShowKiwooming }: QuoteProps) {
  const { symbol } = useParams<{ symbol?: string }>();

  return (
    <div style={styles.container}>
      <Header
        tabs={['호가', '체결', '거래원', '종목투자자', '종목투자']}
        defaultTab="호가"
        onShowKiwooming={onShowKiwooming}  
      />
      <main style={styles.main}>
        <QuoteDisplay />
        <QuoteTable />
      </main>
      <Footer />
    </div>
  );
}

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
  },
  main: {
    flex: '1 0 auto',
  },
};
