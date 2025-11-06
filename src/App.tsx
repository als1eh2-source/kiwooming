// src/App.tsx
// [변경] App 내부에 BrowserRouter + Routes 구성 (main.tsx 불필요)
// - 6개 페이지 라우트 등록
// - /quote와 /quote/:symbol 모두 지원
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import StockHome from './pages/StockHome';
import Quote from './pages/Quote';
import Order from './pages/Order';
import Chart from './pages/Chart';
import Account from './pages/Account';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<StockHome />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/quote/:symbol" element={<Quote />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
