export const LANGUAGES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" }
];

export const UI_COPY = {
  ko: {
    languageTitle: "언어를 선택해 주세요",
    languageSubtitle: "수업에 사용할 화면 언어를 먼저 고릅니다.",
    startTitle: "S.P.I.C Scent Design Lab",
    groupButton: "그룹세션을 시작합니다.",
    oneDayButton: "원데이세션을 시작합니다.",
    groupLabel: "그룹세션",
    oneDayLabel: "원데이세션",
    groupLimit: "지정된 16개 어코드 안에서 최대 5개만 사용합니다.",
    oneDayLimit: "63종 전체 어코드를 사용합니다.",
    appHeading: "향수 조향 클래스",
    suggestedName: "제안 이름",
    suggestedNameHelp: "지금까지 선택한 무드와 발향 방향을 바탕으로 자동 제안한 이름입니다.",
    volumeTitle: "향수 용량 선택",
    volumeHelp: (volume, grams) => `${volume}ml 기준 향료 총량은 ${grams}g입니다.`,
    showResult: "추천 결과 보기",
    next: "다음",
    previous: "이전",
    startOver: "처음으로",
    resultTitle: "추천 결과",
    resultSummary: (volume, grams, ratio, total) =>
      `${volume}ml 기준이며, 향료 총량은 ${grams}g입니다. 추천 비율 합계는 ${ratio}%이고, 계산 용량 합계는 ${total}g입니다.`,
    blendTitle: "조향 계량표",
    blendSubtitle: "향료별 g / 방울 수",
    dropBase: "1방울 = 0.03g 기준",
    drops: "방울",
    flowTitle: "발향 흐름 설명",
    logicTitle: "조향 논리 설명",
    finalNameTitle: "최종 향수 이름",
    backToName: "이름 다시 보기",
    restart: "새로 시작하기",
    dataStatus: "데이터 상태",
    loading: "불러오는 중",
    complete: "완료",
    dataMissing: "향수 베이스 데이터를 찾을 수 없습니다.",
    dataInvalid: "엑셀에서 변환한 63개 어코드 데이터가 아닙니다.",
    accord: "추천 어코드",
    ratio: "추천 비율",
    role: "역할",
    grams: "g 단위 계산",
    mood: "향의 무드 설명",
    logic: "조향 논리 설명"
  },
  en: {
    languageTitle: "Choose your language",
    languageSubtitle: "Select the display language for the class.",
    startTitle: "S.P.I.C Scent Design Lab",
    groupButton: "Start Group Session",
    oneDayButton: "Start One-Day Session",
    groupLabel: "Group Session",
    oneDayLabel: "One-Day Session",
    groupLimit: "Uses up to 5 accords from the selected 16 accords.",
    oneDayLimit: "Uses all 63 accords.",
    appHeading: "Perfume Blending Class",
    suggestedName: "Suggested Name",
    suggestedNameHelp: "This name is suggested from your selected mood and scent direction.",
    volumeTitle: "Choose Perfume Volume",
    volumeHelp: (volume, grams) => `For ${volume}ml, the total fragrance oil is ${grams}g.`,
    showResult: "View Recommendation",
    next: "Next",
    previous: "Previous",
    startOver: "Start Over",
    resultTitle: "Recommendation Result",
    resultSummary: (volume, grams, ratio, total) =>
      `Based on ${volume}ml, the total fragrance oil is ${grams}g. The ratio total is ${ratio}%, and the calculated amount total is ${total}g.`,
    blendTitle: "Blending Measurement",
    blendSubtitle: "g / drops by accord",
    dropBase: "1 drop = 0.03g",
    drops: "drops",
    flowTitle: "Scent Flow",
    logicTitle: "Blending Logic",
    finalNameTitle: "Final Perfume Name",
    backToName: "Back to Name",
    restart: "Start New Session",
    dataStatus: "Data Status",
    loading: "Loading",
    complete: "Complete",
    dataMissing: "Perfume base data could not be found.",
    dataInvalid: "This is not the 63-accord data converted from the Excel file.",
    accord: "Recommended Accord",
    ratio: "Ratio",
    role: "Role",
    grams: "Amount in g",
    mood: "Scent Mood",
    logic: "Blending Logic"
  },
  zh: {
    languageTitle: "请选择语言",
    languageSubtitle: "请先选择课堂中使用的显示语言。",
    startTitle: "S.P.I.C Scent Design Lab",
    groupButton: "开始团体课程",
    oneDayButton: "开始一日课程",
    groupLabel: "团体课程",
    oneDayLabel: "一日课程",
    groupLimit: "在指定的16种香调中最多使用5种。",
    oneDayLimit: "使用全部63种香调。",
    appHeading: "香水调香课程",
    suggestedName: "建议名称",
    suggestedNameHelp: "根据已选择的情绪与香气方向自动建议名称。",
    volumeTitle: "选择香水容量",
    volumeHelp: (volume, grams) => `${volume}ml 的香精总量为 ${grams}g。`,
    showResult: "查看推荐结果",
    next: "下一步",
    previous: "上一步",
    startOver: "回到开始",
    resultTitle: "推荐结果",
    resultSummary: (volume, grams, ratio, total) =>
      `以 ${volume}ml 为基准，香精总量为 ${grams}g。推荐比例合计为 ${ratio}%，计算容量合计为 ${total}g。`,
    blendTitle: "调香计量表",
    blendSubtitle: "各香调 g / 滴数",
    dropBase: "1滴 = 0.03g",
    drops: "滴",
    flowTitle: "香气变化说明",
    logicTitle: "调香逻辑说明",
    finalNameTitle: "最终香水名称",
    backToName: "返回名称页",
    restart: "重新开始",
    dataStatus: "数据状态",
    loading: "加载中",
    complete: "完成",
    dataMissing: "找不到香水基底数据。",
    dataInvalid: "这不是从Excel转换的63种香调数据。",
    accord: "推荐香调",
    ratio: "推荐比例",
    role: "作用",
    grams: "g 单位计算",
    mood: "香气氛围说明",
    logic: "调香逻辑说明"
  },
  ja: {
    languageTitle: "言語を選択してください",
    languageSubtitle: "レッスンで使う表示言語を先に選びます。",
    startTitle: "S.P.I.C Scent Design Lab",
    groupButton: "グループセッションを始めます",
    oneDayButton: "ワンデーセッションを始めます",
    groupLabel: "グループセッション",
    oneDayLabel: "ワンデーセッション",
    groupLimit: "指定された16種類のアコードから最大5種類を使用します。",
    oneDayLimit: "63種類すべてのアコードを使用します。",
    appHeading: "香水調香クラス",
    suggestedName: "提案名",
    suggestedNameHelp: "これまで選んだムードと香りの方向から自動で提案した名前です。",
    volumeTitle: "香水容量を選択",
    volumeHelp: (volume, grams) => `${volume}ml 基準の香料総量は ${grams}g です。`,
    showResult: "おすすめ結果を見る",
    next: "次へ",
    previous: "前へ",
    startOver: "最初へ",
    resultTitle: "おすすめ結果",
    resultSummary: (volume, grams, ratio, total) =>
      `${volume}ml 基準で、香料総量は ${grams}g です。おすすめ比率の合計は ${ratio}%、計算容量の合計は ${total}g です。`,
    blendTitle: "調香計量表",
    blendSubtitle: "アコード別 g / 滴数",
    dropBase: "1滴 = 0.03g 基準",
    drops: "滴",
    flowTitle: "香りの流れの説明",
    logicTitle: "調香ロジックの説明",
    finalNameTitle: "最終香水名",
    backToName: "名前に戻る",
    restart: "新しく始める",
    dataStatus: "データ状態",
    loading: "読み込み中",
    complete: "完了",
    dataMissing: "香水ベースデータが見つかりません。",
    dataInvalid: "Excelから変換した63種類のアコードデータではありません。",
    accord: "おすすめアコード",
    ratio: "おすすめ比率",
    role: "役割",
    grams: "g 単位計算",
    mood: "香りのムード説明",
    logic: "調香ロジック説明"
  }
};

