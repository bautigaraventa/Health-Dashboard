import { Call, CallEndedReason, CallEndedReasonLabels, FilterOptions, MetricsData, SearchParams } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMetrics(calls: Call[]): MetricsData {
  // Group calls by day (call_start_time truncated to yyyy-mm-dd)
  const groupByDay = (arr: Call[]) =>
    arr.reduce<Record<string, Call[]>>((acc, call) => {
      const day = call.call_start_time.slice(0, 10);
      if (!acc[day]) acc[day] = [];
      acc[day].push(call);
      return acc;
    }, {});

  const callsByDay = groupByDay(calls);

  // Evaluation Rate Over Time (% of evaluated calls per day)
  const evaluationRateOverTime = Object.entries(callsByDay).map(
    ([date, dayCalls]) => {
      const totalCalls = dayCalls.length;
      const evaluatedCalls = dayCalls.filter((c) => c.evaluation).length;
      const rate = totalCalls === 0 ? 0 : (evaluatedCalls / totalCalls) * 100;
      return { date, rate: Math.round(rate * 10) / 10 };
    }
  );

  // Call Outcomes Pie Chart (ended_reason distribution)
  const outcomeCountMap = calls.reduce<Record<CallEndedReason, number>>(
    (acc, call) => {
      const reason = call.ended_reason as CallEndedReason;
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    },
    {} as Record<CallEndedReason, number>
  );

  const callOutcomes = Object.entries(outcomeCountMap).map(([key, value]) => ({
    name:
      CallEndedReasonLabels[key as CallEndedReason] ||
      CallEndedReasonLabels[CallEndedReason.OTHER],
    value,
  }));

  // Call Duration Over Time (average duration per day)
  const callDurationOverTime = Object.entries(callsByDay).map(
    ([date, dayCalls]) => {
      const totalDuration = dayCalls.reduce((sum, c) => sum + c.duration, 0);
      const avgDuration =
        dayCalls.length === 0 ? 0 : totalDuration / dayCalls.length;
      return { date, duration: Math.round(avgDuration * 10) / 10 };
    }
  );

  // QA Evaluations Over Time (count of QA Done per day)
  const qaEvaluationsOverTime = Object.entries(callsByDay).map(
    ([date, dayCalls]) => {
      const count = dayCalls.filter((c) => c.qa_check === "QA Done").length;
      return { date, count };
    }
  );

  // Number of calls already evaluated by a reviewer
  const totalEvaluated = calls.filter((call) => call.evaluation).length;

  // Number of calls not evaluated by a reviewer yet
  const pendingQA = calls.filter((call) => !call.evaluation).length;

  // Average length of calls
  const avgDuration =
    calls.reduce((sum, call) => sum + (call.duration || 0), 0) /
    (calls.length || 1);

  // Percentage of calls where QA provided feedback
  const feedbackCalls = calls.filter((call) => call.feedback_qa);
  const avgFeedbackQuality =
    (feedbackCalls.length / (calls.length || 1)) * 100;

  return {
    evaluationRateOverTime,
    callOutcomes,
    callDurationOverTime,
    qaEvaluationsOverTime,
    totalEvaluated,
    pendingQA,
    avgDuration: Number(avgDuration.toFixed(2)),
    avgFeedbackQuality: Number(avgFeedbackQuality.toFixed(2)),
  };
}

export async function filterCalls({
  calls,
  filters,
}: {
  calls: Call[];
  filters: SearchParams;
}) {
  const { from, to, agent, company } = filters;
  
  return calls.filter((call) => {
    const callDate = new Date(call.call_start_time);
    const dateFrom = from ? new Date(from) : undefined;
    const dateTo = to ? new Date(to) : undefined;

    const inDateRange =
      (!dateFrom || callDate >= dateFrom) && (!dateTo || callDate <= dateTo);

    const matchesAgent = !agent || call.agent === agent;
    const matchesCompany = !company || call.company === company;

    return inDateRange && matchesAgent && matchesCompany;
  });
}

export function getFiltersOptions({ calls }: { calls: Call[] }): FilterOptions {
  const reviewers = new Set<string>();
  const orgs = new Set<string>();

  for (const call of calls) {
    if (call.agent) reviewers.add(call.agent);
    if (call.company) orgs.add(call.company);
  }

  return {
    agents: Array.from(reviewers),
    companies: Array.from(orgs),
  };
}

export async function getCalls(): Promise<Call[]> {
  // this should hit a real api instead of grabbing data from json
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/data/calls.json`
  );
  return data.json();
}

export async function getCallById(id: string): Promise<Call | undefined> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/data/calls.json`
  );
  const calls: Call[] = await data.json();
  const call = calls.find((c) => c.call_id === id);

  return call;
}