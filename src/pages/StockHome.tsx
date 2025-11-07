// src/pages/StockHome.tsx
// [신규] 주식 홈 페이지 최소 템플릿
import { StockHeaderBar } from "../components/StockHome/StockHeaderBar";
import { StockSearchBar } from "../components/StockHome/StockSearchBar";
import { StockSummaryCard } from "../components/StockHome/StockSummaryCard";
import { StockInfoTabs } from "../components/StockHome/StockInfoTabs";
import { StockCompanyInfoCard } from "../components/StockHome/StockCompInfoCard";


export default function StockHome() {
  return <div>
    <StockHeaderBar/>
    <StockSearchBar/>
    <StockSummaryCard/>
    <StockInfoTabs/>
    <StockCompanyInfoCard/>
  </div>;
}
