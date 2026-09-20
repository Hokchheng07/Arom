"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DetectionModal } from "../components/detection-modal";

type DetectionContextType = {
  isDetectionOpen: boolean;
  openDetection: () => void;
  closeDetection: () => void;
};

const DetectionContext = createContext<DetectionContextType>({
  isDetectionOpen: false,
  openDetection: () => {},
  closeDetection: () => {},
});

export function DetectionProvider({ children }: { children: ReactNode }) {
  const [isDetectionOpen, setIsDetectionOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close detection modal whenever route changes
  useEffect(() => {
    setIsDetectionOpen(false);
  }, [pathname]);

  const openDetection = () => setIsDetectionOpen(true);
  const closeDetection = () => setIsDetectionOpen(false);

  return (
    <DetectionContext.Provider value={{ isDetectionOpen, openDetection, closeDetection }}>
      {children}
      <DetectionModal isOpen={isDetectionOpen} onClose={closeDetection} />
    </DetectionContext.Provider>
  );
}

export function useDetection() {
  return useContext(DetectionContext);
}
