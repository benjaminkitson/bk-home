"use client";

import { IconButton } from "@/components/Atoms/IconButton";
import { useSettings } from "@/SettingsContext";
import { IoMdSettings } from "react-icons/io";

interface SettingsCogButtonProps {
  className?: string;
}

export function SettingsCogButton({ className = "" }: SettingsCogButtonProps) {
  const { openSettings } = useSettings();

  return (
    <IconButton
      Icon={IoMdSettings}
      onClick={openSettings}
      className={className}
      aria-label="Open settings"
    />
  );
}
