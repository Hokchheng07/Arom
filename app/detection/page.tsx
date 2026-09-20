"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { DesktopNavigation } from "../_components/app-navigation";
import { BottomNav } from "../components/bottom-nav";
import { TopHeader } from "../components/top-header";
import { FigmaIcon } from "../components/figma-icon";
import { useLanguage } from "../_components/language-provider";
import { DetectionModal } from "../components/detection-modal";

export default function DetectionPage() {
  const { language } = useLanguage();
  const km = language === "km";
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7faf9] text-[#14221f] lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      {/* Desktop Sidebar Navigation */}
      <DesktopNavigation active="Detection" />

      {/* Main Content Area */}
      <div className="min-w-0 pb-28 sm:pb-32 lg:pb-12">
        <main className="mx-auto w-full max-w-[430px] px-5 pt-4 sm:px-6 md:max-w-xl lg:max-w-2xl lg:pt-8 xl:max-w-3xl">
          {/* Top Brand Header matching Figma */}
          <TopHeader />

          {/* Page Heading matching Figma 236:946 */}
          <div className="mt-6 sm:mt-8">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
                {km ? "តាមដានចិត្តរបស់អ្នក" : "Track your mind"}
              </h1>
            </div>
            <p className="mt-2 text-sm text-[#4b5563] sm:text-base">
              {km
                ? "បន្តយល់ដឹងពីអារម្មណ៍ និងស្ថានភាពរបស់អ្នកពីមួយថ្ងៃទៅមួយថ្ងៃ។"
                : "Keep understand how you’re doing. day to day."}
            </p>
          </div>

          {/* Coming Soon Alert Message */}
          {showComingSoon && (
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-amber-50 border border-amber-200/80 p-4 text-sm text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-block size-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <div>
                  <p className="font-semibold">
                    {km ? "មុខងាររកឃើញរោគសញ្ញានឹងមកដល់ឆាប់ៗនេះ!" : "Symptom Detection is coming soon!"}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-700 sm:text-sm">
                    {km
                      ? "ក្រុមការងាររបស់យើងកំពុងអភិវឌ្ឍការវិភាគរោគសញ្ញាដើម្បីជួយអ្នកឱ្យកាន់តែប្រសើរ។"
                      : "We are actively developing this feature to help you evaluate mental health patterns."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowComingSoon(false)}
                className="rounded-lg p-1 text-amber-600 hover:bg-amber-100 hover:text-amber-800 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Detection Hub Options (Figma 236:946) */}
          <div className="mt-6 flex flex-col gap-4">
            {/* Journal Option (Figma Component 133) */}
            <Link
              href="/detection/journal"
              className="group relative flex items-center gap-4 rounded-[24px] border border-gray-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#1f6f5b] hover:shadow-md hover:translate-y-[-1px] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#dff3ee] transition-colors duration-200 group-hover:bg-[#1f6f5b]">
                <span className="group-hover:brightness-0 group-hover:invert transition-all">
                  <FigmaIcon name="bi_journal-bookmark-fill" size={26} />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-black transition-colors duration-200 group-hover:text-[#1f6f5b]">
                    {km ? "សៀវភៅកំណត់ហេតុ" : "Journal"}
                  </p>
                  <span className="text-xs font-medium text-[#1f6f5b] bg-[#e6f6f1] px-2.5 py-1 rounded-full">
                    {km ? "រួចរាល់" : "Ready"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#4b5563] transition-colors duration-200 group-hover:text-[#1f6f5b]/90">
                  {km ? "សរសេរដោយសេរីអំពីថ្ងៃរបស់អ្នក" : "write freely about your day"}
                </p>
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-[#1f6f5b] group-hover:translate-x-1 transition-all"
              />
            </Link>

            {/* Symptom Detection Option (Figma Component 134) */}
            <button
              type="button"
              onClick={() => setShowComingSoon(true)}
              className="group relative flex w-full items-center text-left gap-4 rounded-[24px] border border-gray-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#1f6f5b] hover:shadow-md hover:translate-y-[-1px] focus-visible:outline-2 focus-visible:outline-[#1f6f5b]"
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-[#dff3ee] transition-colors duration-200 group-hover:bg-[#1f6f5b]">
                <span className="group-hover:brightness-0 group-hover:invert transition-all">
                  <FigmaIcon name="oui_anomaly-detection" size={26} />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold text-black transition-colors duration-200 group-hover:text-[#1f6f5b]">
                    {km ? "ការរកឃើញរោគសញ្ញា" : "Symptom Detection"}
                  </p>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                    {km ? "ឆាប់ៗនេះ" : "Coming Soon"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#757575] transition-colors duration-200 group-hover:text-[#1f6f5b]/90">
                  {km ? "ការពិនិត្យរហ័សអំពីអារម្មណ៍របស់អ្នក" : "A quick check-in on how you’re doing"}
                </p>
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-[#1f6f5b] group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>

          {/* Quick info note */}
          <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[#1f6f5b]">
              <Sparkles size={18} />
              <h2 className="text-sm font-semibold">
                {km ? "ហេតុអ្វីបានជាការតាមដានសំខាន់?" : "Why tracking matters"}
              </h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#4b5563] sm:text-sm">
              {km
                ? "ការកត់ត្រាអារម្មណ៍ និងគំនិតជារៀងរាល់ថ្ងៃ ជួយឱ្យអ្នកមើលឃើញពីលំនាំនៃអារម្មណ៍របស់អ្នក និងស្វែងរកវិធីគ្រប់គ្រងភាពតានតឹងបានកាន់តែប្រសើរ។"
                : "Taking regular reflections creates self-awareness and helps you identify triggers, acknowledge growth, and maintain your peace of mind."}
            </p>
          </div>
        </main>
      </div>

      {/* Figma Bottom Navigation (Mobile/Tablet) */}
      <div className="lg:hidden">
        <BottomNav
          activeTab="Detection"
          onOpenDetection={() => setIsModalOpen(true)}
        />
      </div>

      {/* Detection Modal Sheet */}
      <DetectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
