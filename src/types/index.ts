export interface Call {
    call_id: string;
    ended_reason: CallEndedReason;
    agent: string;
    customer_phone_number: string;
    call_start_time: string;
    duration: number;
    call_ended_time: string;
    summary: string;
    recording_url: string;
    reviewer: string;
    evaluation: boolean;
    qa_check: string;
    feedback_qa: string;
    status_feedback_engineer: string;
    comments_engineer: string;
    company: string;
    llm_feedback: string;
};

export interface MetricsData {
  evaluationRateOverTime: { date: string; rate: number }[];
  callOutcomes: { name: string; value: number }[];
  callDurationOverTime: { date: string; duration: number }[];
  qaEvaluationsOverTime: { date: string; count: number }[];
  totalEvaluated: number;
  pendingQA: number;
  avgDuration: number;
  avgFeedbackQuality: number;
}

export interface OutcomeData {
  name: string;
  value: number;
}

export interface EvaluationDataPoint {
  date: string;
  [agent: string]: number | string;
}

export interface CallDurationData {
  date: string;
  duration: number;
}

export interface QAEvaluationDataPoint {
  date: string;
  count: number;
};

export interface SearchParams {
  from?: string;
  to?: string;
  agent?: string;
  company?: string;
}

export interface FilterOptions {
  agents: string[];
  companies: string[];
};

export enum CallEndedReason {
  CUSTOMER_ENDED_CALL = "customer-ended-call",
  ASSISTANT_ENDED_CALL = "assistant-ended-call",
  ASSISTANT_FORWARDED_CALL = "assistant-forwarded-call",
  ASSISTANT_HANGED_UP = "assistant-hung-up",
  CUSTOMER_HANGED_UP = "customer-hung-up",
  SILENCE_TIMED_OUT = "silence-timed-out",
  OTHER = "other"
}

export const CallEndedReasonLabels: Record<CallEndedReason, string> = {
  [CallEndedReason.CUSTOMER_ENDED_CALL]: "Customer Ended Call",
  [CallEndedReason.ASSISTANT_ENDED_CALL]: "Assistant Ended Call",
  [CallEndedReason.ASSISTANT_FORWARDED_CALL]: "Assistant Forwarded Call",
  [CallEndedReason.ASSISTANT_HANGED_UP]: "Assistant Hung Up",
  [CallEndedReason.CUSTOMER_HANGED_UP]: "Customer Hung Up",
  [CallEndedReason.SILENCE_TIMED_OUT]: "Silence Timed Out",
  [CallEndedReason.OTHER]: "Other"
}