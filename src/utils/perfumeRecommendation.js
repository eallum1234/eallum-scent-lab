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
  { keys: ["Citrus", "Zesty", "Sparkling", "Lemon", "Orange", "Bergamot"], text: "상큼하고 밝게 퍼지는 인상" },
  { keys: ["Fruity", "Juicy", "Apple", "Apricot", "Blackberry", "Cassis", "Fig", "Peach", "Pear", "Raspberry", "Tropical"], text: "사랑스럽고 생기 있는 과즙감" },
  { keys: ["Fresh", "Clean", "Soapy", "Linen", "Ozonic"], text: "맑고 깨끗한 공기감" },
  { keys: ["Marine", "Mint", "Green", "Aromatic"], text: "시원하고 투명한 온도감" },
  { keys: ["Floral", "Rose", "Peony", "Magnolia", "Freesia"], text: "화사하고 섬세한 중심감" },
  { keys: ["Musk", "Powdery", "Soft"], text: "부드럽고 보송한 잔향" },
  { keys: ["Vanilla", "Sweet", "Amber", "Rich"], text: "따뜻하고 둥근 여운" },
  { keys: ["Woody", "Sandalwood", "Cedarwood"], text: "건조하고 차분한 깊이감" }
];

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

export function describeMood(base) {
  const source = [base.family, base.mood, base.diffusion, base.description].join(" ");
  const matched = KOREAN_MOOD_MAP.filter((item) => item.keys.some((key) => source.includes(key))).map((item) => item.text);
  return unique(matched).slice(0, 3).join(", ") || "편안하게 어울리는 균형 잡힌 무드";
}

export function describeFlow(items) {
  const top = items.filter((item) => item.role === "첫인상").map((item) => item.name).join(", ");
  const bridge = items.filter((item) => item.role === "연결").map((item) => item.name).join(", ");
  const middle = items.filter((item) => item.role === "중심").map((item) => item.name).join(", ");
  const base = items.filter((item) => item.role === "잔향").map((item) => item.name).join(", ");
  return [
    top ? `처음은 ${top}가 만든 밝은 공기감으로 열립니다.` : "",
    bridge ? `곧 ${bridge}가 첫인상과 중심 사이를 부드럽게 이어 줍니다.` : "",
    middle ? `중간에는 ${middle}가 향의 중심을 만들며 전체 분위기를 잡아 줍니다.` : "",
    base ? `마지막에는 ${base}가 피부 위에 차분한 여운으로 남습니다.` : ""
  ].filter(Boolean).join(" ");
}

export function customerFriendlyGuide(description) {
  return cleanText(description)
    .replaceAll("조화제로 활용하면 좋아요.", "다른 향들과 부드럽게 어우러지도록 도와줍니다.")
    .replaceAll("조화제로 활용하면 좋습니다.", "다른 향들과 부드럽게 어우러지도록 도와줍니다.")
    .replaceAll("부스팅할 수 있어요.", "더 선명하게 살려줍니다.")
    .replaceAll("부스팅된 느낌으로 표현할 수 있어요.", "더 풍성하고 또렷하게 느껴지도록 해줍니다.")
    .replaceAll("악센트를 줄 수 있어요.", "작은 포인트를 더해줍니다.")
    .replaceAll("표현할 수 있어요.", "표현해 줍니다.")
    .replaceAll("활용이 가능해요.", "다양한 분위기에 자연스럽게 어울립니다.")
    .replaceAll("사용하면 좋아요.", "함께 쓰면 분위기가 더 안정적으로 이어집니다.")
    .replaceAll("가지고 있어요.", "느껴집니다.");
}

export function describeLogic(items) {
  return items
    .map((item) => {
      const roles = guideRoles(item.description);
      const guide = roles.length > 0 ? roles.join(", ") : item.role;
      return `${item.name}는 향의 ${guide}을 맡아 전체 향이 더 자연스럽게 이어지도록 도와줍니다. ${customerFriendlyGuide(item.description)}`;
    })
    .join(" ");
}

export function buildRecommendations(library, answers, details, sessionType, usageStats = {}) {
  return distributeRatios(pickRecommendations(library, answers, details, sessionType, usageStats), answers, sessionType);
}
