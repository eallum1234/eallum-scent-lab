import { GROUP_ACCORDS, STEPS, TOTAL_OIL_GRAMS } from "../data/sessionConfig";

const TEXT_TERM_MAP = [
  { keys: ["맑", "깨끗", "흰", "투명", "세탁", "비누", "린넨"], terms: ["Clean", "Soapy", "Linen", "Fresh"] },
  { keys: ["상큼", "산뜻", "시트러스", "레몬", "오렌지", "청량"], terms: ["Citrus", "Fresh", "Lemon", "Orange", "Bergamot"] },
  { keys: ["사랑", "프루티", "과일", "과즙", "복숭아", "베리", "사과", "배", "무화과", "달콤한 과일"], terms: ["Fruity", "Juicy", "Sweet", "Apple", "Apricot", "Blackberry", "Cassis", "Fig", "Peach", "Pear", "Raspberry", "Tropical"] },
  { keys: ["시원", "바다", "물", "새벽", "차가운", "공기"], terms: ["Marine", "Mint", "Ozonic", "Fresh", "Clean"] },
  { keys: ["꽃", "플로럴", "장미", "정원", "화사", "로맨틱"], terms: ["Floral", "Rose", "Peony", "Magnolia", "Freesia"] },
  { keys: ["포근", "보송", "살냄새", "코튼", "부드러운", "편안"], terms: ["Musk", "Powdery", "Soft", "Clean"] },
  { keys: ["달콤", "바닐라", "따뜻", "크림", "고소"], terms: ["Vanilla", "Sweet", "Amber"] },
  { keys: ["나무", "우디", "건조", "차분", "깊", "가을"], terms: ["Woody", "Sandalwood", "Cedarwood", "Amber"] },
  { keys: ["허브", "라벤더", "민트", "초록", "풀"], terms: ["Aromatic", "Lavender", "Mint", "Green"] },
  { keys: ["여름", "낮", "가벼운"], terms: ["Top", "Fresh", "Citrus", "Marine"] },
  { keys: ["밤", "겨울", "무거운", "깊은"], terms: ["Base", "Amber", "Woody", "Vanilla"] }
];

const KOREAN_MOOD_MAP = [
  {
    keys: ["Citrus", "Zesty", "Sparkling", "Lemon", "Orange", "Bergamot"],
    text: { ko: "상큼하고 밝게 퍼지는 인상", en: "a bright citrus impression", zh: "明亮清爽的柑橘印象", ja: "明るく爽やかなシトラス感" }
  },
  {
    keys: ["Fruity", "Juicy", "Apple", "Apricot", "Blackberry", "Cassis", "Fig", "Peach", "Pear", "Raspberry", "Tropical"],
    text: { ko: "사랑스럽고 생기 있는 과즙감", en: "a lovely, lively fruity juiciness", zh: "可爱而有活力的果汁感", ja: "愛らしく生き生きした果汁感" }
  },
  {
    keys: ["Fresh", "Clean", "Soapy", "Linen", "Ozonic"],
    text: { ko: "맑고 깨끗한 공기감", en: "a clear and clean airy feeling", zh: "清澈干净的空气感", ja: "澄んで清潔な空気感" }
  },
  {
    keys: ["Marine", "Mint", "Green", "Aromatic"],
    text: { ko: "시원하고 투명한 온도감", en: "a cool and transparent temperature", zh: "清凉透明的温度感", ja: "涼しく透明な温度感" }
  },
  {
    keys: ["Floral", "Rose", "Peony", "Magnolia", "Freesia"],
    text: { ko: "화사하고 섬세한 중심감", en: "a bright and delicate floral heart", zh: "明亮细腻的花香核心", ja: "華やかで繊細な中心感" }
  },
  {
    keys: ["Musk", "Powdery", "Soft"],
    text: { ko: "부드럽고 보송한 잔향", en: "a soft, powdery drydown", zh: "柔软粉感的尾韵", ja: "やわらかくパウダリーな残り香" }
  },
  {
    keys: ["Vanilla", "Sweet", "Amber", "Rich"],
    text: { ko: "따뜻하고 둥근 여운", en: "a warm and rounded trail", zh: "温暖圆润的余韵", ja: "温かく丸みのある余韻" }
  },
  {
    keys: ["Woody", "Sandalwood", "Cedarwood"],
    text: { ko: "건조하고 차분한 깊이감", en: "a dry and calm woody depth", zh: "干爽沉静的木质深度", ja: "ドライで落ち着いたウッディの深み" }
  }
];

