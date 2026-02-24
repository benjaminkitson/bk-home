"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  DEFAULT_FONT,
  FONT_DISPLAY_NAMES,
  FONT_IDS,
  type FontId,
  type FontMap,
} from "./fonts";

export { FONT_DISPLAY_NAMES, FONT_IDS, DEFAULT_FONT };
export type { FontId, FontMap };

const FONT_COOKIE_KEY = "bk-home-font";

interface SettingsContextValue {
  fontMap: FontMap;
  selectedFontId: FontId;
  setSelectedFontId: (id: FontId) => void;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

function setFontCookie(id: FontId) {
  document.cookie = `${FONT_COOKIE_KEY}=${id};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function SettingsProvider({
  children,
  fontMap,
  initialFontId,
}: {
  children: React.ReactNode;
  fontMap: FontMap;
  initialFontId: FontId;
}) {
  const [selectedFontId, setSelectedFontIdState] = useState<FontId>(initialFontId);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setSelectedFontId = useCallback((id: FontId) => {
    setSelectedFontIdState(id);
    setFontCookie(id);
  }, []);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const value = useMemo(
    () => ({
      fontMap,
      selectedFontId,
      setSelectedFontId,
      isSettingsOpen,
      openSettings,
      closeSettings,
    }),
    [
      fontMap,
      selectedFontId,
      setSelectedFontId,
      isSettingsOpen,
      openSettings,
      closeSettings,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
