import React from 'react';
import { AccountHeader } from '../components/Account/AccountHeader';
import { AccountSummary } from '../components/Account/AccountSummary';
import { AccountTable } from '../components/Account/AccountTable';
import { AccountFooter } from '../components/Account/AccountFooter';
import { StockDetailModal } from '../components/Account/StockDetailModal';

export default function Account() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div style={styles.container}>
      <AccountHeader />
      <main style={styles.main}>
        <AccountSummary />
        <AccountTable onRowClick={() => setIsModalOpen(true)} />
      </main>
      <AccountFooter />
      <StockDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
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
