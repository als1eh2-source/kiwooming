export const ChartData = {
// 종목 코드
"stk_cd": "005930",
// 차트 배열
"stk_dt_pole_chart_qry": [
{
    "cur_prc": "70100",     // 종가
    "trde_qty": "9263135",  // 거래량
    "trde_prica": "648525", // 거래대금
    "dt": "20250908",       // 거래일자
    "open_pric": "69800",   // 시가
    "high_pric": "70500",   // 고가
    "low_pric": "69600",    // 저가
    "pred_pre": "+600",     // 전일 대비
    "pred_pre_sig": "2",    // 상승
    "trde_tern_rt": "+0.16" // 변동률
},
{
    "cur_prc": "70900",
    "trde_qty": "8745132",
    "trde_prica": "622480",
    "dt": "20250909",
    "open_pric": "70100",
    "high_pric": "71000",
    "low_pric": "69900",
    "pred_pre": "+800",
    "pred_pre_sig": "2",
    "trde_tern_rt": "+1.14"
},
{
    "cur_prc": "71500",
    "trde_qty": "9823044",
    "trde_prica": "700220",
    "dt": "20250910",
    "open_pric": "71000",
    "high_pric": "71800",
    "low_pric": "70800",
    "pred_pre": "+600",
    "pred_pre_sig": "2",
    "trde_tern_rt": "+0.85"
},
{
    "cur_prc": "70800",
    "trde_qty": "10526210",
    "trde_prica": "745380",
    "dt": "20250911",
    "open_pric": "71400",
    "high_pric": "71600",
    "low_pric": "70500",
    "pred_pre": "-700",
    "pred_pre_sig": "5",
    "trde_tern_rt": "-0.98"
},
{
    "cur_prc": "69900",
    "trde_qty": "11032845",
    "trde_prica": "762440",
    "dt": "20250912",
    "open_pric": "70700",
    "high_pric": "70900",
    "low_pric": "69700",
    "pred_pre": "-900",
    "pred_pre_sig": "5",
    "trde_tern_rt": "-1.27"
},
{
    "cur_prc": "70500",
    "trde_qty": "9435173",
    "trde_prica": "688950",
    "dt": "20250913",
    "open_pric": "70000",
    "high_pric": "70700",
    "low_pric": "69500",
    "pred_pre": "+600",
    "pred_pre_sig": "2",
    "trde_tern_rt": "+0.86"
}
],
// 리턴 코드
"return_code": 0,
"return_msg": "정상적으로 처리되었습니다"
};
// ✅ QuoteDisplay에서 사용할 종목 정보 제공 함수 (기존 코드 위에는 아무 영향 없음)
export const getQuoteDisplayData = () => {
  // 현재 선택된 종목코드 (기존 코드의 구조를 참고해 적절히 수정 가능)
  const code = '039490';
  const name = '키움증권';
  const nxtAvailable = true; // false면 "NXT거래가능" 문구 안 붙음

  return { code, name, nxtAvailable };
};

