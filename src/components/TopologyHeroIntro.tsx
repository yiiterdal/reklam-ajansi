"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Manrope } from "next/font/google";
import {
  m,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import IridescentVortex, { SEQ_HERO } from "@/components/IridescentVortex";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

/* topology.vc GSAP intro (qT): delay 0.5, words duration 1 stagger 0.1 from x:150,
   tagline at 0.5 duration 1 stagger 0.075 from x:100, footer at 0.5 duration 1 */
const TITLE_LINES = [
  [
    { word: "Ideas", delay: "0.5s" },
    { word: "that", delay: "0.6s" },
  ],
  [
    { word: "move", delay: "0.7s" },
    { word: "people.", delay: "0.8s" },
  ],
] as const;

const TAGLINE = [
  { text: "Brand, digital, content and motion", delay: "1s" },
  { text: "for brands that want to be felt.", delay: "1.075s" },
] as const;

/* topology.vc scroll layout: hero(100dvh hold) + 450dvh journey.
   Their theatre "UI Animation" tracks (sequence positions): */
const HERO_HIDE: [number, number] = [2, 2.7];
const TITLE0_SHOW: [number, number] = [2.533, 3.667];
const TITLE0_HIDE: [number, number] = [4.067, 5.167];
const TITLE1_SHOW: [number, number] = [5.1, 6.3];
const TITLE1_HIDE: [number, number] = [6.567, 7.533];
/* Fill the empty late-journey gray stretch after "We jump..." */
const TITLE2_SHOW: [number, number] = [7.55, 8.15];
const TITLE2_HIDE: [number, number] = [8.35, 8.85];
const BODY_SHOW: [number, number] = [7.7, 8.25];
const BODY_HIDE: [number, number] = [8.4, 8.9];

const expoOut = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const power2In = (x: number) => x * x;

/* GSAP-style word scrub: duration 1, stagger 0.1 (their hero uses 0.1;
   webgl titles use 0.05) mapped over a scrubbed 0..1 progress. */
function wordProgress(p: number, index: number, count: number, stagger: number) {
  const total = 1 + stagger * (count - 1);
  return Math.min(1, Math.max(0, (p * total - index * stagger) / 1));
}

function trackP(seq: number, [a, b]: [number, number]) {
  return Math.min(1, Math.max(0, (seq - a) / (b - a)));
}

/** Fixed full-screen "You jump..." / "We jump..." title, scrubbed by seq. */
function WebglTitle({
  seq,
  text,
  show,
  hide,
}: {
  seq: MotionValue<number>;
  text: string;
  show: [number, number];
  hide: [number, number];
}) {
  const words = text.split(" ");
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
      <h2
        className="m-0 text-center font-[family-name:var(--font-display)] text-[clamp(48px,8vw,110px)] font-medium tracking-[-0.03em] text-white"
        style={{ textShadow: "0 2px 28px rgba(0,0,0,0.75), 0 0 90px rgba(0,0,0,0.55)" }}
      >
        {words.map((word, i) => (
          <TitleWord
            key={`${word}-${i}`}
            seq={seq}
            show={show}
            hide={hide}
            index={i}
            count={words.length}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : null}
          </TitleWord>
        ))}
      </h2>
    </div>
  );
}

