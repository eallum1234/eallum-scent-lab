import React, { useEffect, useMemo, useState } from "react";
import { STEPS } from "./data/sessionConfig";
import StartPage from "./pages/StartPage";
import SessionPage from "./pages/SessionPage";
import { normalizeBase } from "./utils/perfumeRecommendation";

export default function App() {
  const [library, setLibrary] = useState([]);
  const [loadState, setLoadState] = useState("불러오는 중");
  const [sessionType, setSessionType] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [details, setDetails] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [usageStats, setUsageStats] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/perfumeBases.json");
        if (!response.ok) throw new Error("데이터 파일을 찾을 수 없습니다.");
        const data = await response.json();
        if (!Array.isArray(data) || data.length !== 63) {
          throw new Error("엑셀에서 변환한 63개 어코드 데이터가 아닙니다.");
        }
        setLibrary(data.map(normalizeBase));
        setLoadState("완료");
      } catch (error) {
        setLoadState(error.message);
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

  function updateDetail(key, value) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  function updateName(value) {
    setAnswers((current) => ({ ...current, name: value }));
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

  if (!sessionType) return <StartPage onStart={startSession} />;

  if (loadState !== "완료") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e8] px-6 text-center text-[#30342e]">
        <div className="rounded-md border border-[#d8cebd] bg-white p-6 shadow-soft">
          <p className="text-lg font-semibold">데이터 상태</p>
          <p className="mt-2 text-sm">{loadState}</p>
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
      onDetailChange={updateDetail}
      onNameChange={updateName}
      onNext={() => setStepIndex((current) => Math.min(current + 1, STEPS.length - 1))}
      onReset={() => setSessionType(null)}
      onResult={() => setShowResult(true)}
      onResultShown={recordRecommendations}
      sessionType={sessionType}
      showResult={showResult}
      stepIndex={stepIndex}
      usageStats={usageStats}
    />
  );
}
