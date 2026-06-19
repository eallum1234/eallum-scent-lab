export const TOTAL_OIL_GRAMS = 5;

export const GROUP_ACCORDS = [
  "Bergamot Base",
  "Lemon Base",
  "Orange Base",
  "Mint Base",
  "Lavender Base",
  "Freesia Base",
  "Magnolia Base",
  "Rose Base",
  "Peony Base",
  "Marine Base",
  "White Musk Base",
  "Vanilla Base",
  "Amber Base",
  "Sandalwood Base",
  "Cedarwood Base",
  "Powdery Base"
];

export const SESSION_COPY = {
  group: {
    button: "그룹세션을 시작합니다.",
    label: "그룹세션",
    limitText: "지정된 16개 어코드 안에서 최대 5개만 사용합니다.",
    guide: "초보자도 안정적으로 완성할 수 있도록 연결감이 자연스러운 조합을 우선합니다."
  },
  oneDay: {
    button: "원데이세션을 시작합니다.",
    label: "원데이세션",
    limitText: "63종 전체 어코드를 사용합니다.",
    guide: "감정과 이미지에 맞춰 더 섬세하고 니치향수에 가까운 구성을 허용합니다."
  }
};

export const STEPS = [
  {
    key: "mood",
    step: "STEP 1",
    title: "무드 선택",
    question: "오늘 만들 향수의 감정은 어디에 가까운가요?",
    choices: [
      { label: "맑고 깨끗한 감정", terms: ["Clean", "Fresh", "Soapy", "Linen", "Ozonic"] },
      { label: "부드럽고 포근한 감정", terms: ["Powdery", "Musk", "Soft", "Vanilla", "Sweet"] },
      { label: "화사하고 섬세한 감정", terms: ["Floral", "Rose", "Peony", "Magnolia", "Freesia"] },
      { label: "차분하고 깊은 감정", terms: ["Woody", "Amber", "Sandalwood", "Cedarwood", "Rich"] }
    ]
  },
  {
    key: "mainMood",
    step: "STEP 2",
    title: "메인 무드 결정",
    question: "향수의 중심 분위기는 어떻게 잡을까요?",
    choices: [
      { label: "싱그럽고 산뜻하게", terms: ["Citrus", "Green", "Zesty", "Fresh", "Sparkling"] },
      { label: "사랑스러운 프루티로", terms: ["Fruity", "Apple", "Apricot", "Blackberry", "Cassis", "Fig", "Peach", "Pear", "Raspberry", "Tropical", "Juicy", "Sweet"] },
      { label: "편안하고 안정적으로", terms: ["Musk", "Powdery", "Clean", "Aromatic", "Soft"] },
      { label: "로맨틱하고 섬세하게", terms: ["Floral", "Rose", "Peony", "Freesia", "Magnolia"] },
      { label: "따뜻하고 고급스럽게", terms: ["Amber", "Woody", "Vanilla", "Sandalwood", "Rich"] },
      { label: "개성 있는 니치 무드로", terms: ["Incense", "Tobacco", "Leather", "Oudwood", "Patchouli", "Vetiver", "Hinoki", "Nutmeg", "Cinnamon", "Chocolat"] }
    ]
  },
  {
    key: "firstImpression",
    step: "STEP 3",
    title: "첫인상 선택",
    question: "처음 뿌렸을 때 어떤 공기감으로 시작할까요?",
    choices: [
      { label: "상큼하고 밝게 열리기", terms: ["Top", "Citrus", "Lemon", "Bergamot", "Orange"] },
      { label: "시원하고 투명하게 열리기", terms: ["Top", "Marine", "Mint", "Clean", "Ozonic"] },
      { label: "은은하고 부드럽게 열리기", terms: ["Top", "Middle", "Powdery", "Musk", "Soft"] },
      { label: "꽃향처럼 화사하게 열리기", terms: ["Top", "Middle", "Floral", "Freesia", "Magnolia"] }
    ]
  },
  {
    key: "heart",
    step: "STEP 4",
    title: "중심 향 선택",
    question: "향의 중심에는 어떤 이미지가 놓이면 좋을까요?",
    choices: [
      { label: "깨끗한 살결 같은 중심", terms: ["Middle", "Clean", "Musk", "Powdery", "Soapy"] },
      { label: "꽃다발처럼 풍성한 중심", terms: ["Middle", "Floral", "Rose", "Peony", "Magnolia"] },
      { label: "허브처럼 차분한 중심", terms: ["Middle", "Aromatic", "Lavender", "Mint", "Green"] },
      { label: "달콤하고 둥근 중심", terms: ["Middle", "Vanilla", "Sweet", "Amber", "Soft"] },
      { label: "사랑스러운 과즙 중심", terms: ["Middle", "Fruity", "Juicy", "Sweet", "Apple", "Peach", "Pear", "Raspberry", "Blackberry"] },
      { label: "낯설고 감각적인 중심", terms: ["Middle", "Incense", "Tobacco", "Leather", "Oudwood", "Patchouli", "Vetiver", "Spicy", "Smoky"] }
    ]
  },
  {
    key: "drydown",
    step: "STEP 5",
    title: "잔향 선택",
    question: "마지막에는 어떤 온도감으로 남길까요?",
    choices: [
      { label: "가볍고 깨끗하게", terms: ["Clean", "Musk", "Powdery", "Soft"] },
      { label: "따뜻하고 달콤하게", terms: ["Vanilla", "Amber", "Sweet", "Rich"] },
      { label: "나무 향처럼 차분하게", terms: ["Woody", "Sandalwood", "Cedarwood", "Amber"] },
      { label: "은은하고 오래 남게", terms: ["Musk", "Powdery", "Amber", "Woody"] },
      { label: "깊고 독특하게 남게", terms: ["Incense", "Tobacco", "Leather", "Oudwood", "Patchouli", "Vetiver", "Hinoki"] }
    ]
  },
  {
    key: "balance",
    step: "STEP 6",
    title: "밸런스 조정",
    question: "완성 향수는 어느 계절감과 무게감에 맞출까요?",
    choices: [
      { label: "가볍고 실패 없는 균형", terms: ["Top", "Fresh", "Clean"], balance: "light" },
      { label: "부드럽고 안정적인 균형", terms: ["Middle", "Musk", "Powdery"], balance: "soft" },
      { label: "중심감이 또렷한 균형", terms: ["Middle", "Floral", "Aromatic"], balance: "centered" },
      { label: "잔향이 깊은 균형", terms: ["Base", "Amber", "Woody"], balance: "deep" }
    ]
  },
  {
    key: "name",
    step: "STEP 7",
    title: "이름 짓기",
    question: "완성할 향수 이름을 직접 입력해 주세요.",
    choices: []
  }
];
