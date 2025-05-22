import { useMemo } from "react";
import { Call } from "@/types";

export function useKpiMetrics(calls: Call[]) {
  return useMemo(() => {
    const totalEvaluated = calls.filter((call) => call.evaluation).length;
    const pendingQA = calls.filter((call) => !call.evaluation).length;

    const avgDuration =
      calls.reduce((sum, call) => sum + (call.duration || 0), 0) /
      (calls.length || 1);

    const feedbackCalls = calls.filter((call) => call.feedback_qa);
    const avgFeedbackQuality =
      (feedbackCalls.length / (calls.length || 1)) * 100;

    return {
      totalEvaluated,
      pendingQA,
      avgDuration: Number(avgDuration.toFixed(2)),
      avgFeedbackQuality: Number(avgFeedbackQuality.toFixed(2)),
    };
  }, [calls]);
}
