import React from "react";
import { ChartData } from "../../Data/ChartData";

interface CandleData {
  dt: string;
  open_pric: number;
  high_pric: number;
  low_pric: number;
  cur_prc: number;
  trde_qty: number;
}

const rawData = ChartData.stk_dt_pole_chart_qry || [];

// 안전한 숫자 변환
const toNumber = (val: any) =>
  Number(String(val || "0").replace(/,/g, "").trim());

const Candles: CandleData[] = rawData.map((item: any) => ({
  dt: item.dt,
  open_pric: toNumber(item.open_pric),
  high_pric: toNumber(item.high_pric),
  low_pric: toNumber(item.low_pric),
  cur_prc: toNumber(item.cur_prc),
  trde_qty: toNumber(item.trde_qty),
}));

// 이동평균 계산
const calcMA = (data: CandleData[], period: number) => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }
    const slice = data.slice(i - period + 1, i + 1);
    const avg = slice.reduce((sum, d) => sum + d.cur_prc, 0) / slice.length;
    result.push(avg);
  }
  return result;
};

// 이동평균선 5,10,20,60,120
const ma5 = calcMA(Candles, 5);
const ma10 = calcMA(Candles, 10);
const ma20 = calcMA(Candles, 20);
const ma60 = calcMA(Candles, 60);
const ma120 = calcMA(Candles, 120);

// 실제 가격 범위 계산
const prices = Candles.flatMap((c) => [c.high_pric, c.low_pric]);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);

// y좌표 자동 스케일링
const yScale = (value: number) =>
  350 - ((value - minPrice) / (maxPrice - minPrice)) * 320;

// 최고/최저가
const highestData =
  rawData.length > 0
    ? rawData.reduce((a, b) =>
        toNumber(a.high_pric) > toNumber(b.high_pric) ? a : b
      )
    : null;
const lowestData =
  rawData.length > 0
    ? rawData.reduce((a, b) =>
        toNumber(a.low_pric) < toNumber(b.low_pric) ? a : b
      )
    : null;

export const ChartCanvas: React.FC = () => {
  const lineColors = {
    ma5: "#ff4444",
    ma10: "#ff9800",
    ma20: "#4caf50",
    ma60: "#2196F3",
    ma120: "#9c27b0",
  };

  const makePolylinePoints = (maArr: number[]) =>
    maArr
      .map((v, i) => (isNaN(v) ? "" : `${40 + i * 28},${yScale(v).toFixed(1)}`))
      .filter((v) => v !== "")
      .join(" ");

  return (
    <div style={styles.container}>
      {/* 이동평균선 범례 */}
      <div style={styles.indicators}>
        <div style={styles.indicatorRow}>
          <span style={styles.indicatorLabel}>종가 단순</span>
          <span style={styles.indicatorValue5}>5</span>
          <span style={styles.indicatorValue10}>10</span>
          <span style={styles.indicatorValue20}>20</span>
          <span style={styles.indicatorValue60}>60</span>
          <span style={styles.indicatorValue120}>120</span>
        </div>
      </div>

      <svg width="100%" height="360" style={styles.svg}>
        {/* 이동평균선 */}
        <polyline points={makePolylinePoints(ma5)} fill="none" stroke={lineColors.ma5} strokeWidth="1.2" />
        <polyline points={makePolylinePoints(ma10)} fill="none" stroke={lineColors.ma10} strokeWidth="1.2" />
        <polyline points={makePolylinePoints(ma20)} fill="none" stroke={lineColors.ma20} strokeWidth="1.2" />
        <polyline points={makePolylinePoints(ma60)} fill="none" stroke={lineColors.ma60} strokeWidth="1.2" />
        <polyline points={makePolylinePoints(ma120)} fill="none" stroke={lineColors.ma120} strokeWidth="1.2" />

        {/* 캔들 */}
        {Candles.map((candle, index) => {
          const x = 40 + index * 28;
          const isRise = candle.cur_prc >= candle.open_pric;
          const high = yScale(candle.high_pric);
          const low = yScale(candle.low_pric);
          const open = yScale(candle.open_pric);
          const close = yScale(candle.cur_prc);
          const bodyTop = Math.min(open, close);
          const bodyHeight = Math.max(Math.abs(open - close), 2);

          return (
            <g key={index}>
              {/* 꼬리 */}
              <line
                x1={x}
                y1={high}
                x2={x}
                y2={low}
                stroke={isRise ? "#ff4444" : "#2196F3"}
                strokeWidth="1.3"
              />
              {/* 몸통 */}
              <rect
                x={x - 6}
                y={bodyTop}
                width="12"
                height={bodyHeight}
                fill={isRise ? "#ff4444" : "#2196F3"}
                stroke="#fff"
                strokeWidth="0.5"
              />
            </g>
          );
        })}

        {/* 최고/최저가 표시 */}
        {highestData && (
          <text
            x="120"
            y={yScale(toNumber(highestData.high_pric)) - 10}
            fontSize="12"
            fontWeight="bold"
            fill="#ff4444"
          >
            ← 최고 {toNumber(highestData.high_pric).toLocaleString()} (
            {highestData.trde_tern_rt ?? ""}%,{" "}
            {`${highestData.dt.slice(4, 6)}/${highestData.dt.slice(6, 8)}`})
          </text>
        )}
        {lowestData && (
          <text
            x="120"
            y={yScale(toNumber(lowestData.low_pric)) + 15}
            fontSize="12"
            fontWeight="bold"
            fill="#2196F3"
          >
            최저 {toNumber(lowestData.low_pric).toLocaleString()} (
            {lowestData.trde_tern_rt ?? ""}%,{" "}
            {`${lowestData.dt.slice(4, 6)}/${lowestData.dt.slice(6, 8)}`}) →
          </text>
        )}
      </svg>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    height: "100%",
    overflow: "hidden",
  },
  indicators: {
    padding: "8px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  indicatorRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  indicatorLabel: {
    fontSize: "10px",
    color: "hotpink",
    fontWeight: "700",
  },
  indicatorValue5: { fontSize: "10px", color: "#ff4444" },
  indicatorValue10: { fontSize: "10px", color: "#ff9800" },
  indicatorValue20: { fontSize: "10px", color: "#4caf50" },
  indicatorValue60: { fontSize: "10px", color: "#2196F3" },
  indicatorValue120: { fontSize: "10px", color: "#9c27b0" },
  svg: { display: "block" },
};
