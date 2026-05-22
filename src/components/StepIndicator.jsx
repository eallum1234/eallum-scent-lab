export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-1.5 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? 'w-6 h-1.5 bg-sage'
              : i === current
              ? 'w-8 h-1.5 bg-sage-dark'
              : 'w-4 h-1.5 bg-beige'
          }`}
        />
      ))}
    </div>
  );
}
