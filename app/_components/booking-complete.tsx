"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef } from "react";

type BookingCompleteProps = {
  details: { icon: LucideIcon; label: string; value: string }[];
  viewHref: string;
};

const easeOut = [0.23, 1, 0.32, 1] as const;

export function BookingComplete({ details, viewHref }: BookingCompleteProps) {
  const shouldReduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  // Reduced motion keeps a gentle fade and settle instead of dropping animation entirely.
  const distance = shouldReduceMotion ? 4 : 14;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0.05 : 0.32,
        staggerChildren: shouldReduceMotion ? 0.04 : 0.07,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, transform: `translateY(${distance}px)` },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: shouldReduceMotion ? 0.2 : 0.4, ease: easeOut },
    },
  };

  return (
    <motion.section
      aria-labelledby="booking-complete-title"
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-auto flex w-full max-w-md flex-col items-center text-center"
    >
      <div className="relative w-full max-w-[18rem] sm:max-w-[20rem]">
        {!shouldReduceMotion && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0.55, scale: 0.45 }}
            animate={{ opacity: 0, scale: 1.25 }}
            transition={{ duration: 0.9, delay: 0.22, ease: easeOut }}
            className="absolute left-1/2 top-1/2 -ml-[22.5%] -mt-[22.5%] aspect-square w-[45%] rounded-full border-2 border-arom-accent"
          />
        )}

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0, scale: 0.96 } : { opacity: 0, scale: 0.55, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0.24, ease: easeOut }
              : { type: "spring", duration: 0.7, bounce: 0.38 }
          }
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 3.6, delay: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/booking/booking-complete.png"
              alt=""
              width={1590}
              height={989}
              priority
              sizes="(max-width: 639px) 18rem, 20rem"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.h1
        ref={headingRef}
        id="booking-complete-title"
        tabIndex={-1}
        variants={item}
        className="mt-1 max-w-[17rem] text-[1.65rem] font-bold leading-tight tracking-[-0.03em] text-ink outline-none sm:max-w-none sm:text-[1.8rem]"
      >
        Your Appointment is Booked!
      </motion.h1>

      <motion.p variants={item} className="mt-2 max-w-[21rem] text-base leading-6 text-ink">
        You will receive a confirmation or reminder before your session.
      </motion.p>

      <motion.dl
        variants={item}
        className="mt-5 w-full space-y-3 rounded-xl border border-[#d9d9d9] bg-white px-6 py-4 text-left shadow-[0_8px_24px_rgba(20,34,31,0.1)]"
      >
        {details.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3.5">
            <dt>
              <Icon aria-hidden="true" size={19} className="text-arom" />
              <span className="sr-only">{label}</span>
            </dt>
            <dd className="text-sm text-ink">{value}</dd>
          </div>
        ))}
      </motion.dl>

      <motion.div variants={item} className="mt-5 grid w-full gap-3.5">
        <Link
          href={viewHref}
          className="flex h-[3.4rem] items-center justify-center rounded-2xl bg-arom px-5 text-lg font-bold text-white transition-colors duration-150 hover:bg-arom-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          View Appointment
        </Link>
        <Link
          href="/professional"
          className="flex h-11 items-center justify-center rounded-lg border border-[#bdbdbd] bg-white px-5 text-lg font-bold text-ink shadow-[0_4px_10px_rgba(20,34,31,0.1)] transition-colors duration-150 hover:bg-arom-wash focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arom"
        >
          Back to Professionals
        </Link>
      </motion.div>
    </motion.section>
  );
}
