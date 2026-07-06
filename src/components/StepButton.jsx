export default function StepButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-14 rounded-md border px-4 py-3 text-left text-sm font-semibold leading-6 transition ${
        selected
          ? "border-[#6f7d62] bg-[#6f7d62] text-white shadow-soft"
          : "border-[#ded6c8] bg-white text-[#343a33] hover:border-[#9da88f] hover:bg-[#f3f5ed]"
      }`}
    >
      {label}
    </button>
  );
}
