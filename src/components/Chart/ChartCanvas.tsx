import React, { useRef } from "react";
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

// 최신 날짜가 오른쪽으로 가도록 역순 정렬
const Candles: CandleData[] = [...rawData]
  .reverse()
  .map((item: any) => ({
    dt: item.dt,
    open_pric: +item.open_pric,
    high_pric: +item.high_pric,
    low_pric: +item.low_pric,
    cur_prc: +item.cur_prc,
    trde_qty: +item.trde_qty,
  }));

// 이동평균 계산 함수 (SMA)
const calcMA = (data: any[], key: string, period: number) => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
      continue;
    }
    const slice = data.slice(i - period + 1, i + 1);
    const avg = slice.reduce((sum, d) => sum + d[key], 0) / slice.length;
    result.push(avg);
  }
  return result;
};

// 이동평균선
const ma5 = calcMA(Candles, "cur_prc", 5);
const ma10 = calcMA(Candles, "cur_prc", 10);
const ma20 = calcMA(Candles, "cur_prc", 20);
const ma60 = calcMA(Candles, "cur_prc", 60);
const ma120 = calcMA(Candles, "cur_prc", 120);

const prices = Candles.flatMap((c) => [c.high_pric, c.low_pric]);
const maxPrice = Math.max(...prices);
const minPrice = Math.min(...prices);
const volumes = Candles.map((c) => c.trde_qty);
const maxVolume = Math.max(...volumes);

const yScalePrice = (v: number) =>
  350 - ((v - minPrice) / (maxPrice - minPrice)) * 320;
const yScaleVolume = (v: number) => 150 - (v / maxVolume) * 100;

const lineColors = {
  ma5: "#ff4444",
  ma10: "#ff9800",
  ma20: "#4caf50",
  ma60: "#2196F3",
  ma120: "#9c27b0",
};

export const ChartCanvas: React.FC = () => {
  const makePolylinePoints = (arr: number[], yScale: (v: number) => number) =>
    arr
      .map((v, i) => (isNaN(v) ? "" : `${40 + i * 28},${yScale(v).toFixed(1)}`))
      .filter((v) => v !== "")
      .join(" ");

  const dateTicks = Candles.filter((_, i) => i % 5 === 0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  // 스크롤 동기화
  const syncScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !scrollRef2.current) return;
    if (e.currentTarget === scrollRef.current) {
      scrollRef2.current.scrollLeft = scrollRef.current.scrollLeft;
    } else {
      scrollRef.current.scrollLeft = scrollRef2.current.scrollLeft;
    }
  };

  // 실제 데이터 개수에 맞춘 SVG width
  const svgWidth = Candles.length * 28 + 70;

  return (
    <div style={styles.container}>
      {/* 상단 범례 */}
      <div style={styles.legendWrapper}>
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
      </div>

      {/* 가격 차트 */}
      <div ref={scrollRef} onScroll={syncScroll} style={styles.scrollWrapper}>
        <svg width={svgWidth} height="360" style={styles.svg}>
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 40 + i * 70;
            return (
              <line
                key={i}
                x1={40}
                y1={y}
                x2={svgWidth}
                y2={y}
                stroke="#eee"
                strokeWidth="0.7"
              />
            );
          })}

          {/* 이동평균선 */}
          <polyline
            points={makePolylinePoints(ma5, yScalePrice)}
            fill="none"
            stroke={lineColors.ma5}
            strokeWidth="1.2"
          />
          <polyline
            points={makePolylinePoints(ma10, yScalePrice)}
            fill="none"
            stroke={lineColors.ma10}
            strokeWidth="1.2"
          />
          <polyline
            points={makePolylinePoints(ma20, yScalePrice)}
            fill="none"
            stroke={lineColors.ma20}
            strokeWidth="1.2"
          />
          <polyline
            points={makePolylinePoints(ma60, yScalePrice)}
            fill="none"
            stroke={lineColors.ma60}
            strokeWidth="1.2"
          />
          <polyline
            points={makePolylinePoints(ma120, yScalePrice)}
            fill="none"
            stroke={lineColors.ma120}
            strokeWidth="1.2"
          />

          {/* 캔들 */}
          {Candles.map((c, i) => {
            const x = 40 + i * 28;
            const isRise = c.cur_prc >= c.open_pric;
            const high = yScalePrice(c.high_pric);
            const low = yScalePrice(c.low_pric);
            const open = yScalePrice(c.open_pric);
            const close = yScalePrice(c.cur_prc);
            const bodyTop = Math.min(open, close);
            const bodyHeight = Math.max(Math.abs(open - close), 2);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={high}
                  x2={x}
                  y2={low}
                  stroke={isRise ? "#ff4444" : "#2196F3"}
                  strokeWidth="1.3"
                />
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

          {/* 날짜 표시 */}
          {dateTicks.map((c, i) => (
            <text
              key={i}
              x={40 + i * 28 * 5}
              y={355}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {`${c.dt.slice(5, 7)}/${c.dt.slice(7, 9)}`}
            </text>
          ))}
        </svg>
      </div>

      {/* 오른쪽 Y축 고정 */}
      <div style={styles.fixedYAxis}>
        {Array.from({ length: 5 }).map((_, i) => {
          const y = 40 + i * 70;
          const price = maxPrice - ((maxPrice - minPrice) / 4) * i;
          return (
            <div key={i} style={{ position: "absolute", top: y, right: 0 }}>
              <span style={styles.yText}>{price.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      {/* 거래량 차트 */}
      <div ref={scrollRef2} onScroll={syncScroll} style={styles.scrollWrapper}>
        <svg width={svgWidth} height="160" style={styles.svg}>
          {Candles.map((c, i) => {
            const x = 40 + i * 28;
            const isRise = c.cur_prc >= c.open_pric;
            const h = 150 - yScaleVolume(c.trde_qty);
            return (
              <rect
                key={i}
                x={x - 6}
                y={yScaleVolume(c.trde_qty)}
                width="12"
                height={h}
                fill={isRise ? "#ff4444" : "#2196F3"}
                opacity="0.8"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// === 스타일 ===
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  legendWrapper: { display: "flex", justifyContent: "space-between" },
  indicators: { padding: "8px 12px" },
  indicatorRow: { display: "flex", alignItems: "center", gap: "4px" },
  indicatorLabel: { fontSize: "10px", color: "hotpink", fontWeight: "700" },
  indicatorValue5: { fontSize: "10px", color: "#ff4444" },
  indicatorValue10: { fontSize: "10px", color: "#ff9800" },
  indicatorValue20: { fontSize: "10px", color: "#4caf50" },
  indicatorValue60: { fontSize: "10px", color: "#2196F3" },
  indicatorValue120: { fontSize: "10px", color: "#9c27b0" },
  svg: { display: "block" },
  scrollWrapper: {
    overflowX: "auto",
    overflowY: "hidden",
    width: "100%",
    position: "relative",
    scrollbarWidth: "thin",
    scrollSnapType: "x mandatory",
  },
  fixedYAxis: {
    position: "absolute",
    right: "0px",
    top: "80px",
    width: "60px",
    height: "360px",
    background:
      "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0.6))",
    pointerEvents: "none",
    zIndex: 10,
  },
  yText: {
    fontSize: "10px",
    color: "#666",
    position: "absolute",
    right: "5px",
    transform: "translateY(-50%)",
  },
};
