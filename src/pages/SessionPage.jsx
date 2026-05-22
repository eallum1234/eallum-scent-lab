import { useState } from 'react';
import StepIndicator from '../components/StepIndicator';
import ChoiceCard from '../components/ChoiceCard';

const TOTAL_STEPS = 7;

const STEPS = [
  {
    step: 1,
    title: 'STEP 1. 무드 선택',
    question: '지금 이 향수로 어떤 감정을 담고 싶으신가요?',
    key: 'mood',
    options: [
      { label: '맑고 투명한', description: '흐린 새벽 공기, 이슬 맺힌 유리창', icon: '🌿' },
      { label: '포근하고 따뜻한', description: '햇빛 받은 코튼, 따뜻한 손', icon: '🤎' },
      { label: '신비롭고 깊은', description: '밤의 정원, 촛불 앞의 고요', icon: '🌙' },
      { label: '상쾌하고 생동감', description: '비 온 후 공기, 이른 아침 숲', icon: '💨' },
      { label: '낭만적이고 플로럴', description: '꽃밭 사이 바람, 봄날의 설렘', icon: '🌸' },
      { label: '차분하고 고요한', description: '명상하는 오후, 오래된 나무', icon: '🌲' },
    ],
  },
  {
    step: 2,
    title: 'STEP 2. 메인 무드 결정',
    question: '이 향수를 맡을 때 가장 먼저 떠오르길 바라는 이미지는?',
    key: 'mainMood',
    options: [
      { label: '깨끗하고 투명한 공기감', icon: '✨' },
      { label: '달콤하고 감싸는 포근함', icon: '🍮' },
      { label: '묵직하고 오래 남는 잔향', icon: '🕯️' },
      { label: '싱그럽고 자연스러운 향', icon: '🌱' },
    ],
  },
  {
    step: 3,
    title: 'STEP 3. 첫인상 선택',
    question: '향수를 뿌렸을 때 처음 느껴지길 바라는 탑노트는?',
    key: 'topImpression',
    options: [
      { label: '시트러스하게 상큼한', description: '레몬, 베르가못, 오렌지처럼', icon: '🍋' },
      { label: '허브향이 풍기는', description: '라벤더, 민트, 로즈마리처럼', icon: '🌿' },
      { label: '초록빛 풀내음', description: '이슬 맺힌 잎사귀처럼', icon: '🍃' },
      { label: '과즙 터지는', description: '사과, 복숭아, 배처럼', icon: '🍑' },
      { label: '바다 내음', description: '소금기 머금은 바람처럼', icon: '🌊' },
    ],
  },
  {
    step: 4,
    title: 'STEP 4. 중심 향 선택',
    question: '향의 중심이 될 미들노트는 어떤 느낌이면 좋을까요?',
    key: 'middleChar',
    options: [
      { label: '부드러운 플로럴', description: '꽃잎처럼 은은하게', icon: '🌺' },
      { label: '달콤한 과일향', description: '잘 익은 과일처럼', icon: '🍇' },
      { label: '따뜻한 스파이시', description: '스파이스 향이 감도는', icon: '🌶️' },
      { label: '촉촉한 이슬향', description: '수분 가득한 꽃잎처럼', icon: '💧' },
      { label: '크리미한 부드러움', description: '밀크처럼 감싸는', icon: '🥛' },
    ],
  },
  {
    step: 5,
    title: 'STEP 5. 잔향 선택',
    question: '향이 사라질 때까지 남길 베이스노트는?',
    key: 'baseChar',
    options: [
      { label: '부드러운 머스크', description: '코튼처럼 포근하게', icon: '🧸' },
      { label: '따뜻한 우디', description: '나무향이 은은하게', icon: '🌳' },
      { label: '달콤한 앰버', description: '따뜻한 수지향', icon: '🍯' },
      { label: '포근한 바닐라', description: '달콤하고 부드럽게', icon: '🍦' },
      { label: '깊고 스모키한', description: '어두운 잔향이 오래', icon: '🖤' },
    ],
  },
  {
    step: 6,
    title: 'STEP 6. 밸런스 조정',
    question: '전체적인 향의 무게감은 어떻게 설계할까요?',
    key: 'balance',
    options: [
      { label: '가볍고 산뜻하게', description: '탑노트 중심 — 공기처럼 가볍게', icon: '🌤️' },
      { label: '균형 잡힌 조화', description: '탑·미들·베이스 고르게', icon: '⚖️' },
      { label: '깊고 진하게', description: '베이스 중심 — 오래 남는 잔향', icon: '🌑' },
    ],
    valueMap: { '가볍고 산뜻하게': 'light', '균형 잡힌 조화': 'balanced', '깊고 진하게': 'deep' },
  },
  {
    step: 7,
    title: 'STEP 7. 이름 짓기',
    question: '이 향수에 이름을 붙여주세요.',
    key: 'name',
    isInput: true,
  },
];

