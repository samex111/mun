'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePWAInstall } from './usePWAInstall';
import { Check, Download } from 'lucide-react';

interface InstallButtonProps {
  isScrolled?: boolean;
  className?: string;
  variant?: 'desktop' | 'mobile-drawer' | 'mobile-header';
}

export function InstallButton({ isScrolled = false, className, variant = 'desktop' }: InstallButtonProps) {
  const { isInstallable, isInstalled, installPWA } = usePWAInstall();

  // Do not render anything if neither installable nor installed,
  // to avoid flashing on unsupported browsers. Also do not render if already installed.
  if (!isInstallable || isInstalled) {
    return null;
  }

  if (variant === 'mobile-drawer') {
    return (
      <button
        onClick={installPWA}
        className={cn(
          "flex items-center justify-center w-full py-4 bg-transparent border border-white/20 text-white font-body text-[12px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/10",
          className
        )}
      >
        Install SMJMUN
      </button>
    );
  }

  if (variant === 'mobile-header') {
    return (
      <button
        onClick={installPWA}
        aria-label="Install App"
        className={cn("p-2 text-white/70 hover:text-white transition-colors duration-200", className)}
      >
        <Download className="w-5 h-5" strokeWidth={1.5} />
      </button>
    );
  }

  // Desktop variant

  return (
    <button
      onClick={installPWA}
      aria-label="Install App"
      className={cn(
        "hidden lg:inline-flex rounded-md items-center justify-center p-3 font-body text-[13px] font-medium tracking-widest uppercase transition-all duration-300",
        isScrolled
          ? "bg-transparent text-white border border-white/30 hover:bg-white hover:text-black hover:-translate-y-0.5 shadow-sm"
          : "bg-transparent text-white border border-white/50 hover:bg-white hover:text-black hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]",
        "animate-in fade-in duration-500", // fade in when available
        className
      )}
    >
      <Download className="w-4 h-4" strokeWidth={1.6} />
    </button>
  );
}
