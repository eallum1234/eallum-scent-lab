import { LANGUAGES, copyFor } from "../data/translations";

export default function StartPage({ language, onLanguage, onStart }) {
  const copy = copyFor(language);

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

        {!language ? (
          <div className="rounded-md border border-[#d8cebd] bg-[#fffdf8] p-5 shadow-soft">
            <p className="text-center text-xl font-semibold text-[#292d28]">언어를 선택해 주세요</p>
            <p className="mt-2 text-center text-sm text-[#6a665f]">Choose your language</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLanguage(item.code)}
                  className="min-h-14 rounded-md border border-[#d8cebd] bg-white px-4 text-base font-semibold text-[#2f332d] shadow-soft transition hover:bg-[#eef1e7]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
        <div className="grid gap-4">
        <button
          type="button"
          onClick={() => onStart("group")}
          className="min-h-20 rounded-md border border-[#d8cebd] bg-[#71806a] px-6 text-lg font-semibold text-white shadow-soft transition hover:bg-[#5f6d59]"
        >
          {copy.groupButton}
        </button>
        <button
          type="button"
          onClick={() => onStart("oneDay")}
          className="min-h-20 rounded-md border border-[#d8cebd] bg-[#fffdf8] px-6 text-lg font-semibold text-[#2f332d] shadow-soft transition hover:bg-[#eef1e7]"
        >
          {copy.oneDayButton}
        </button>
        </div>
        )}
      </div>
    </main>
  );
}
