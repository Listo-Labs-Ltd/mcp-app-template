/**
 * Hook for accessing OpenAI globals from the ChatGPT runtime.
 */

import { useState, useEffect } from "react";
import type { OpenAiGlobals } from "./types";

type GlobalKey = keyof OpenAiGlobals;

export function useOpenAiGlobal<K extends GlobalKey>(key: K): OpenAiGlobals[K] | undefined {
  const [value, setValue] = useState<OpenAiGlobals[K] | undefined>(() => {
    if (typeof window !== "undefined" && window.openai) {
      return window.openai[key];
    }
    return undefined;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial value
    if (window.openai && window.openai[key] !== undefined) {
      setValue(window.openai[key]);
    }

    // Listen for updates
    const handler = (event: CustomEvent<{ globals: Partial<OpenAiGlobals> }>) => {
      if (key in event.detail.globals) {
        setValue(event.detail.globals[key] as OpenAiGlobals[K]);
      }
    };

    window.addEventListener("openai:set_globals", handler as EventListener);
    return () => window.removeEventListener("openai:set_globals", handler as EventListener);
  }, [key]);

  return value;
}
