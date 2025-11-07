// src/pages/Home.tsx
// [신규] 홈 페이지 최소 템플릿

import { SearchBar } from "../components/Home/SearchBar";
import { BigDataList } from "../components/Home/BigDataList";
import { RankingList } from "../components/Home/RankingList";
import { AiReportCard } from "../components/Home/AiReportBar";
import { BottomMenuBar } from "../components/Home/BottomMenuBar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  }
  return <div style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",   // 🔹 가로 중앙 정렬 핵심
        justifyContent: "flex-start", // 위에서부터 쌓이도록
        paddingTop: "20px",
        paddingBottom: "90px", // 하단바 안 겹치게 여백 확보
      }}>
        
    {/* 상단 */}
    <SearchBar/>
    
    {/* 메인 컨텐츠 */}
    <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 내부 컴포넌트들도 중앙 정렬
          gap: "20px", // 카드 간격 일정하게
        }}
    >
      <BigDataList></BigDataList>
      <RankingList></RankingList>
      <AiReportCard></AiReportCard>
    </div>

    {/* 하단 메뉴 */}
    <BottomMenuBar></BottomMenuBar>


  </div>;
}
