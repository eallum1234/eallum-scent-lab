import perfumeBases from '../data/perfumeBases.json';

// 그룹세션 허용 어코드
const GROUP_ALLOWED = [
  'Bergamot Base', 'Lemon Base', 'Orange Base', 'Mint Base',
  'Lavender Base', 'Freesia Base', 'Magnolia Base', 'Rose Base',
  'Peony Base', 'Marine Base',
  'White Musk Base', 'Vanilla Base', 'Amber Base',
  'Sandalwood Base', 'Cedarwood Base', 'Powdery Base',
];

// 무드 → 키워드 매핑
const MOOD_KEYWORDS = {
  '맑고 투명한': ['청량', '투명', '클린', '프레시', '이슬'],
  '포근하고 따뜻한': ['포근함', '달콤함', '따뜻함', '크리미', '편안함'],
  '신비롭고 깊은': ['신비로움', '깊은향', '오리엔탈', '스모키', '관능적'],
  '상쾌하고 생동감': ['상쾌함', '생동감', '청량', '활기', '상큼함'],
  '낭만적이고 플로럴': ['낭만적', '플로럴', '로맨틱', '봄향기', '우아함'],
  '차분하고 고요한': ['차분함', '고요', '우디', '명상', '자연'],
};

const SEASON_KEYWORDS = {
  '봄': ['봄향기', '플로럴', '그린', '상큼함', '싱그러움'],
  '여름': ['청량', '바다향', '과일향', '프레시', '활기'],
  '가을': ['우디', '따뜻함', '스파이시', '깊은향', '차분함'],
  '겨울': ['포근함', '오리엔탈', '달콤함', '신비로움', '따뜻함'],
};

const TOP_IMPRESSION_KEYWORDS = {
  '시트러스하게 상큼한': ['Citrus', 'Fresh', 'Zesty', 'Sparkling'],
  '허브향이 풍기는': ['Herbaceous', 'Aromatic', 'Camphor', 'Minty'],
  '초록빛 풀내음': ['Green', 'Leafy', 'Cucumber', 'Fresh'],
  '과즙 터지는': ['Juicy', 'Fruity', 'Sweet', 'Berry'],
  '바다 내음': ['Aqua', 'Sea Salt', 'Ozonic', 'Mineral'],
};

const MIDDLE_KEYWORDS = {
  '부드러운 플로럴': ['Floral', 'Rosy', 'Lily', 'White Floral', 'Dewy'],
  '달콤한 과일향': ['Sweet', 'Fruity', 'Candy', 'Jammy'],
  '따뜻한 스파이시': ['Spicy', 'Warm', 'Honey', 'Powdery'],
  '촉촉한 이슬향': ['Dewy', 'Watery', 'Aqua', 'Transparent'],
  '크리미한 부드러움': ['Creamy', 'Milky', 'Lactonic', 'Soft'],
};

const BASE_KEYWORDS = {
  '부드러운 머스크': ['Musky', 'Clean', 'Cotton Powdery', 'Warm'],
  '따뜻한 우디': ['Woody', 'Balsamic', 'Dry', 'Coniferous'],
  '달콤한 앰버': ['Warm', 'Sweet', 'Ambery', 'Powdery'],
  '포근한 바닐라': ['Sweet', 'Custard', 'Creamy', 'Balsamic'],
  '깊고 스모키한': ['Smoky', 'Resinous', 'Leathery', 'Earthy'],
};

function scoreBase(base, keywords) {
  let score = 0;
  const tags = base.무드태그 || [];
  const scents = base.향취 || [];
  const guide = base.조향가이드 || '';

  keywords.forEach(kw => {
    if (tags.some(t => t.includes(kw))) score += 3;
    if (scents.some(s => s.includes(kw))) score += 2;
    if (guide.includes(kw)) score += 1;
  });

  return score;
}

function getNoteBases(bases, noteType) {
  return bases.filter(b => b.발향노트.includes(noteType));
}

