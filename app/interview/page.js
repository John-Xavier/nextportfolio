"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  questions,
  TOPICS,
  DIFFICULTIES,
  questionCount,
} from "./questions";

/* ----------------------------- answer grading ----------------------------- */

// Normalize text for loose comparison: lowercase, strip punctuation, collapse space.
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[`*_>#\-]/g, " ")
    .replace(/[^a-z0-9+.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// A key point is "covered" if every significant word in it appears in the answer.
// Short phrases (e.g. "map transform") must have all words present; this keeps
// matching forgiving on wording while still requiring the real concept.
function isCovered(keyPoint, normalizedAnswer) {
  const words = normalize(keyPoint)
    .split(" ")
    .filter((w) => w.length > 2);
  if (words.length === 0) return true;
  const hits = words.filter((w) => normalizedAnswer.includes(w)).length;
  // Require roughly two-thirds of the words in a multi-word key point.
  return hits >= Math.ceil(words.length * 0.66);
}

function gradeAnswer(userAnswer, keyPoints) {
  const normalized = normalize(userAnswer);
  const covered = [];
  const missed = [];
  for (const point of keyPoints) {
    if (isCovered(point, normalized)) covered.push(point);
    else missed.push(point);
  }
  const score = keyPoints.length
    ? Math.round((covered.length / keyPoints.length) * 100)
    : 0;
  return { covered, missed, score };
}

/* ------------------------------ small helpers ----------------------------- */

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const difficultyColor = {
  Beginner: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  Intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  Advanced: "text-rose-400 border-rose-500/30 bg-rose-500/10",
};

// Render the model answer, turning ```code``` fences into styled blocks.
function AnswerBody({ text }) {
  const parts = text.split(/```/g);
  return (
    <div className="space-y-4">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <pre
            key={i}
            className="overflow-x-auto rounded-lg border border-[#1e1e35] bg-[#0a0a12] p-4 text-sm text-slate-300 font-mono leading-relaxed"
          >
            <code>{part.replace(/^swift\n/, "")}</code>
          </pre>
        ) : (
          part.trim() && (
            <p key={i} className="text-slate-300 leading-relaxed whitespace-pre-line">
              {part.trim()}
            </p>
          )
        )
      )}
    </div>
  );
}

/* -------------------------------- the page -------------------------------- */