/** Supporting copy that fills the empty gray stretch of the scroll journey. */
function WebglBody({
  seq,
  show,
  hide,
  eyebrow,
  lines,
}: {
  seq: MotionValue<number>;
  show: [number, number];
  hide: [number, number];
  eyebrow: string;
  lines: string[];
}) {
  const opacity = useTransform(seq, (s) => {
    const pIn = expoOut(trackP(s, show));
    const pOut = power2In(trackP(s, hide));
    return pIn * (1 - pOut);
  });
  const y = useTransform(seq, (s) => {
    const pIn = expoOut(trackP(s, show));
    const pOut = power2In(trackP(s, hide));
    return 36 * (1 - pIn) - 24 * pOut;
  });
  const scale = useTransform(seq, (s) => {
    const pIn = expoOut(trackP(s, show));
    return 0.96 + 0.04 * pIn;
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-[6] flex items-end justify-center px-5 pb-[max(10vh,calc(5.75rem+env(safe-area-inset-bottom,0px)))] sm:px-6 sm:pb-[12vh]">
      <m.div
        style={{ opacity, y, scale }}
        className="flex w-full max-w-3xl flex-col items-center text-center"
      >
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-8 bg-white/35 sm:w-12" aria-hidden />
          <p className="m-0 text-[11px] font-light uppercase tracking-[0.34em] text-white/60">
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-white/35 sm:w-12" aria-hidden />
        </div>
        <p className="m-0 max-w-[34rem] font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.1vw,2.15rem)] font-medium leading-[1.25] tracking-[-0.02em] text-white">
          {lines.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br className="hidden sm:block" /> : null}
              {i > 0 ? <span className="sm:hidden"> </span> : null}
              {line}
            </span>
          ))}
        </p>
        <p className="mt-7 text-[12px] font-light uppercase tracking-[0.22em] text-white/40">
          Keep scrolling
        </p>
      </m.div>
    </div>
  );
}

function TitleWord({
  seq,
  show,
  hide,
  index,
  count,
  children,
}: {
  seq: MotionValue<number>;
  show: [number, number];
  hide: [number, number];
  index: number;
  count: number;
  children: React.ReactNode;
}) {
  const x = useTransform(seq, (s) => {
    const pIn = expoOut(wordProgress(trackP(s, show), index, count, 0.05));
    const pOut = power2In(wordProgress(trackP(s, hide), index, count, 0.05));
    return -50 * (1 - pIn) + 50 * pOut;
  });
  const opacity = useTransform(seq, (s) => {
    const pIn = expoOut(wordProgress(trackP(s, show), index, count, 0.05));
    const pOut = power2In(wordProgress(trackP(s, hide), index, count, 0.05));
    return pIn * (1 - pOut);
  });
  return (
    <m.span className="inline-block" style={{ x, opacity }}>
      {children}
    </m.span>
  );
}

