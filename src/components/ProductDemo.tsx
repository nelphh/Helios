'use client';

import { useState, useEffect } from 'react';

// ─── Content ──────────────────────────────────────────────────────────────────

const QUERY =
  'Which suppliers were flagged in the 2023 procurement compliance review, and why?';

const ANSWER_PLAIN =
  'Three suppliers were flagged in the 2023 procurement compliance review due to documentation inconsistencies and incomplete regulatory submissions across Tier 2 contracts. Each case was escalated for further audit review and verification against internal procurement standards.';

// Pre-index highlighted segments so each h:true knows its ordinal position (1-4)
let _hi = 0;
const SEGMENTS = [
  { text: 'Three suppliers', h: true },
  { text: ' were flagged in the ', h: false },
  { text: '2023 procurement compliance review', h: true },
  { text: ' due to documentation inconsistencies and incomplete regulatory submissions across ', h: false },
  { text: 'Tier 2 contracts', h: true },
  { text: '. Each case was ', h: false },
  { text: 'escalated for further audit review', h: true },
  { text: ' and verification against internal procurement standards.', h: false },
].map((s) => {
  if (s.h) _hi++;
  return { ...s, hIdx: s.h ? _hi : 0 };
});

const CITATIONS = [
  {
    id: 1,
    title: 'Procurement Compliance Review – Q3 2023',
    meta: 'Last updated: 18 Oct 2023 · Internal Audit Report · PDF · Classification: Internal Use',
    excerpt: [
      { t: 'A review of ', b: false },
      { t: 'Tier 2 supplier submissions', b: true },
      { t: ' identified multiple instances of incomplete regulatory documentation. In ', b: false },
      { t: 'three cases,', b: true },
      { t: ' ', b: false },
      { t: 'certification records', b: true },
      { t: ' were either partially missing or submitted outside of required audit windows…', b: false },
    ],
  },
  {
    id: 2,
    type: 'doc' as const,
    title: 'Procurement Oversight Summary (Q3 2023)',
    meta: '18 Oct 2023 · Oversight Summary Report · PDF · Classification: Internal Use · Source Unit: Procurement & Supply Chain Oversight',
    excerpt: [
      { t: 'Cross-departmental review highlights recurring documentation gaps within ', b: false },
      { t: 'Tier 2 vendor submissions', b: true },
      { t: '. Recommended escalation to ', b: false },
      { t: 'compliance enforcement', b: true },
      { t: ' unit for further action…', b: false },
    ],
  },
];

// ─── Timing (ms) ──────────────────────────────────────────────────────────────
const T = {
  queryStart:  100,
  querySpeed:  8,     // ms / char — QUERY.length = 83 → done ≈ 764ms
  answerStart: 900,
  answerSpeed: 5,     // ms / char — ANSWER_PLAIN.length = 270 → done ≈ 2250ms
  segmented:   2350,
  hl:          [2500, 2620, 2740, 2860],
  citations:   2950,
};

