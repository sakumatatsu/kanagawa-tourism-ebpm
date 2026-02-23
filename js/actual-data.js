/**
 * 神奈川県観光振興EBPMダッシュボード - 実データ（時系列 + コスト情報）
 * 出典: 神奈川県入込観光客調査、観光庁宿泊旅行統計調査、神奈川県観光客実態調査 等
 * 最終更新: 2025年2月（データソース別実データ追加: 2026年2月24日）
 */

const ACTUAL_DATA = {
  lastUpdated: "2026-02-24",

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
  },

  // === データソース別 代表値（カタログ表示用） ===
  // 各データソースIDに紐づく代表的な最新値。
  // reliability: "high"=公式確認済, "medium"=近似値（公式サイトで要確認）, "low"=推定値, "meta"=メタデータのみ
  dataSourceValues: {
    // --- 公的統計（国） ---
    "shukuhaku": {
      label: "延べ宿泊者数（神奈川県）", latestValue: "2,530", unit: "万人泊", year: 2024,
      detail: "うち外国人442万人泊。客室稼働率60.5%", reliability: "high"
    },
    "shohidoko": {
      label: "日本人国内旅行消費額（全国）", latestValue: "22.3", unit: "兆円", year: 2023,
      detail: "宿泊旅行18.2兆円＋日帰り4.1兆円", reliability: "medium"
    },
    "inbound-shohi": {
      label: "訪日外国人旅行消費額（全国）", latestValue: "8.1", unit: "兆円", year: 2024,
      detail: "1人あたり約22.7万円。神奈川県訪問率10.8%(2023)", reliability: "medium"
    },
    "keizai-census": {
      label: "宿泊業・飲食サービス業事業所数（神奈川県）", latestValue: "約33,000", unit: "事業所", year: 2021,
      detail: "5年周期調査。次回2026年度公表予定", reliability: "medium"
    },
    "ryokaku": {
      label: "旅客地域流動（神奈川県発着）", latestValue: "---", unit: "", year: null,
      detail: "e-Stat APIで取得可。鉄道・航空の旅客流動量", reliability: "meta"
    },
    "tetsudo": {
      label: "鉄道輸送統計（神奈川県内各線）", latestValue: "---", unit: "", year: null,
      detail: "月次データ。e-Stat ID: 00600350", reliability: "meta"
    },
    "kowan": {
      label: "横浜港 クルーズ船寄港回数", latestValue: "約120", unit: "回", year: 2023,
      detail: "外国人入港者 約8.5万人（2023年概数）", reliability: "medium"
    },
    "kokusei": {
      label: "神奈川県人口", latestValue: "924", unit: "万人", year: 2020,
      detail: "全国2位。次回2025年調査", reliability: "high"
    },
    "jumin": {
      label: "神奈川県人口（住基）", latestValue: "920.4", unit: "万人", year: 2024,
      detail: "年次更新。微減傾向", reliability: "medium"
    },
    "shakai-seikatsu": {
      label: "余暇活動（旅行・行楽行動者率）", latestValue: "---", unit: "", year: null,
      detail: "5年周期。直近2021年調査", reliability: "meta"
    },
    "kakei": {
      label: "横浜市 宿泊料支出", latestValue: "19,500", unit: "円/世帯年", year: 2023,
      detail: "2人以上世帯。パック旅行費30,000円", reliability: "medium"
    },
    "kenmin-keizai": {
      label: "県内総生産（神奈川県）", latestValue: "35.8", unit: "兆円", year: 2021,
      detail: "全国4位。観光GDPシェアは全国平均2.0%", reliability: "medium"
    },
    "shakai-kyoiku": {
      label: "博物館数（神奈川県）", latestValue: "約120", unit: "施設", year: 2021,
      detail: "3年周期調査。美術館含む。来館者数も取得可", reliability: "medium"
    },
    "shutsunyukoku": {
      label: "横浜港 外国人入港者", latestValue: "約85,000", unit: "人", year: 2023,
      detail: "クルーズ旅客約65,000人。2019年比55%回復", reliability: "medium"
    },
    "kensetsu": {
      label: "宿泊施設新築着工（神奈川県）", latestValue: "---", unit: "", year: null,
      detail: "月次。新規ホテル建設動向の先行指標", reliability: "meta"
    },
    "bukka": {
      label: "横浜市 宿泊料物価指数", latestValue: "138.0", unit: "(2020=100)", year: 2024,
      detail: "2019年比+31.7%。ダイナミックプライシング影響大", reliability: "medium"
    },
    "kinro": {
      label: "宿泊業・飲食サービス業 賃金", latestValue: "---", unit: "", year: null,
      detail: "月次。人手不足の把握に有用", reliability: "meta"
    },

    // --- 公的統計（県・市町村） ---
    "irikomi": {
      label: "延べ入込観光客数", latestValue: "20,806", unit: "万人", year: 2024,
      detail: "過去最高更新。前年比+8.9%", reliability: "high"
    },
    "jittai": {
      label: "観光客満足度", latestValue: "78.5", unit: "%", year: 2023,
      detail: "目標80%（2027年度）。2020-2021年は未実施", reliability: "high"
    },
    "dmo-data": {
      label: "かながわDMOデータ", latestValue: "36", unit: "種類", year: 2024,
      detail: "イベント・宿泊・交通等36データセット", reliability: "meta"
    },
    "yokohama-kanko": {
      label: "横浜市観光客数", latestValue: "---", unit: "", year: null,
      detail: "年次調査。横浜市文化観光局が公表", reliability: "meta"
    },
    "kenmin-keizai-ken": {
      label: "県民経済計算（詳細版）", latestValue: "---", unit: "", year: null,
      detail: "サービス業別GDP等。県版は国版より詳細", reliability: "meta"
    },
    "sanren": {
      label: "産業連関表（経済波及効果）", latestValue: "---", unit: "", year: null,
      detail: "5年周期。観光消費の波及効果分析に使用", reliability: "meta"
    },
    "hakyu": {
      label: "経済波及効果分析ツール", latestValue: "---", unit: "", year: null,
      detail: "Excel形式。観光消費額→経済波及効果を試算", reliability: "meta"
    },
    "kenseiyoran": {
      label: "県勢要覧（観光関連）", latestValue: "---", unit: "", year: null,
      detail: "観光施設入場者数、文化施設利用者数等", reliability: "meta"
    },
    "miyagase": {
      label: "宮ヶ瀬湖周辺 観光客消費動向", latestValue: "---", unit: "", year: null,
      detail: "不定期調査。水源地域の観光振興に活用", reliability: "meta"
    },

    // --- 準公的データ ---
    "resas": {
      label: "RESAS観光マップ", latestValue: "API提供", unit: "", year: 2024,
      detail: "From-to分析・外国人来訪分析等。APIキー(無料)で利用可", reliability: "meta"
    },
    "jnto": {
      label: "訪日外国人旅行者数（全国）", latestValue: "3,687", unit: "万人", year: 2024,
      detail: "過去最高。韓国23.9%・中国18.8%・台湾15.3%", reliability: "high"
    },

    // --- 交通データ（無料） ---
    "jr-east": {
      label: "横浜駅 1日平均乗車人員", latestValue: "380,465", unit: "人/日", year: 2023,
      detail: "鎌倉39,710人、小田原44,285人", reliability: "medium"
    },
    "odakyu": {
      label: "小田原駅 1日平均乗降人員", latestValue: "60,844", unit: "人/日", year: 2023,
      detail: "本厚木120,264人、町田270,136人", reliability: "medium"
    },
    "keikyu": {
      label: "横浜駅(京急) 1日平均乗降人員", latestValue: "290,470", unit: "人/日", year: 2023,
      detail: "三浦海岸8,830人（観光需要指標）", reliability: "medium"
    },
    "sotetsu": {
      label: "横浜駅(相鉄) 1日平均乗降人員", latestValue: "346,870", unit: "人/日", year: 2023,
      detail: "2023年 相鉄・東急直通線開業の影響あり", reliability: "medium"
    },
    "tokyu": {
      label: "横浜駅(東急) 1日平均乗降人員", latestValue: "154,210", unit: "人/日", year: 2023,
      detail: "武蔵小杉199,438人", reliability: "medium"
    },
    "enoden": {
      label: "江ノ電 年間輸送人員", latestValue: "1,688", unit: "万人", year: 2023,
      detail: "鎌倉駅23,560人/日。2019年比95.5%", reliability: "medium"
    },
    "hakone-tozan": {
      label: "箱根登山鉄道 年間輸送人員", latestValue: "788", unit: "万人", year: 2023,
      detail: "ケーブルカー142万人。2019年比92%まで回復", reliability: "medium"
    },
    "yokohama-subway": {
      label: "横浜駅(地下鉄) 1日平均乗車人員", latestValue: "89,120", unit: "人/日", year: 2023,
      detail: "新横浜47,850人、関内26,180人", reliability: "medium"
    },

    // --- 消費・決済データ ---
    "jcb": {
      label: "JCB消費NOW（基本指数のみ無料）", latestValue: "---", unit: "", year: null,
      detail: "ナウキャスト社との共同提供。地域消費指数", reliability: "meta"
    },

    // --- 旅行・宿泊プラットフォーム ---
    "jalan": {
      label: "じゃらんリサーチセンター", latestValue: "---", unit: "", year: null,
      detail: "温泉地満足度ランキング等。概要版のみ公開", reliability: "meta"
    },
    "rakuten": {
      label: "楽天トラベルAPI", latestValue: "API提供", unit: "", year: 2024,
      detail: "宿泊施設情報・口コミ。APIキー(無料)で利用可", reliability: "meta"
    },
    "jtb": {
      label: "JTB総合研究所", latestValue: "---", unit: "", year: null,
      detail: "旅行市場レポート（概要版のみ公開）", reliability: "meta"
    },
    "airbnb": {
      label: "神奈川県 Airbnbリスティング数", latestValue: "約5,750", unit: "件", year: 2024,
      detail: "横浜約3,800件・箱根約1,100件（推定値）", reliability: "low"
    },

    // --- SNS・口コミ・検索 ---
    "google-trends": {
      label: "「鎌倉」検索トレンド指数", latestValue: "100", unit: "(相対値)", year: 2024,
      detail: "過去最高。「箱根」95、「江ノ島」93（推定値）", reliability: "low"
    },

    // --- 気象・環境データ ---
    "jma": {
      label: "横浜 年平均気温", latestValue: "17.6", unit: "℃", year: 2024,
      detail: "年間降水量1,720mm。温暖化傾向", reliability: "medium"
    },
    "sakura": {
      label: "桜・紅葉開花データ", latestValue: "---", unit: "", year: null,
      detail: "日本気象協会が季節ごとに公開。観光シーズン予測に活用", reliability: "meta"
    },

    // --- 人流データ（有料） ---
    "mobaku": {
      label: "モバイル空間統計", latestValue: "---", unit: "", year: null,
      detail: "NTTドコモ提供。推定月額30〜100万円。エリア×時間帯の滞在人口推計", reliability: "meta"
    },
    "agoop": {
      label: "Agoop人流データ", latestValue: "---", unit: "", year: null,
      detail: "ソフトバンク子会社。推定月額20〜80万円。スマホGPSベースの人流分析", reliability: "meta"
    },
    "zenrin": {
      label: "ゼンリン混雑統計", latestValue: "---", unit: "", year: null,
      detail: "ゼンリンデータコム。推定月額15〜50万円。混雑度マップ・リアルタイム分析", reliability: "meta"
    },
    "unerry": {
      label: "unerry Beacon Bank", latestValue: "---", unit: "", year: null,
      detail: "unerry社。推定月額20〜60万円。ビーコン+GPSの行動データ", reliability: "meta"
    },
    "locmind": {
      label: "LocationMind xPop", latestValue: "---", unit: "", year: null,
      detail: "LocationMind社。推定月額30〜80万円。携帯基地局ベースの人口統計", reliability: "meta"
    },
    "navitime": {
      label: "NAVITIME観光データ", latestValue: "---", unit: "", year: null,
      detail: "ナビタイムジャパン。推定月額15〜50万円。経路検索データの観光分析", reliability: "meta"
    },

    // --- 消費・決済データ（有料） ---
    "custella": {
      label: "三井住友 Custella", latestValue: "---", unit: "", year: null,
      detail: "三井住友カード。推定月額50〜150万円。クレジットカード決済ベースの消費動向", reliability: "meta"
    },
    "visa": {
      label: "Visa消費動向データ", latestValue: "---", unit: "", year: null,
      detail: "Visa Inc.。推定要問合せ。国際カード決済の訪日外国人消費分析", reliability: "meta"
    },

    // --- SNS・口コミ（有料API） ---
    "tripadvisor": {
      label: "TripAdvisor API", latestValue: "---", unit: "", year: null,
      detail: "TripAdvisor LLC。API月額$500〜。口コミスコア・レビュー件数の分析", reliability: "meta"
    },
    "google-maps": {
      label: "Google Maps レビュー", latestValue: "---", unit: "", year: null,
      detail: "Google Places API。$17/1000リクエスト。施設評価・口コミ分析", reliability: "meta"
    }
  }
};
