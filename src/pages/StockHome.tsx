// src/pages/StockHome.tsx
// [신규] 주식 홈 페이지 최소 템플릿
import { useLayoutEffect, useRef } from "react";

import { StockHeaderBar } from "../components/StockHome/StockHeaderBar";
import { StockSearchBar } from "../components/StockHome/StockSearchBar";
import { StockSummaryCard } from "../components/StockHome/StockSummaryCard";
import { StockInfoTabs } from "../components/StockHome/StockInfoTabs";
import { StockCompanyInfoCard } from "../components/StockHome/StockCompInfoCard";
import { StockTalkCard } from "../components/StockHome/StockTalkCard";
import { RelatedThemeCard } from "../components/StockHome/RelatedThemeCard";
import { KiwoomInsightCard } from "../components/StockHome/InsightCard";
import { DailyFlowCard } from "../components/StockHome/DailyFlowCard";
import { PerformanceCard } from "../components/StockHome/PerformanceCard";
import { DomesticInvestmentCard } from "../components/StockHome/DomesticInvestmentCard";
import { StockNewsCard } from "../components/StockHome/StockNewsCard";
import {Footer} from "../components/Global/Footer";

import { useSection } from "../context/SectionContext";


export default function StockHome() {
    const { setSection } = useSection(); // ✅ Context setter 가져오기

  // 주요 구역 ref
  const summaryRef = useRef<HTMLElement | null>(null);
  const stockinfoRef = useRef<HTMLElement | null>(null);
  const companyRef = useRef<HTMLElement | null>(null);
  const talkRef = useRef<HTMLElement | null>(null);
  const themeRef = useRef<HTMLElement | null>(null);
  const insightRef = useRef<HTMLElement | null>(null);
  const dailyflowRef = useRef<HTMLElement | null>(null);
  const performanceRef = useRef<HTMLElement | null>(null);
  const newsRef = useRef<HTMLElement | null>(null);
  const domesticRef = useRef<HTMLElement | null>(null);

  // ✅ 스크롤에 따라 현재 섹션 계산
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2;
      const buffer = 200;

      const summaryTop = summaryRef.current?.offsetTop ?? 0;
      const insightTop = insightRef.current?.offsetTop ?? 0;
      const performanceTop = performanceRef.current?.offsetTop ?? 0;
      const newsTop = newsRef.current?.offsetTop ?? 0;

      let currentSection = "top";

      if (scrollMid < insightTop - buffer) currentSection = "summary";
      else if (scrollMid < performanceTop - buffer) currentSection = "insight";
      else if (scrollMid < newsTop - buffer) currentSection = "performance";
      else currentSection = "news";

      setSection(currentSection);

      console.log({
        scrollY: window.scrollY,
        section: currentSection,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setSection]);

  return <div>
    {/* 상단 */}
    <StockHeaderBar/>
    <StockSearchBar/>

    {/* 컨텐츠 */}
    <div style={{
      display:'flex',
      flexDirection:'column',
      gap:'12px'
    }}>
        <div
          style={{ display: "contents" }}
          ref={(el) => {
            summaryRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
          <StockSummaryCard />
        </div>
        <div
          style={{ display: "contents" }}
          ref={(el) => {
            stockinfoRef.current = el?.firstElementChild as HTMLElement | null;
          }}
          >
          <StockInfoTabs />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            companyRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
        <StockCompanyInfoCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            talkRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
        <StockTalkCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            themeRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
        <RelatedThemeCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            insightRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
          <KiwoomInsightCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            dailyflowRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
        <DailyFlowCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            performanceRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
          <PerformanceCard />
        </div>

        <div
          style={{ display: "contents" }}
          ref={(el) => {
            newsRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
          <StockNewsCard />
        </div>
        
        <div
          style={{ display: "contents" }}
          ref={(el) => {
            domesticRef.current = el?.firstElementChild as HTMLElement | null;
          }}
        >
        <DomesticInvestmentCard />
        </div>
        <Footer />
    </div>
  </div>;
}
