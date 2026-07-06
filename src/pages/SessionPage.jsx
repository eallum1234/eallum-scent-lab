import { useEffect, useMemo, useRef, useState } from "react";
import ProgressRail from "../components/ProgressRail";
import ResultCard from "../components/ResultCard";
import StepButton from "../components/StepButton";
import { TOTAL_OIL_GRAMS, STEPS } from "../data/sessionConfig";
import { choiceLabelFor, copyFor, roleLabelFor, stepCopyFor } from "../data/translations";
import { buildRecommendations, describeFlow, describeLogic } from "../utils/perfumeRecommendation";

const DROP_GRAMS = 0.03;
const BASE_VOLUME_ML = 30;
const VOLUME_OPTIONS = [10, 30, 50];

function localizedAnswer(answer, stepKey, language) {
  if (!answer) return "";
  return choiceLabelFor(answer, stepKey, language);
}

function buildQuestion(step, answers, language) {
  const stepCopy = stepCopyFor(step.key, language);
  if (step.key === "mainMood" && answers.mood) {
    const mood = localizedAnswer(answers.mood, "mood", language);
    if (language === "en") return `Starting from ${mood}, what atmosphere should the perfume become?`;
    if (language === "zh") return `从「${mood}」出发，香水想完成为什么氛围？`;
    if (language === "ja") return `「${mood}」から始めて、どんな雰囲気に仕上げますか？`;
    return `${mood}에서 출발해 어떤 분위기로 완성할까요?`;
  }
  if (step.key === "firstImpression" && answers.mainMood) {
    const mood = localizedAnswer(answers.mainMood, "mainMood", language);
    if (language === "en") return `How should the first impression of ${mood} feel?`;
    if (language === "zh") return `「${mood}」的第一印象想如何呈现？`;
    if (language === "ja") return `「${mood}」の第一印象はどのように感じさせますか？`;
    return `${mood} 분위기의 첫인상은 어떻게 열리면 좋을까요?`;
  }
  if (step.key === "heart" && answers.firstImpression) {
    const first = localizedAnswer(answers.firstImpression, "firstImpression", language);
    if (language === "en") return `After ${first}, what heart scent should appear?`;
    if (language === "zh") return `在「${first}」之后，想出现什么样的核心香气？`;
    if (language === "ja") return `「${first}」のあと、どんな中心の香りを出しますか？`;
    return `${first} 다음에는 어떤 중심 향이 느껴지면 좋을까요?`;
  }
  if (step.key === "drydown" && answers.heart) {
    const heart = localizedAnswer(answers.heart, "heart", language);
    if (language === "en") return `After the ${heart}, what drydown should remain?`;
    if (language === "zh") return `「${heart}」之后，最后想留下什么尾韵？`;
    if (language === "ja") return `「${heart}」のあと、最後にどんな残り香を残しますか？`;
    return `${heart} 뒤에는 어떤 잔향이 남으면 좋을까요?`;
  }
  if (step.key === "balance" && answers.drydown) {
    const drydown = localizedAnswer(answers.drydown, "drydown", language);
    if (language === "en") return `Based on ${drydown}, how should the overall balance feel?`;
    if (language === "zh") return `以「${drydown}」为基准，整体平衡想如何调整？`;
    if (language === "ja") return `「${drydown}」を基準に、全体のバランスをどう整えますか？`;
    return `${drydown} 잔향을 기준으로 전체 균형을 어떻게 맞출까요?`;
  }
  return stepCopy.question;
}

