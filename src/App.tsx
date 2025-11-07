// src/App.tsx
// [변경] App 내부에 BrowserRouter + Routes 구성 (main.tsx 불필요)
// - 6개 페이지 라우트 등록
// - /quote와 /quote/:symbol 모두 지원
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import StockHome from './pages/StockHome';
import NewsDetail from './pages/NewsDetail';
import Quote from './pages/Quote';
import Order from './pages/Order';
import Chart from './pages/Chart';
import Account from './pages/Account';

import { FloatingChatbot } from "./components/FloatingChatBot";


export default function App() {
  return (
        <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "20px",
        paddingBottom: "90px",
        position: "relative",
        overflowX: "hidden",
      }}
    >
    <BrowserRouter>
    <FloatingChatbot />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stocks" element={<StockHome />} />
        <Route path="/news" element={<NewsDetail/>} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/quote/:symbol" element={<Quote />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
