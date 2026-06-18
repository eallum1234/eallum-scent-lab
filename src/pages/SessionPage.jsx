import { useEffect, useMemo, useRef, useState } from "react";
import ProgressRail from "../components/ProgressRail";
import ResultCard from "../components/ResultCard";
import StepButton from "../components/StepButton";
import { SESSION_COPY, STEPS, TOTAL_OIL_GRAMS } from "../data/sessionConfig";
import { buildRecommendations, describeFlow, describeLogic } from "../utils/perfumeRecommendation";

function buildQuestion(step, answers) {
  if (step.key === "mainMood" && answers.mood) {
    return `${answers.mood}에서 출발해, 향수의 중심 분위기는 어떻게 잡을까요?`;
  }
  if (step.key === "firstImpression" && answers.mainMood) {
    return `${answers.mainMood} 분위기가 처음에는 어떤 공기감으로 열리면 좋을까요?`;
  }
  if (step.key === "heart" && answers.firstImpression) {
    return `${answers.firstImpression} 첫인상 뒤에 어떤 중심 이미지가 놓이면 좋을까요?`;
  }
  if (step.key === "drydown" && answers.heart) {
    return `${answers.heart} 중심 뒤에는 어떤 온도감으로 남길까요?`;
  }
  if (step.key === "balance" && answers.drydown) {
    return `${answers.drydown} 잔향을 기준으로 어느 계절감과 무게감에 맞출까요?`;
  }
  if (step.key === "name") {
    return "선택한 답변을 바탕으로 향수 이름을 자동으로 제안합니다.";
  }
  return step.question;
}

function buildAutoName(answers) {
  const first = answers.mainMood?.includes("프루티") || answers.heart?.includes("과즙")
    ? "프루티"
    : answers.mainMood?.includes("니치") || answers.heart?.includes("감각")
      ? "니치"
      : answers.mood?.includes("화사") || answers.heart?.includes("꽃")
        ? "블룸"
        : answers.mood?.includes("깊") || answers.drydown?.includes("독특")
          ? "딥"
          : "클린";

  const second = answers.firstImpression?.includes("시원")
    ? "에어"
    : answers.drydown?.includes("따뜻") || answers.balance?.includes("잔향")
      ? "베일"
      : answers.balance?.includes("가볍")
        ? "라이트"
        : "무드";

  return `${first} ${second}`;
}

