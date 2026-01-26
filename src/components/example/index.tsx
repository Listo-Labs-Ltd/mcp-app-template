/**
 * Example Widget Component
 *
 * TODO: Replace this with your actual widget implementation.
 * This is a placeholder to demonstrate the widget structure.
 */

import React from "react";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { Button } from "@openai/apps-sdk-ui/components/Button";
import { EmptyMessage } from "@openai/apps-sdk-ui/components/EmptyMessage";
import { LoadingIndicator } from "@openai/apps-sdk-ui/components/Indicator";
import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../../use-widget-props";
import { useMaxHeight } from "../../use-max-height";
import { useOpenAiGlobal } from "../../use-openai-global";

interface WidgetData {
  message: string;
}

const fallbackData: WidgetData = {
  message: "No data received",
};

function App() {
  const widgetProps = useWidgetProps<WidgetData>(fallbackData);
  const maxHeight = useMaxHeight() ?? undefined;
  const toolOutput = useOpenAiGlobal("toolOutput");
  const isLoading = toolOutput == null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingIndicator label="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-4" style={maxHeight ? { maxHeight, overflow: "auto" } : undefined}>
      <div className="rounded-xl border border-subtle bg-surface p-4 shadow-sm">
        <header className="mb-4">
          <Badge variant="soft" color="info" size="sm" pill>
            Example Widget
          </Badge>
          <h1 className="heading-lg mt-2">Hello from the template!</h1>
        </header>

        <p className="text-secondary mb-4">{widgetProps.message}</p>

        <Button color="primary" variant="solid">
          Example Button
        </Button>
      </div>
    </div>
  );
}

const rootEl = document.getElementById("example-root");
if (rootEl) {
  createRoot(rootEl).render(<App />);
}

export default App;
export { App };
