import React from 'react';
import { AccountSummary } from '../components/Account/AccountSummary';
import { AccountTable } from '../components/Account/AccountTable';
import { StockDetailModal } from '../components/Account/StockDetailModal';
import { Header } from '../components/Global/Header';
import { Footer } from '../components/Global/Footer';

export default function Account() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div style={styles.container}>
      <Header tabs={['국내잔고', '미체결', '예수금', '주문가능금액']} defaultTab="국내잔고"/>
      <main style={styles.main}>
        <AccountSummary />
        <AccountTable onRowClick={() => setIsModalOpen(true)} />
      </main>

      <StockDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
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
    paddingBottom: '60px',
  },
  main: {
    flex: 1,
  },
};
