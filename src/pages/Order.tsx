import React from 'react';
import { OrderHeader } from '../components/Order/OrderHeader';
import { OrderDisplay } from '../components/Order/OrderDisplay';
import { OrderForm } from '../components/Order/OrderForm';
import { OrderFooter } from '../components/Order/OrderFooter';
// src/pages/Order.tsx
// [신규] 주문 페이지 최소 템플릿
export default function Order() {
  return (
      <div style={styles.container}>
        <OrderHeader />
        <main style={styles.main}>
          <OrderDisplay />
          <OrderForm />
        </main>
        <OrderFooter />
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