"use client";

import { ArrowLeftRight, Check, ChevronLeft, Monitor, UserRound, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  emptyFilters,
  filterLanguages,
  matchesFilters,
  supportAreas,
  therapists,
  type SessionFilter,
  type TherapistFilters,
} from "@/lib/therapists";

const sessionFilters: { value: SessionFilter; icon: LucideIcon }[] = [
  { value: "Online", icon: Monitor },
  { value: "In-person", icon: UserRound },
  { value: "Both", icon: ArrowLeftRight },
];

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

const chipClass = (selected: boolean) =>
  `inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom ${
    selected
      ? "border-arom bg-arom text-white shadow-[0_6px_16px_rgba(31,111,91,0.22)]"
      : "border-arom-border bg-white text-ink shadow-[0_2px_6px_rgba(20,34,31,0.08)] hover:border-arom/45 hover:text-arom"
  }`;

type TherapistFilterProps = {
  open: boolean;
  filters: TherapistFilters;
  onClose: () => void;
  onApply: (filters: TherapistFilters) => void;
};

export function TherapistFilter({ open, filters, onClose, onApply }: TherapistFilterProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(filters);
  const [syncedFilters, setSyncedFilters] = useState(filters);

  // Start each opening from the applied filters, discarding unsaved edits.
  if (syncedFilters !== filters) {
    setSyncedFilters(filters);
    setDraft(filters);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const resultCount = therapists.filter((therapist) => matchesFilters(therapist, draft)).length;

  const close = () => {
    setDraft(filters);
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="filter-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-none translate-x-0 bg-white p-0 text-ink opacity-100 transition-[translate,opacity,display,overlay] transition-discrete duration-250 ease-(--ease-out) backdrop:bg-ink/35 backdrop:backdrop-blur-[2px] starting:open:translate-x-8 starting:open:opacity-0 not-open:translate-x-8 not-open:opacity-0 sm:max-w-md sm:rounded-l-3xl sm:shadow-[0_24px_80px_rgba(20,34,31,0.2)]"
    >
      <form
        method="dialog"
        onSubmit={(event) => {
          event.preventDefault();
          onApply(draft);
        }}
        className="flex h-full flex-col"
      >
        <header className="flex items-center gap-2 px-4 pb-3 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-6 sm:pt-6">
          <button
            type="button"
            onClick={close}
            aria-label="Close filters"
            className="-ml-2 flex size-11 items-center justify-center rounded-full text-arom transition-colors duration-150 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-arom sm:hidden"
          >
            <ChevronLeft aria-hidden="true" size={26} strokeWidth={2.4} />
          </button>
          <h2 id="filter-title" className="text-2xl font-bold tracking-[-0.03em]">
            Filter Professional
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close filters"
            className="ml-auto hidden size-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-arom-wash hover:text-arom focus-visible:outline-2 focus-visible:outline-arom sm:flex"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="flex-1 space-y-7 overflow-y-auto px-4 pb-6 pt-2 sm:px-6">
          <fieldset>
            <legend className="text-xl font-semibold tracking-[-0.02em]">Area of Support</legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {supportAreas.map((area) => {
                const selected = draft.areas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setDraft((current) => ({ ...current, areas: toggle(current.areas, area) }))}
                    className={chipClass(selected)}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold tracking-[-0.02em]">Session Type</legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {sessionFilters.map(({ value, icon: Icon }) => {
                const selected = draft.session === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setDraft((current) => ({ ...current, session: selected ? null : value }))
                    }
                    className={chipClass(selected)}
                  >
                    <Icon aria-hidden="true" size={18} className={selected ? "text-white" : "text-arom"} />
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <section aria-labelledby="availability-title">
            <h3 id="availability-title" className="text-xl font-semibold tracking-[-0.02em]">
              Availability
            </h3>
            <label className="mt-3 flex min-h-13 cursor-pointer items-center justify-between gap-4 rounded-xl border border-arom-border bg-white px-4 shadow-[0_2px_8px_rgba(20,34,31,0.06)]">
              <span id="available-now-label" className="text-base font-medium">
                Available Now
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={draft.availableNow}
                aria-labelledby="available-now-label"
                onClick={() => setDraft((current) => ({ ...current, availableNow: !current.availableNow }))}
                className={`relative h-7 w-13 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom ${
                  draft.availableNow ? "bg-arom" : "bg-[#c9d6d2]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-1 top-1 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-(--ease-out) ${
                    draft.availableNow ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </label>
          </section>

          <fieldset>
            <legend className="text-xl font-semibold tracking-[-0.02em]">Language</legend>
            <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-arom-border bg-white p-2 shadow-[0_2px_8px_rgba(20,34,31,0.06)]">
              {filterLanguages.map((language) => {
                const checked = draft.languages.includes(language);
                return (
                  <label
                    key={language}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-base font-medium transition-colors duration-150 hover:bg-arom-wash has-focus-visible:outline-2 has-focus-visible:outline-arom"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setDraft((current) => ({ ...current, languages: toggle(current.languages, language) }))
                      }
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex size-5 items-center justify-center rounded-[5px] border transition-colors duration-150 ${
                        checked ? "border-arom bg-arom text-white" : "border-ink-muted bg-white"
                      }`}
                    >
                      {checked && <Check size={14} strokeWidth={3} />}
                    </span>
                    {language}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <footer className="flex items-center gap-3 border-t border-arom-border bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
          <button
            type="button"
            onClick={() => setDraft(emptyFilters)}
            className="h-12 rounded-xl px-4 text-sm font-semibold text-arom transition-colors duration-150 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-arom"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-arom px-5 text-base font-semibold text-white transition-colors duration-150 hover:bg-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
          >
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
