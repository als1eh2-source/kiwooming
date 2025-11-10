import React from 'react';
import { useParams } from 'react-router-dom';
import { QuoteHeader } from '../components/Quote/QuoteHeader';
import { QuoteDisplay } from '../components/Quote/QuoteDisplay';
import { QuoteTable } from '../components/Quote/QuoteTable';
import { QuoteFooter } from '../components/Quote/QuoteFooter';

export default function Quote() {
  const { symbol } = useParams<{ symbol?: string }>();

  return (
    <div style={styles.container}>
      <QuoteHeader />
      <main style={styles.main}>
        <QuoteDisplay />
        <QuoteTable />
      </main>
      <QuoteFooter />
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
    paddingBottom: '0px', // ★ 기존 '60px' → 0 으로 변경
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
};
