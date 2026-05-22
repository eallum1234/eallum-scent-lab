import { buildScent } from '../utils/recommendationEngine';

const ROLE_COLOR = {
  '탑노트': 'bg-sage/10 text-sage-dark border-sage/30',
  '미들노트': 'bg-amber-50 text-amber-700 border-amber-200',
  '베이스노트': 'bg-stone-100 text-stone-600 border-stone-200',
};

const ROLE_LABEL = {
  '탑노트': '첫인상',
  '미들노트': '중심향',
  '베이스노트': '잔향',
};

export default function ResultPage({ answers, onRestart }) {
  const { selected, flowDesc, logicDesc } = buildScent(answers);
  const totalGrams = selected.reduce((s, r) => s + r.grams, 0).toFixed(2);

  const moodText = {
    '맑고 투명한': '투명하고 공기처럼 가벼운',
    '포근하고 따뜻한': '포근하고 따뜻하게 감싸는',
    '신비롭고 깊은': '신비롭고 깊이 있는',
    '상쾌하고 생동감': '상쾌하고 생동감 넘치는',
    '낭만적이고 플로럴': '낭만적이고 꽃향기 가득한',
    '차분하고 고요한': '차분하고 고요한',
  };

  const mood = moodText[answers.mood] || answers.mood;

  return (
    <div className="px-5 py-8 max-w-lg mx-auto animate-fade-in pb-20">
      {/* 향수 이름 */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.4em] text-warm-gray uppercase mb-2">나의 향수</p>
        <h1 className="text-3xl font-light tracking-wider text-warm-gray-dark mb-3">
          {answers.name}
        </h1>
        <div className="w-8 h-px bg-sage mx-auto mb-4" />
        <p className="text-sm text-warm-gray leading-relaxed">
          {mood} 향수
        </p>
      </div>

      {/* 향의 무드 설명 */}
      <div className="bg-parchment rounded-2xl p-5 mb-5 border border-beige">
        <p className="text-xs tracking-widest text-sage font-medium mb-2">향의 무드</p>
        <p className="text-sm text-warm-gray-dark leading-relaxed">{flowDesc}</p>
      </div>

      {/* 추천 어코드 카드 */}
      <div className="mb-5">
        <p className="text-xs tracking-widest text-sage font-medium mb-3">추천 어코드 & 비율</p>
        <div className="space-y-3">
          {selected.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-beige shadow-soft">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${ROLE_COLOR[item.role]}`}>
                    {item.role} · {ROLE_LABEL[item.role]}
                  </span>
                  <p className="text-base font-medium text-warm-gray-dark mt-2">
                    {item.base.이름한국어}
                  </p>
                  <p className="text-xs text-warm-gray">{item.base.향취.slice(0, 3).join(' · ')}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-light text-sage-dark">{item.percent}%</p>
                  <p className="text-xs text-warm-gray">{item.grams}g</p>
                </div>
              </div>
              {/* 비율 바 */}
              <div className="w-full bg-beige rounded-full h-1.5 mt-3">
                <div
                  className="h-1.5 rounded-full bg-sage transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 조향 계산 요약 */}
      <div className="bg-white rounded-2xl p-4 border border-beige shadow-soft mb-5">
        <p className="text-xs tracking-widest text-sage font-medium mb-3">조향 계산</p>
        <div className="space-y-1.5">
          {selected.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-warm-gray">{item.base.이름한국어}</span>
              <span className="text-warm-gray-dark font-medium">{item.grams}g ({item.percent}%)</span>
            </div>
          ))}
          <div className="border-t border-beige pt-2 mt-2 flex justify-between text-sm font-medium">
            <span className="text-warm-gray-dark">총 향료량</span>
            <span className="text-sage-dark">{totalGrams}g / 7g</span>
          </div>
          <p className="text-xs text-warm-gray-light mt-1">기준: 30ml 오드뚜왈렛</p>
        </div>
      </div>

      {/* 조향 논리 */}
      <div className="bg-white rounded-2xl p-4 border border-beige shadow-soft mb-8">
        <p className="text-xs tracking-widest text-sage font-medium mb-3">조향 디렉터 노트</p>
        <div className="space-y-2.5">
          {selected.map((item, i) => (
            <div key={i}>
              <p className="text-xs font-medium text-warm-gray-dark mb-0.5">
                {item.base.이름한국어}
              </p>
              <p className="text-xs text-warm-gray leading-relaxed">{item.base.조향가이드}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3">
        <button
          onClick={() => window.print()}
          className="w-full py-4 rounded-2xl border border-sage text-sage-dark text-sm font-medium hover:bg-sage hover:text-white transition-all"
        >
          결과 저장하기
        </button>
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl border border-beige text-warm-gray text-sm hover:bg-beige transition-all"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}
