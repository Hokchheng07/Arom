"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./language-provider";

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;
const secondsPerStep = 4;

const breathingSteps = [
  { phase: "inhale", en: "Inhale", km: "ដកដង្ហើមចូល", promptEn: "Breathe in…", promptKm: "ដកដង្ហើមចូល…" },
  { phase: "hold-full", en: "Hold", km: "ទប់ដង្ហើម", promptEn: "Hold", promptKm: "ទប់ដង្ហើម" },
  { phase: "exhale", en: "Exhale", km: "ដកដង្ហើមចេញ", promptEn: "Breathe out…", promptKm: "ដកដង្ហើមចេញ…" },
  { phase: "hold-empty", en: "Hold", km: "ទប់ដង្ហើម", promptEn: "Hold", promptKm: "ទប់ដង្ហើម" },
  { phase: "inhale", en: "Inhale", km: "ដកដង្ហើមចូល", promptEn: "Breathe in…", promptKm: "ដកដង្ហើមចូល…" },
  { phase: "hold-full", en: "Hold", km: "ទប់ដង្ហើម", promptEn: "Hold", promptKm: "ទប់ដង្ហើម" },
  { phase: "exhale", en: "Exhale", km: "ដកដង្ហើមចេញ", promptEn: "Breathe out…", promptKm: "ដកដង្ហើមចេញ…" },
  { phase: "hold-empty", en: "Hold", km: "ទប់ដង្ហើម", promptEn: "Hold", promptKm: "ទប់ដង្ហើម" },
] as const;

