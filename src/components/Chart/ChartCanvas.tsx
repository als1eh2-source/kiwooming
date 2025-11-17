import React, { useRef, useEffect, useState } from "react";

interface CandleData {
  dt: string;
  open_pric: number;
  high_pric: number;
  low_pric: number;
  cur_prc: number; 
  trde_qty: number;
}

// ⭐ 오늘 날짜 YYYYMMDD
const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
};

export const ChartCanvas: React.FC = () => {

  // 1) 모든 Hook은 여기!
  const [candles, setCandles] = useState<CandleData[]>([]);
  const [xGap] = useState(10);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);

  const [visibleHi, setVisibleHi] = useState<number | null>(null);
  const [visibleLo, setVisibleLo] = useState<number | null>(null);
  const [visibleHiIdx, setVisibleHiIdx] = useState<number | null>(null);
  const [visibleLoIdx, setVisibleLoIdx] = useState<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  // 2) API fetch (Hook)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.REACT_APP_BACKEND_URL;
        const date = getToday();

        const res = await fetch(
          `${API}/chart/039490?base_dt=${date}`
        );

        const json = await res.json();

        const raw = json.stk_dt_pole_chart_qry || [];
        const mapped = raw
          .map((item: any) => ({
            dt: String(item.dt),
            open_pric: +item.open_pric,
            high_pric: +item.high_pric,
            low_pric: +item.low_pric,
            cur_prc: +item.cur_prc,
            trde_qty: +item.trde_qty,
          }))
          .reverse();

        setCandles(mapped);
      } catch (err) {
        console.error("🔥 차트 API 실패:", err);
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
    if (scrollRef.current && scrollRef2.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      scrollRef2.current.scrollLeft = scrollRef2.current.scrollWidth;
      updateVisibleExtremes();
    }
  }, [candles]); // ←⭐ 데이터 불러온 뒤 실행되도록 수정

  // 3) 데이터 없으면 UI만 return null (Hook은 이미 실행된 상태)
  if (candles.length === 0) {
    return <div style={{ height: "100%", background: "#fff" }} />;
  }

  const Candles = candles;

  const calcMA = (data: any[], key: keyof CandleData, period: number) => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      if (i < period - 1) {
        result.push(NaN);
        continue;
      }
      const slice = data.slice(i - period + 1, i + 1);
      const avg =
        slice.reduce((sum: number, d: CandleData) => sum + (d[key] as number), 0) /
        slice.length;
      result.push(avg);
    }
    return result;
  };

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

  const PRICE_HEIGHT = 360;
  const priceTopPad = 40;
  const priceInnerH = PRICE_HEIGHT - priceTopPad - 10;

  const yScalePrice = (v: number) =>
    priceTopPad + (1 - (v - minPrice) / (maxPrice - minPrice)) * priceInnerH;

  const VOL_HEIGHT = 160;
  const volBottomPad = 10;
  const volInnerH = VOL_HEIGHT - volBottomPad - 30;