function buildAutoName(answers, language) {
  const allAnswers = Object.values(answers).join(" ");
  const nameParts = {
    ko: {
      fruity: "프루티",
      niche: "니치",
      floral: "블룸",
      clean: "클린",
      soft: "소프트",
      air: "에어",
      veil: "베일",
      mood: "무드"
    },
    en: {
      fruity: "Fruity",
      niche: "Niche",
      floral: "Bloom",
      clean: "Clean",
      soft: "Soft",
      air: "Air",
      veil: "Veil",
      mood: "Mood"
    },
    zh: {
      fruity: "果香",
      niche: "小众",
      floral: "花境",
      clean: "清透",
      soft: "柔和",
      air: "空气",
      veil: "轻纱",
      mood: "氛围"
    },
    ja: {
      fruity: "フルーティー",
      niche: "ニッチ",
      floral: "ブルーム",
      clean: "クリーン",
      soft: "ソフト",
      air: "エア",
      veil: "ヴェール",
      mood: "ムード"
    }
  };
  const part = nameParts[language] ?? nameParts.ko;
  const first = allAnswers.includes("프루티") || allAnswers.includes("과즙")
    ? part.fruity
    : allAnswers.includes("니치") || allAnswers.includes("개성")
      ? part.niche
      : allAnswers.includes("플로럴") || allAnswers.includes("꽃")
        ? part.floral
        : allAnswers.includes("깨끗") || allAnswers.includes("맑")
          ? part.clean
          : part.soft;
  const second = allAnswers.includes("시원") || allAnswers.includes("투명") ? part.air : allAnswers.includes("따뜻") || allAnswers.includes("잔향") ? part.veil : part.mood;
  return `${first} ${second}`;
}

