import React, { useEffect, useMemo, useState } from "react";
import { STEPS } from "./data/sessionConfig";
import { copyFor } from "./data/translations";
import StartPage from "./pages/StartPage";
import SessionPage from "./pages/SessionPage";
import { normalizeBase } from "./utils/perfumeRecommendation";

export default function App() {
  const [library, setLibrary] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [loadError, setLoadError] = useState("");
  const [language, setLanguage] = useState("");
  const [sessionType, setSessionType] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [usageStats, setUsageStats] = useState({});

  const copy = copyFor(language || "ko");

  useEffect(() => {
    async function loadData() {
      try {
        const dataUrl = `${import.meta.env.BASE_URL}perfumeBases.json`;
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error("dataMissing");

        const data = await response.json();
        if (!Array.isArray(data) || data.length !== 63) {
          throw new Error("dataInvalid");
        }

        setLibrary(data.map(normalizeBase));
        setLoadState("complete");
      } catch (error) {
        setLoadState("error");
        setLoadError(error.message);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("eallum-accord-usage");
      if (saved) setUsageStats(JSON.parse(saved));
    } catch {
      setUsageStats({});
    }
  }, []);

  const currentStep = useMemo(() => STEPS[stepIndex], [stepIndex]);

  function startSession(type) {
    setSessionType(type);
    setStepIndex(0);
    setAnswers({});
    setDetails({});
    setShowResult(false);
  }

  function chooseAnswer(value) {
    setAnswers((current) => ({ ...current, [currentStep.key]: value }));
  }

  function recordRecommendations(items) {
    setUsageStats((current) => {
      const next = { ...current };
      items.forEach((item) => {
        next[item.name] = (next[item.name] ?? 0) + 1;
      });

      try {
        window.localStorage.setItem("eallum-accord-usage", JSON.stringify(next));
      } catch {
        // 저장 공간이 막혀도 추천은 계속 동작합니다.
      }

      return next;
    });
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      setStepIndex(STEPS.length - 1);
      return;
    }

    if (stepIndex > 0) setStepIndex((current) => current - 1);
  }

  if (!sessionType) return <StartPage language={language} onLanguage={setLanguage} onStart={startSession} />;

  if (loadState !== "complete") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e8] px-6 text-center text-[#30342e]">
        <div className="rounded-md border border-[#d8cebd] bg-white p-6 shadow-soft">
          <p className="text-lg font-semibold">{copy.dataStatus}</p>
          <p className="mt-2 text-sm">
            {loadState === "loading" ? copy.loading : copy[loadError] ?? loadError}
          </p>
        </div>
      </main>
    );
  }

  return (
    <SessionPage
      answers={answers}
      details={details}
      library={library}
      onBack={goBack}
      onChoice={chooseAnswer}
      onNext={() => setStepIndex((current) => Math.min(current + 1, STEPS.length - 1))}
      onReset={() => setSessionType(null)}
      onResult={() => setShowResult(true)}
      onResultShown={recordRecommendations}
      sessionType={sessionType}
      showResult={showResult}
      stepIndex={stepIndex}
      usageStats={usageStats}
      language={language}
    />
  );
}