function BreathingGuide({ onExit, onComplete }: { onExit: () => void; onComplete: () => void }) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(secondsPerStep);
  const [soundOn, setSoundOn] = useState(true);
  const km = language === "km";
  const safeStepIndex = Math.min(stepIndex, breathingSteps.length - 1);
  const step = breathingSteps[safeStepIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current > 1) return current - 1;

        if (stepIndex === breathingSteps.length - 1) {
          window.clearInterval(timer);
          onComplete();
          return 1;
        }

        setStepIndex((index) => Math.min(index + 1, breathingSteps.length - 1));
        return secondsPerStep;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [onComplete, stepIndex]);

  const isExpanded = step.phase === "inhale" || step.phase === "hold-full";
  const isMoving = step.phase === "inhale" || step.phase === "exhale";
  const orbScale = shouldReduceMotion ? 1 : isExpanded ? 1.08 : 0.82;
  const progress = (safeStepIndex + (secondsPerStep - secondsLeft) / secondsPerStep) / breathingSteps.length;

  return (
    <main className="relative flex min-h-dvh overflow-hidden bg-[#0e4037] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(35,170,137,0.28),transparent_38%),linear-gradient(180deg,#0b322c_0%,#123f38_56%,#102f36_100%)]" />
      <Image
        src="/mindguide/managing-stress-hero.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-bottom opacity-[0.11] mix-blend-luminosity"
        unoptimized
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] sm:px-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onExit}
            aria-label={km ? "បិទការហាត់ដង្ហើម" : "Close breathing session"}
            className="flex size-11 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X aria-hidden="true" size={23} />
          </button>
          <button
            type="button"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((current) => !current)}
            aria-label={soundOn ? (km ? "បិទសំឡេង" : "Mute cues") : km ? "បើកសំឡេង" : "Turn on cues"}
            className="flex size-11 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {soundOn ? <Volume2 aria-hidden="true" size={22} /> : <VolumeX aria-hidden="true" size={22} />}
          </button>
        </div>

        <div className="mt-1 text-center">
          <h1 className="text-lg font-semibold tracking-[-0.02em]">{km ? "ដង្ហើមស្ងប់ស្ងាត់" : "Calm Breathing"}</h1>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${stepIndex}-prompt`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
              aria-live="polite"
              className="mt-3 text-base text-white/78"
            >
              {km ? step.promptKm : step.promptEn}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-6">
          <div className="relative flex size-[17rem] items-center justify-center sm:size-[20rem]">
            <motion.div
              aria-hidden="true"
              initial={{ transform: shouldReduceMotion ? "scale(1)" : "scale(0.82)" }}
              animate={{ opacity: isExpanded ? 0.2 : 0.1, transform: `scale(${orbScale})` }}
              transition={{ duration: isMoving && !shouldReduceMotion ? secondsPerStep : 0.25, ease: isMoving ? easeInOut : easeOut }}
              className="absolute size-[15.75rem] rounded-full border border-[#7de1c9]/30 bg-[#23aa89]/20 sm:size-[18.5rem]"
            />
            <motion.div
              aria-hidden="true"
              initial={{ transform: shouldReduceMotion ? "scale(1)" : "scale(0.82)" }}
              animate={{ opacity: isExpanded ? 0.32 : 0.18, transform: `scale(${orbScale})` }}
              transition={{ duration: isMoving && !shouldReduceMotion ? secondsPerStep : 0.25, ease: isMoving ? easeInOut : easeOut }}
              className="absolute size-[13.5rem] rounded-full bg-[#38c4a3]/35 shadow-[0_0_70px_rgba(55,210,174,0.28)] sm:size-[16rem]"
            />
            <motion.div
              initial={{ transform: shouldReduceMotion ? "scale(1)" : "scale(0.82)" }}
              animate={{ transform: `scale(${orbScale})` }}
              transition={{ duration: isMoving && !shouldReduceMotion ? secondsPerStep : 0.25, ease: isMoving ? easeInOut : easeOut }}
              className="relative flex size-40 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#91e5d3] to-[#32b895] shadow-[0_0_45px_rgba(86,224,193,0.38),inset_0_1px_20px_rgba(255,255,255,0.24)] sm:size-44"
            >
              <Image src="/mindguide/icon-11.svg" alt="" width={76} height={76} className="size-[4.75rem] brightness-0 invert opacity-70" unoptimized />
            </motion.div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${stepIndex}-label`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
              className="mt-4 text-center"
            >
              <p className="text-2xl font-semibold">{km ? step.km : step.en}</p>
              <p className="mt-1 text-sm text-white/72">
                {km ? `${secondsLeft} វិនាទី` : `${secondsLeft} ${secondsLeft === 1 ? "second" : "seconds"}`}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pb-2">
          <p className="text-center text-xs font-semibold tracking-[0.12em] text-white/72">
            {safeStepIndex + 1} / {breathingSteps.length}
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/12">
            <motion.div
              aria-hidden="true"
              animate={{ transform: `scaleX(${progress})` }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 1, ease: "linear" }}
              className="h-full origin-left rounded-full bg-[#83dfca]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function SessionComplete({ onBack }: { onBack: () => void }) {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const km = language === "km";

  return (
    <main className="min-h-dvh bg-white px-5 pb-12 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-8">
      <div className="mx-auto w-full max-w-md">
        <button
          type="button"
          onClick={onBack}
          aria-label={km ? "ត្រឡប់ក្រោយ" : "Back"}
          className="flex size-11 items-center justify-center rounded-full text-arom transition-colors duration-150 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          <ArrowLeft aria-hidden="true" size={25} />
        </button>

        <div className="pt-6 text-center sm:pt-10">
          <motion.div
            initial={{ opacity: 0, transform: shouldReduceMotion ? "scale(1)" : "scale(0.95)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            transition={{ duration: 0.24, ease: easeOut }}
          >
            <Image
              src="/mindguide/session/completion-asset-2.svg"
              alt=""
              width={149}
              height={149}
              className="mx-auto size-[9.3rem]"
              unoptimized
            />
          </motion.div>
          <h1 className="mt-1 text-4xl font-semibold tracking-[-0.04em] text-arom">{km ? "ធ្វើបានល្អណាស់!" : "Well Done!"}</h1>
          <p className="mx-auto mt-2 max-w-[17rem] text-base leading-5 text-ink-muted">
            {km ? "អ្នកបានបញ្ចប់ការធ្វើសមាធិនេះដោយជោគជ័យ។" : "You’ve completed this meditation successfully."}
          </p>
          <div className="mx-auto mt-4 flex h-12 w-44 items-center justify-center rounded-full bg-arom-soft text-2xl font-semibold text-arom">
            +20 XP
          </div>
        </div>

        <div className="mt-14 space-y-5">
          <Link
            href="/mindguide"
            className="flex h-[3.15rem] w-full items-center justify-center rounded-2xl bg-arom px-6 text-lg font-semibold text-white transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            {km ? "ត្រឡប់ទៅ MindGuide" : "Back to MindGuide"}
          </Link>
          <Link
            href="/mindguide#today"
            className="flex h-[3.15rem] w-full items-center justify-center rounded-2xl bg-arom-soft px-6 text-lg font-semibold text-arom transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-arom-accent/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            {km ? "ស្វែងរកការអនុវត្តថ្មី" : "Explore new Practices"}
          </Link>
        </div>
      </div>
    </main>
  );
}

export function BreathingExperience({ onExit }: { onExit: () => void }) {
  const [complete, setComplete] = useState(false);
  const handleComplete = useMemo(() => () => setComplete(true), []);

  useEffect(() => {
    document.body.dataset.immersive = "true";
    return () => {
      delete document.body.dataset.immersive;
    };
  }, []);

  return complete ? (
    <SessionComplete onBack={onExit} />
  ) : (
    <BreathingGuide onExit={onExit} onComplete={handleComplete} />
  );
}