export default function SessionPage({
  answers,
  details,
  language,
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
  const copy = copyFor(language);
  const currentStep = STEPS[stepIndex];
  const currentStepCopy = stepCopyFor(currentStep.key, language);
  const recommendations = useMemo(
    () => buildRecommendations(library, answers, details, sessionType, usageStats),
    [answers, details, library, sessionType, usageStats]
  );
  const [fixedRecommendations, setFixedRecommendations] = useState([]);
  const [selectedVolume, setSelectedVolume] = useState(30);
  const recordedKey = useRef("");

  const visibleRecommendations = showResult && fixedRecommendations.length > 0 ? fixedRecommendations : recommendations;
  const selectedOilGrams = Number(((TOTAL_OIL_GRAMS * selectedVolume) / BASE_VOLUME_ML).toFixed(2));
  const displayRecommendations = visibleRecommendations.map((item) => ({
    ...item,
    grams: Number(((selectedOilGrams * item.ratio) / 100).toFixed(2))
  }));
  const totalRatio = displayRecommendations.reduce((sum, item) => sum + item.ratio, 0);
  const totalGrams = displayRecommendations.reduce((sum, item) => sum + item.grams, 0).toFixed(2);
  const blendLines = displayRecommendations.map((item) => ({
    ...item,
    drops: Math.round(item.grams / DROP_GRAMS)
  }));
  const finalName = buildAutoName(answers, language);

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

  const sessionLabel = sessionType === "group" ? copy.groupLabel : copy.oneDayLabel;
  const sessionLimit = sessionType === "group" ? copy.groupLimit : copy.oneDayLimit;

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#292d28]">
      <section className="border-b border-[#ddd4c4] bg-[#faf7f0]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6f7d62]">S.P.I.C Scent Design Lab</p>
            <h1 className="mt-1 text-2xl font-semibold md:text-4xl">{copy.appHeading}</h1>
          </div>
          <div className="rounded-md border border-[#ddd4c4] bg-white px-4 py-3 text-sm text-[#666b61]">
            <p>{sessionLabel}</p>
            <p className="mt-1">{sessionLimit}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-6">
        {!showResult ? (
          <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
            <ProgressRail language={language} stepIndex={stepIndex} />

            <section className="rounded-md border border-[#ddd4c4] bg-[#fffdf8] p-5 shadow-soft md:p-8">
              <p className="text-sm font-semibold text-[#6f7d62]">{currentStep.step}</p>
              <h2 className="mt-2 text-2xl font-semibold">{currentStepCopy.title}</h2>
              <p className="mt-3 text-lg leading-8 text-[#4f554d]">{buildQuestion(currentStep, answers, language)}</p>

              {currentStep.key === "name" ? (
                <div className="mt-6">
                  <div className="rounded-md border border-[#d7cebf] bg-white p-4">
                    <p className="text-sm font-semibold text-[#6f7d62]">{copy.suggestedName}</p>
                    <p className="mt-2 text-2xl font-semibold text-[#292d28]">{finalName}</p>
                    <p className="mt-2 text-sm leading-6 text-[#62675f]">{copy.suggestedNameHelp}</p>
                  </div>

                  <div className="mt-4 rounded-md border border-[#d7cebf] bg-white p-4">
                    <p className="text-sm font-semibold text-[#6f7d62]">{copy.volumeTitle}</p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {VOLUME_OPTIONS.map((volume) => (
                        <button
                          key={volume}
                          type="button"
                          onClick={() => setSelectedVolume(volume)}
                          className={`min-h-12 rounded-md border px-3 text-sm font-semibold transition ${
                            selectedVolume === volume
                              ? "border-[#6f7d62] bg-[#6f7d62] text-white"
                              : "border-[#d7cebf] bg-[#faf7f0] text-[#4b5048] hover:bg-[#f0ede5]"
                          }`}
                        >
                          {volume}ml
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#62675f]">
                      {copy.volumeHelp(selectedVolume, selectedOilGrams.toFixed(2))}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={showFixedResult}
                    className="mt-4 min-h-14 w-full rounded-md bg-[#6f7d62] px-4 text-base font-semibold text-white transition hover:bg-[#5d6a53]"
                  >
                    {copy.showResult}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {currentStep.choices.map((choice) => (
                      <StepButton
                        key={choice.label}
                        label={choiceLabelFor(choice.label, currentStep.key, language)}
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
                    {copy.next}
                  </button>
                </>
              )}

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="rounded-md border border-[#d7cebf] bg-white px-4 py-2 text-sm font-semibold text-[#4b5048] transition hover:bg-[#f0ede5]"
                >
                  {copy.previous}
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-[#7a746c] transition hover:bg-[#eee8dc]"
                >
                  {copy.startOver}
                </button>
              </div>
            </section>
          </div>
        ) : (
          <section className="grid gap-5">
            <div className="rounded-md border border-[#ddd4c4] bg-white p-5 shadow-soft md:p-7">
              <p className="text-sm font-semibold text-[#6f7d62]">{copy.resultTitle}</p>
              <h2 className="mt-2 text-3xl font-semibold">{finalName}</h2>
              <p className="mt-3 text-sm leading-6 text-[#62675f]">
                {copy.resultSummary(selectedVolume, selectedOilGrams.toFixed(2), totalRatio, totalGrams)}
              </p>
            </div>

            <div className="rounded-md border border-[#ddd4c4] bg-[#fffdf8] p-5 shadow-soft md:p-7">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#6f7d62]">{copy.blendTitle}</p>
                  <h3 className="mt-1 text-xl font-semibold">{copy.blendSubtitle}</h3>
                </div>
                <p className="text-sm text-[#62675f]">{copy.dropBase}</p>
              </div>
              <div className="mt-4 grid gap-2">
                {blendLines.map((item) => (
                  <div
                    key={`blend-${item.name}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-[#e3dacb] bg-white px-4 py-3 text-sm sm:text-base"
                  >
                    <span className="font-semibold text-[#343a33]">{item.name}</span>
                    <span className="shrink-0 text-right text-[#555a51]">
                      {item.grams.toFixed(2)}g / {item.drops}{copy.drops}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {displayRecommendations.map((item) => (
                <ResultCard key={item.name} item={item} language={language} />
              ))}
            </div>

            <div className="rounded-md border border-[#ddd4c4] bg-white p-5 shadow-soft md:p-7">
              <h3 className="text-xl font-semibold">{copy.flowTitle}</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{describeFlow(visibleRecommendations, language)}</p>

              <h3 className="mt-6 text-xl font-semibold">{copy.logicTitle}</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{describeLogic(visibleRecommendations, language)}</p>

              <h3 className="mt-6 text-xl font-semibold">{copy.finalNameTitle}</h3>
              <p className="mt-3 leading-7 text-[#555a51]">{finalName}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onBack}
                  className="min-h-12 rounded-md border border-[#d7cebf] bg-white px-5 text-sm font-semibold text-[#4b5048] transition hover:bg-[#f0ede5]"
                >
                  {copy.backToName}
                </button>
                <button
                  type="button"
                  onClick={onReset}
                  className="min-h-12 rounded-md bg-[#6f7d62] px-5 text-sm font-semibold text-white transition hover:bg-[#5d6a53]"
                >
                  {copy.restart}
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
