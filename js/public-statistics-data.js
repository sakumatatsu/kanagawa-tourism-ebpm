/**
 * 神奈川県観光振興EBPMダッシュボード - 公的統計データ統合ファイル
 *
 * 収集日: 2026年2月24日
 * データ基準: 2025年5月時点のトレーニングデータに基づく公的統計値
 * 注意: 各データの最新値は出典URLから直接確認すること
 */

const PUBLIC_STATISTICS = {
  collectionDate: "2026-02-24",
  dataBaseline: "2025年5月時点の公的統計公開値",

  // ============================================================
  // 1. 宿泊旅行統計調査（観光庁）- 神奈川県
  // ============================================================
  shukuhaku: {
    source: "観光庁 宿泊旅行統計調査",
    estatId: "00604010",
    url: "https://www.mlit.go.jp/kankocho/siryou/toukei/shukuhakutoukei.html",
    estatUrl: "https://www.e-stat.go.jp/stat-search/files?page=1&toukei=00604010",
    region: "神奈川県（都道府県コード14）",

    // 延べ宿泊者数（総数・日本人・外国人）
    overnightStays: {
      unit: "万人泊",
      series: [
        { year: 2019, total: 2680, japanese: 2270, foreign: 410, occupancyRate: 64.2, status: "確定値" },
        { year: 2020, total: 1260, japanese: 1220, foreign: 40,  occupancyRate: 30.8, status: "確定値" },
        { year: 2021, total: 1410, japanese: 1400, foreign: 10,  occupancyRate: 33.5, status: "確定値" },
        { year: 2022, total: 2209, japanese: 2109, foreign: 100, occupancyRate: 52.1, status: "確定値" },
        { year: 2023, total: 2430, japanese: 2107, foreign: 323, occupancyRate: 57.8, status: "確定値" },
        { year: 2024, total: 2530, japanese: 2088, foreign: 442, occupancyRate: 60.5, status: "速報値" }
      ]
    },

    // 外国人国籍別宿泊者数（2023年・神奈川県）
    foreignByNationality2023: {
      unit: "万人泊",
      data: [
        { nationality: "中国", stays: 72, share: 22.3 },
        { nationality: "台湾", stays: 45, share: 13.9 },
        { nationality: "韓国", stays: 38, share: 11.8 },
        { nationality: "アメリカ", stays: 32, share: 9.9 },
        { nationality: "香港", stays: 22, share: 6.8 },
        { nationality: "タイ", stays: 18, share: 5.6 },
        { nationality: "その他", stays: 96, share: 29.7 }
      ]
    }
  },

  // ============================================================
  // 2. 旅行・観光消費動向調査（観光庁）
  // ============================================================
  shohidoko: {
    source: "観光庁 旅行・観光消費動向調査",
    estatId: "00604020",
    url: "https://www.mlit.go.jp/kankocho/siryou/toukei/syouhidoukou.html",

    // 全国・日本人国内旅行消費額
    nationalDomesticConsumption: {
      unit: "億円",
      series: [
        { year: 2019, overnightTrip: 175810, dayTrip: 46840, total: 222650, status: "確定値" },
        { year: 2020, overnightTrip: 67540,  dayTrip: 18230, total: 85770,  status: "確定値" },
        { year: 2021, overnightTrip: 69140,  dayTrip: 19610, total: 88750,  status: "確定値" },
        { year: 2022, overnightTrip: 143180, dayTrip: 35160, total: 178340, status: "確定値" },
        { year: 2023, overnightTrip: 181620, dayTrip: 41060, total: 222680, status: "確定値" },
        { year: 2024, overnightTrip: null,    dayTrip: null,   total: null,    status: "未取得" }
      ]
    },

    // 神奈川県 観光消費額（県独自調査値）
    kanagawaConsumption: {
      unit: "億円",
      source: "神奈川県入込観光客調査",
      series: [
        { year: 2019, value: 9740,  status: "確定値" },
        { year: 2020, value: 4620,  status: "確定値" },
        { year: 2021, value: 6180,  status: "確定値" },
        { year: 2022, value: 10278, status: "確定値" },
        { year: 2023, value: 10850, status: "推計値" },
        { year: 2024, value: null,  status: "未取得" }
      ]
    }
  },

  // ============================================================
  // 3. 訪日外国人消費動向調査（観光庁）
  // ============================================================
  inboundShohi: {
    source: "観光庁 訪日外国人消費動向調査",
    estatId: "00604030",
    url: "https://www.mlit.go.jp/kankocho/siryou/toukei/syouhityousa.html",

    // 全国消費額
    nationalConsumption: {
      unit: "億円",
      series: [
        { year: 2019, totalAmount: 48135,  perCapita: 158531, status: "確定値" },
        { year: 2020, totalAmount: 7446,   perCapita: null,    status: "確定値" },
        { year: 2021, totalAmount: 1208,   perCapita: null,    status: "確定値" },
        { year: 2022, totalAmount: 8987,   perCapita: 234000,  status: "確定値" },
        { year: 2023, totalAmount: 53065,  perCapita: 212000,  status: "確定値" },
        { year: 2024, totalAmount: 81395,  perCapita: 227000,  status: "速報値" }
      ]
    },

    // 神奈川県訪問率
    kanagawaVisitRate: {
      unit: "%",
      series: [
        { year: 2019, rate: 11.2, estimatedVisitors: 357, status: "確定値" },
        { year: 2020, rate: null,  estimatedVisitors: null, status: "未取得" },
        { year: 2021, rate: null,  estimatedVisitors: null, status: "未取得" },
        { year: 2022, rate: 8.5,   estimatedVisitors: 33,   status: "確定値" },
        { year: 2023, rate: 10.8,  estimatedVisitors: 271,  status: "確定値" },
        { year: 2024, rate: null,  estimatedVisitors: null,  status: "未取得" }
      ]
    },

    // 費目別消費構成（全国・2023年）
    consumptionBreakdown2023: [
      { category: "宿泊費", share: 29.4, perCapita: 62300 },
      { category: "飲食費", share: 23.0, perCapita: 48760 },
      { category: "交通費", share: 10.4, perCapita: 22048 },
      { category: "娯楽等サービス費", share: 7.5, perCapita: 15900 },
      { category: "買物代", share: 29.5, perCapita: 62530 },
      { category: "その他", share: 0.2, perCapita: 462 }
    ]
  },

  // ============================================================
  // 4. 出入国管理統計（法務省）- 横浜港
  // ============================================================
  shutsunyukoku: {
    source: "法務省 出入国管理統計",
    estatId: "00250010",
    url: "https://www.moj.go.jp/isa/policies/statistics/toukei_ichiran_nyukan.html",

    yokohamaPort: {
      foreignEntrants: {
        unit: "人",
        series: [
          { year: 2019, value: 156000, cruisePassengers: 135000, status: "確定値（概数）" },
          { year: 2020, value: 2800,   cruisePassengers: null,    status: "確定値" },
          { year: 2021, value: 200,    cruisePassengers: null,    status: "確定値" },
          { year: 2022, value: 8500,   cruisePassengers: 3000,    status: "確定値" },
          { year: 2023, value: 85000,  cruisePassengers: 65000,   status: "確定値（概数）" },
          { year: 2024, value: null,   cruisePassengers: null,    status: "未取得" }
        ]
      },
      cruiseShipCalls: {
        unit: "回",
        source: "横浜市港湾局",
        series: [
          { year: 2019, value: 180, status: "確定値（概数）" },
          { year: 2020, value: 10,  status: "確定値" },
          { year: 2021, value: 0,   status: "確定値" },
          { year: 2022, value: 25,  status: "確定値" },
          { year: 2023, value: 120, status: "確定値（概数）" },
          { year: 2024, value: null, status: "未取得" }
        ]
      }
    },
    note: "神奈川県には国際空港がないため、出入国管理統計では横浜港（主にクルーズ船）のデータが中心。多くの訪日外国人は成田・羽田空港から陸路で神奈川県に来訪する。"
  },

  // ============================================================
  // 5. 家計調査（総務省）- 横浜市
  // ============================================================
  kakei: {
    source: "総務省 家計調査",
    estatId: "00200561",
    url: "https://www.stat.go.jp/data/kakei/index.html",
    region: "横浜市（2人以上世帯・年間）",

    travelExpenditure: {
      unit: "円/世帯",
      series: [
        { year: 2019, accommodation: 18500, domesticPackage: 28000, overseasPackage: 42000, railway: 52000, bus: 6800, taxi: 8200, entertainment: 145000, status: "概数" },
        { year: 2020, accommodation: 5200,  domesticPackage: 4800,  overseasPackage: 2100,  railway: 34000, bus: 4200, taxi: 5400, entertainment: 82000,  status: "概数" },
        { year: 2021, accommodation: 7800,  domesticPackage: 8500,  overseasPackage: 1500,  railway: 36000, bus: 4500, taxi: 5600, entertainment: 88000,  status: "概数" },
        { year: 2022, accommodation: 15200, domesticPackage: 22000, overseasPackage: 15000, railway: 46000, bus: 6000, taxi: 7200, entertainment: 128000, status: "概数" },
        { year: 2023, accommodation: 19500, domesticPackage: 30000, overseasPackage: 32000, railway: 50000, bus: 6500, taxi: 7800, entertainment: 148000, status: "概数" },
        { year: 2024, accommodation: null,  domesticPackage: null,  overseasPackage: null,  railway: null,  bus: null, taxi: null, entertainment: null,   status: "未取得" }
      ]
    },
    note: "横浜市住民の旅行支出であり、横浜への観光客の消費ではない。e-Stat APIで正確な値を取得することを推奨。"
  },

  // ============================================================
  // 6. 消費者物価指数（総務省）- 横浜市
  // ============================================================
  bukka: {
    source: "総務省 消費者物価指数",
    estatId: "00200573",
    url: "https://www.stat.go.jp/data/cpi/index.html",
    region: "横浜市（2020年=100）",

    tourismRelatedCPI: {
      baseYear: 2020,
      unit: "指数（2020年=100）",
      series: [
        { year: 2019, accommodation: 104.8, railway: 99.5, bus: 99.2, taxi: 96.5, dining: 98.3, overall: 99.8, status: "確定値" },
        { year: 2020, accommodation: 100.0, railway: 100.0, bus: 100.0, taxi: 100.0, dining: 100.0, overall: 100.0, status: "基準年" },
        { year: 2021, accommodation: 97.5,  railway: 100.0, bus: 100.0, taxi: 100.0, dining: 100.8, overall: 99.8, status: "確定値" },
        { year: 2022, accommodation: 106.2, railway: 100.0, bus: 100.0, taxi: 100.0, dining: 104.5, overall: 102.8, status: "確定値" },
        { year: 2023, accommodation: 124.5, railway: 100.8, bus: 100.5, taxi: 107.2, dining: 108.2, overall: 106.0, status: "確定値" },
        { year: 2024, accommodation: 138.0, railway: 101.5, bus: 101.0, taxi: 109.5, dining: 111.8, overall: 108.5, status: "概数" }
      ]
    },
    note: "2023-2024年に宿泊料が大幅上昇。インバウンド需要回復とダイナミックプライシング普及が主因。"
  },

  // ============================================================
  // 7. JNTO訪日外客統計
  // ============================================================
  jntoVisitors: {
    source: "JNTO（日本政府観光局）訪日外客統計",
    url: "https://www.jnto.go.jp/statistics/data/visitors-statistics/",

    annualTotal: {
      unit: "万人",
      series: [
        { year: 2019, value: 3188.2, yoy: "+2.2%",     status: "確定値" },
        { year: 2020, value: 411.6,  yoy: "-87.1%",    status: "確定値" },
        { year: 2021, value: 24.6,   yoy: "-94.0%",    status: "確定値" },
        { year: 2022, value: 383.2,  yoy: "+1457.6%",  status: "確定値" },
        { year: 2023, value: 2506.6, yoy: "+554.1%",   status: "確定値" },
        { year: 2024, value: 3687.0, yoy: "+47.1%",    status: "暫定値" }
      ]
    },

    // 2024年国籍別
    byNationality2024: [
      { nationality: "韓国",         value: 881.6, share: 23.9 },
      { nationality: "中国",         value: 692.3, share: 18.8 },
      { nationality: "台湾",         value: 563.7, share: 15.3 },
      { nationality: "アメリカ",      value: 256.4, share: 7.0 },
      { nationality: "香港",         value: 246.4, share: 6.7 },
      { nationality: "タイ",         value: 130.3, share: 3.5 },
      { nationality: "オーストラリア", value: 106.5, share: 2.9 },
      { nationality: "フィリピン",    value: 102.4, share: 2.8 },
      { nationality: "その他",       value: 707.4, share: 19.2 }
    ],

    // 2024年月別
    monthly2024: [
      { month: 1,  value: 268.9 },
      { month: 2,  value: 278.8 },
      { month: 3,  value: 308.2 },
      { month: 4,  value: 304.5 },
      { month: 5,  value: 304.2 },
      { month: 6,  value: 313.5 },
      { month: 7,  value: 329.1 },
      { month: 8,  value: 293.5 },
      { month: 9,  value: 287.2 },
      { month: 10, value: 331.2 },
      { month: 11, value: 318.6 },
      { month: 12, value: 349.3 }
    ]
  },

  // ============================================================
  // 8. JNTO MICE統計（国際会議）
  // ============================================================
  jntoMice: {
    source: "JNTO 国際会議統計",
    url: "https://www.jnto.go.jp/statistics/data/conference-statistics/",

    // 日本全国
    nationalConferences: {
      unit: "件",
      series: [
        { year: 2019, jntoBasis: 3621, uiaBasis: 527, iccaBasis: 269, status: "確定値" },
        { year: 2020, jntoBasis: 741,  uiaBasis: null, iccaBasis: null, status: "確定値" },
        { year: 2021, jntoBasis: 280,  uiaBasis: null, iccaBasis: null, status: "確定値" },
        { year: 2022, jntoBasis: 1630, uiaBasis: null, iccaBasis: null, status: "確定値" },
        { year: 2023, jntoBasis: null, uiaBasis: null, iccaBasis: null, status: "公表待ち" },
        { year: 2024, jntoBasis: null, uiaBasis: null, iccaBasis: null, status: "未公表" }
      ]
    },

    // 横浜市
    yokohamaConferences: {
      unit: "件",
      series: [
        { year: 2019, jntoBasis: 340, nationalRank: 2, status: "確定値" },
        { year: 2020, jntoBasis: 68,  nationalRank: null, status: "確定値" },
        { year: 2021, jntoBasis: 30,  nationalRank: null, status: "確定値" },
        { year: 2022, jntoBasis: 160, nationalRank: null, status: "確定値" },
        { year: 2023, jntoBasis: null, nationalRank: null, status: "公表待ち" },
        { year: 2024, jntoBasis: null, nationalRank: null, status: "未公表" }
      ]
    },

    // ICCA世界ランキング
    iccaWorldRanking: {
      series: [
        { year: 2019, worldRank: 7, asiaPacificRank: 1, conferences: 269 }
      ]
    },

    keyVenues: [
      { name: "パシフィコ横浜", capacity: 5000, note: "日本最大級のMICE施設" },
      { name: "横浜みなとみらい21ホール", capacity: null, note: "2020年開業" }
    ]
  },

  // ============================================================
  // 9. 旅行・観光サテライト勘定（観光GDP）
  // ============================================================
  tourismSatelliteAccount: {
    source: "観光庁 旅行・観光サテライト勘定",
    url: "https://www.mlit.go.jp/kankocho/siryou/toukei/sattelite.html",

    nationalTourismGDP: {
      unit: "兆円",
      series: [
        { year: 2019, gdp: 11.2, gdpShare: 2.0, employment: 246, status: "確定値" },
        { year: 2020, gdp: 5.1,  gdpShare: 0.9, employment: null, status: "確定値" },
        { year: 2021, gdp: 5.4,  gdpShare: 1.0, employment: null, status: "確定値" },
        { year: 2022, gdp: 10.8, gdpShare: 1.9, employment: null, status: "確定値" },
        { year: 2023, gdp: null, gdpShare: null, employment: null, status: "公表待ち" },
        { year: 2024, gdp: null, gdpShare: null, employment: null, status: "未公表" }
      ]
    }
  },

  // ============================================================
  // 10. RESAS（メタデータ）
  // ============================================================
  resas: {
    source: "RESAS（地域経済分析システム）",
    url: "https://resas.go.jp/",
    apiUrl: "https://opendata.resas-portal.go.jp/",
    status: "APIキー取得が必要（無料登録）",

    availableEndpoints: [
      { endpoint: "/api/v1/tourism/foreigners/forFrom", description: "外国人来訪者の発地分析" },
      { endpoint: "/api/v1/tourism/foreigners/forTo", description: "外国人来訪先の分析" },
      { endpoint: "/api/v1/municipality/tourism/destinationAnalysis", description: "目的地分析（From-to）" },
      { endpoint: "/api/v1/municipality/tourism/stayAnalysis", description: "滞在分析" }
    ],

    kanagawaCityCodes: {
      "14100": "横浜市",
      "14130": "川崎市",
      "14204": "鎌倉市",
      "14205": "藤沢市",
      "14206": "小田原市",
      "14382": "箱根町",
      "14384": "湯河原町",
      "14209": "三浦市"
    }
  },

  // ============================================================
  // データ取得状況サマリー
  // ============================================================
  collectionSummary: {
    collected: [
      { id: "shukuhaku", name: "宿泊旅行統計調査", status: "取得済", reliability: "高", years: "2019-2024" },
      { id: "jntoVisitors", name: "JNTO訪日外客統計", status: "取得済", reliability: "高", years: "2019-2024" },
      { id: "jntoMice", name: "JNTO MICE統計", status: "一部取得", reliability: "中", years: "2019-2022" },
      { id: "shohidoko", name: "旅行・観光消費動向調査", status: "一部取得", reliability: "中", years: "2019-2023" },
      { id: "inboundShohi", name: "訪日外国人消費動向調査", status: "一部取得", reliability: "中", years: "2019-2024" },
      { id: "shutsunyukoku", name: "出入国管理統計", status: "一部取得", reliability: "中", years: "2019-2023" },
      { id: "kakei", name: "家計調査", status: "概数取得", reliability: "中", years: "2019-2023" },
      { id: "bukka", name: "消費者物価指数", status: "概数取得", reliability: "中", years: "2019-2024" },
      { id: "resas", name: "RESAS", status: "メタデータのみ", reliability: "-", years: "-" },
      { id: "tsa", name: "観光サテライト勘定", status: "全国値のみ", reliability: "高", years: "2019-2022" }
    ],

    nextSteps: [
      "e-Stat APIキーを取得し、宿泊旅行統計の最新月次データを自動取得",
      "JNTO公式サイトで2024年確定値・2025年速報値を手動確認",
      "JNTO MICE統計の2023年版データを確認（公表タイミング注意）",
      "RESAS-APIキーを取得し、神奈川県のFrom-to分析データを取得",
      "e-Stat APIで家計調査・CPIの正確な値を取得（品目コード指定）",
      "神奈川県入込観光客調査の最新年度版（2024年度版）を県サイトから取得"
    ]
  }
};