const SEASON_OPTIONS = [
  { label: '봄', icon: '🌸' },
  { label: '여름', icon: '☀️' },
  { label: '가을', icon: '🍂' },
  { label: '겨울', icon: '❄️' },
];

export default function SessionPage({ sessionType, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [season, setSeason] = useState(null);
  const [nameInput, setNameInput] = useState('');

  const step = STEPS[currentStep];

  const handleSelect = (key, value, valueMap) => {
    const mapped = valueMap ? valueMap[value] : value;
    setAnswers(prev => ({ ...prev, [key]: mapped || value }));
  };

  const handleNext = () => {
    if (currentStep === STEPS.length - 1) {
      onComplete({
        ...answers,
        season: season || '봄',
        name: nameInput || '나의 향수',
        sessionType: sessionType === 'group' ? 'group' : 'oneday',
      });
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const canProceed = () => {
    if (step.isInput) return nameInput.trim().length > 0;
    return !!answers[step.key];
  };

  const isSeasonStep = currentStep === 1;

  return (
    <div className="flex flex-col min-h-screen px-5 py-6 max-w-lg mx-auto animate-slide-up">
      <StepIndicator current={currentStep} total={TOTAL_STEPS} />

      <div className="mb-1">
        <p className="text-xs tracking-widest text-sage font-medium mb-1">{step.title}</p>
        <h2 className="text-lg font-medium text-warm-gray-dark leading-snug">{step.question}</h2>
      </div>

      {isSeasonStep && (
        <div className="mt-4 mb-2">
          <p className="text-xs text-warm-gray mb-3">계절감도 함께 알려주세요</p>
          <div className="flex gap-2">
            {SEASON_OPTIONS.map(s => (
              <button
                key={s.label}
                onClick={() => setSeason(s.label)}
                className={`flex-1 py-2 rounded-xl border text-sm transition-all ${
                  season === s.label
                    ? 'border-sage bg-sage/10 text-sage-dark font-medium'
                    : 'border-beige text-warm-gray hover:border-sage-light'
                }`}
              >
                <div>{s.icon}</div>
                <div>{s.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 space-y-3 flex-1">
        {!step.isInput ? (
          step.options.map(opt => (
            <ChoiceCard
              key={opt.label}
              label={opt.label}
              description={opt.description}
              icon={opt.icon}
              selected={answers[step.key] === (step.valueMap?.[opt.label] || opt.label)}
              onClick={() => handleSelect(step.key, opt.label, step.valueMap)}
            />
          ))
        ) : (
          <div className="mt-4">
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="예: 새벽 정원, 흐린 날의 기억..."
              className="w-full p-4 rounded-2xl border-2 border-beige bg-white text-warm-gray-dark placeholder-warm-gray-light focus:outline-none focus:border-sage transition-colors text-base"
              maxLength={30}
            />
            <p className="text-xs text-warm-gray-light mt-2 text-right">{nameInput.length} / 30</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex-none px-6 py-4 rounded-2xl border border-beige text-warm-gray text-sm hover:bg-beige transition-all"
          >
            이전
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex-1 py-4 rounded-2xl text-sm font-medium tracking-wide transition-all duration-200 ${
            canProceed()
              ? 'bg-sage-dark text-white hover:bg-sage shadow-card'
              : 'bg-beige text-warm-gray-light cursor-not-allowed'
          }`}
        >
          {currentStep === STEPS.length - 1 ? '향수 완성하기 ✦' : '다음 단계로'}
        </button>
      </div>
    </div>
  );
}