export default function SessionPage({
  answers,
  details,
  library,
  onBack,
  onChoice,
  onNext,
  onReset,
  onResult,
  onResultShown,
  sessionType,
  showResult,
  stepIndex,
  usageStats
}) {
  const currentStep = STEPS[stepIndex];
  const recommendations = useMemo(
    () => buildRecommendations(library, answers, details, sessionType, usageStats),
    [answers, details, library, sessionType, usageStats]
  );
  const [fixedRecommendations, setFixedRecommendations] = useState([]);
  const recordedKey = useRef("");
  const visibleRecommendations = showResult && fixedRecommendations.length > 0 ? fixedRecommendations : recommendations;
  const totalRatio = visibleRecommendations.reduce((sum, item) => sum + item.ratio, 0);
  const totalGrams = visibleRecommendations.reduce((sum, item) => sum + item.grams, 0).toFixed(2);
  const finalName = buildAutoName(answers);

  useEffect(() => {
    if (!showResult || visibleRecommendations.length === 0) return;
    const key = `${finalName}-${visibleRecommendations.map((item) => item.name).join("|")}`;
    if (recordedKey.current === key) return;
    recordedKey.current = key;
    onResultShown(visibleRecommendations);
  }, [finalName, onResultShown, showResult, visibleRecommendations]);

  function showFixedResult() {
    setFixedRecommendations(recommendations);
    onResult();
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#292d28]">
      <section className="border-b border-[#ddd4c4] bg-[#faf7f0]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6f7d62]">S.P.I.C Scent Design Lab</p>
            <h1 className="mt-1 text-2xl font-semibold md:text-4xl">향수 조향 클래스</h1>
          </div>
          <div className="rounded-md border border-[#ddd4c4] bg-white px-4 py-3 text-sm text-[#666b61]">
            <p>{SESSION_COPY[sessionType].label}</p>
            <p className="mt-1">{SESSION_COPY[sessionType].limitText}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-6">
        {!showResult ? (
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <ProgressRail stepIndex={stepIndex} />

            <section className="rounded-md border border-[#ddd4c4] bg-[#fffdf8] p-5 shadow-soft md:p-8">
              <p className="text-sm font-semibold text-[#6f7d62]">{currentStep.step}</p>
              <h2 className="mt-2 text-2xl font-semibold">{currentStep.title}</h2>
              <p className="mt-3 text-lg leading-8 text-[#4f554d]">{buildQuestion(currentStep, answers)}</p>

              {currentStep.key === "name" ? (
                <div className="mt-6">
                  <div className="rounded-md border border-[#d7cebf] bg-white p-4">
                    <p className="text-sm font-semibold text-[#6f7d62]">제안 이름</p>
                    <p className="mt-2 text-2xl font-semibold text-[#292d28]">{finalName}</p>
                    <p className="mt-2 text-sm leading-6 text-[#62675f]">
                      지금까지 선택한 무드와 발향 방향을 바탕으로 자동 제안한 이름입니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={showFixedResult}
                    className="mt-4 min-h-14 w-full rounded-md bg-[#6f7d62] px-4 text-base font-semibold text-white transition hover:bg-[#5d6a53]"
                  >
                    추천 결과 보기
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {currentStep.choices.map((choice) => (
                      <StepButton
                        key={choice.label}
                        choice={choice}
                        selected={answers[currentStep.key] === choice.label}
                        onClick={() => onChoice(choice.label)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={onNext}
                    disabled={!answers[currentStep.key]}
                    className="mt-4 min-h-12 w-full rounded-md bg-[#6f7d62] px-4 text-sm font-semibold text-white transition hover:bg-[#5d6a53] disabled:cursor-not-allowed disabled:bg-[#b6bcae]"
                  >
                    다음
                  </button>
                </>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-md border border-[#d7cebf] bg-white px-4 py-2 text-sm font-semibold text-[#4b5048] transition hover:bg-[#f0ede5]"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-[#7a746c] transition hover:bg-[#eee8dc]"
                >
                  처음으로
                </button>
              </div>
            </section>
          </div>
        ) : (
          <section className="grid gap-5">
            <div className="rounded-md border border-[#ddd4c4] bg-white p-5 shadow-soft md:p-7">
              <p className="text-sm font-semibold text-[#6f7d62]">추천 결과</p>
              <h2 className="mt-2 text-3xl font-semibold">{finalName}</h2>
              <p className="mt-3 text-sm leading-6 text-[#62675f]">
                30ml 오드뚜왈렛 기준이며, 향료 총량은 {TOTAL_OIL_GRAMS}g입니다.
                추천 비율 합계는 {totalRatio}%이고, 계산 용량 합계는 {totalGrams}g입니다.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {visibleRecommendations.map((item) => (
                <ResultCard key={item.name} item={item} />
              ))}
            </div>

            <div className="rounded-md border border-[#ddd4c4] bg-white p-5 shadow-soft md:p-7">
              <h3 className="text-xl font-semibold">발향 흐름 설명</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{describeFlow(visibleRecommendations)}</p>

              <h3 className="mt-6 text-xl font-semibold">조향 논리 설명</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{describeLogic(visibleRecommendations)}</p>

              <h3 className="mt-6 text-xl font-semibold">최종 향수 이름</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{finalName}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onBack}
                  className="min-h-12 rounded-md border border-[#d7cebf] bg-white px-5 text-sm font-semibold text-[#4b5048] transition hover:bg-[#f0ede5]"
                >
                  이름 다시 보기
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="min-h-12 rounded-md bg-[#6f7d62] px-5 text-sm font-semibold text-white transition hover:bg-[#5d6a53]"
                >
                  새로 시작하기
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
