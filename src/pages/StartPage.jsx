import { SESSION_COPY } from "../data/sessionConfig";

export default function StartPage({ onStart }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1e8] px-6">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold text-[#6f7d62]">Scent Design Lab</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-normal text-[#292d28] md:text-7xl">
            S.P.I.C
          </h1>
          <div className="mx-auto mt-5 h-px w-24 bg-[#b8ad9c]" />
          <p className="mt-5 text-base font-medium text-[#6a665f] md:text-lg">
            S.P.I.C Scent Design Lab
          </p>
        </div>

        <div className="grid gap-4">
        <button
          type="button"
          onClick={() => onStart("group")}
          className="min-h-20 rounded-md border border-[#d8cebd] bg-[#71806a] px-6 text-lg font-semibold text-white shadow-soft transition hover:bg-[#5f6d59]"
        >
          {SESSION_COPY.group.button}
        </button>
        <button
          type="button"
          onClick={() => onStart("oneDay")}
          className="min-h-20 rounded-md border border-[#d8cebd] bg-[#fffdf8] px-6 text-lg font-semibold text-[#2f332d] shadow-soft transition hover:bg-[#eef1e7]"
        >
          {SESSION_COPY.oneDay.button}
        </button>
        </div>
      </div>
    </main>
  );
}