export default function InterviewTool() {
  // "config" = choosing filters; "quiz" = answering.
  const [stage, setStage] = useState("config");
  const [topic, setTopic] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ answered: 0, totalScore: 0 });

  // Live count of questions matching the current filters (for the Start button).
  const matching = useMemo(
    () =>
      questions.filter(
        (q) =>
          (topic === "All" || q.topic === topic) &&
          (difficulty === "All" || q.difficulty === difficulty)
      ),
    [topic, difficulty]
  );

  // Per-topic counts for the topic chips.
  const topicCounts = useMemo(() => {
    const counts = {};
    for (const q of questions) counts[q.topic] = (counts[q.topic] || 0) + 1;
    return counts;
  }, []);

  function start() {
    if (matching.length === 0) return;
    setDeck(shuffle(matching));
    setIndex(0);
    setUserAnswer("");
    setRevealed(false);
    setResult(null);
    setStats({ answered: 0, totalScore: 0 });
    setStage("quiz");
  }

  function submit() {
    const current = deck[index];
    const graded = gradeAnswer(userAnswer, current.keyPoints);
    setResult(graded);
    setRevealed(true);
    setStats((s) => ({
      answered: s.answered + 1,
      totalScore: s.totalScore + graded.score,
    }));
  }

  function next() {
    if (index + 1 >= deck.length) {
      // Loop back through a reshuffled deck for endless practice.
      setDeck(shuffle(matching));
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setUserAnswer("");
    setRevealed(false);
    setResult(null);
  }

  const current = deck[index];
  const avg =
    stats.answered > 0 ? Math.round(stats.totalScore / stats.answered) : 0;

  return (
    <div className="min-h-screen bg-[#0a0a12] text-slate-100">
      {/* ambient glow + grid, matching the home page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e1e35_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-10 sm:py-16">
        {/* header */}
        <header className="mb-10">
          <Link
            href="/"
            className="text-slate-500 hover:text-violet-400 text-sm transition-colors"
          >
            ← Back to portfolio
          </Link>
          <div className="mt-6 text-center">
            <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">
              Interview Prep
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              iOS Interview Trainer
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              {questionCount} curated Swift &amp; iOS questions across{" "}
              {TOPICS.length} topics. Pick a focus, write your answer, then
              compare against a model answer — missed key points are highlighted
              so you know exactly what to review.
            </p>
          </div>
        </header>

        {/* ---------------------------- config stage ---------------------------- */}
        {stage === "config" && (
          <div className="space-y-8">
            {/* difficulty */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                Difficulty
              </h2>
              <div className="flex flex-wrap gap-2">
                {["All", ...DIFFICULTIES].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      difficulty === d
                        ? "border-violet-500 bg-violet-500/15 text-violet-300"
                        : "border-[#1e1e35] bg-[#111120] text-slate-400 hover:border-violet-500/40 hover:text-violet-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </section>

            {/* topic */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-4">
                Topic
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTopic("All")}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    topic === "All"
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-[#1e1e35] bg-[#111120] text-slate-400 hover:border-violet-500/40 hover:text-violet-300"
                  }`}
                >
                  All topics
                </button>
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      topic === t
                        ? "border-violet-500 bg-violet-500/15 text-violet-300"
                        : "border-[#1e1e35] bg-[#111120] text-slate-400 hover:border-violet-500/40 hover:text-violet-300"
                    }`}
                  >
                    {t}
                    <span className="ml-2 text-xs text-slate-600">
                      {topicCounts[t]}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* start */}
            <div className="pt-4 flex flex-col items-center gap-3">
              <button
                onClick={start}
                disabled={matching.length === 0}
                className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Start practice →
              </button>
              <p className="text-slate-500 text-sm">
                {matching.length} question{matching.length === 1 ? "" : "s"} match
                your selection
              </p>
            </div>
          </div>
        )}

        {/* ----------------------------- quiz stage ----------------------------- */}
        {stage === "quiz" && current && (
          <div>
            {/* progress bar */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <button
                onClick={() => setStage("config")}
                className="text-slate-500 hover:text-violet-400 transition-colors"
              >
                ⚙ Change filters
              </button>
              <div className="flex items-center gap-4 text-slate-500">
                <span>
                  Answered <span className="text-slate-300">{stats.answered}</span>
                </span>
                <span>
                  Avg{" "}
                  <span
                    className={
                      avg >= 70
                        ? "text-emerald-400"
                        : avg >= 40
                        ? "text-amber-400"
                        : "text-rose-400"
                    }
                  >
                    {avg}%
                  </span>
                </span>
              </div>
            </div>

            {/* question card */}
            <div className="rounded-2xl border border-[#1e1e35] bg-[#111120] p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium">
                  {current.topic}
                </span>
                <span
                  className={`px-3 py-1 rounded-full border text-xs font-medium ${
                    difficultyColor[current.difficulty]
                  }`}
                >
                  {current.difficulty}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 leading-snug mb-6">
                {current.question}
              </h2>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={revealed}
                placeholder="Type your answer here… Aim to hit the key concepts in your own words."
                rows={7}
                className="w-full rounded-lg border border-[#1e1e35] bg-[#0a0a12] p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/60 resize-y disabled:opacity-70"
              />

              {!revealed ? (
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={submit}
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Submit &amp; compare
                  </button>
                  <button
                    onClick={() => {
                      setUserAnswer("");
                      submit();
                    }}
                    className="px-4 py-2.5 text-slate-500 hover:text-violet-400 text-sm transition-colors"
                  >
                    Skip &amp; reveal answer
                  </button>
                </div>
              ) : (
                <div className="mt-8 space-y-6 animate-[fadeIn_0.3s_ease]">
                  {/* score + coverage */}
                  {result && (
                    <div className="rounded-xl border border-[#1e1e35] bg-[#0a0a12] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                          Your coverage
                        </span>
                        <span
                          className={`text-2xl font-bold ${
                            result.score >= 70
                              ? "text-emerald-400"
                              : result.score >= 40
                              ? "text-amber-400"
                              : "text-rose-400"
                          }`}
                        >
                          {result.score}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#1e1e35] overflow-hidden mb-5">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${result.score}%` }}
                        />
                      </div>

                      {result.covered.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
                            ✓ Concepts you covered
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {result.covered.map((p) => (
                              <span
                                key={p}
                                className="px-2.5 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.missed.length > 0 ? (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-2">
                            ✗ Key points you missed
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {result.missed.map((p) => (
                              <span
                                key={p}
                                className="px-2.5 py-1 rounded-md border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-emerald-400 text-sm font-medium">
                          🎉 You hit every key point. Nailed it.
                        </p>
                      )}
                    </div>
                  )}

                  {/* model answer */}
                  <div className="rounded-xl border border-violet-500/20 bg-[#0a0a12] p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
                      Model answer
                    </p>
                    <AnswerBody text={current.answer} />
                  </div>

                  {/* your answer for reference */}
                  {userAnswer.trim() && (
                    <div className="rounded-xl border border-[#1e1e35] bg-[#0a0a12] p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                        Your answer
                      </p>
                      <p className="text-slate-400 leading-relaxed whitespace-pre-line text-sm">
                        {userAnswer}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={next}
                      className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
                    >
                      Next question →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
