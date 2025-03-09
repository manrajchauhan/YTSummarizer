import { langfuseExporter } from "@/observability/langfuse";
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({
    serviceName: "YTSummarizer",
    traceExporter: langfuseExporter,
  });
}
