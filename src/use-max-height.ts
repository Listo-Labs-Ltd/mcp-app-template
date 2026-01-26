/**
 * Hook for accessing the max height constraint from the ChatGPT runtime.
 */

import { useOpenAiGlobal } from "./use-openai-global";

export function useMaxHeight(): number | null {
  return useOpenAiGlobal("maxHeight") ?? null;
}
