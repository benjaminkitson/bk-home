"use client";

import { FloatingSettingsTrigger } from "@/components/FloatingSettingsTrigger";
import { SettingsModal } from "@/components/SettingsModal";
import {
  type FontId,
  type FontMap,
  SettingsProvider,
  useSettings,
} from "@/SettingsContext";

function FontWrapper({ children }: { children: React.ReactNode }) {
  const { fontMap, selectedFontId } = useSettings();
  return (
    <div className={fontMap[selectedFontId]}>
      {children}
      <FloatingSettingsTrigger />
      <SettingsModal />
    </div>
  );
}

export function FontAndSettingsWrapper({
  children,
  fontMap,
  initialFontId,
}: {
  children: React.ReactNode;
  fontMap: FontMap;
  initialFontId: FontId;
}) {
  return (
    <SettingsProvider fontMap={fontMap} initialFontId={initialFontId}>
      <FontWrapper>{children}</FontWrapper>
    </SettingsProvider>
  );
}
