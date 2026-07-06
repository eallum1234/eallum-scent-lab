import { useState } from "react";

const SITE_PASSWORD = "spic2026";

export default function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submitPassword(event) {
    event.preventDefault();
    if (password === SITE_PASSWORD) {
      window.sessionStorage.setItem("spic-site-unlocked", "true");
      onUnlock();
      return;
    }
    setError("비밀번호가 맞지 않습니다.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f1e8] px-6">
      <section className="w-full max-w-md rounded-md border border-[#d8cebd] bg-[#fffdf8] p-6 text-center shadow-soft">
        <p className="text-sm font-semibold text-[#6f7d62]">S.P.I.C Scent Design Lab</p>
        <h1 className="mt-3 text-3xl font-semibold text-[#292d28]">입장 비밀번호</h1>
        <p className="mt-3 text-sm leading-6 text-[#6a665f]">
          수업용 웹앱입니다. 안내받은 비밀번호를 입력해 주세요.
        </p>

        <form className="mt-6 grid gap-3" onSubmit={submitPassword}>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            placeholder="비밀번호 입력"
            className="min-h-12 rounded-md border border-[#d8cebd] bg-white px-4 text-center text-base text-[#292d28] outline-none transition focus:border-[#6f7d62]"
          />
          {error ? <p className="text-sm font-semibold text-[#9b4f45]">{error}</p> : null}
          <button
            type="submit"
            className="min-h-12 rounded-md bg-[#71806a] px-4 text-base font-semibold text-white transition hover:bg-[#5f6d59]"
          >
            들어가기
          </button>
        </form>
      </section>
    </main>
  );
}
