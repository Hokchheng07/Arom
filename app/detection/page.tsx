"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDetection } from "../_components/detection-provider";

export default function DetectionPage() {
  const router = useRouter();
  const { openDetection } = useDetection();

  useEffect(() => {
    // Detection is a popup modal, not a standalone page
    router.replace("/");
    const timer = setTimeout(() => {
      openDetection();
    }, 150);
    return () => clearTimeout(timer);
  }, [router, openDetection]);

  return <div className="min-h-screen bg-[#f7faf9]" />;
}

