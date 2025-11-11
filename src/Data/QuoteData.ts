// src/Data/QuoteData.ts
// API 연결 없이, 전달받은 키움 응답(JSON)을 그대로 사용해 호가/잔량/더미데이터 구성

export interface LadderRow {
  price: number;
  qty: number;
}

// ───────────────────────────────────────────────────────────
// 1) 원본 키움 응답(사용자 제공)
// ───────────────────────────────────────────────────────────
const RAW = {
  bid_req_base_tm: "113930",
  sel_10th_pre_req_pre: "0",
  sel_10th_pre_req: "17276",
  sel_10th_pre_bid: "+105300",
  sel_9th_pre_req_pre: "0",
  sel_9th_pre_req: "15405",
  sel_9th_pre_bid: "+105200",
  sel_8th_pre_req_pre: "0",
  sel_8th_pre_req: "17930",
  sel_8th_pre_bid: "+105100",
  sel_7th_pre_req_pre: "0",
  sel_7th_pre_req: "57177",
  sel_7th_pre_bid: "+105000",
  sel_6th_pre_req_pre: "0",
  sel_6th_pre_req: "18708",
  sel_6th_pre_bid: "+104900",
  sel_5th_pre_req_pre: "0",
  sel_5th_pre_req: "19002",
  sel_5th_pre_bid: "+104800",
  sel_4th_pre_req_pre: "0",
  sel_4th_pre_req: "15511",
  sel_4th_pre_bid: "+104700",
  sel_3th_pre_req_pre: "0",
  sel_3th_pre_req: "18242",
  sel_3th_pre_bid: "+104600",
  sel_2th_pre_req_pre: "0",
  sel_2th_pre_req: "54417",
  sel_2th_pre_bid: "+104500",
  sel_1th_pre_req_pre: "--6",
  sel_fpr_req: "2044",
  sel_fpr_bid: "+104400",
  buy_fpr_bid: "+104300",
  buy_fpr_req: "28009",
  buy_1th_pre_req_pre: "--33",
  buy_2th_pre_bid: "+104200",
  buy_2th_pre_req: "26526",
  buy_2th_pre_req_pre: "0",
  buy_3th_pre_bid: "+104100",
  buy_3th_pre_req: "14363",
  buy_3th_pre_req_pre: "0",
  buy_4th_pre_bid: "+104000",
  buy_4th_pre_req: "15688",
  buy_4th_pre_req_pre: "0",
  buy_5th_pre_bid: "+103900",
  buy_5th_pre_req: "6251",
  buy_5th_pre_req_pre: "0",
  buy_6th_pre_bid: "+103800",
  buy_6th_pre_req: "6073",
  buy_6th_pre_req_pre: "0",
  buy_7th_pre_bid: "+103700",
  buy_7th_pre_req: "17155",
  buy_7th_pre_req_pre: "0",
  buy_8th_pre_bid: "+103600",
  buy_8th_pre_req: "18113",
  buy_8th_pre_req_pre: "0",
  buy_9th_pre_bid: "+103500",
  buy_9th_pre_req: "37391",
  buy_9th_pre_req_pre: "+20",
  buy_10th_pre_bid: "+103400",
  buy_10th_pre_req: "18255",
  buy_10th_pre_req_pre: "0",
  tot_sel_req_jub_pre: "--6",
  tot_sel_req: "235712",
  tot_buy_req: "187824",
} as const;