const FALLBACK_MOOD = {
  ko: "편안하게 어울리는 균형 잡힌 무드",
  en: "a comfortable and balanced mood",
  zh: "舒适协调的平衡氛围",
  ja: "心地よく調和するバランスのよいムード"
};

const GUIDE_REPLACEMENTS = {
  ko: [
    ["조화제로 활용하면 좋아요.", "다른 향들과 부드럽게 어우러지도록 도와줍니다."],
    ["조화제로 활용하면 좋습니다.", "다른 향들과 부드럽게 어우러지도록 도와줍니다."],
    ["부스팅할 수 있어요.", "더 선명하게 살려줍니다."],
    ["부스팅된 느낌으로 표현할 수 있어요.", "더 풍성하고 또렷하게 느껴지도록 해줍니다."],
    ["악센트를 줄 수 있어요.", "작은 포인트를 더해줍니다."],
    ["표현할 수 있어요.", "표현해 줍니다."],
    ["활용이 가능해요.", "다양한 분위기에 자연스럽게 어울립니다."],
    ["사용하면 좋아요.", "함께 쓰면 분위기가 더 안정적으로 이어집니다."],
    ["가지고 있어요.", "느껴집니다."]
  ],
  en: [
    ["조화제로 활용하면 좋아요.", "It helps the other accords blend smoothly."],
    ["조화제로 활용하면 좋습니다.", "It helps the other accords blend smoothly."],
    ["부스팅할 수 있어요.", "It makes the impression clearer."],
    ["부스팅된 느낌으로 표현할 수 있어요.", "It makes the scent feel fuller and more defined."],
    ["악센트를 줄 수 있어요.", "It adds a small accent."],
    ["표현할 수 있어요.", "It expresses the mood naturally."],
    ["활용이 가능해요.", "It fits naturally into many scent moods."],
    ["사용하면 좋아요.", "It helps the blend feel more stable."],
    ["가지고 있어요.", "It feels present in the scent."]
  ],
  zh: [
    ["조화제로 활용하면 좋아요.", "它能帮助其他香调更柔和地融合。"],
    ["조화제로 활용하면 좋습니다.", "它能帮助其他香调更柔和地融合。"],
    ["부스팅할 수 있어요.", "它能让香气印象更清晰。"],
    ["부스팅된 느낌으로 표현할 수 있어요.", "它能让香气更饱满、更明确。"],
    ["악센트를 줄 수 있어요.", "它能加入小小的亮点。"],
    ["표현할 수 있어요.", "它能自然地呈现这种氛围。"],
    ["활용이 가능해요.", "它能自然融入多种香气氛围。"],
    ["사용하면 좋아요.", "它能让整体组合更稳定。"],
    ["가지고 있어요.", "这种感觉会在香气中呈现。"]
  ],
  ja: [
    ["조화제로 활용하면 좋아요.", "他の香りとなめらかになじむように助けます。"],
    ["조화제로 활용하면 좋습니다.", "他の香りとなめらかになじむように助けます。"],
    ["부스팅할 수 있어요.", "印象をよりはっきり引き立てます。"],
    ["부스팅된 느낌으로 표현할 수 있어요.", "香りをより豊かで明確に感じさせます。"],
    ["악센트를 줄 수 있어요.", "小さなアクセントを加えます。"],
    ["표현할 수 있어요.", "そのムードを自然に表現します。"],
    ["활용이 가능해요.", "さまざまな香りの雰囲気になじみます。"],
    ["사용하면 좋아요.", "ブレンド全体をより安定させます。"],
    ["가지고 있어요.", "香りの中で感じられます。"]
  ]
};

