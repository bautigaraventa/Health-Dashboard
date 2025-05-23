"use client";

import { KpiCard } from "./KpiCard";
import { CheckCircle, Clock, Timer, MessageSquare } from "lucide-react";

interface KpiCardsProps {
  totalEvaluated: number;
  pendingQA: number;
  avgDuration: number;
  avgFeedbackQuality: number;
}

export function KpiCards({
  totalEvaluated,
  pendingQA,
  avgDuration,
  avgFeedbackQuality,
}: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard
        title="Total Evaluated"
        value={totalEvaluated}
        description="Reviewed by QA"
        tooltip="The number of calls that have already been evaluated by a QA reviewer."
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
      />
      <KpiCard
        title="Pending QA"
        value={pendingQA}
        description="Awaiting review"
        tooltip="These calls are still awaiting manual QA evaluation. Reducing this ensures quality control coverage."
        icon={<Clock className="w-5 h-5 text-yellow-600" />}
      />
      <KpiCard
        title="Avg. Call Duration"
        value={avgDuration}
        suffix="s"
        description="Across all calls"
        tooltip="Indicates average length of calls. Useful for identifying unusually short or long interactions."
        icon={<Timer className="w-5 h-5 text-blue-600" />}
      />
      <KpiCard
        title="Feedback Quality"
        value={avgFeedbackQuality}
        suffix="%"
        description="Useful feedback ratio"
        tooltip="Percentage of calls where the QA provided meaningful feedback. A high rate signals engaged and effective reviews."
        icon={<MessageSquare className="w-5 h-5 text-purple-600" />}
      />
    </div>
  );
}
