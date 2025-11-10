import React from 'react';
import { useParams } from 'react-router-dom';
import { OrderDisplay } from '../components/Order/OrderDisplay';
import { OrderForm } from '../components/Order/OrderForm';
import { Header } from '../components/Global/Header';
import {Footer} from "../components/Global/Footer";

export default function Quote() {
  const { symbol } = useParams<{ symbol?: string }>();

  return (
    <div style={styles.container}>
      <Header tabs={['키움주문', '호가주문', '자동감시주문', '체결확인', '대주주문']} defaultTab="키움주문" />
      <main style={styles.main}>
        <OrderDisplay />
        <OrderForm />
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
    paddingBottom: '0px', // ★ 기존 '60px' → 0 으로 변경
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
  },
};
