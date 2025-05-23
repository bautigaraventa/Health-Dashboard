import { SearchParams } from "@/types";

import { DashboardHeader, PageHeader } from "@/components";
import { KpiCards } from "@/components/dashboard/KpiCards";
import {
  filterCalls,
  generateMetrics,
  getCalls,
  getFiltersOptions,
} from "@/lib/utils";
import dynamic from "next/dynamic";

const EvaluationRateChart = dynamic(() =>
  import("@/components/charts/EvaluationRateChart").then(
    (mod) => mod.EvaluationRateChart
  )
);
const CallOutcomesPieChart = dynamic(() =>
  import("@/components/charts/CallOutcomesPieChart").then(
    (mod) => mod.CallOutcomesPieChart
  )
);
const CallDurationBarChart = dynamic(() =>
  import("@/components/charts/CallDurationBarChart").then(
    (mod) => mod.CallDurationBarChart
  )
);
const QAEvaluationRateChart = dynamic(() =>
  import("@/components/charts/QAEvaluationRateChart").then(
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
