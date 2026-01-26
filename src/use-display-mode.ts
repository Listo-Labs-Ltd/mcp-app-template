/**
 * Hook for accessing the current display mode from the ChatGPT runtime.
 */

import { useOpenAiGlobal } from "./use-openai-global";

export function useDisplayMode(): "pip" | "inline" | "fullscreen" | undefined {
  return useOpenAiGlobal("displayMode");
}
