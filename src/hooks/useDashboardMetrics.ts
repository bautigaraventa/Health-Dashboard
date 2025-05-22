import { Call, CallEndedReason, CallEndedReasonLabels, MetricsData } from '@/types';
import { useMemo } from 'react';

export function useDashboardMetrics(calls: Call[]): MetricsData {
  return useMemo(() => {
    // Group calls by day (call_start_time truncated to yyyy-mm-dd)
    const groupByDay = (arr: Call[]) =>
      arr.reduce<Record<string, Call[]>>((acc, call) => {
        const day = call.call_start_time.slice(0, 10);
        if (!acc[day]) acc[day] = [];
        acc[day].push(call);
        return acc;
      }, {});

    const callsByDay = groupByDay(calls);

    // 1. Evaluation Rate Over Time (% of evaluated calls per day)
    const evaluationRateOverTime = Object.entries(callsByDay).map(([date, dayCalls]) => {
      const totalCalls = dayCalls.length;
      const evaluatedCalls = dayCalls.filter((c) => c.evaluation).length;
      const rate = totalCalls === 0 ? 0 : (evaluatedCalls / totalCalls) * 100;
      return { date, rate: Math.round(rate * 10) / 10 };
    });

    // 2. Call Outcomes Pie Chart (ended_reason distribution)
    const outcomeCountMap = calls.reduce<Record<CallEndedReason, number>>((acc, call) => {
      const reason = call.ended_reason as CallEndedReason;
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {} as Record<CallEndedReason, number>);
    
    const callOutcomes = Object.entries(outcomeCountMap).map(([key, value]) => ({
      name: CallEndedReasonLabels[key as CallEndedReason] || CallEndedReasonLabels[CallEndedReason.OTHER],
      value,
    }));

    // 3. Call Duration Over Time (average duration per day)
    const callDurationOverTime = Object.entries(callsByDay).map(([date, dayCalls]) => {
      const totalDuration = dayCalls.reduce((sum, c) => sum + c.duration, 0);
      const avgDuration = dayCalls.length === 0 ? 0 : totalDuration / dayCalls.length;
      return { date, duration: Math.round(avgDuration * 10) / 10 };
    });

    // 4. QA Evaluations Over Time (count of QA Done per day)
    const qaEvaluationsOverTime = Object.entries(callsByDay).map(([date, dayCalls]) => {
      const count = dayCalls.filter((c) => c.qa_check === 'QA Done').length;
      return { date, count };
    });

    return {
      evaluationRateOverTime,
      callOutcomes,
      callDurationOverTime,
      qaEvaluationsOverTime,
    };
  }, [calls]);
}