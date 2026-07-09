"use client";

import React from "react";
import { useChat } from "./ChatContext";

export function SuggestedQuestions() {
  const { suggestedQuestions, sendMessage, isLoading } = useChat();

  if (!suggestedQuestions || suggestedQuestions.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-2 border-t border-zinc-800/50 bg-black/40 backdrop-blur-sm flex overflow-x-auto gap-2 custom-scrollbar no-scrollbar-arrows pb-3">
      {suggestedQuestions.map((q, idx) => (
        <button
          key={idx}
          onClick={() => sendMessage(q)}
          disabled={isLoading}
          className="whitespace-nowrap px-3 py-1.5 rounded-full border border-yellow-500/20 bg-zinc-900/50 text-xs text-yellow-500/80 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