export default function TopologyHeroIntro() {
  const [play, setPlay] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Track length tuned so theatre keyframes scrub at a natural pace
  const JOURNEY_DVH = 560;
  const SECTION_DVH = JOURNEY_DVH;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Raw 0→1 into WebGL — sequence easing/follow lives in IridescentVortex
  const journeyProgress = scrollYProgress;
  // lerped theatre sequence position, written each frame by the canvas
  const seq = useMotionValue(SEQ_HERO);

  const heroOpacity = useTransform(seq, (s) => 1 - trackP(s, HERO_HIDE));
  const heroVisibility = useTransform(heroOpacity, (o) => (o <= 0.001 ? "hidden" : "visible"));

  const playIntro = useCallback(() => {
    setPlay(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPlay(true));
    });
  }, []);

  useEffect(() => {
    playIntro();
  }, [playIntro]);

  // Do not lock overflow — top-of-page scroll must stay usable immediately

  return (
    <section
      ref={sectionRef}
      className={`${manrope.className} relative bg-[#151515] text-white`}
      style={{ height: `${SECTION_DVH}dvh` }}
      data-play={play ? "true" : "false"}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Faithful topology.vc hero port — visuals, grain, aberration and
            the scroll journey all run inside the WebGL pipeline */}
        <div className="absolute inset-0">
          <IridescentVortex progress={journeyProgress} seqOut={seq} />
        </div>

        <style>{`
          .topo-hero {
            --topo-pad: 24px;
          }
          @media (max-width: 640px) {
            .topo-hero { --topo-pad: 14px; }
          }
          .topo-word {
            display: inline-block;
            position: relative;
            opacity: 0;
            transform: translateX(150px);
          }
          [data-play="true"] .topo-word {
            animation: topo-word-in 1s cubic-bezier(0.2, 0, 0.1, 1) forwards;
          }
          .topo-tagline-line {
            display: block;
            opacity: 0;
            transform: translateX(100px);
          }
          [data-play="true"] .topo-tagline-line {
            animation: topo-word-in 1s cubic-bezier(0.2, 0, 0.1, 1) forwards;
          }
          .topo-footer {
            opacity: 0;
            transform: translateY(50px);
          }
          [data-play="true"] .topo-footer {
            animation: topo-footer-in 1s cubic-bezier(0.2, 0, 0.1, 1) 1s forwards;
          }
          @keyframes topo-word-in {
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes topo-footer-in {
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes topo-fade-in {
            to { opacity: 1; }
          }
          @keyframes topo-arrow-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(4px); }
          }
          .topo-arrow {
            animation: topo-arrow-bounce 1.6s ease-in-out infinite;
          }
        `}</style>

        {/* Hero text — fades out over sequence 2 -> 2.7 like their .js-hero */}
        <m.div
          style={{ opacity: heroOpacity, visibility: heroVisibility }}
          className="topo-hero relative z-10 flex h-full flex-col justify-end px-[var(--topo-pad)] pb-[calc(6.25rem+env(safe-area-inset-bottom,0px))] sm:pb-8"
        >
          <div className="w-full">
            <div className="mb-5 flex flex-wrap items-end sm:mb-10">
              <div className="w-full lg:w-1/2">
                <h1 className="m-0 text-[clamp(40px,11vw,135px)] font-light leading-[0.9] tracking-[-1.35px] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)] max-[640px]:tracking-[-0.6px]">
                  {TITLE_LINES.map((line, li) => (
                    <span key={li}>
                      {li > 0 ? <br /> : null}
                      {line.map((item, wi) => (
                        <span key={item.word}>
                          {wi > 0 ? " " : null}
                          <span
                            className="topo-word"
                            style={{ animationDelay: item.delay }}
                          >
                            {item.word}
                          </span>
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>
              </div>

              <div className="mt-4 flex w-full items-end sm:mt-10 lg:mt-0 lg:ml-[6%] lg:w-[34%]">
                <p className="m-0 max-w-[500px] text-[clamp(16px,4.2vw,24px)] font-light leading-[1.25] tracking-[0.45px] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:overflow-hidden sm:text-[clamp(19px,1.9vw,24px)] sm:leading-none">
                  {TAGLINE.map((line) => (
                    <span
                      key={line.text}
                      className="topo-tagline-line"
                      style={{ animationDelay: line.delay }}
                    >
                      {line.text}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="topo-footer relative mt-4 flex flex-wrap items-center justify-between pt-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[rgba(224,232,236,0.3)] sm:mt-0 sm:pt-8">
              <p className="m-0 text-[11px] font-light uppercase tracking-[1.4px] text-white sm:text-sm">
                Bearstow ©2026
              </p>
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 text-[11px] font-light uppercase tracking-[1.4px] text-white no-underline sm:text-sm"
              >
                Explore
                <svg
                  className="topo-arrow h-3 w-2 stroke-white"
                  viewBox="0 0 8 12"
                  fill="none"
                  aria-hidden
                >
                  <path d="M4 1v10m0 0L1 7.812M4 11l3-3.188" strokeWidth="1" />
                </svg>
              </a>
            </div>
          </div>
        </m.div>

        {/* Scroll journey titles (their .js-webgl-title blocks) */}
        <WebglTitle seq={seq} text="You dream it..." show={TITLE0_SHOW} hide={TITLE0_HIDE} />
        <WebglTitle seq={seq} text="We make it real." show={TITLE1_SHOW} hide={TITLE1_HIDE} />
        <WebglTitle seq={seq} text="Hard to forget." show={TITLE2_SHOW} hide={TITLE2_HIDE} />
        <WebglBody
          seq={seq}
          show={BODY_SHOW}
          hide={BODY_HIDE}
          eyebrow="What we do"
          lines={[
            "One studio for strategy, identity,",
            "digital, film and everything in between.",
          ]}
        />
      </div>
    </section>
  );
}