const FLOW_COPY = {
  ko: {
    top: (names) => `처음은 ${names}가 만든 밝은 공기감으로 열립니다.`,
    bridge: (names) => `곧 ${names}가 첫인상과 중심 사이를 부드럽게 이어 줍니다.`,
    middle: (names) => `중간에는 ${names}가 향의 중심을 만들며 전체 분위기를 잡아 줍니다.`,
    base: (names) => `마지막에는 ${names}가 피부 위에 차분한 여운으로 남습니다.`
  },
  en: {
    top: (names) => `It opens with the bright air created by ${names}.`,
    bridge: (names) => `${names} gently connects the opening to the heart.`,
    middle: (names) => `${names} shapes the heart and sets the main mood.`,
    base: (names) => `${names} remains on the skin as a calm drydown.`
  },
  zh: {
    top: (names) => `开头由 ${names} 带来明亮的空气感。`,
    bridge: (names) => `${names} 柔和连接第一印象与香气核心。`,
    middle: (names) => `中段由 ${names} 建立香气核心并稳定整体氛围。`,
    base: (names) => `最后 ${names} 在肌肤上留下沉静的余韵。`
  },
  ja: {
    top: (names) => `最初は ${names} が作る明るい空気感で始まります。`,
    bridge: (names) => `${names} が第一印象と中心をやわらかくつなぎます。`,
    middle: (names) => `中盤は ${names} が香りの中心を作り、全体の雰囲気を整えます。`,
    base: (names) => `最後は ${names} が肌の上に落ち着いた余韻として残ります。`
  }
};

const LOGIC_COPY = {
  ko: (name, guide, description) => `${name}는 향의 ${guide}을 맡아 전체 향이 더 자연스럽게 이어지도록 도와줍니다. ${description}`,
  en: (name, guide, description) => `${name} works as ${guide} in the blend, helping the scent connect more naturally. ${description}`,
  zh: (name, guide, description) => `${name} 在配方中承担 ${guide} 的作用，让整体香气更自然地衔接。${description}`,
  ja: (name, guide, description) => `${name} はブレンドの中で ${guide} の役割を持ち、香り全体がより自然につながるように助けます。${description}`
};

const GUIDE_ROLE_COPY = {
  ko: { 조화: "조화", 연결: "연결", 볼륨: "볼륨", 강조: "강조", 포인트: "포인트" },
  en: { 조화: "harmony", 연결: "bridge", 볼륨: "volume", 강조: "boosting", 포인트: "accent" },
  zh: { 조화: "调和", 연결: "衔接", 볼륨: "丰满度", 강조: "强化", 포인트: "点缀" },
  ja: { 조화: "調和", 연결: "つなぎ", 볼륨: "ボリューム", 강조: "強調", 포인트: "アクセント" }
};

const INTERNAL_ROLE_COPY = {
  ko: { 첫인상: "첫인상", 연결: "연결", 중심: "중심", 잔향: "잔향" },
  en: { 첫인상: "opening", 연결: "bridge", 중심: "heart", 잔향: "drydown" },
  zh: { 첫인상: "第一印象", 연결: "衔接", 중심: "核心", 잔향: "尾韵" },
  ja: { 첫인상: "第一印象", 연결: "つなぎ", 중심: "中心", 잔향: "残り香" }
};