export const ROLE_COPY = {
  ko: { 첫인상: "첫인상", 연결: "연결", 중심: "중심", 잔향: "잔향" },
  en: { 첫인상: "Opening", 연결: "Bridge", 중심: "Heart", 잔향: "Drydown" },
  zh: { 첫인상: "第一印象", 연결: "衔接", 중심: "核心", 잔향: "尾韵" },
  ja: { 첫인상: "第一印象", 연결: "つなぎ", 중심: "中心", 잔향: "残り香" }
};

export const STEP_COPY = {
  ko: {
    mood: {
      title: "무드 선택",
      question: "오늘 만들 향수의 감정은 어디에 가까운가요?",
      choices: {
        "맑고 깨끗한 감정": "맑고 깨끗한 감정",
        "부드럽고 포근한 감정": "부드럽고 포근한 감정",
        "화사하고 섬세한 감정": "화사하고 섬세한 감정",
        "차분하고 깊은 감정": "차분하고 깊은 감정"
      }
    },
    mainMood: {
      title: "메인 무드 결정",
      question: "향수의 중심 분위기는 어떻게 잡을까요?",
      choices: {
        "싱그럽고 산뜻하게": "싱그럽고 산뜻하게",
        "사랑스러운 프루티로": "사랑스러운 프루티로",
        "편안하고 안정적으로": "편안하고 안정적으로",
        "로맨틱하고 섬세하게": "로맨틱하고 섬세하게",
        "따뜻하고 고급스럽게": "따뜻하고 고급스럽게",
        "개성 있는 니치 무드로": "개성 있는 니치 무드로"
      }
    },
    firstImpression: {
      title: "첫인상 선택",
      question: "처음 뿌렸을 때 어떤 공기감으로 시작할까요?",
      choices: {
        "상큼하고 밝게 열리기": "상큼하고 밝게 열리기",
        "시원하고 투명하게 열리기": "시원하고 투명하게 열리기",
        "은은하고 부드럽게 열리기": "은은하고 부드럽게 열리기",
        "꽃향처럼 화사하게 열리기": "꽃향처럼 화사하게 열리기"
      }
    },
    heart: {
      title: "중심 향 선택",
      question: "향의 중심에는 어떤 이미지가 놓이면 좋을까요?",
      choices: {
        "깨끗한 살결 같은 중심": "깨끗한 살결 같은 중심",
        "꽃다발처럼 풍성한 중심": "꽃다발처럼 풍성한 중심",
        "허브처럼 차분한 중심": "허브처럼 차분한 중심",
        "달콤하고 둥근 중심": "달콤하고 둥근 중심",
        "사랑스러운 과즙 중심": "사랑스러운 과즙 중심",
        "낯설고 감각적인 중심": "낯설고 감각적인 중심"
      }
    },
    drydown: {
      title: "잔향 선택",
      question: "마지막에는 어떤 온도감으로 남길까요?",
      choices: {
        "가볍고 깨끗하게": "가볍고 깨끗하게",
        "따뜻하고 달콤하게": "따뜻하고 달콤하게",
        "나무 향처럼 차분하게": "나무 향처럼 차분하게",
        "은은하고 오래 남게": "은은하고 오래 남게",
        "깊고 독특하게 남게": "깊고 독특하게 남게"
      }
    },
    balance: {
      title: "밸런스 조정",
      question: "완성 향수는 어느 계절감과 무게감에 맞출까요?",
      choices: {
        "가볍고 실패 없는 균형": "가볍고 실패 없는 균형",
        "부드럽고 안정적인 균형": "부드럽고 안정적인 균형",
        "중심감이 또렷한 균형": "중심감이 또렷한 균형",
        "잔향이 깊은 균형": "잔향이 깊은 균형"
      }
    },
    name: { title: "이름 짓기", question: "마지막으로 향수 용량을 선택하면 최종 레시피를 보여드릴게요.", choices: {} }
  },
  en: {
    mood: {
      title: "Mood Selection",
      question: "Which feeling is closest to the perfume you want to make today?",
      choices: {
        "맑고 깨끗한 감정": "Clear and clean",
        "부드럽고 포근한 감정": "Soft and cozy",
        "화사하고 섬세한 감정": "Bright and delicate",
        "차분하고 깊은 감정": "Calm and deep"
      }
    },
    mainMood: {
      title: "Main Mood",
      question: "What should be the main atmosphere of the perfume?",
      choices: {
        "싱그럽고 산뜻하게": "Fresh and crisp",
        "사랑스러운 프루티로": "Lovely fruity",
        "편안하고 안정적으로": "Comfortable and balanced",
        "로맨틱하고 섬세하게": "Romantic and delicate",
        "따뜻하고 고급스럽게": "Warm and refined",
        "개성 있는 니치 무드로": "Distinctive niche mood"
      }
    },
    firstImpression: {
      title: "Opening Impression",
      question: "How should the scent begin when first sprayed?",
      choices: {
        "상큼하고 밝게 열리기": "Open bright and citrusy",
        "시원하고 투명하게 열리기": "Open cool and transparent",
        "은은하고 부드럽게 열리기": "Open soft and gentle",
        "꽃향처럼 화사하게 열리기": "Open like bright flowers"
      }
    },
    heart: {
      title: "Heart Scent",
      question: "What image should sit at the center of the scent?",
      choices: {
        "깨끗한 살결 같은 중심": "Clean skin-like heart",
        "꽃다발처럼 풍성한 중심": "Full bouquet heart",
        "허브처럼 차분한 중심": "Calm herbal heart",
        "달콤하고 둥근 중심": "Sweet rounded heart",
        "사랑스러운 과즙 중심": "Lovely juicy heart",
        "낯설고 감각적인 중심": "Unusual sensual heart"
      }
    },
    drydown: {
      title: "Drydown",
      question: "What kind of warmth should remain at the end?",
      choices: {
        "가볍고 깨끗하게": "Light and clean",
        "따뜻하고 달콤하게": "Warm and sweet",
        "나무 향처럼 차분하게": "Calm like soft woods",
        "은은하고 오래 남게": "Subtle and lasting",
        "깊고 독특하게 남게": "Deep and distinctive"
      }
    },
    balance: {
      title: "Balance",
      question: "Which season and weight should the finished perfume fit?",
      choices: {
        "가볍고 실패 없는 균형": "Light, easy balance",
        "부드럽고 안정적인 균형": "Soft, stable balance",
        "중심감이 또렷한 균형": "Clear heart-focused balance",
        "잔향이 깊은 균형": "Deep drydown balance"
      }
    },
    name: { title: "Name", question: "Choose the perfume volume, then the final recipe will appear.", choices: {} }
  },
  zh: {
    mood: {
      title: "选择情绪",
      question: "今天想制作的香水更接近哪一种情绪？",
      choices: {
        "맑고 깨끗한 감정": "清澈干净",
        "부드럽고 포근한 감정": "柔软温暖",
        "화사하고 섬세한 감정": "明亮细腻",
        "차분하고 깊은 감정": "沉静深邃"
      }
    },
    mainMood: {
      title: "确定主氛围",
      question: "香水的核心氛围想如何设定？",
      choices: {
        "싱그럽고 산뜻하게": "清新爽朗",
        "사랑스러운 프루티로": "可爱的果香感",
        "편안하고 안정적으로": "舒适稳定",
        "로맨틱하고 섬세하게": "浪漫细腻",
        "따뜻하고 고급스럽게": "温暖精致",
        "개성 있는 니치 무드로": "独特的小众氛围"
      }
    },
    firstImpression: {
      title: "选择第一印象",
      question: "刚喷上时想以什么样的空气感开始？",
      choices: {
        "상큼하고 밝게 열리기": "明亮清爽地展开",
        "시원하고 투명하게 열리기": "清凉透明地展开",
        "은은하고 부드럽게 열리기": "柔和轻盈地展开",
        "꽃향처럼 화사하게 열리기": "像花香一样明亮展开"
      }
    },
    heart: {
      title: "选择核心香气",
      question: "香气的中心想放入什么画面？",
      choices: {
        "깨끗한 살결 같은 중심": "干净肌肤般的核心",
        "꽃다발처럼 풍성한 중심": "花束般丰盈的核心",
        "허브처럼 차분한 중심": "草本般沉静的核心",
        "달콤하고 둥근 중심": "甜润圆融的核心",
        "사랑스러운 과즙 중심": "可爱的多汁果香核心",
        "낯설고 감각적인 중심": "陌生而感性的核心"
      }
    },
    drydown: {
      title: "选择尾韵",
      question: "最后想留下什么样的温度感？",
      choices: {
        "가볍고 깨끗하게": "轻盈干净",
        "따뜻하고 달콤하게": "温暖甜美",
        "나무 향처럼 차분하게": "像木质香一样沉静",
        "은은하고 오래 남게": "柔和持久",
        "깊고 독특하게 남게": "深邃独特"
      }
    },
    balance: {
      title: "调整平衡",
      question: "完成后的香水适合哪种季节感和重量感？",
      choices: {
        "가볍고 실패 없는 균형": "轻盈、不易出错的平衡",
        "부드럽고 안정적인 균형": "柔和稳定的平衡",
        "중심감이 또렷한 균형": "核心明确的平衡",
        "잔향이 깊은 균형": "尾韵深厚的平衡"
      }
    },
    name: { title: "命名", question: "选择香水容量后，将显示最终配方。", choices: {} }
  },
  ja: {
    mood: {
      title: "ムード選択",
      question: "今日作る香水の気分はどれに近いですか？",
      choices: {
        "맑고 깨끗한 감정": "澄んで清潔な気分",
        "부드럽고 포근한 감정": "やわらかく包まれる気分",
        "화사하고 섬세한 감정": "華やかで繊細な気分",
        "차분하고 깊은 감정": "落ち着いて深い気分"
      }
    },
    mainMood: {
      title: "メインムード",
      question: "香水の中心となる雰囲気をどう作りますか？",
      choices: {
        "싱그럽고 산뜻하게": "みずみずしく爽やかに",
        "사랑스러운 프루티로": "愛らしいフルーティーに",
        "편안하고 안정적으로": "心地よく安定感のある印象に",
        "로맨틱하고 섬세하게": "ロマンティックで繊細に",
        "따뜻하고 고급스럽게": "温かく上質に",
        "개성 있는 니치 무드로": "個性的なニッチムードに"
      }
    },
    firstImpression: {
      title: "第一印象",
      question: "最初に吹きかけた時、どんな空気感で始めますか？",
      choices: {
        "상큼하고 밝게 열리기": "明るくシトラスに開く",
        "시원하고 투명하게 열리기": "涼しく透明に開く",
        "은은하고 부드럽게 열리기": "やわらかく穏やかに開く",
        "꽃향처럼 화사하게 열리기": "花のように華やかに開く"
      }
    },
    heart: {
      title: "中心の香り",
      question: "香りの中心にはどんなイメージを置きたいですか？",
      choices: {
        "깨끗한 살결 같은 중심": "清潔な肌のような中心",
        "꽃다발처럼 풍성한 중심": "花束のように豊かな中心",
        "허브처럼 차분한 중심": "ハーブのように落ち着いた中心",
        "달콤하고 둥근 중심": "甘く丸みのある中心",
        "사랑스러운 과즙 중심": "愛らしい果汁感のある中心",
        "낯설고 감각적인 중심": "新鮮で感覚的な中心"
      }
    },
    drydown: {
      title: "残り香",
      question: "最後にはどんな温度感を残しますか？",
      choices: {
        "가볍고 깨끗하게": "軽く清潔に",
        "따뜻하고 달콤하게": "温かく甘く",
        "나무 향처럼 차분하게": "木の香りのように落ち着いて",
        "은은하고 오래 남게": "ほのかに長く残るように",
        "깊고 독특하게 남게": "深く個性的に残るように"
      }
    },
    balance: {
      title: "バランス調整",
      question: "完成する香水はどの季節感と重さに合わせますか？",
      choices: {
        "가볍고 실패 없는 균형": "軽く作りやすいバランス",
        "부드럽고 안정적인 균형": "やわらかく安定したバランス",
        "중심감이 또렷한 균형": "中心がはっきりしたバランス",
        "잔향이 깊은 균형": "残り香が深いバランス"
      }
    },
    name: { title: "名前をつける", question: "香水容量を選ぶと、最終レシピを表示します。", choices: {} }
  }
};

export function copyFor(language) {
  return UI_COPY[language] ?? UI_COPY.ko;
}

export function stepCopyFor(stepKey, language) {
  return STEP_COPY[language]?.[stepKey] ?? STEP_COPY.ko[stepKey];
}

export function choiceLabelFor(label, stepKey, language) {
  return stepCopyFor(stepKey, language)?.choices?.[label] ?? label;
}

export function roleLabelFor(role, language) {
  return ROLE_COPY[language]?.[role] ?? role;
}
