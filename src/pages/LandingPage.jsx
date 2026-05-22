export default function LandingPage({ onSelect }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-warm-gray uppercase mb-3">Scent Design Lab</p>
        <h1 className="text-4xl font-light tracking-[0.2em] text-warm-gray-dark mb-4">EALLUM</h1>
        <div className="w-8 h-px bg-sage mx-auto mb-6" />
        <p className="text-sm text-warm-gray leading-relaxed max-w-xs mx-auto">
          감정과 이미지로 시작하는<br />나만의 향수 여정
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => onSelect('group')}
          className="w-full py-5 px-8 rounded-2xl border border-sage text-sage-dark font-light tracking-widest text-sm hover:bg-sage hover:text-white transition-all duration-300 shadow-soft hover:shadow-card"
        >
          그룹세션을 시작합니다
        </button>
        <button
          onClick={() => onSelect('oneday')}
          className="w-full py-5 px-8 rounded-2xl border border-warm-gray-light text-warm-gray-dark font-light tracking-widest text-sm hover:bg-warm-gray-dark hover:text-white hover:border-warm-gray-dark transition-all duration-300 shadow-soft hover:shadow-card"
        >
          원데이세션을 시작합니다
        </button>
      </div>

      <div className="mt-16 text-center">
        <p className="text-xs text-warm-gray-light">
          그룹세션 · 16종 어코드 &nbsp;|&nbsp; 원데이세션 · 63종 어코드
        </p>
      </div>
    </div>
  );
}
