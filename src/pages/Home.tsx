// src/pages/Home.tsx
import { useLayoutEffect, useRef } from "react";
import { SearchBar } from "../components/Home/SearchBar";
import { BigDataList } from "../components/Home/BigDataList";
import { RankingList } from "../components/Home/RankingList";
import { AiReportCard } from "../components/Home/AiReportBar";
import HeaderBar from "../components/Home/HeaderBar";
import MarketTabs from "../components/Home/MarketTabs";
import { Footer } from "../components/Global/Footer";
import { useSection } from "../context/SectionContext"; // ✅ 전역 section context 사용

export default function Home() {
  const { setSection } = useSection(); // ✅ Context에서 setter 받아오기

  // 각 컴포넌트 위치 측정용 ref
  const bigDataElRef = useRef<HTMLElement | null>(null);
  const rankingElRef = useRef<HTMLElement | null>(null);
  const aiReportElRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      const buffer = 200;

      const bigDataTop = bigDataElRef.current?.offsetTop ?? 0;
      const rankingTop = rankingElRef.current?.offsetTop ?? 0;
      const aiReportTop = aiReportElRef.current?.offsetTop ?? 0;

      let currentSection = "top";
      if (scrollMid < rankingTop - buffer) currentSection = "bigdata";
      else if (scrollMid < aiReportTop - buffer) currentSection = "ranking";
      else currentSection = "ai_report";

      setSection(currentSection);

      console.log({
        scrollY: window.scrollY,
        section: currentSection,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setSection]);

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
        paddingBottom: "30px",
      }}
    >
      {/* 상단 */}
      <HeaderBar onMenuClick={() => console.log("Menu clicked!")} />
      <MarketTabs />
      <SearchBar />

      {/* 메인 컨텐츠 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          padding: "0 10px",
          boxSizing: "border-box",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* 각 섹션의 첫 번째 자식 DOM을 ref로 연결 */}
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

      {/* 하단 */}
      <Footer />
    </div>
  );
}
