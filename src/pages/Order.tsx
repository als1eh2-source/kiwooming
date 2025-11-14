// src/pages/Order.tsx
// [변경] OrderDisplay는 위에 고정, OrderForm이 나머지 높이를 모두 차지(Left만 스크롤)
//        Footer가 가리는 걸 방지하려고 main에 paddingBottom(110px) + overflow hidden 적용
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { OrderDisplay } from '../components/Order/OrderDisplay';
import { OrderForm } from '../components/Order/OrderForm';
import { Header } from '../components/Global/Header';
import { Footer } from '../components/Global/Footer';

export default function Quote() {
  const { symbol } = useParams<{ symbol?: string }>();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { 
      document.body.style.overflow = "auto"; 
    };
  }, []);

  return (
    <div style={styles.container}>
      <Header
        tabs={['키움주문', '호가주문', '자동감시주문', '체결확인', '대주주문']}
        defaultTab="키움주문"
      />
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
    display: 'flex',
    flexDirection: 'column',
  },
main: {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  
  // 🔥 Footer 높이만큼 추가 (필수)
  paddingBottom: '60px',

  // 🔥 이게 없으면 공백 생김
  boxSizing: 'border-box',
  overflow: 'hidden',
},
};
