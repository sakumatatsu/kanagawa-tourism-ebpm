/**
 * 神奈川県観光振興EBPMダッシュボード - 実データ（時系列 + コスト情報）
 * 出典: 神奈川県入込観光客調査、観光庁宿泊旅行統計調査、神奈川県観光客実態調査 等
 * 最終更新: 2025年2月
 */

const ACTUAL_DATA = {
  lastUpdated: "2025-02-23",

  // === 最上位KPI 時系列データ ===
  topKPIs: {
    "観光消費額総額": {
      unit: "億円",
      source: "神奈川県入込観光客調査（観光消費額算出）",
      series: [
        { year: 2019, value: 9740 },
        { year: 2020, value: 4620 },
        { year: 2021, value: 6180 },
        { year: 2022, value: 10278 },
        { year: 2023, value: 10850 },
        { year: 2024, value: null }
      ],
      note: "2024年度は未公表。2022年度が基準値（グランドデザイン）"
    },
    "延べ入込観光客数": {
      unit: "万人",
      source: "神奈川県入込観光客調査",
      series: [
        { year: 2019, value: 20467 },
        { year: 2020, value: 10849 },
        { year: 2021, value: 11725 },
        { year: 2022, value: 16406 },
        { year: 2023, value: 19111 },
        { year: 2024, value: 20806 }
      ],
      note: "2024年は過去最高更新。前年比+8.9%。出典: 神奈川県公式ページ確認済み"
    },
    "延べ宿泊者数": {
      unit: "万人泊",
      source: "観光庁 宿泊旅行統計調査（神奈川県）",
      series: [
        { year: 2019, value: 2680 },
        { year: 2020, value: 1260 },
        { year: 2021, value: 1410 },
        { year: 2022, value: 2209 },
        { year: 2023, value: 2430 },
        { year: 2024, value: 2530 }
      ],
      note: "2022年度が基準値。目標2,530万人泊（2027年度）"
    },
    "観光客満足度": {
      unit: "%",
      source: "神奈川県観光客実態調査",
      series: [
        { year: 2019, value: 76.2 },
        { year: 2020, value: null },
        { year: 2021, value: null },
        { year: 2022, value: 77.6 },
        { year: 2023, value: 78.5 },
        { year: 2024, value: null }
      ],
      note: "2020-2021年度はCOVID-19により調査未実施。目標80%（2027年度）"
    }
  },

  // === 地域別 時系列データ ===
  // 注: 2019-2021年は旧6地域区分（箱根・湯河原一体、足柄独立なし）
  //     2022年以降は7地域区分（第5期観光振興計画に基づく新区分）
  //     2019-2021年の7地域分割は旧区分からの按分推計値
  regionTimeSeries: {
    "横浜・川崎": {
      series: [
        { year: 2019, visitors: 7599, overnight: 780 },
        { year: 2020, visitors: 3365, overnight: 350 },
        { year: 2021, visitors: 3543, overnight: 420 },
        { year: 2022, visitors: 5743, overnight: 630 },
        { year: 2023, visitors: 7002, overnight: 720 },
        { year: 2024, visitors: 7887, overnight: 787 }
      ]
    },
    "湘南": {
      series: [
        { year: 2019, visitors: 5178, overnight: 290 },
        { year: 2020, visitors: 2736, overnight: 140 },
        { year: 2021, visitors: 2948, overnight: 180 },
        { year: 2022, visitors: 4106, overnight: 240 },
        { year: 2023, visitors: 4557, overnight: 275 },
        { year: 2024, visitors: 5036, overnight: 306 }
      ]
    },
    "箱根": {
      series: [
        { year: 2019, visitors: 3141, overnight: 950 },
        { year: 2020, visitors: 2153, overnight: 410 },
        { year: 2021, visitors: 2434, overnight: 530 },
        { year: 2022, visitors: 2947, overnight: 770 },
        { year: 2023, visitors: 3277, overnight: 840 },
        { year: 2024, visitors: 3377, overnight: 877 }
      ],
      note: "2019-2021年は「箱根・湯河原」区分の値"
    },
    "三浦半島": {
      series: [
        { year: 2019, visitors: 1650, overnight: 140 },
        { year: 2020, visitors: 968, overnight: 65 },
        { year: 2021, visitors: 1093, overnight: 80 },
        { year: 2022, visitors: 1353, overnight: 115 },
        { year: 2023, visitors: 1511, overnight: 133 },
        { year: 2024, visitors: 1627, overnight: 147 }
      ]
    },
    "丹沢大山": {
      series: [
        { year: 2019, visitors: 1518, overnight: 62 },
        { year: 2020, visitors: 1076, overnight: 28 },
        { year: 2021, visitors: 1150, overnight: 35 },
        { year: 2022, visitors: 1184, overnight: 50 },
        { year: 2023, visitors: 1208, overnight: 56 },
        { year: 2024, visitors: 1261, overnight: 61 }
      ],
      note: "2019-2021年は「丹沢・大山」区分の値"
    },
    "相模湖・相模川流域": {
      series: [
        { year: 2019, visitors: 1380, overnight: 55 },
        { year: 2020, visitors: 550, overnight: 24 },
        { year: 2021, visitors: 557, overnight: 32 },
        { year: 2022, visitors: 707, overnight: 46 },
        { year: 2023, visitors: 1150, overnight: 52 },
        { year: 2024, visitors: 1206, overnight: 56 }
      ]
    },
    "足柄": {
      series: [
        { year: 2019, visitors: null, overnight: null },
        { year: 2020, visitors: null, overnight: null },
        { year: 2021, visitors: null, overnight: null },
        { year: 2022, visitors: 368, overnight: 19 },
        { year: 2023, visitors: 408, overnight: 21 },
        { year: 2024, visitors: 412, overnight: 22 }
      ],
      note: "2019-2021年は独立区分なし（箱根・湯河原に含まれていた）"
    }
  },

  // === サブKPI 時系列データ ===
  subKPIs: {
    "外国人延べ宿泊者数": {
      unit: "万人泊",
      source: "観光庁 宿泊旅行統計調査（国籍別）",
      series: [
        { year: 2019, value: 410 },
        { year: 2020, value: 40 },
        { year: 2021, value: 10 },
        { year: 2022, value: 100 },
        { year: 2023, value: 323 },
        { year: 2024, value: 442 }
      ],
      note: "2024年は全国7位、前年比+37.0%"
    },
    "三浦半島入込観光客数": {
      unit: "万人",
      source: "神奈川県入込観光客調査（三浦半島エリア）",
      series: [
        { year: 2019, value: 1650 },
        { year: 2020, value: 968 },
        { year: 2021, value: 1093 },
        { year: 2022, value: 1353 },
        { year: 2023, value: 1511 },
        { year: 2024, value: 1627 }
      ],
      note: "目標1,675万人（2027年度）。公式ページ確認済み"
    },
    "県西地域入込観光客数": {
      unit: "万人",
      source: "神奈川県入込観光客調査（県西エリア）",
      series: [
        { year: 2019, value: 3141 },
        { year: 2020, value: 2153 },
        { year: 2021, value: 2434 },
        { year: 2022, value: 3315 },
        { year: 2023, value: 3685 },
        { year: 2024, value: 3789 }
      ],
      note: "目標3,655万人（2027年度）。箱根+足柄エリア合算。2019-2021年は箱根・湯河原区分の値"
    },
    "水源地域入込観光客数": {
      unit: "万人",
      source: "神奈川県入込観光客調査（水源地域）",
      series: [
        { year: 2019, value: 820 },
        { year: 2020, value: 400 },
        { year: 2021, value: 520 },
        { year: 2022, value: 743 },
        { year: 2023, value: 830 },
        { year: 2024, value: 880 }
      ],
      note: "目標955万人（2027年度）。宮ヶ瀬湖周辺"
    },
    "海外向けSNSフォロワー数": {
      unit: "人",
      source: "神奈川県観光公式SNS",
      series: [
        { year: 2019, value: 180000 },
        { year: 2020, value: 195000 },
        { year: 2021, value: 208000 },
        { year: 2022, value: 218789 },
        { year: 2023, value: 235000 },
        { year: 2024, value: 248000 }
      ],
      note: "目標295,000人（2027年度）"
    },
    "延べ宿泊者数": {
      unit: "万人泊",
      source: "観光庁 宿泊旅行統計調査（神奈川県）",
      series: [
        { year: 2019, value: 2680 },
        { year: 2020, value: 1260 },
        { year: 2021, value: 1410 },
        { year: 2022, value: 2209 },
        { year: 2023, value: 2430 },
        { year: 2024, value: 2530 }
      ]
    },
    "観光客満足度": {
      unit: "%",
      source: "神奈川県観光客実態調査",
      series: [
        { year: 2019, value: 76.2 },
        { year: 2020, value: null },
        { year: 2021, value: null },
        { year: 2022, value: 77.6 },
        { year: 2023, value: 78.5 },
        { year: 2024, value: null }
      ]
    },
    "me-byoエクスプラザ来場者数": {
      unit: "人",
      source: "神奈川県",
      series: [
        { year: 2019, value: 48000 },
        { year: 2020, value: 25000 },
        { year: 2021, value: 32000 },
        { year: 2022, value: 53681 },
        { year: 2023, value: 56000 },
        { year: 2024, value: null }
      ],
      note: "目標60,000人（2027年度）"
    }
  },

  // === 有料データソース コスト情報 ===
  paidDataCosts: {
    "mobaku": {
      name: "モバイル空間統計",
      provider: "ドコモ・インサイトマーケティング",
      estimatedCost: "要問合せ（年額100万〜数百万円）",
      pricingModel: "エリア数・メッシュサイズ・期間依存",
      note: "自治体向け廉価プランあり"
    },
    "agoop": {
      name: "Agoop人流データ",
      provider: "Agoop（ソフトバンクG）",
      estimatedCost: "要問合せ（年額100万〜数百万円）",
      pricingModel: "エリア数・データ種別・期間依存",
      note: "GPSベース、自治体実績豊富"
    },
    "zenrin": {
      name: "ゼンリン混雑統計",
      provider: "ゼンリンデータコム",
      estimatedCost: "要問合せ（数十万〜数百万円/年）",
      pricingModel: "対象エリア・データ種別依存",
      note: "地図データとの連携が強み"
    },
    "unerry": {
      name: "unerry Beacon Bank",
      provider: "unerry",
      estimatedCost: "要問合せ（月額数十万円〜）",
      pricingModel: "SaaS型/データ納品型",
      note: "ビーコン+GPS、屋内外対応"
    },
    "locmind": {
      name: "LocationMind xPop",
      provider: "LocationMind",
      estimatedCost: "要問合せ（年額数百万円〜）",
      pricingModel: "分析エリア・期間・粒度依存",
      note: "東大発、RESAS提供実績あり"
    },
    "navitime": {
      name: "NAVITIME観光データ",
      provider: "ナビタイムジャパン",
      estimatedCost: "要問合せ（年額数百万円〜）",
      pricingModel: "データ種別・エリア・期間依存",
      note: "検索・経路データ、インバウンド分析対応"
    },
    "custella": {
      name: "三井住友 Custella",
      provider: "三井住友カード",
      estimatedCost: "要問合せ（年額数百万〜数千万円）",
      pricingModel: "分析メニュー・エリア・範囲依存",
      note: "決済データ、自治体向け地域消費分析あり"
    },
    "visa": {
      name: "Visa消費動向データ",
      provider: "Visa",
      estimatedCost: "要問合せ（プロジェクト単位数百万円〜）",
      pricingModel: "コンサルティング契約",
      note: "インバウンド消費の国籍別分析に強み"
    },
    "tripadvisor": {
      name: "TripAdvisor Content API",
      provider: "Tripadvisor",
      estimatedCost: "要問合せ（パートナー契約必要）",
      pricingModel: "API呼出数・データ範囲の段階制",
      note: "口コミ・評価データ、満足度プロキシ"
    },
    "google-maps": {
      name: "Google Maps Places API",
      provider: "Google",
      estimatedCost: "従量課金（月$200無料クレジット）",
      pricingModel: "リクエスト数課金（$17〜32/千件）",
      note: "月$200無料枠で約6,000〜28,000件処理可"
    }
  }
};
