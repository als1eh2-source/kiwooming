// src/pages/Home.tsx
// [신규] 홈 페이지 최소 템플릿

import { SearchBar } from "../components/Home/SearchBar";
import { BigDataList } from "../components/Home/BigDataList";
import { RankingList } from "../components/Home/RankingList";
import { AiReportCard } from "../components/Home/AiReportBar";
import HeaderBar from "../components/Home/HeaderBar";
import MarketTabs from "../components/Home/MarketTabs";
import {Footer} from "../components/Global/Footer";

export default function Home() {

  return <div style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   
        justifyContent: "flex-start",
        paddingTop: "20px",
        paddingBottom: "30px", 
      }}>
        
    {/* 상단 */}
    <HeaderBar onMenuClick={() => console.log('Menu clicked!')} />
    <MarketTabs></MarketTabs>
    <SearchBar/>
    
    {/* 메인 컨텐츠 */}
    <div
        style={{
          width: "100%",
          display: "flex",
          padding:"0 10px",
          boxSizing:"border-box",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px", 
        }}
    >
      <BigDataList></BigDataList>
      <RankingList></RankingList>
      <AiReportCard></AiReportCard>
    </div>

    {/* 하단 메뉴 */}
    {/* <BottomMenuBar></BottomMenuBar> */}
    <Footer/>



  </div>;
}
