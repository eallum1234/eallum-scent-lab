import { customerFriendlyGuide, describeMood } from "../utils/perfumeRecommendation";

export default function ResultCard({ item }) {
  return (
    <article className="rounded-md border border-[#ddd4c4] bg-[#fffdf8] p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6f7d62]">추천 어코드</p>
          <h3 className="mt-1 text-2xl font-semibold">{item.name}</h3>
        </div>
        <div className="rounded-md bg-[#e8ecdf] px-3 py-2 text-right">
          <p className="text-xs text-[#62675f]">추천 비율</p>
          <p className="text-xl font-semibold text-[#344033]">{item.ratio}%</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <div className="rounded-md bg-white p-3">
          <dt className="font-semibold text-[#6f7d62]">역할</dt>
          <dd className="mt-1">{item.role}</dd>
        </div>
        <div className="rounded-md bg-white p-3">
          <dt className="font-semibold text-[#6f7d62]">g 단위 계산</dt>
          <dd className="mt-1">{item.grams.toFixed(2)}g</dd>
        </div>
        <div className="rounded-md bg-white p-3 md:col-span-2">
          <dt className="font-semibold text-[#6f7d62]">향의 무드 설명</dt>
          <dd className="mt-1 leading-6">{describeMood(item)}</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-md bg-[#f0eee6] p-3 text-sm leading-6 text-[#555a51]">
        <p className="font-semibold text-[#343a33]">조향 논리 설명</p>
        <p className="mt-1">{customerFriendlyGuide(item.description)}</p>
      </div>
    </article>
  );
}
