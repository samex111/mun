"use client";

import React from "react";
import { useChat } from "./ChatContext";

export function ChatToggleButton() {
  const { isOpen, toggleChat } = useChat();

  return (
    <button
      onClick={toggleChat}
      className={`
        fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "bg-zinc-800 rotate-90 scale-90" : "bg-black hover:scale-105"}
        border border-yellow-500/30
      `}
      aria-label="Toggle AI Assistant"
    >
      <svg
        className={`w-6 h-6 text-yellow-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        )}
      </svg>
    </button>
  );
}
