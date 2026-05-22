export default function ChoiceCard({ label, description, selected, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
        ${selected
          ? 'border-sage bg-sage/10 shadow-card'
          : 'border-beige bg-white hover:border-sage-light hover:shadow-soft'}
      `}
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-2xl mt-0.5">{icon}</span>}
        <div>
          <p className={`font-medium text-base ${selected ? 'text-sage-dark' : 'text-warm-gray-dark'}`}>
            {label}
          </p>
          {description && (
            <p className="text-sm text-warm-gray mt-1 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