const VOL_SCALE = 0.4; // 1.3~2.0 추천
const yScaleVolume = (v: number) =>
  10 + (1 - (v / maxVolume) ** VOL_SCALE) * volInnerH;



  const lineColors = {
    ma5: "#ff4444",
    ma10: "#ff9800",
    ma20: "#4caf50",
    ma60: "#2196F3",
    ma120: "#9c27b0",
  };

  const prettyMD = (yyyymmdd: string) =>
    `${yyyymmdd.slice(4, 6)}/${yyyymmdd.slice(6, 8)}`;

  const svgWidth = Candles.length * xGap + 70;

  const updateVisibleExtremes = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const clientWidth = scrollRef.current.clientWidth;

    const startIdx = Math.floor(scrollLeft / xGap);
    const endIdx = Math.min(
      Candles.length,
      Math.ceil((scrollLeft + clientWidth) / xGap)
    );

    const visible = Candles.slice(startIdx, endIdx);
    if (visible.length === 0) return;

    let hi = -Infinity, lo = Infinity;
    let hiIdx = startIdx, loIdx = startIdx;
    visible.forEach((c, i) => {
      if (c.high_pric > hi) {
        hi = c.high_pric;
        hiIdx = startIdx + i;
      }
      if (c.low_pric < lo) {
        lo = c.low_pric;
        loIdx = startIdx + i;
      }
    });

    setVisibleHi(hi);
    setVisibleLo(lo);
    setVisibleHiIdx(hiIdx);
    setVisibleLoIdx(loIdx);
  };

  const syncScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !scrollRef2.current) return;
    if (e.currentTarget === scrollRef.current) {
      scrollRef2.current.scrollLeft = scrollRef.current.scrollLeft;
    } else {
      scrollRef.current.scrollLeft = scrollRef2.current.scrollLeft;
    }
    updateVisibleExtremes();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollStart(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current || !scrollRef2.current) return;
    const dx = e.clientX - startX;
    const next = scrollStart - dx;
    scrollRef.current.scrollLeft = next;
    scrollRef2.current.scrollLeft = next;
    updateVisibleExtremes();
  };
  const endDrag = () => setIsDragging(false);

  const makePolylinePoints = (arr: number[], yScale: (v: number) => number) =>
    arr
      .map((v, i) => (isNaN(v) ? "" : `${40 + i * xGap},${yScale(v).toFixed(1)}`))
      .filter(Boolean)
      .join(" ");

  const dateTicks = Candles.filter((_, i) => i % 5 === 0);
  const xAt = (i: number) => 40 + i * xGap;

  return (

    <div
      style={{ ...styles.container, cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >

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

      <div ref={scrollRef} onScroll={syncScroll} style={styles.scrollWrapper} className="scrollWrapper">
        <svg width={svgWidth} height={PRICE_HEIGHT} style={styles.svg}>

          {Array.from({ length: 5 }).map((_, i) => {
            const y = priceTopPad + (i * priceInnerH) / 4;
            return (
              <line key={i} x1={40} y1={y} x2={svgWidth} y2={y} stroke="#eee" strokeWidth="0.7" />
            );
          })}

          {(
            [
              ["ma5", ma5],
              ["ma10", ma10],
              ["ma20", ma20],
              ["ma60", ma60],
              ["ma120", ma120],
            ] as const
          ).map(([k, arr]) => (
            <polyline
              key={k}
              points={makePolylinePoints(arr, yScalePrice)}
              fill="none"
              stroke={lineColors[k as keyof typeof lineColors]}
              strokeWidth="1.2"
            />
          ))}

          {Candles.map((c, i) => {
            const x = xAt(i);
            const isRise = c.cur_prc >= c.open_pric;
            const high = yScalePrice(c.high_pric);
            const low = yScalePrice(c.low_pric);
            const open = yScalePrice(c.open_pric);
            const close = yScalePrice(c.cur_prc);
            const bodyTop = Math.min(open, close);
            const bodyH = Math.max(Math.abs(open - close), 2);
            const candleWidth = xGap * 0.8;
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={high}
                  x2={x}
                  y2={low}
                  stroke={isRise ? "#ff4444" : "#2196F3"}
                  strokeWidth="1.2"
                />
                <rect
                  x={x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyH}
                  fill={isRise ? "#ff4444" : "#2196F3"}
                  stroke="#fff"
                  strokeWidth="0.4"
                  rx={1}
                />
              </g>
            );
          })}

          {dateTicks.map((c, idx) => (
            <text key={idx} x={40 + idx * xGap * 5} y={PRICE_HEIGHT - 5} fontSize="10" fill="#666" textAnchor="middle">
              {prettyMD(c.dt)}
            </text>
          ))}

          {visibleHiIdx !== null && visibleHi !== null && (
            <>
              <line
                x1={xAt(visibleHiIdx)}
                y1={yScalePrice(visibleHi)}
                x2={xAt(visibleHiIdx) + 40}
                y2={yScalePrice(visibleHi)}
                stroke="#d32f2f"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text x={xAt(visibleHiIdx) + 44} y={yScalePrice(visibleHi) + 3} fontSize="12" fill="#d32f2f">
                최고 {visibleHi.toLocaleString()}
              </text>
            </>
          )}

          {visibleLoIdx !== null && visibleLo !== null && (
            <>
              <line
                x1={xAt(visibleLoIdx)}
                y1={yScalePrice(visibleLo)}
                x2={xAt(visibleLoIdx) + 40}
                y2={yScalePrice(visibleLo)}
                stroke="#1976d2"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text x={xAt(visibleLoIdx) + 44} y={yScalePrice(visibleLo) + 3} fontSize="12" fill="#1976d2">
                최저 {visibleLo.toLocaleString()}
              </text>
            </>
          )}
        </svg>
      </div>

      <div style={styles.fixedYAxis}>
        {Array.from({ length: 5 }).map((_, i) => {
          const y = priceTopPad + (i * priceInnerH) / 4;
          const price = maxPrice - ((maxPrice - minPrice) / 4) * i;
          return (
            <div key={i} style={{ position: "absolute", top: y, right: 0 }}>
              <span style={styles.yText}>{price.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      <div style={styles.legendWrapper}>
        <div style={styles.indicators}>
          <div style={styles.indicatorRow}>
            <span style={styles.indicatorLabel}>거래량 단순</span>
            <span style={styles.indicatorValue5}>5</span>
            <span style={styles.indicatorValue10}>10</span>
            <span style={styles.indicatorValue20}>20</span>
            <span style={styles.indicatorValue60}>60</span>
            <span style={styles.indicatorValue120}>120</span>
          </div>
        </div>
      </div>

      <div ref={scrollRef2} onScroll={syncScroll} style={styles.scrollWrapper} className="scrollWrapper">
        <svg width={svgWidth} height={VOL_HEIGHT} style={styles.svg}>
          {Candles.map((c, i) => {
            const x = 40 + i * xGap;
            const isRise = c.cur_prc >= c.open_pric;
            const y = yScaleVolume(c.trde_qty);
            const h = VOL_HEIGHT - volBottomPad - y;
            const volWidth = xGap * 0.8;
            return (
              <rect
                key={i}
                x={x - volWidth / 2}
                y={y}
                width={volWidth}
                height={h}
                fill={isRise ? "#ff4444" : "#2196F3"}
                opacity="0.85"
              />
            );
          })}

          {[["#ff44aa", calcMA(Candles, "trde_qty" as any, 5)], ["#ff9800", calcMA(Candles, "trde_qty" as any, 20)]].map(
            ([color, arr], idx) => (
              <polyline
                key={idx}
                points={makePolylinePoints(arr as number[], yScaleVolume)}
                fill="none"
                stroke={color as string}
                strokeWidth="1"
                opacity="0.9"
              />
            )
          )}
        </svg>
      </div>

      <style>{`.scrollWrapper::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#fff",
    flex: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
    userSelect: "none",
  },
  legendWrapper: { display: "flex", justifyContent: "space-between" },
  indicators: { padding: "8px 12px" },
  indicatorRow: { display: "flex", alignItems: "center", gap: "4px" },
  indicatorLabel: { fontSize: "10px", color: "hotpink", fontWeight: 700 },
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
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  fixedYAxis: {
    position: "absolute",
    right: 0,
    top: 30,
    width: 60,
    height: 360,
    background: "transparent",
    pointerEvents: "none",
    zIndex: 10,
  },
  yText: {
    fontSize: 10,
    color: "#666",
    position: "absolute",
    right: 5,
    transform: "translateY(-50%)",
  },
};