export function recommend({ sessionType, mood, season, topImpression, middleChar, baseChar, balance }) {
  const pool = sessionType === 'group'
    ? perfumeBases.filter(b => GROUP_ALLOWED.includes(b.이름))
    : perfumeBases;

  const moodKws = MOOD_KEYWORDS[mood] || [];
  const seasonKws = SEASON_KEYWORDS[season] || [];
  const topKws = TOP_IMPRESSION_KEYWORDS[topImpression] || [];
  const middleKws = MIDDLE_KEYWORDS[middleChar] || [];
  const baseKws = BASE_KEYWORDS[baseChar] || [];

  const topPool = getNoteBases(pool, 'Top');
  const middlePool = getNoteBases(pool, 'Middle');
  const basePool = getNoteBases(pool, 'Base');

  function rankBases(bases, primaryKws, secondaryKws) {
    return bases
      .map(b => ({
        base: b,
        score: scoreBase(b, primaryKws) * 2 + scoreBase(b, secondaryKws) + scoreBase(b, moodKws) + scoreBase(b, seasonKws),
      }))
      .sort((a, b) => b.score - a.score);
  }

  const topRanked = rankBases(topPool, topKws, moodKws);
  const middleRanked = rankBases(middlePool, middleKws, moodKws);
  const baseRanked = rankBases(basePool, baseKws, moodKws);

  const maxBases = sessionType === 'group' ? 5 : 5;

  // 탑 1-2, 미들 1-2, 베이스 1-2 선택
  const selectedTop = topRanked.slice(0, 1).map(r => r.base);
  const selectedMiddle = middleRanked.slice(0, 2).map(r => r.base);
  const selectedBase = baseRanked.slice(0, 2).map(r => r.base);

  const selected = [...selectedTop, ...selectedMiddle, ...selectedBase];

  // 비율 계산 (balance: 'light' | 'balanced' | 'deep')
  const ratioMap = {
    light: { Top: 30, Middle: 45, Base: 25 },
    balanced: { Top: 20, Middle: 45, Base: 35 },
    deep: { Top: 15, Middle: 40, Base: 45 },
  };
  const ratios = ratioMap[balance] || ratioMap.balanced;

  const result = [];
  let topCount = selectedTop.length;
  let middleCount = selectedMiddle.length;
  let baseCount = selectedBase.length;

  selectedTop.forEach(b => {
    const pct = Math.round(ratios.Top / topCount);
    result.push({ base: b, role: '탑노트', percent: pct, grams: +(7 * pct / 100).toFixed(2) });
  });
  selectedMiddle.forEach(b => {
    const pct = Math.round(ratios.Middle / middleCount);
    result.push({ base: b, role: '미들노트', percent: pct, grams: +(7 * pct / 100).toFixed(2) });
  });
  selectedBase.forEach(b => {
    const pct = Math.round(ratios.Base / baseCount);
    result.push({ base: b, role: '베이스노트', percent: pct, grams: +(7 * pct / 100).toFixed(2) });
  });

  // 합계 100% 보정
  const total = result.reduce((s, r) => s + r.percent, 0);
  if (total !== 100 && result.length > 0) {
    result[result.length - 1].percent += (100 - total);
    result[result.length - 1].grams = +(7 * result[result.length - 1].percent / 100).toFixed(2);
  }

  return result;
}

export function buildScent(answers) {
  const selected = recommend(answers);
  const topNotes = selected.filter(s => s.role === '탑노트');
  const middleNotes = selected.filter(s => s.role === '미들노트');
  const baseNotes = selected.filter(s => s.role === '베이스노트');

  const topDesc = topNotes.map(t => t.base.이름한국어).join(', ');
  const middleDesc = middleNotes.map(m => m.base.이름한국어).join(', ');
  const baseDesc = baseNotes.map(b => b.base.이름한국어).join(', ');

  const flowDesc = `처음 ${topDesc ? topDesc + '의 ' : ''}${topNotes[0]?.base.온도감 || '청량한'} 인상으로 시작해, 시간이 지나며 ${middleDesc ? middleDesc + '의 ' : ''}향이 피어납니다. 마지막에는 ${baseDesc ? baseDesc + '의 ' : ''}포근한 잔향이 오래 남습니다.`;

  const logicDesc = selected.map(s => {
    const guide = s.base.조향가이드;
    return `· ${s.base.이름한국어} (${s.role}): ${guide}`;
  }).join('\n');

  return { selected, flowDesc, logicDesc };
}
