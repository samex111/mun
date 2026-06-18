'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CONFERENCES_DATA } from '../constants/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileConferencesAccordionProps {
  onLinkClick: () => void;
}

export function MobileConferencesAccordion({ onLinkClick }: MobileConferencesAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { featured } = CONFERENCES_DATA;

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
        <span>Conferences</span>
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
            <div className="pb-7 flex flex-col gap-5">

              {/* Overline */}
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[#bb8b57]">
                Featured Conference
              </p>

              {/* Featured conference */}
              <div className="border-l border-white/10 pl-4 flex flex-col gap-3">
                <Link
                  href={featured.href}
                  onClick={onLinkClick}
                  className="font-heading text-[18px] font-normal text-white leading-snug hover:text-[#bb8b57] transition-colors duration-200"
                >
                  {featured.title}
                </Link>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-2 text-white/40">
                    <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-[#bb8b57]" />
                    <span className="font-body text-[12px] leading-relaxed">{featured.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Calendar className="w-3 h-3 shrink-0 text-[#bb8b57]" />
                    <span className="font-body text-[12px]">{featured.date}</span>
                  </div>
                </div>
                <Link
                  href={featured.href}
                  onClick={onLinkClick}
                  className="inline-flex items-center gap-1.5 text-[#bb8b57] text-[11px] uppercase tracking-[0.12em] hover:gap-2.5 transition-all duration-200"
                >
                  View Conference <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06]" />

              {/* Sub-links */}
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[#bb8b57]">
                Conference Types
              </p>
              <div className="flex flex-col gap-3.5">
                {[
                  'International Conferences',
                  'National Conferences',
                  'School Conferences',
                  'College Conferences',
                  'Delegate Training',
                  'Executive Board Program',
                ].map((label) => (
                  <Link
                    key={label}
                    href="/conferences"
                    onClick={onLinkClick}
                    className="font-body text-[15px] text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
