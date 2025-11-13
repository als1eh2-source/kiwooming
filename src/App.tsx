// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";

import Home from "./pages/Home";
import Search from "./pages/Search";
import StockHome from "./pages/StockHome";
import NewsDetail from "./pages/NewsDetail";
import Quote from "./pages/Quote";
import Order from "./pages/Order";
import Chart from "./pages/Chart";
import Account from "./pages/Account";

import { SectionProvider } from "./context/SectionContext";

import { FloatingChatbot } from "./components/Global/FloatingChatBot";

function App() {
  const [showKiwooming, setShowKiwooming] = useState(true);

  return (
        <SectionProvider>

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
      <div
        style={{
          width: "420px",
          minHeight: "90vh",
          backgroundColor: "#F9FAFB",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BrowserRouter>
          {showKiwooming && (
            <FloatingChatbot onHide={() => setShowKiwooming(false)} />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/stockhome" element={<StockHome />} />
            <Route path="/newsdetail" element={<NewsDetail />} />
            <Route path="/quote" element={<Quote />}/>
            <Route path="/quote/:symbol" element={<Quote />}/>
            <Route path="/order" element={<Order />} />
            <Route path="/chart" element={<Chart onShowKiwooming={() => setShowKiwooming(true)}/>}/>
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    </SectionProvider>
  );
}

export default App;