const GUIDE_SUMMARY = {
  en: {
    조화: "It helps the accords blend smoothly.",
    연결: "It connects the opening, heart, and drydown naturally.",
    볼륨: "It adds body and fullness to the scent.",
    강조: "It makes the chosen mood feel clearer.",
    포인트: "It adds a small but memorable accent.",
    기본: "It keeps the blend balanced and easy to wear."
  },
  zh: {
    조화: "它帮助香调之间更柔和地融合。",
    연결: "它自然连接前调、核心与尾韵。",
    볼륨: "它为香气增加饱满度。",
    강조: "它让选择的氛围更加清晰。",
    포인트: "它加入小而令人记住的亮点。",
    기본: "它让整体香气保持平衡且容易接受。"
  },
  ja: {
    조화: "香り同士がなめらかになじむように助けます。",
    연결: "トップ、中心、残り香を自然につなぎます。",
    볼륨: "香りにふくらみと存在感を加えます。",
    강조: "選んだムードをよりはっきり感じさせます。",
    포인트: "小さく印象的なアクセントを加えます。",
    기본: "全体をバランスよく、使いやすい香りに整えます。"
  }
};

const NICHE_ACCORDS = [
  "Basil Base", "Cypress Base", "Rosewood Base", "Watery Base", "Carnation Base",
  "Iris Base", "Lilac Base", "Tuberose Base", "Ylang Ylang Base", "Chocolat Base",
  "Incense Base", "Tobacco Base", "Oudwood Base", "Cinnamon Base", "Hinoki Base",
  "Leather Base", "Nutmeg Base", "Patchouli Base", "Vetiver Base"
];

const NICHE_TERMS = [
  "Incense", "Tobacco", "Leather", "Oudwood", "Patchouli", "Vetiver",
  "Hinoki", "Nutmeg", "Cinnamon", "Chocolat", "Smoky", "Spicy", "Woody", "Dark"
];

function cleanText(value) {
  return String(value ?? "").trim();
}

