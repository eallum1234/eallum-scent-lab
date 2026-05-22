export default function Header({ onHome }) {
  return (
    <header className="flex items-center justify-between px-6 py-5 border-b border-beige">
      <button onClick={onHome} className="text-left group">
        <p className="text-xs tracking-[0.3em] text-warm-gray uppercase">Scent Design Lab</p>
        <h1 className="text-xl font-light tracking-[0.15em] text-warm-gray-dark group-hover:text-sage-dark transition-colors">
          EALLUM
        </h1>
      </button>
      <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center">
        <span className="text-warm-gray text-sm">✦</span>
      </div>
    </header>
  );
}