// ─── Sidebar icons ────────────────────────────────────────────────────────────
function IconSearch() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function IconBulb() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.62-1.5 4.9-3.5 6.27V17a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1.73A7 7 0 0 1 12 2z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  );
}
function IconReturn() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3v4a2 2 0 0 1-2 2H3" />
      <path d="M6 5 3 9l3 4" />
    </svg>
  );
}
function SunLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 104.61 104.61" xmlns="http://www.w3.org/2000/svg">
      <rect x="12.54" y="78.03" width="18.98" height="9.09" transform="translate(-51.94 39.77) rotate(-45)" fill="#ff9359"/>
      <rect y="47.76" width="18.99" height="9.09" fill="#ff9359"/>
      <rect x="17.49" y="12.54" width="9.09" height="18.99" transform="translate(-9.13 22.03) rotate(-45)" fill="#ff9359"/>
      <rect x="47.76" width="9.09" height="18.99" fill="#ff9359"/>
      <rect x="73.08" y="17.49" width="18.99" height="9.09" transform="translate(8.61 64.84) rotate(-45)" fill="#ff9359"/>
      <rect x="85.62" y="47.76" width="18.99" height="9.09" fill="#ff9359"/>
      <rect x="47.76" y="85.62" width="9.09" height="18.99" fill="#ff9359"/>
      <path d="M74.56,52.3c0-12.27-9.99-22.26-22.26-22.26s-22.26,9.99-22.26,22.26,9.99,22.26,22.26,22.26c4.5,0,8.68-1.34,12.18-3.65l21.59,21.59,6.43-6.43-21.59-21.59c2.3-3.5,3.64-7.69,3.64-12.18ZM52.3,65.47c-7.26,0-13.17-5.91-13.17-13.17s5.91-13.17,13.17-13.17,13.17,5.91,13.17,13.17-5.91,13.17-13.17,13.17Z" fill="#ff9359"/>
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductDemo() {
  const [queryText, setQueryText]           = useState('');
  const [showFilters, setShowFilters]       = useState(false);
  const [showAnswer, setShowAnswer]         = useState(false);
  const [answerText, setAnswerText]         = useState('');
  const [showSegmented, setShowSegmented]   = useState(false);
  const [hlCount, setHlCount]              = useState(0);
  const [showCitations, setShowCitations]   = useState(false);

  useEffect(() => {
    // Reset
    setQueryText('');
    setShowFilters(false);
    setShowAnswer(false);
    setAnswerText('');
    setShowSegmented(false);
    setHlCount(0);
    setShowCitations(false);

    const tos: ReturnType<typeof setTimeout>[]   = [];
    const ivs: ReturnType<typeof setInterval>[]  = [];

    // 1. Type query
    tos.push(setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setQueryText(QUERY.slice(0, i));
        if (i >= QUERY.length) clearInterval(iv);
      }, T.querySpeed);
      ivs.push(iv);
    }, T.queryStart));

    // 2. Show filters + answer section
    tos.push(setTimeout(() => {
      setShowFilters(true);
      setShowAnswer(true);
    }, T.answerStart));

    // 3. Type answer
    tos.push(setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setAnswerText(ANSWER_PLAIN.slice(0, i));
        if (i >= ANSWER_PLAIN.length) clearInterval(iv);
      }, T.answerSpeed);
      ivs.push(iv);
    }, T.answerStart));

    // 4. Switch to segmented (highlighted) view
    tos.push(setTimeout(() => setShowSegmented(true), T.segmented));

    // 5. Reveal each highlight
    T.hl.forEach((ms, idx) => {
      tos.push(setTimeout(() => setHlCount(idx + 1), ms));
    });

    // 6. Show citations
    tos.push(setTimeout(() => setShowCitations(true), T.citations));

    return () => {
      tos.forEach(clearTimeout);
      ivs.forEach(clearInterval);
    };
  }, []);

  const typing = queryText.length < QUERY.length;

  return (
    <div className="rounded-xl border border-white/10 bg-[#1d1e2a] overflow-hidden shadow-2xl shadow-black/50">
      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-11 shrink-0 flex flex-col items-center justify-between py-3.5 bg-[#191923] border-r border-white/8">
          <div className="flex flex-col items-center gap-5">
            <SunLogo />
            <div className="flex flex-col items-center gap-5 mt-2">
              <button className="text-gray-600 hover:text-gray-400 transition-colors"><IconSearch /></button>
              <button className="text-gray-600 hover:text-gray-400 transition-colors"><IconFile /></button>
              <button className="text-gray-600 hover:text-gray-400 transition-colors"><IconBulb /></button>
              <button className="text-gray-600 hover:text-gray-400 transition-colors"><IconLock /></button>
            </div>
          </div>
          <button className="text-gray-600 hover:text-gray-400 transition-colors"><IconGear /></button>
        </div>

        {/* Main panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#1d1e2a]">
            <div className="flex-1 text-sm text-[#c0c4d6] flex items-center min-w-0">
              <span className="truncate">{queryText}</span>
              {typing && (
                <span className="inline-block w-px h-3.5 bg-gray-400 ml-0.5 shrink-0 animate-blink" />
              )}
            </div>
            <button className="shrink-0 text-gray-500 p-0.5 hover:text-gray-300 transition-colors">
              <IconReturn />
            </button>
          </div>

          {/* Filter chips */}
          <div
            className="flex items-center gap-2 px-4 py-2 border-b border-white/8 transition-opacity duration-500"
            style={{ opacity: showFilters ? 1 : 0 }}
          >
            {['Document Type', 'Classification', 'Date', 'Source'].map((chip) => (
              <button
                key={chip}
                className="flex items-center gap-1 text-[10px] text-gray-500 border border-white/12 rounded px-2 py-0.5 bg-white/4 hover:bg-white/8 transition-colors"
              >
                {chip}
                <svg className="w-2.5 h-2.5 text-gray-600" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>
            ))}
          </div>

          {/* Result area */}
          <div className="p-4 flex flex-col gap-3">
            {/* Answer card */}
            <div
              className="bg-[#22243a] rounded-lg p-4 border border-white/10"
              style={{
                opacity: showAnswer ? 1 : 0,
                transform: showAnswer ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
                <p className="text-[11px] font-bold text-[#c0c4d6] mb-2 tracking-wide">
                  Here&apos;s your answer:
                </p>
                <div className="relative">
                  {/* Invisible sizing layer */}
                  <p className="text-[11px] text-[#9498b0] leading-[1.9] opacity-0 select-none" aria-hidden="true">
                    {ANSWER_PLAIN}
                  </p>
                  {/* Visible typed / highlighted text layered on top */}
                  <p className="absolute inset-0 text-[11px] text-[#9498b0] leading-[1.9]">
                    {showSegmented ? (
                      SEGMENTS.map((seg, i) =>
                        seg.h ? (
                          <span
                            key={i}
                            style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}
                          >
                            {seg.text}
                            <span style={{
                              position: 'absolute',
                              inset: '2px -3px 3px',
                              border: '1px solid #ff9359',
                              borderRadius: 3,
                              clipPath: seg.hIdx <= hlCount
                                ? 'inset(0 0% 0 0 round 3px)'
                                : 'inset(0 100% 0 0 round 3px)',
                              transition: 'clip-path 0.45s ease',
                              pointerEvents: 'none',
                            }} />
                          </span>
                        ) : (
                          <span key={i}>{seg.text}</span>
                        )
                      )
                    ) : (
                      <>
                        {answerText}
                        <span className="inline-block w-px h-3 bg-gray-400 ml-0.5 align-middle animate-blink" />
                      </>
                    )}
                  </p>
                </div>
              </div>

            {/* Citation cards */}
            {CITATIONS.map((c, i) => (
                <div
                  key={c.id}
                  className="bg-[#1a1b26] rounded-lg p-3 border border-white/8 flex gap-3"
                  style={{
                    opacity: showCitations ? 1 : 0,
                    transform: showCitations ? 'translateY(0)' : 'translateY(14px)',
                    transition: `opacity 0.4s ease ${i * 160}ms, transform 0.4s ease ${i * 160}ms`,
                  }}
                >
                  {/* File type badge */}
                  <div className={`shrink-0 w-9 h-11 rounded flex items-end justify-center pb-1.5 ${c.type === 'doc' ? 'bg-blue-700' : 'bg-red-700'}`}>
                    <span className="text-white font-bold leading-none" style={{ fontSize: 8 }}>
                      {c.type === 'doc' ? 'DOC' : 'PDF'}
                    </span>
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#bfc3d8] truncate">
                      {c.title}
                    </p>
                    <p className="text-[9px] text-gray-600 leading-relaxed">{c.meta}</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">
                      {c.excerpt.map((part, j) =>
                        part.b ? (
                          <strong key={j} className="text-gray-400 font-semibold">
                            {part.t}
                          </strong>
                        ) : (
                          <span key={j}>{part.t}</span>
                        )
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