function baseText(base) {
  return [base.name, base.family, base.diffusion, base.mood, base.notes, base.description]
    .map(cleanText)
    .join(" ")
    .toLowerCase();
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function accordKey(base) {
  return cleanText(base.name).toLowerCase().replace(/\s+base$/, "").replace(/[^a-z0-9]+/g, "");
}

function hasSameAccord(selected, base) {
  const key = accordKey(base);
  return selected.some((item) => accordKey(item) === key);
}

function uniqueByAccord(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = accordKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function normalizeBase(base) {
  return {
    ...base,
    id: cleanText(base.id),
    name: cleanText(base.name),
    family: cleanText(base.family),
    mood: cleanText(base.mood),
    diffusion: cleanText(base.diffusion),
    notes: cleanText(base.notes),
    description: cleanText(base.description)
  };
}

export function selectedTerms(answers, details) {
  const choiceTerms = STEPS.flatMap((step) => {
    const answer = answers[step.key];
    if (!answer || step.key === "name") return [];
    const found = step.choices.find((choice) => choice.label === answer);
    return found?.terms ?? [];
  });
  const detailText = Object.values(details).join(" ").toLowerCase();
  const detailTerms = TEXT_TERM_MAP.flatMap((item) =>
    item.keys.some((key) => detailText.includes(key.toLowerCase())) ? item.terms : []
  );
  return unique([...choiceTerms, ...detailTerms]);
}

export function roleOf(base) {
  const diffusion = cleanText(base.diffusion).toLowerCase();
  const text = baseText(base);
  if (diffusion.includes("top") && !diffusion.includes("middle")) return "첫인상";
  if (diffusion.includes("top") && diffusion.includes("middle")) return "연결";
  if (diffusion.includes("middle") && !diffusion.includes("top")) return "중심";
  if (includesAny(text, ["Amber", "Musk", "Vanilla", "Sandalwood", "Cedarwood", "Woody", "Powdery", "Base"])) return "잔향";
  return "중심";
}

function roleWeight(role) {
  if (role === "첫인상") return 0;
  if (role === "연결") return 1;
  if (role === "중심") return 2;
  return 3;
}

export function guideRoles(description) {
  const text = cleanText(description);
  return [
    text.includes("조화제") ? "조화" : "",
    text.includes("브릿지") ? "연결" : "",
    text.includes("볼륨") ? "볼륨" : "",
    text.includes("부스팅") ? "강조" : "",
    text.includes("악센트") ? "포인트" : ""
  ].filter(Boolean);
}

function scoreBase(base, answers, details, sessionType) {
  const text = baseText(base);
  const terms = selectedTerms(answers, details);
  const direct = terms.reduce((sum, term) => sum + (text.includes(term.toLowerCase()) ? 10 : 0), 0);
  const role = roleOf(base);
  const guideScore = guideRoles(base.description).length * 4;
  const stableBonus = sessionType === "group" && includesAny(text, ["Clean", "Fresh", "Floral", "Musk", "Powdery", "Citrus"]) ? 10 : 0;
  const heavyPenalty = sessionType === "group" && includesAny(text, ["Rich", "Smoky", "Leather", "Oud", "Dark"]) ? 14 : 0;
  const balance = answers.balance ?? "";
  const balanceBonus =
    (balance.includes("가볍") && role === "첫인상") ||
    (balance.includes("부드럽") && ["연결", "중심"].includes(role)) ||
    (balance.includes("중심") && role === "중심") ||
    (balance.includes("잔향") && role === "잔향")
      ? 12
      : 0;
  const nicheIntent = terms.some((term) => NICHE_TERMS.includes(term));
  const nicheBonus = sessionType === "oneDay" && NICHE_ACCORDS.includes(base.name) ? (nicheIntent ? 18 : 5) : 0;
  return direct + guideScore + stableBonus + balanceBonus + nicheBonus - heavyPenalty;
}

function sessionLibrary(library, sessionType) {
  if (sessionType === "oneDay") return library;
  return GROUP_ACCORDS.map((name) => library.find((base) => base.name === name)).filter(Boolean);
}

function diversityScore(base, selected) {
  if (selected.length === 0) return 0;
  const sameFamily = selected.filter((item) => item.family === base.family).length;
  const sameRole = selected.filter((item) => item.role === base.role).length;
  return sameFamily * 9 + sameRole * 4;
}

function compareCandidates(a, b, usageStats) {
  if (b.score !== a.score) return b.score - a.score;
  const aUsed = usageStats[a.name] ?? 0;
  const bUsed = usageStats[b.name] ?? 0;
  if (aUsed !== bUsed) return aUsed - bUsed;
  return roleWeight(a.role) - roleWeight(b.role);
}

function chooseBest(candidates, selected, usageStats) {
  return [...candidates]
    .map((base) => ({ ...base, adjustedScore: base.score - diversityScore(base, selected) }))
    .sort((a, b) => {
      if (b.adjustedScore !== a.adjustedScore) return b.adjustedScore - a.adjustedScore;
      return compareCandidates(a, b, usageStats);
    })[0];
}

function pickRecommendations(library, answers, details, sessionType, usageStats = {}) {
  const candidates = sessionLibrary(library, sessionType)
    .map((base) => ({ ...base, role: roleOf(base), score: scoreBase(base, answers, details, sessionType) }))
    .sort((a, b) => compareCandidates(a, b, usageStats));
  const selected = [];
  ["첫인상", "중심", "잔향"].forEach((role) => {
    const roleCandidates = candidates.filter((base) => base.role === role && !hasSameAccord(selected, base));
    const found = chooseBest(roleCandidates, selected, usageStats);
    if (found) selected.push(found);
  });
  while (selected.length < 5) {
    const remaining = candidates.filter((base) => !hasSameAccord(selected, base));
    if (remaining.length === 0) break;
    selected.push(chooseBest(remaining, selected, usageStats));
  }
  return uniqueByAccord(selected).slice(0, 5).sort((a, b) => roleWeight(a.role) - roleWeight(b.role));
}

function distributeRatios(items, answers, sessionType) {
  if (items.length === 0) return [];
  const balance = answers.balance ?? "";
  const roleTargets = balance.includes("잔향")
    ? { 첫인상: 24, 연결: 16, 중심: 32, 잔향: 28 }
    : balance.includes("가볍")
      ? { 첫인상: 36, 연결: 18, 중심: 30, 잔향: 16 }
      : balance.includes("중심")
        ? { 첫인상: 28, 연결: 16, 중심: 38, 잔향: 18 }
        : { 첫인상: 30, 연결: 18, 중심: 34, 잔향: 18 };
  const raw = items.map((item) => {
    const sameRoleCount = items.filter((base) => base.role === item.role).length || 1;
    const stability = sessionType === "group" && item.role === "잔향" ? -2 : 0;
    return Math.max(8, Math.round(roleTargets[item.role] / sameRoleCount + stability));
  });
  const total = raw.reduce((sum, value) => sum + value, 0);
  const normalized = raw.map((value) => Math.max(5, Math.round((value / total) * 100)));
  let diff = 100 - normalized.reduce((sum, value) => sum + value, 0);
  while (diff !== 0) {
    const index = normalized.indexOf(Math.max(...normalized));
    normalized[index] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }
  return items.map((item, index) => ({
    ...item,
    ratio: normalized[index],
    grams: Number(((TOTAL_OIL_GRAMS * normalized[index]) / 100).toFixed(2))
  }));
}

export function describeMood(base, language = "ko") {
  const source = [base.family, base.mood, base.diffusion, base.description].join(" ");
  const matched = KOREAN_MOOD_MAP
    .filter((item) => item.keys.some((key) => source.includes(key)))
    .map((item) => item.text[language] ?? item.text.ko);
  return unique(matched).slice(0, 3).join(", ") || FALLBACK_MOOD[language] || FALLBACK_MOOD.ko;
}

export function describeFlow(items, language = "ko") {
  const copy = FLOW_COPY[language] ?? FLOW_COPY.ko;
  const top = items.filter((item) => item.role === "첫인상").map((item) => item.name).join(", ");
  const bridge = items.filter((item) => item.role === "연결").map((item) => item.name).join(", ");
  const middle = items.filter((item) => item.role === "중심").map((item) => item.name).join(", ");
  const base = items.filter((item) => item.role === "잔향").map((item) => item.name).join(", ");
  return [
    top ? copy.top(top) : "",
    bridge ? copy.bridge(bridge) : "",
    middle ? copy.middle(middle) : "",
    base ? copy.base(base) : ""
  ].filter(Boolean).join(" ");
}

export function customerFriendlyGuide(description, language = "ko") {
  if (language !== "ko") {
    const summaries = GUIDE_SUMMARY[language];
    const roles = guideRoles(description);
    if (!summaries) return cleanText(description);
    return (roles.length > 0 ? roles : ["기본"]).map((role) => summaries[role] ?? summaries.기본).join(" ");
  }
  const replacements = GUIDE_REPLACEMENTS[language] ?? GUIDE_REPLACEMENTS.ko;
  return replacements.reduce((text, [from, to]) => text.replaceAll(from, to), cleanText(description));
}

export function describeLogic(items, language = "ko") {
  const makeSentence = LOGIC_COPY[language] ?? LOGIC_COPY.ko;
  const roleCopy = GUIDE_ROLE_COPY[language] ?? GUIDE_ROLE_COPY.ko;
  return items
    .map((item) => {
      const roles = guideRoles(item.description);
      const internalRoleCopy = INTERNAL_ROLE_COPY[language] ?? INTERNAL_ROLE_COPY.ko;
      const guide = roles.length > 0 ? roles.map((role) => roleCopy[role] ?? role).join(", ") : internalRoleCopy[item.role] ?? item.role;
      return makeSentence(item.name, guide, customerFriendlyGuide(item.description, language));
    })
    .join(" ");
}

export function buildRecommendations(library, answers, details, sessionType, usageStats = {}) {
  return distributeRatios(pickRecommendations(library, answers, details, sessionType, usageStats), answers, sessionType);
}
