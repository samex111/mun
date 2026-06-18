'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROGRAMS_MENU } from '../constants/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileProgramsAccordionProps {
  onLinkClick: () => void;
}

const SECTIONS = [
  { label: 'Leadership', key: 'associations' as const },
  { label: 'Institutional', key: 'development' as const },
  { label: 'Global', key: 'partnerships' as const },
];

export function MobileProgramsAccordion({ onLinkClick }: MobileProgramsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">

      {/* Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          'w-full flex items-center justify-between py-5',
          'font-heading text-[22px] font-normal tracking-tight transition-colors duration-200',
          isOpen ? 'text-[#bb8b57]' : 'text-white/80 hover:text-white'
        )}
      >
        <span>Programs</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isOpen ? 'rotate-180 text-[#bb8b57]' : 'text-white/30'
          )}
          strokeWidth={1.5}
        />
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 flex flex-col gap-6">
              {SECTIONS.map((section, i) => (
                <div key={section.key} className="flex flex-col gap-3.5">
                  {/* Section overline */}
                  <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[#bb8b57]">
                    {section.label}
                  </p>

                  {/* Links */}
                  <div className="border-l border-white/10 pl-4 flex flex-col gap-3">
                    {PROGRAMS_MENU[section.key].map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        onClick={onLinkClick}
                        className="font-body text-[15px] text-white/60 hover:text-white transition-colors duration-200"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>

                  {/* Divider between sections */}
                  {i < SECTIONS.length - 1 && (
                    <div className="h-px bg-white/[0.06] mt-1" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