// ───────────────────────────────────────────────────────────
// 2) 유틸: 문자열 파싱
// ───────────────────────────────────────────────────────────
const toNumber = (v?: string | number): number => {
  if (v == null) return 0;
  const n = Number(String(v).replace(/[^\d\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const toPrice = (s?: string): number => toNumber(s);

// ───────────────────────────────────────────────────────────
// 3) 중심호가(현재가 대용) & 고정 구간 정의
//    - 요청: 호가는 sel_fpr_* 기준을 사용
//    - 데이터는 100원 간격이므로 STEP=100
//    - 상단은 sel_10th_pre_bid(+105300), 하단은 buy_10th_pre_bid(+103400)
// ───────────────────────────────────────────────────────────
export const currentPrice: number = toPrice(RAW.sel_fpr_bid) || 104400;
const STEP = 100;

const TOP_PRICE = toPrice(RAW.sel_10th_pre_bid) || (currentPrice + 900);
const BOTTOM_PRICE = toPrice(RAW.buy_10th_pre_bid) || (currentPrice - 900);

/** 화면에 사용할 고정 호가 배열(상단→하단) */
export const FIXED_PRICES: number[] = (() => {
  const list: number[] = [];
  for (let p = TOP_PRICE; p >= BOTTOM_PRICE; p -= STEP) list.push(p);
  return list;
})();

// ───────────────────────────────────────────────────────────
// 4) 5개 변수: 매도/매수/현재가/총매도량/총매수량
//    - sel_fpr ~ sel_10th 를 매도측(ask)으로 사용(상단으로 갈수록 가격↑)
//    - buy_fpr ~ buy_10th 를 매수측(bid)으로 사용(하단으로 갈수록 가격↓)
// ───────────────────────────────────────────────────────────
export const asks: LadderRow[] = [
  { price: toPrice(RAW.sel_10th_pre_bid), qty: toNumber(RAW.sel_10th_pre_req) },
  { price: toPrice(RAW.sel_9th_pre_bid),  qty: toNumber(RAW.sel_9th_pre_req)  },
  { price: toPrice(RAW.sel_8th_pre_bid),  qty: toNumber(RAW.sel_8th_pre_req)  },
  { price: toPrice(RAW.sel_7th_pre_bid),  qty: toNumber(RAW.sel_7th_pre_req)  },
  { price: toPrice(RAW.sel_6th_pre_bid),  qty: toNumber(RAW.sel_6th_pre_req)  },
  { price: toPrice(RAW.sel_5th_pre_bid),  qty: toNumber(RAW.sel_5th_pre_req)  },
  { price: toPrice(RAW.sel_4th_pre_bid),  qty: toNumber(RAW.sel_4th_pre_req)  },
  { price: toPrice(RAW.sel_3th_pre_bid),  qty: toNumber(RAW.sel_3th_pre_req)  },
  { price: toPrice(RAW.sel_2th_pre_bid),  qty: toNumber(RAW.sel_2th_pre_req)  },
  { price: toPrice(RAW.sel_fpr_bid),      qty: toNumber(RAW.sel_fpr_req)      }, // 최우선 매도
].filter(r => r.price > 0);

export const bids: LadderRow[] = [
  { price: toPrice(RAW.buy_fpr_bid),      qty: toNumber(RAW.buy_fpr_req)      }, // 최우선 매수
  { price: toPrice(RAW.buy_2th_pre_bid),  qty: toNumber(RAW.buy_2th_pre_req)  },
  { price: toPrice(RAW.buy_3th_pre_bid),  qty: toNumber(RAW.buy_3th_pre_req)  },
  { price: toPrice(RAW.buy_4th_pre_bid),  qty: toNumber(RAW.buy_4th_pre_req)  },
  { price: toPrice(RAW.buy_5th_pre_bid),  qty: toNumber(RAW.buy_5th_pre_req)  },
  { price: toPrice(RAW.buy_6th_pre_bid),  qty: toNumber(RAW.buy_6th_pre_req)  },
  { price: toPrice(RAW.buy_7th_pre_bid),  qty: toNumber(RAW.buy_7th_pre_req)  },
  { price: toPrice(RAW.buy_8th_pre_bid),  qty: toNumber(RAW.buy_8th_pre_req)  },
  { price: toPrice(RAW.buy_9th_pre_bid),  qty: toNumber(RAW.buy_9th_pre_req)  },
  { price: toPrice(RAW.buy_10th_pre_bid), qty: toNumber(RAW.buy_10th_pre_req) },
].filter(r => r.price > 0);

/** 총 매도/매수 잔량 — 제공값 우선, 없으면 합계 */
export const totalAskQty: number = toNumber(RAW.tot_sel_req) || asks.reduce((s, r) => s + r.qty, 0);
export const totalBidQty: number = toNumber(RAW.tot_buy_req) || bids.reduce((s, r) => s + r.qty, 0);

// ───────────────────────────────────────────────────────────
// 5) QuoteTable이 요구하는 OrderBookRow 형태로 변환
//    - FIXED_PRICES를 기준으로 행을 만들고, 동일한 가격의 ask/bid를 각각 채움
// ───────────────────────────────────────────────────────────
export interface OrderBookRow {
  askQty: number; // 위(매도)
  price: number;  // 호가
  bidQty: number; // 아래(매수)
}

export function toOrderBookRows(): OrderBookRow[] {
  const askMap = new Map<number, number>();
  asks.forEach(r => askMap.set(r.price, (askMap.get(r.price) ?? 0) + r.qty));
  const bidMap = new Map<number, number>();
  bids.forEach(r => bidMap.set(r.price, (bidMap.get(r.price) ?? 0) + r.qty));

  return FIXED_PRICES.map((p) => ({
    askQty: askMap.get(p) ?? 0,
    price: p,
    bidQty: bidMap.get(p) ?? 0,
  }));
}

// ───────────────────────────────────────────────────────────
// 6) 오른쪽 상단 메트릭(가상 더미)
//    - currentPrice, 총잔량 등으로 간단 산출/의미있게 구성(가상)
// ───────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString();

const estChangeRate = -(((totalAskQty - totalBidQty) / Math.max(1, totalAskQty + totalBidQty)) * 5).toFixed(2); // 가상 계산
const basePrice = currentPrice; // 기준가 가정

export const priceMetrics = [
  { label: '예상등락', value: `${estChangeRate}%` },            // 가상
  { label: '예상가격', value: fmt(basePrice) },                 // 가상: currentPrice 사용
  { label: '예상수량', value: fmt(toNumber(RAW.sel_fpr_req) + toNumber(RAW.buy_fpr_req)) }, // 최우선 합
  { label: '전일거래', value: fmt(Math.round(totalBidQty * 1.15)) }, // 가상
  { label: '거래량',  value: fmt(totalBidQty) },                // 가상: 매수 총량
  { label: '전일비',  value: '98.56%' },                        // 가상 고정
  { label: '기준가',  value: fmt(basePrice + 850) },            // 가상
  { label: '시가',    value: fmt(basePrice - 200) },            // 가상
  { label: '고가',    value: fmt(basePrice + 650) },            // 가상
  { label: '저가',    value: fmt(basePrice - 1050) },           // 가상
  { label: '상한가',  value: fmt(Math.round(basePrice * 1.30)) }, // 가상
  { label: '하한가',  value: fmt(Math.round(basePrice * 0.70)) }, // 가상
  { label: '거래비용', value: '509' },                          // 가상 고정
];

// ───────────────────────────────────────────────────────────
// 7) 왼쪽 하단 체결 리스트(가상 더미)
//    - 체결강도 105.70%는 UI 쪽에서 문자열로 사용하고, 체결가는 currentPrice 중심으로 구성
// ───────────────────────────────────────────────────────────
export const mergedExecutions = [
  { price: fmt(currentPrice),        qty: 6 },
  { price: fmt(currentPrice - 100),  qty: 5 },
  { price: fmt(currentPrice - 100),  qty: 7 },
  { price: fmt(currentPrice - 100),  qty: 9 },
  { price: fmt(currentPrice),        qty: 4 },
  { price: fmt(currentPrice),        qty: 6 },
  { price: fmt(currentPrice - 100),  qty: 7 },
  { price: fmt(currentPrice - 100),  qty: 9 },
  { price: fmt(currentPrice),        qty: 4 },
  { price: fmt(currentPrice),        qty: 6 },
];
