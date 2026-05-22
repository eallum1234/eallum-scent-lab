import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SessionPage from './pages/SessionPage';
import ResultPage from './pages/ResultPage';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'session' | 'result'
  const [sessionType, setSessionType] = useState(null);
  const [answers, setAnswers] = useState(null);

  const handleSelectSession = (type) => {
    setSessionType(type);
    setScreen('session');
  };

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setScreen('result');
  };

  const handleRestart = () => {
    setScreen('landing');
    setSessionType(null);
    setAnswers(null);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header onHome={handleRestart} />
      <main className="max-w-lg mx-auto">
        {screen === 'landing' && (
          <LandingPage onSelect={handleSelectSession} />
        )}
        {screen === 'session' && (
          <SessionPage sessionType={sessionType} onComplete={handleComplete} />
        )}
        {screen === 'result' && answers && (
          <ResultPage answers={answers} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}
