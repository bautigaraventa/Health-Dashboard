import dynamic from "next/dynamic";

import { SearchParams } from "@/types";
import { PageHeader } from "@/components/ui";
import {
  filterCalls,
  generateMetrics,
  getCalls,
  getFiltersOptions,
} from "@/lib/utils";
import { DashboardHeader, KpiCards } from "@/components/dashboard";

const EvaluationRateChart = dynamic(() =>
  import("@/components/charts/evaluation-rate-chart").then(
    (mod) => mod.EvaluationRateChart
  )
);
const CallOutcomesPieChart = dynamic(() =>
  import("@/components/charts/call-outcomes-pie-chart").then(
    (mod) => mod.CallOutcomesPieChart
  )
);
const CallDurationBarChart = dynamic(() =>
  import("@/components/charts/call-duration-car-chart").then(
    (mod) => mod.CallDurationBarChart
  )
);
const QAEvaluationRateChart = dynamic(() =>
  import("@/components/charts/qa-evaluation-rate-chart").then(
    (mod) => mod.QAEvaluationRateChart
  )
);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const calls = await getCalls();

  const filteredCalls = await filterCalls({ calls, filters: params });

  const {
    evaluationRateOverTime,
    callOutcomes,
    callDurationOverTime,
    qaEvaluationsOverTime,
    totalEvaluated,
    pendingQA,
    avgDuration,
    avgFeedbackQuality,
  } = generateMetrics(filteredCalls);

  const { agents, companies } = getFiltersOptions({ calls });

  return (
    <main className="flex flex-col gap-4 justify-between mb-6">
      <PageHeader
        title="Performance Dashboard"
        subtitle="Track call quality and agent performance"
      />
      <DashboardHeader agents={agents} companies={companies} />
      <KpiCards
        totalEvaluated={totalEvaluated}
        pendingQA={pendingQA}
        avgDuration={avgDuration}
        avgFeedbackQuality={avgFeedbackQuality}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EvaluationRateChart data={evaluationRateOverTime} />
        <CallOutcomesPieChart data={callOutcomes} />
        <CallDurationBarChart data={callDurationOverTime} />
        <QAEvaluationRateChart data={qaEvaluationsOverTime} />
      </div>
    </main>
  );
}
