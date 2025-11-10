// src/pages/StockHome.tsx
// [신규] 주식 홈 페이지 최소 템플릿
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


export default function StockHome() {
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
    <StockSummaryCard/>
    <StockInfoTabs/>
    <StockCompanyInfoCard/>
    <StockTalkCard/>
    <RelatedThemeCard/>
    <KiwoomInsightCard/>
    <DailyFlowCard/>
    <PerformanceCard/>
    <StockNewsCard/>
    <DomesticInvestmentCard/>
    <Footer/>
    </div>
  </div>;
}
