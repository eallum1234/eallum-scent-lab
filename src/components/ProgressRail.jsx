import { STEPS } from "../data/sessionConfig";

export default function ProgressRail({ stepIndex }) {
  return (
    <aside className="rounded-md border border-[#ddd4c4] bg-white p-4 shadow-soft">
      {STEPS.map((step, index) => (
        <div
          key={step.key}
          className={`border-l-2 py-2 pl-3 text-sm ${
            index === stepIndex ? "border-[#6f7d62] text-[#292d28]" : "border-[#e6ddcf] text-[#8a867e]"
          }`}
        >
          <p className="font-semibold">{step.step}</p>
          <p>{step.title}</p>
        </div>
      ))}
    </aside>
  );
}
