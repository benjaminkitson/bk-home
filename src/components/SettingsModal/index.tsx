"use client";

import { IconButton } from "@/components/Atoms/IconButton";
import { Card } from "@/components/Molecules/Card";
import { FONT_DISPLAY_NAMES, FONT_IDS, useSettings } from "@/SettingsContext";
import { AiOutlineClose } from "react-icons/ai";

export function SettingsModal() {
  const {
    isSettingsOpen,
    closeSettings,
    selectedFontId,
    setSelectedFontId,
    fontMap,
  } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onClick={closeSettings}
    >
      <Card
        className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden bg-gradient-to-br from-blue-600/80 to-sky-600/75 p-6 text-white shadow-2xl ring-1 ring-inset ring-white/20 backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="settings-title" className="text-xl font-semibold">
            Settings
          </h2>
          <IconButton
            Icon={AiOutlineClose}
            onClick={closeSettings}
            aria-label="Close settings"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto">
          <p className="mb-2 text-sm text-white/70">Font</p>
          {FONT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedFontId(id)}
              className={`rounded-lg px-4 py-3 text-left transition ${
                selectedFontId === id
                  ? "bg-white/20 font-medium ring-1 ring-inset ring-white/30"
                  : "ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:ring-white/20"
              } ${fontMap[id]}`}
            >
              {FONT_DISPLAY_NAMES[id]}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
