"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { FigmaIcon } from "./figma-icon";
import { useLanguage } from "../_components/language-provider";

type DetectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DetectionModal({ isOpen, onClose }: DetectionModalProps) {
  const { language } = useLanguage();
  const km = language === "km";
  const modalRef = useRef<HTMLDivElement>(null);

  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detection-sheet-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px] transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-t-[30px] bg-white px-5 pb-8 pt-3.5 shadow-2xl transition-transform duration-300 animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle indicator matching Figma */}
        <div className="mx-auto h-1.5 w-12 rounded-full bg-[#d2d6db]" />

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2
              id="detection-sheet-title"
              className="text-2xl font-semibold tracking-tight text-black"
            >
              {km ? "តាមដានចិត្តរបស់អ្នក" : "Track your mind"}
            </h2>
            <p className="mt-1 text-sm text-[#444444] sm:text-[15px]">
              {km
                ? "បន្តយល់ដឹងពីអារម្មណ៍ និងស្ថានភាពរបស់អ្នកពីមួយថ្ងៃទៅមួយថ្ងៃ។"
                : "Keep understand how you’re doing. day to day."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Coming Soon Alert Message if Symptom Detection clicked */}
        {showComingSoon && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-medium">
                {km
                  ? "មុខងាររកឃើញរោគសញ្ញានឹងមកដល់ឆាប់ៗនេះ!"
                  : "Symptom Detection is coming soon!"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowComingSoon(false)}
              className="text-amber-600 hover:text-amber-800 text-xs font-semibold underline ml-2"
            >
              {km ? "បិទ" : "Dismiss"}
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3.5">
          {/* Journal Card (Figma Component 133) */}
          <Link
            href="/detection/journal"
            onClick={onClose}
            className="group flex items-center gap-4 rounded-[22px] border border-gray-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:border-[#23aa89] hover:bg-[#e6f6f1] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[15px] bg-[#dff3ee] transition-colors duration-200 group-hover:bg-[#1f6f5b]">
              <span className="group-hover:brightness-0 group-hover:invert">
                <FigmaIcon name="bi_journal-bookmark-fill" size={24} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold text-black transition-colors duration-200 group-hover:text-[#1f6f5b]">
                {km ? "សៀវភៅកំណត់ហេតុ" : "Journal"}
              </p>
              <p className="text-sm text-[#444444] transition-colors duration-200 group-hover:text-[#1f6f5b]/90">
                {km ? "សរសេរដោយសេរីអំពីថ្ងៃរបស់អ្នក" : "write freely about your day"}
              </p>
            </div>
          </Link>

          {/* Symptom Detection Card (Figma Component 134) */}
          <button
            type="button"
            onClick={() => setShowComingSoon(true)}
            className="group flex w-full items-center text-left gap-4 rounded-[22px] border border-gray-200/90 bg-white p-4 shadow-sm transition-all duration-200 hover:border-[#23aa89] hover:bg-[#e6f6f1] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[15px] bg-[#dff3ee] transition-colors duration-200 group-hover:bg-[#1f6f5b]">
              <span className="group-hover:brightness-0 group-hover:invert">
                <FigmaIcon name="oui_anomaly-detection" size={24} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-black transition-colors duration-200 group-hover:text-[#1f6f5b]">
                  {km ? "ការរកឃើញរោគសញ្ញា" : "Symptom Detection"}
                </p>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                  {km ? "ឆាប់ៗនេះ" : "Coming Soon"}
                </span>
              </div>
              <p className="text-sm text-[#757575] transition-colors duration-200 group-hover:text-[#1f6f5b]/90">
                {km ? "ការពិនិត្យរហ័សអំពីអារម្មណ៍របស់អ្នក" : "A quick check-in on how you’re doing"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
