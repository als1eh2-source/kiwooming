// src/pages/Home.tsx
// [신규] 홈 페이지 최소 템플릿
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../components/Home/SearchBar";
import { BigDataList } from "../components/Home/BigDataList";
import { RankingList } from "../components/Home/RankingList";
import { AiReportCard } from "../components/Home/AiReportBar";
import HeaderBar from "../components/Home/HeaderBar";
import MarketTabs from "../components/Home/MarketTabs";
import {Footer} from "../components/Global/Footer";

export default function Home() {
  const bigDataElRef = useRef<HTMLElement | null>(null);
  const rankingElRef = useRef<HTMLElement | null>(null);
  const aiReportElRef = useRef<HTMLElement | null>(null);

  const [section, setSection] = useState<string>("top");

    useEffect(() => {
      const handleScroll = () => {
        const scrollMid = window.scrollY + window.innerHeight / 2;
        const buffer = 200;

        const bigDataTop  = bigDataElRef.current?.offsetTop  ?? 0;
        const rankingTop  = rankingElRef.current?.offsetTop  ?? 0;
        const aiReportTop = aiReportElRef.current?.offsetTop ?? 0;
        if (scrollMid < rankingTop - buffer) setSection("bigdata");
        else if (scrollMid < aiReportTop - buffer) setSection("ranking");
        else setSection("ai_report");
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

      console.log("현재 보고 있는 섹션:", section);

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
<div
  style={{ display: "contents" }}
  ref={(el) => {
    bigDataElRef.current = el?.firstElementChild as HTMLElement | null;
  }}
>
  <BigDataList />
</div>

<div
  style={{ display: "contents" }}
  ref={(el) => {
    rankingElRef.current = el?.firstElementChild as HTMLElement | null;
  }}
>
  <RankingList />
</div>

<div
  style={{ display: "contents" }}
  ref={(el) => {
    aiReportElRef.current = el?.firstElementChild as HTMLElement | null;
  }}
>
  <AiReportCard />
</div>
    </div>

    {/* 하단 메뉴 */}
    {/* <BottomMenuBar></BottomMenuBar> */}
    <Footer/>



  </div>;
}
