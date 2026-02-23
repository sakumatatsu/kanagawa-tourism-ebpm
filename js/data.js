/**
 * 神奈川県観光振興EBPMダッシュボード - データ定義
 * 新かながわグランドデザイン準拠の因数分解ツリー + 拡充データソース
 */

const KANAGAWA_TOURISM_DATA = {
  // === 最上位アウトカム ===
  topLevel: {
    title: "観光振興による地域経済の持続的発展",
    subtitle: "新かながわグランドデザイン PJ5 観光・地域活性化",
    kpis: [
      {
        name: "観光消費額総額",
        timeSeriesKey: "観光消費額総額",
        baseline: { value: 10278, year: 2022, unit: "億円" },
        target: { value: 11896, year: 2027, unit: "億円" },
        latest: { value: null, year: 2024, unit: "億円" },
        achievement: null
      },
      {
        name: "延べ入込観光客数",
        timeSeriesKey: "延べ入込観光客数",
        baseline: { value: 19109, year: 2022, unit: "万人" },
        target: { value: null, year: 2027, unit: "万人" },
        latest: { value: 20806, year: 2024, unit: "万人" },
        achievement: null,
        note: "過去最高"
      },
      {
        name: "延べ宿泊者数",
        timeSeriesKey: "延べ宿泊者数",
        baseline: { value: 2209, year: 2022, unit: "万人泊" },
        target: { value: 2530, year: 2027, unit: "万人泊" },
        latest: { value: null, year: 2024, unit: "万人泊" },
        achievement: null
      },
      {
        name: "観光客満足度",
        timeSeriesKey: "観光客満足度",
        baseline: { value: 77.6, year: 2022, unit: "%" },
        target: { value: 80, year: 2027, unit: "%" },
        latest: { value: null, year: 2024, unit: "%" },
        achievement: null
      }
    ]
  },

  // === 切り口A: 施策・事業別 ===
  byPolicy: {
    id: "policy",
    label: "施策・事業別",
    description: "新かながわグランドデザインの施策体系に基づく分解",
    children: [
      {
        id: "pillar-a",
        label: "柱A: 観光の振興",
        value: 45,
        children: [
          {
            id: "policy-318",
            label: "施策318: 観光資源の発掘・磨き上げ/人材育成",
            value: 15,
            description: "MICE施設活用、富裕層向けコンテンツ開発、質の高いガイド人材育成",
            kpis: [
              {
                name: "観光客満足度",
                baseline: { value: 77.6, year: 2022 },
                target: { value: 80, year: 2027 },
                targets: { 2024: 80, 2025: 80, 2026: 80, 2027: 80 }
              }
            ],
            dataSources: [
              { name: "神奈川県観光客実態調査", provider: "神奈川県", type: "public", frequency: "年次", format: "PDF", url: "https://www.pref.kanagawa.jp/docs/b6m/cnt/f80022/p1185401.html" },
              { name: "TripAdvisor口コミ評価", provider: "Tripadvisor", type: "private", frequency: "リアルタイム", format: "API", url: "https://www.tripadvisor.jp/", note: "観光地の満足度プロキシ" },
              { name: "Google Maps レビュー", provider: "Google", type: "private", frequency: "リアルタイム", format: "API", note: "スポット別評価データ" },
              { name: "社会教育調査（博物館・美術館）", provider: "文部科学省", type: "public", frequency: "3年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00400001", note: "文化施設の利用者数" },
              { name: "宗教統計調査", provider: "文化庁", type: "public", frequency: "年次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00400401", note: "神社仏閣数（鎌倉等）" },
              { name: "じゃらん宿泊旅行調査", provider: "リクルート", type: "private-free", frequency: "年次", format: "PDF", url: "https://jrc.jalan.net/", note: "温泉地満足度ランキング等" }
            ]
          },
          {
            id: "policy-319",
            label: "施策319: 観光客の受入環境整備",
            value: 15,
            description: "外国人観光客受入体制、観光DX、高付加価値化、安全・安心確保",
            kpis: [
              {
                name: "延べ宿泊者数",
                baseline: { value: 2209, year: 2022 },
                target: { value: 2530, year: 2027 },
                targets: { 2024: 2430, 2025: 2462, 2026: 2495, 2027: 2530 }
              }
            ],
            dataSources: [
              { name: "宿泊旅行統計調査", provider: "観光庁", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00604010", note: "延べ宿泊者数・客室稼働率・外国人宿泊者数" },
              { name: "経済センサス-活動調査", provider: "総務省・経済産業省", type: "public", frequency: "5年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00200553", note: "宿泊業・飲食サービス業の事業所数・従業者数" },
              { name: "建築着工統計調査", provider: "国土交通省", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00600120", note: "宿泊施設の新規建設動向" },
              { name: "楽天トラベル施設データ", provider: "楽天", type: "private", frequency: "リアルタイム", format: "API", url: "https://webservice.rakuten.co.jp/", note: "宿泊施設情報・口コミ" },
              { name: "Airbnb物件データ", provider: "Inside Airbnb", type: "private-free", frequency: "四半期", format: "CSV", url: "http://insideairbnb.com/", note: "民泊市場の規模" }
            ]
          },
          {
            id: "policy-320",
            label: "施策320: 戦略的プロモーション",
            value: 15,
            description: "多様なテーマの周遊ツーリズム、デジタルツール活用情報発信",
            kpis: [
              {
                name: "海外向けSNSフォロワー数",
                baseline: { value: 218789, year: 2022 },
                target: { value: 295000, year: 2027 },
                targets: { 2024: 242000, 2025: 258000, 2026: 276000, 2027: 295000 }
              }
            ],
            dataSources: [
              { name: "Google Trends", provider: "Google", type: "private-free", frequency: "リアルタイム", format: "CSV", url: "https://trends.google.co.jp/", note: "観光地の検索トレンド" },
              { name: "SNS分析（Instagram/X）", provider: "各種", type: "private", frequency: "リアルタイム", format: "API", note: "ハッシュタグ投稿数・エンゲージメント" },
              { name: "NAVITIME検索データ", provider: "ナビタイムジャパン", type: "private", frequency: "月次", format: "API", url: "https://corporate.navitime.co.jp/", note: "観光スポット検索トレンド" },
              { name: "訪日外国人消費動向調査", provider: "観光庁", type: "public", frequency: "四半期", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00604030", note: "都道府県別訪問率" },
              { name: "JNTO訪日外客統計", provider: "日本政府観光局", type: "public", frequency: "月次", format: "CSV", url: "https://www.jnto.go.jp/statistics/", note: "国籍別訪日外国人数" }
            ]
          }
        ]
      },
      {
        id: "pillar-b",
        label: "柱B: 地域にひとの流れをつくる取組",
        value: 40,
        children: [
          {
            id: "miura-pj",
            label: "三浦半島魅力最大化PJ",
            value: 10,
            description: "「海」「食」など地域資源活用、湘南国際村のにぎわい創出",
            kpis: [
              {
                name: "三浦半島入込観光客数",
                baseline: { value: 1353, year: 2022 },
                target: { value: 1675, year: 2027 },
                targets: { 2024: 1483, 2025: 1547, 2026: 1611, 2027: 1675 }
              },
              {
                name: "三浦半島消費額",
                baseline: { value: 183, year: 2022 },
                target: { value: 265, year: 2027 }
              }
            ],
            dataSources: [
              { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public", frequency: "年次", format: "Excel/PDF", url: "https://www.pref.kanagawa.jp/docs/b6m/cnt/f80022/p27746.html" },
              { name: "京急電鉄 駅別乗降人員", provider: "京浜急行電鉄", type: "private-free", frequency: "年次", format: "Web", note: "三崎口駅・横須賀中央駅等" },
              { name: "Agoop人流データ", provider: "Agoop", type: "private", frequency: "日次〜月次", format: "API", url: "https://www.agoop.co.jp/", note: "三浦半島エリアの来訪者数推計" },
              { name: "JCB消費NOW", provider: "JCB/ナウキャスト", type: "private-free", frequency: "月次", format: "Web", url: "https://www.jcbconsumptionnow.com/", note: "地域別消費動向" }
            ]
          },
          {
            id: "sea-pj",
            label: "かながわシープロジェクト",
            value: 10,
            description: "民間連携による海上交通活性化、海洋ツーリズム推進",
            kpis: [],
            dataSources: [
              { name: "港湾統計", provider: "国土交通省", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00600060", note: "横浜港の旅客数・クルーズ船寄港回数" },
              { name: "内航船舶輸送統計調査", provider: "国土交通省", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00600380" },
              { name: "出入国管理統計", provider: "法務省", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00250010", note: "横浜港の外国人入国者数" }
            ]
          },
          {
            id: "kensei-pj",
            label: "県西地域活性化PJ",
            value: 10,
            description: "未病改善実践促進、未病バレー「ビオトピア」活用",
            kpis: [
              {
                name: "県西地域入込観光客数",
                baseline: { value: 3315, year: 2022 },
                target: { value: 3655, year: 2027 },
                targets: { 2024: 3451, 2025: 3519, 2026: 3587, 2027: 3655 }
              },
              {
                name: "県西地域消費額",
                baseline: { value: 1230, year: 2022 },
                target: { value: 1300, year: 2027 }
              },
              {
                name: "me-byoエクスプラザ来場者数",
                baseline: { value: 53681, year: 2022 },
                target: { value: 60000, year: 2027 },
                targets: { 2024: 57000, 2025: 58000, 2026: 59000, 2027: 60000 }
              }
            ],
            dataSources: [
              { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public", frequency: "年次", format: "Excel/PDF" },
              { name: "小田急電鉄 駅別乗降人員", provider: "小田急電鉄", type: "private-free", frequency: "年次", format: "Web", url: "https://www.odakyu.jp/company/business/railways/users/", note: "箱根湯本駅・小田原駅等" },
              { name: "箱根登山鉄道 輸送実績", provider: "箱根登山鉄道", type: "private-free", frequency: "年次", format: "Web", note: "箱根観光の直接指標" },
              { name: "モバイル空間統計", provider: "ドコモ・インサイトマーケティング", type: "private", frequency: "月次", format: "API", url: "https://mobaku.jp/", note: "箱根・小田原エリアの来訪者属性" }
            ]
          },
          {
            id: "suigen-pj",
            label: "水源地域活性化",
            value: 10,
            description: "宮ヶ瀬湖等の自然・歴史・文化資源発信",
            kpis: [
              {
                name: "水源地域入込観光客数",
                baseline: { value: 743, year: 2022 },
                target: { value: 955, year: 2027 },
                targets: { 2024: 900, 2025: 918, 2026: 936, 2027: 955 }
              }
            ],
            dataSources: [
              { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public", frequency: "年次", format: "Excel/PDF" },
              { name: "気象庁 気象データ", provider: "気象庁", type: "public", frequency: "日次", format: "CSV", url: "https://www.data.jma.go.jp/gmd/risk/obsdl/", note: "天候と来訪者数の相関分析" }
            ]
          }
        ]
      },
      {
        id: "pillar-c",
        label: "柱C: 移住・定住の促進",
        value: 10,
        children: [
          {
            id: "iju-web",
            label: "移住情報発信",
            value: 5,
            kpis: [
              {
                name: "移住関連ウェブPV数",
                baseline: { value: 200162, year: 2022 },
                target: { value: 700000, year: 2027 }
              }
            ],
            dataSources: [
              { name: "Google Trends", provider: "Google", type: "private-free", frequency: "リアルタイム", format: "CSV", url: "https://trends.google.co.jp/", note: "「神奈川 移住」等の検索トレンド" },
              { name: "住民基本台帳人口", provider: "総務省", type: "public", frequency: "年次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00200241", note: "転入超過数" }
            ]
          },
          {
            id: "iju-jisshi",
            label: "移住施策の推進",
            value: 5,
            kpis: [
              {
                name: "移住施策経由の移住者数",
                baseline: { value: 222, year: 2022 },
                target: { value: 242, year: 2027 }
              }
            ],
            dataSources: [
              { name: "住民基本台帳人口移動報告", provider: "総務省", type: "public", frequency: "年次", format: "CSV", url: "https://www.e-stat.go.jp/", note: "市町村別転入・転出" },
              { name: "国勢調査", provider: "総務省", type: "public", frequency: "5年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00200521", note: "人口構造・就業構造" }
            ]
          }
        ]
      },
      {
        id: "cross-cutting",
        label: "分野横断施策",
        value: 5,
        children: [
          {
            id: "magcul",
            label: "マグネット・カルチャー（文化×観光）",
            value: 2,
            kpis: [
              {
                name: "文化芸術の鑑賞・参加率",
                baseline: { value: 39.8, year: 2022 },
                target: { value: 50.0, year: 2027 }
              }
            ],
            dataSources: [
              { name: "社会生活基本調査", provider: "総務省", type: "public", frequency: "5年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00200533", note: "余暇活動の行動者率" },
              { name: "社会教育調査", provider: "文部科学省", type: "public", frequency: "3年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00400001" }
            ]
          },
          {
            id: "global",
            label: "グローバル戦略（インバウンド・MICE）",
            value: 2,
            kpis: [
              {
                name: "外国人延べ宿泊者数",
                baseline: { value: null, year: 2022 },
                target: { value: null, year: 2027 },
                latest: { value: 442, year: 2024, unit: "万人泊", note: "全国7位、前年比+37.0%" }
              }
            ],
            dataSources: [
              { name: "宿泊旅行統計調査（国籍別）", provider: "観光庁", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00604010" },
              { name: "訪日外国人消費動向調査", provider: "観光庁", type: "public", frequency: "四半期", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00604030" },
              { name: "出入国管理統計", provider: "法務省", type: "public", frequency: "月次", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00250010" },
              { name: "Visa消費動向データ", provider: "Visa", type: "private", frequency: "四半期", format: "レポート", note: "インバウンド消費の国籍別分析" }
            ]
          },
          {
            id: "sports",
            label: "スポーツツーリズム",
            value: 1,
            kpis: [
              {
                name: "県民スポーツ月間参加者数",
                baseline: { value: null, year: 2022 },
                target: { value: 270000, year: 2027 }
              }
            ],
            dataSources: [
              { name: "社会生活基本調査", provider: "総務省", type: "public", frequency: "5年", format: "CSV", url: "https://www.e-stat.go.jp/", estatId: "00200533" }
            ]
          }
        ]
      }
    ]
  },

  // === 切り口B: 地域別 ===
  byRegion: {
    id: "region",
    label: "地域別",
    description: "7つの観光エリアに基づく分解",
    children: [
      {
        id: "yokohama-kawasaki",
        label: "横浜・川崎",
        value: 7887,
        growth: 12.6,
        dayTrip: 7100,
        overnight: 787,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "JR東日本 各駅乗車人員", provider: "JR東日本", type: "private-free", url: "https://www.jreast.co.jp/passenger/", note: "横浜駅等" },
          { name: "横浜市交通局 駅別乗車人員", provider: "横浜市", type: "public", note: "中華街・みなとみらい" },
          { name: "東急電鉄 駅別乗降人員", provider: "東急", type: "private-free", url: "https://www.tokyu.co.jp/company/business/railway/passengers/" },
          { name: "相鉄 駅別乗降人員", provider: "相鉄HD", type: "private-free" },
          { name: "港湾統計（横浜港）", provider: "国土交通省", type: "public" },
          { name: "モバイル空間統計", provider: "ドコモ", type: "private" },
          { name: "JCB消費NOW", provider: "JCB", type: "private-free" }
        ]
      },
      {
        id: "shonan",
        label: "湘南",
        value: 5036,
        growth: 10.5,
        dayTrip: 4730,
        overnight: 306,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "JR東日本 各駅乗車人員", provider: "JR東日本", type: "private-free", note: "藤沢駅・茅ヶ崎駅等" },
          { name: "江ノ島電鉄 乗降人員", provider: "江ノ電", type: "private-free", note: "観光動向の直接指標" },
          { name: "小田急電鉄 駅別乗降人員", provider: "小田急電鉄", type: "private-free", note: "藤沢駅・片瀬江ノ島駅" }
        ]
      },
      {
        id: "hakone",
        label: "箱根",
        value: 3377,
        growth: 3.1,
        dayTrip: 2500,
        overnight: 877,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "箱根登山鉄道 輸送実績", provider: "箱根登山鉄道", type: "private-free" },
          { name: "小田急電鉄 駅別乗降人員", provider: "小田急電鉄", type: "private-free", note: "箱根湯本駅" },
          { name: "宿泊旅行統計調査", provider: "観光庁", type: "public", note: "箱根地区の宿泊データ" },
          { name: "気象庁データ", provider: "気象庁", type: "public", note: "天候と来訪の相関" },
          { name: "じゃらん温泉地満足度", provider: "リクルート", type: "private-free" }
        ]
      },
      {
        id: "miura",
        label: "三浦半島",
        value: 1627,
        growth: 7.7,
        dayTrip: 1480,
        overnight: 147,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "京急電鉄 駅別乗降人員", provider: "京急", type: "private-free", note: "三崎口駅・横須賀中央駅" }
        ]
      },
      {
        id: "tanzawa",
        label: "丹沢大山",
        value: 1261,
        growth: 4.4,
        dayTrip: 1200,
        overnight: 61,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "小田急電鉄 駅別乗降人員", provider: "小田急電鉄", type: "private-free", note: "秦野駅・伊勢原駅" }
        ]
      },
      {
        id: "sagamiko",
        label: "相模湖・相模川流域",
        value: 1206,
        growth: 4.9,
        dayTrip: 1150,
        overnight: 56,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" },
          { name: "JR東日本 各駅乗車人員", provider: "JR東日本", type: "private-free", note: "相模湖駅等" }
        ]
      },
      {
        id: "ashigara",
        label: "足柄",
        value: 412,
        growth: 1.0,
        dayTrip: 390,
        overnight: 22,
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public" }
        ]
      }
    ]
  },

  // === 切り口C: 観光資源タイプ別 ===
  byResourceType: {
    id: "resource",
    label: "観光資源タイプ別",
    description: "観光資源の種類に基づく分解",
    children: [
      {
        id: "nature",
        label: "自然",
        value: 25,
        children: [
          { id: "beach", label: "海浜・海洋", value: 8, note: "湘南海岸、三浦海岸、江の島" },
          { id: "mountain", label: "山岳・ハイキング", value: 7, note: "丹沢、大山、箱根外輪山" },
          { id: "lake", label: "湖沼・河川", value: 4, note: "芦ノ湖、宮ヶ瀬湖、相模湖" },
          { id: "onsen", label: "温泉", value: 6, note: "箱根温泉郷、湯河原温泉" }
        ],
        dataSources: [
          { name: "気象庁データ", provider: "気象庁", type: "public", frequency: "日次", url: "https://www.data.jma.go.jp/gmd/risk/obsdl/" },
          { name: "桜・紅葉開花データ", provider: "日本気象協会", type: "private-free", frequency: "年次", url: "https://tenki.jp/" }
        ]
      },
      {
        id: "history-culture",
        label: "歴史・文化",
        value: 20,
        children: [
          { id: "temple", label: "寺社仏閣", value: 8, note: "鎌倉五山、大山阿夫利神社" },
          { id: "historic", label: "歴史的建造物", value: 5, note: "小田原城、横浜赤レンガ倉庫" },
          { id: "craft", label: "伝統工芸", value: 3, note: "箱根寄木細工、小田原漆器" },
          { id: "museum", label: "美術館・博物館", value: 4, note: "ポーラ美術館、横浜美術館" }
        ],
        dataSources: [
          { name: "社会教育調査", provider: "文部科学省", type: "public", frequency: "3年", url: "https://www.e-stat.go.jp/", estatId: "00400001" },
          { name: "文化財指定件数", provider: "文化庁", type: "public", frequency: "年次" }
        ]
      },
      {
        id: "urban",
        label: "都市型観光",
        value: 20,
        children: [
          { id: "shopping", label: "ショッピング", value: 7, note: "横浜中華街、みなとみらい" },
          { id: "gourmet", label: "グルメ", value: 8, note: "中華料理、三崎マグロ、湘南しらす" },
          { id: "nightlife", label: "ナイトライフ", value: 5, note: "横浜港夜景、工場夜景" }
        ],
        dataSources: [
          { name: "経済センサス（飲食サービス業）", provider: "総務省", type: "public", frequency: "5年", url: "https://www.e-stat.go.jp/", estatId: "00200553" },
          { name: "JCB消費NOW", provider: "JCB", type: "private-free", frequency: "月次", url: "https://www.jcbconsumptionnow.com/" }
        ]
      },
      {
        id: "leisure",
        label: "レジャー施設",
        value: 15,
        children: [
          { id: "theme-park", label: "テーマパーク", value: 5, note: "横浜・八景島シーパラダイス" },
          { id: "zoo-aqua", label: "動植物園・水族館", value: 5, note: "新江ノ島水族館、ズーラシア" },
          { id: "amusement", label: "その他娯楽施設", value: 5 }
        ],
        dataSources: [
          { name: "経済構造実態調査", provider: "総務省・経産省", type: "public", frequency: "年次", url: "https://www.e-stat.go.jp/", estatId: "00200564", note: "遊園地・テーマパーク" }
        ]
      },
      {
        id: "sports-outdoor",
        label: "スポーツ・アウトドア",
        value: 10,
        children: [
          { id: "marine-sports", label: "マリンスポーツ", value: 4, note: "サーフィン、ヨット、SUP" },
          { id: "hiking", label: "登山・トレッキング", value: 3 },
          { id: "spectator", label: "スポーツ観戦", value: 3, note: "横浜DeNA、川崎フロンターレ" }
        ],
        dataSources: [
          { name: "社会生活基本調査", provider: "総務省", type: "public", frequency: "5年", url: "https://www.e-stat.go.jp/", estatId: "00200533" }
        ]
      },
      {
        id: "mice",
        label: "MICE・ビジネス",
        value: 5,
        children: [
          { id: "convention", label: "会議・国際会議", value: 2 },
          { id: "exhibition", label: "展示会・見本市", value: 2 },
          { id: "incentive", label: "報奨旅行", value: 1 }
        ],
        dataSources: [
          { name: "JNTO MICE統計", provider: "JNTO", type: "public", frequency: "年次" }
        ]
      },
      {
        id: "wellness",
        label: "ウェルネス・未病",
        value: 5,
        children: [
          { id: "mebyou", label: "未病バレー", value: 3, note: "ビオトピア" },
          { id: "health-tourism", label: "ヘルスツーリズム", value: 2 }
        ],
        dataSources: []
      }
    ]
  },

  // === 切り口D: 旅行者属性別 ===
  byTravelerType: {
    id: "traveler",
    label: "旅行者属性別",
    description: "旅行者の属性に基づく分解",
    children: [
      {
        id: "origin",
        label: "居住地別",
        value: 40,
        children: [
          { id: "in-pref", label: "県内", value: 12 },
          { id: "tokyo-metro", label: "首都圏（東京・埼玉・千葉）", value: 15 },
          { id: "other-domestic", label: "その他国内", value: 8 },
          {
            id: "inbound",
            label: "訪日外国人",
            value: 5,
            children: [
              { id: "china", label: "中国", value: 1.5 },
              { id: "korea", label: "韓国", value: 1 },
              { id: "taiwan", label: "台湾", value: 0.8 },
              { id: "us-eu", label: "欧米豪", value: 1 },
              { id: "asean", label: "ASEAN", value: 0.7 }
            ]
          }
        ],
        dataSources: [
          { name: "RESAS観光マップ（目的地分析）", provider: "内閣府", type: "public", frequency: "年次", format: "API", url: "https://resas.go.jp/", note: "来訪者の発地分析" },
          { name: "モバイル空間統計 観光統計", provider: "ドコモ", type: "private", frequency: "月次", url: "https://mobaku.jp/", note: "属性別来訪者データ" },
          { name: "旅客地域流動調査", provider: "国土交通省", type: "public", frequency: "年次", url: "https://www.e-stat.go.jp/", estatId: "00600330", note: "都道府県間旅客流動" },
          { name: "訪日外国人消費動向調査", provider: "観光庁", type: "public", frequency: "四半期" },
          { name: "宿泊旅行統計調査（国籍別）", provider: "観光庁", type: "public", frequency: "月次" }
        ]
      },
      {
        id: "trip-type",
        label: "旅行形態別",
        value: 30,
        children: [
          {
            id: "day-trip",
            label: "日帰り",
            value: 22,
            note: "全体の90.3%（1億8,783万人）"
          },
          {
            id: "overnight",
            label: "宿泊",
            value: 8,
            note: "全体の9.7%（2,023万人、前年比+12.9%）"
          }
        ],
        dataSources: [
          { name: "神奈川県入込観光客調査", provider: "神奈川県", type: "public", frequency: "年次" },
          { name: "旅行・観光消費動向調査", provider: "観光庁", type: "public", frequency: "四半期", url: "https://www.e-stat.go.jp/", estatId: "00604020" },
          { name: "家計調査（旅行関連支出）", provider: "総務省", type: "public", frequency: "月次", url: "https://www.e-stat.go.jp/", estatId: "00200561", note: "横浜市の宿泊料・パック旅行費" }
        ]
      },
      {
        id: "purpose",
        label: "目的別",
        value: 30,
        children: [
          { id: "sightseeing", label: "観光・レジャー", value: 20 },
          { id: "business", label: "ビジネス", value: 5 },
          { id: "visiting", label: "帰省・知人訪問", value: 3 },
          { id: "other-purpose", label: "その他", value: 2 }
        ],
        dataSources: [
          { name: "神奈川県観光客実態調査", provider: "神奈川県", type: "public", frequency: "年次" },
          { name: "RESAS観光マップ", provider: "内閣府", type: "public", url: "https://resas.go.jp/" }
        ]
      }
    ]
  },

  // === 全データソース一覧（カテゴリ分類） ===
  allDataSources: {
    categories: [
      {
        name: "公的統計（国）",
        icon: "🏛",
        sources: [
          { id: "shukuhaku", name: "宿泊旅行統計調査", provider: "観光庁", estatId: "00604010", frequency: "月次", apiAvailable: true, free: true },
          { id: "shohidoko", name: "旅行・観光消費動向調査", provider: "観光庁", estatId: "00604020", frequency: "四半期", apiAvailable: true, free: true },
          { id: "inbound-shohi", name: "訪日外国人消費動向調査", provider: "観光庁", estatId: "00604030", frequency: "四半期", apiAvailable: true, free: true },
          { id: "keizai-census", name: "経済センサス-活動調査", provider: "総務省・経産省", estatId: "00200553", frequency: "5年", apiAvailable: true, free: true },
          { id: "ryokaku", name: "旅客地域流動調査", provider: "国土交通省", estatId: "00600330", frequency: "年次", apiAvailable: true, free: true },
          { id: "tetsudo", name: "鉄道輸送統計調査", provider: "国土交通省", estatId: "00600350", frequency: "月次", apiAvailable: true, free: true },
          { id: "kowan", name: "港湾統計", provider: "国土交通省", estatId: "00600060", frequency: "月次", apiAvailable: true, free: true },
          { id: "kokusei", name: "国勢調査", provider: "総務省", estatId: "00200521", frequency: "5年", apiAvailable: true, free: true },
          { id: "jumin", name: "住民基本台帳人口", provider: "総務省", estatId: "00200241", frequency: "年次", apiAvailable: true, free: true },
          { id: "shakai-seikatsu", name: "社会生活基本調査", provider: "総務省", estatId: "00200533", frequency: "5年", apiAvailable: true, free: true },
          { id: "kakei", name: "家計調査", provider: "総務省", estatId: "00200561", frequency: "月次", apiAvailable: true, free: true },
          { id: "kenmin-keizai", name: "県民経済計算", provider: "内閣府", estatId: "00400003", frequency: "年次", apiAvailable: true, free: true },
          { id: "shakai-kyoiku", name: "社会教育調査", provider: "文部科学省", estatId: "00400001", frequency: "3年", apiAvailable: true, free: true },
          { id: "shutsunyukoku", name: "出入国管理統計", provider: "法務省", estatId: "00250010", frequency: "月次", apiAvailable: true, free: true },
          { id: "kensetsu", name: "建築着工統計調査", provider: "国土交通省", estatId: "00600120", frequency: "月次", apiAvailable: true, free: true },
          { id: "bukka", name: "消費者物価指数", provider: "総務省", estatId: "00200573", frequency: "月次", apiAvailable: true, free: true },
          { id: "kinro", name: "毎月勤労統計調査", provider: "厚生労働省", estatId: "00450071", frequency: "月次", apiAvailable: true, free: true }
        ]
      },
      {
        name: "公的統計（県・市町村）",
        icon: "📊",
        sources: [
          { id: "irikomi", name: "神奈川県入込観光客調査", provider: "神奈川県", frequency: "年次", apiAvailable: false, free: true },
          { id: "jittai", name: "神奈川県観光客実態調査", provider: "神奈川県", frequency: "年次", apiAvailable: false, free: true },
          { id: "dmo-data", name: "かながわDMOデータ（36種類）", provider: "神奈川県観光協会", frequency: "随時", apiAvailable: false, free: true },
          { id: "yokohama-kanko", name: "横浜市観光動態調査", provider: "横浜市", frequency: "年次", apiAvailable: false, free: true },
          { id: "kenmin-keizai-ken", name: "県民経済計算（県版詳細）", provider: "神奈川県", frequency: "年次", apiAvailable: false, free: true },
          { id: "sanren", name: "産業連関表", provider: "神奈川県", frequency: "5年", apiAvailable: false, free: true },
          { id: "hakyu", name: "経済波及効果分析ツール", provider: "神奈川県", frequency: "5年", apiAvailable: false, free: true, note: "観光消費額から経済波及効果を自動試算（Excel）" },
          { id: "kenseiyoran", name: "県勢要覧（観光・文化・生活）", provider: "神奈川県", frequency: "年次", apiAvailable: false, free: true },
          { id: "miyagase", name: "宮ヶ瀬湖周辺地域観光客消費動向等調査", provider: "神奈川県", frequency: "不定期", apiAvailable: false, free: true }
        ]
      },
      {
        name: "準公的データ",
        icon: "🔓",
        sources: [
          { id: "resas", name: "RESAS観光マップ", provider: "内閣府", frequency: "年次", apiAvailable: true, free: true },
          { id: "jnto", name: "JNTO訪日外客統計", provider: "JNTO", frequency: "月次", apiAvailable: false, free: true }
        ]
      },
      {
        name: "交通データ（無料）",
        icon: "🚃",
        sources: [
          { id: "jr-east", name: "JR東日本 各駅乗車人員", provider: "JR東日本", frequency: "年次", apiAvailable: false, free: true },
          { id: "odakyu", name: "小田急電鉄 駅別乗降人員", provider: "小田急電鉄", frequency: "年次", apiAvailable: false, free: true },
          { id: "keikyu", name: "京急電鉄 駅別乗降人員", provider: "京浜急行電鉄", frequency: "年次", apiAvailable: false, free: true },
          { id: "sotetsu", name: "相鉄 駅別乗降人員", provider: "相鉄HD", frequency: "年次", apiAvailable: false, free: true },
          { id: "tokyu", name: "東急電鉄 駅別乗降人員", provider: "東急", frequency: "年次", apiAvailable: false, free: true },
          { id: "enoden", name: "江ノ島電鉄 乗降人員", provider: "江ノ電", frequency: "年次", apiAvailable: false, free: true },
          { id: "hakone-tozan", name: "箱根登山鉄道 輸送実績", provider: "箱根登山鉄道", frequency: "年次", apiAvailable: false, free: true },
          { id: "yokohama-subway", name: "横浜市営地下鉄 駅別乗車人員", provider: "横浜市交通局", frequency: "年次", apiAvailable: false, free: true }
        ]
      },
      {
        name: "人流データ（有料）",
        icon: "📍",
        sources: [
          { id: "mobaku", name: "モバイル空間統計", provider: "ドコモ・インサイトマーケティング", frequency: "月次", apiAvailable: true, free: false, costId: "mobaku" },
          { id: "agoop", name: "Agoop人流データ", provider: "Agoop", frequency: "日次〜月次", apiAvailable: true, free: false, costId: "agoop" },
          { id: "zenrin", name: "ゼンリン混雑統計", provider: "ゼンリンデータコム", frequency: "月次", apiAvailable: false, free: false, costId: "zenrin" },
          { id: "unerry", name: "unerry Beacon Bank", provider: "unerry", frequency: "日次〜月次", apiAvailable: false, free: false, costId: "unerry" },
          { id: "locmind", name: "LocationMind xPop", provider: "LocationMind", frequency: "月次", apiAvailable: false, free: false, costId: "locmind" },
          { id: "navitime", name: "NAVITIME観光データ", provider: "ナビタイムジャパン", frequency: "月次", apiAvailable: true, free: false, costId: "navitime" }
        ]
      },
      {
        name: "消費・決済データ",
        icon: "💳",
        sources: [
          { id: "jcb", name: "JCB消費NOW", provider: "JCB/ナウキャスト", frequency: "月次", apiAvailable: false, free: true, note: "基本指数のみ" },
          { id: "custella", name: "三井住友 Custella", provider: "三井住友カード", frequency: "月次", apiAvailable: true, free: false, costId: "custella" },
          { id: "visa", name: "Visa消費動向データ", provider: "Visa", frequency: "四半期", apiAvailable: false, free: false, costId: "visa" }
        ]
      },
      {
        name: "旅行・宿泊プラットフォーム",
        icon: "🏨",
        sources: [
          { id: "jalan", name: "じゃらんリサーチセンター", provider: "リクルート", frequency: "年次", apiAvailable: false, free: true },
          { id: "rakuten", name: "楽天トラベルAPI", provider: "楽天", frequency: "リアルタイム", apiAvailable: true, free: true },
          { id: "jtb", name: "JTB総合研究所", provider: "JTB", frequency: "年次", apiAvailable: false, free: true, note: "概要版のみ" },
          { id: "airbnb", name: "Inside Airbnb", provider: "独立プロジェクト", frequency: "四半期", apiAvailable: false, free: true }
        ]
      },
      {
        name: "SNS・口コミ・検索",
        icon: "📱",
        sources: [
          { id: "google-trends", name: "Google Trends", provider: "Google", frequency: "リアルタイム", apiAvailable: false, free: true },
          { id: "tripadvisor", name: "TripAdvisor", provider: "Tripadvisor", frequency: "リアルタイム", apiAvailable: true, free: false, costId: "tripadvisor" },
          { id: "google-maps", name: "Google Maps レビュー", provider: "Google", frequency: "リアルタイム", apiAvailable: true, free: false, costId: "google-maps", note: "月$200無料クレジット" }
        ]
      },
      {
        name: "気象・環境データ",
        icon: "🌤",
        sources: [
          { id: "jma", name: "気象庁 過去の気象データ", provider: "気象庁", frequency: "日次", apiAvailable: false, free: true },
          { id: "sakura", name: "桜・紅葉開花データ", provider: "日本気象協会", frequency: "年次", apiAvailable: false, free: true }
        ]
      }
    ]
  },

  // === KPI × 切り口 対応マッピング ===
  kpiPerspectiveMapping: {
    region: {
      "延べ入込観光客数": {
        available: true,
        field: "value",
        unit: "万人",
        totalValue: 20806,
        label: "7地域の合計"
      },
      "延べ宿泊者数": {
        available: true,
        field: "overnight",
        unit: "万人",
        totalValue: 2256,
        label: "7地域の宿泊合計"
      },
      "観光消費額総額": { available: false },
      "観光客満足度": { available: false }
    },
    policy: {
      "延べ入込観光客数": { available: false },
      "延べ宿泊者数": {
        available: true,
        type: "kpi-link",
        linkedPolicy: "policy-319",
        linkedKpiName: "延べ宿泊者数",
        label: "施策319が担当"
      },
      "観光消費額総額": { available: false },
      "観光客満足度": {
        available: true,
        type: "kpi-link",
        linkedPolicy: "policy-318",
        linkedKpiName: "観光客満足度",
        label: "施策318が担当"
      }
    },
    resource: {
      "延べ入込観光客数": {
        available: true,
        field: "value",
        unit: "",
        type: "relative",
        label: "資源タイプ別の構成比（相対値）"
      },
      "延べ宿泊者数": { available: false },
      "観光消費額総額": { available: false },
      "観光客満足度": { available: false }
    },
    traveler: {
      "延べ入込観光客数": {
        available: true,
        field: "value",
        unit: "",
        type: "relative",
        label: "属性別の構成比（相対値）"
      },
      "延べ宿泊者数": {
        available: true,
        type: "special-traveler-overnight",
        label: "日帰り/宿泊の内訳"
      },
      "観光消費額総額": { available: false },
      "観光客満足度": { available: false }
    }
  }
};
