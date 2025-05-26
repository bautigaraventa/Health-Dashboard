"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Badge, Button, Textarea } from "@/components/ui";
import { Call } from "@/types";
import { toast } from "sonner";
import { AudioPlayer } from "./audio-player";
import { DetailCard } from "./detail-card";

interface CallDetailProps {
  call: Call;
}

export function CallDetail({ call }: CallDetailProps) {
  const [evaluationDone, setEvaluationDone] = useState(!!call.evaluation);
  const [feedbackQA, setFeedbackQA] = useState(call.feedback_qa || "");

  const handleSave = () => {
    setEvaluationDone(true);
    toast.success("Your evaluation has been successfully submitted.");
    // Future: save to backend or global state
  };

  return (
    <main className="space-y-6">
      <section className="flex xl:flex-row flex-col center gap-4 space-y-4">
        <AudioPlayer url={call.recording_url} />
        <div className="xl:w-1/2">
          <h2 className="text-lg font-semibold">Call Summary</h2>
          {call.summary?.trim() ? (
            <p className="bg-muted p-4 rounded-md">{call.summary}</p>
          ) : (
            <Badge variant="destructive">Missing Summary</Badge>
          )}
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DetailCard label="Call ID" value={call.call_id} />
        <DetailCard label="Customer Phone" value={call.customer_phone_number} />
        <DetailCard label="Agent" value={call.agent} />
        <DetailCard
          label="Call Start"
          value={format(new Date(call.call_start_time), "PPpp")}
        />
        <DetailCard
          label="Duration"
          value={`${Math.round(call.duration)} sec`}
        />
        <DetailCard label="Ended Reason" value={call.ended_reason} />
        <DetailCard
          label="Evaluation"
          value={
            evaluationDone ? (
              <Badge variant="default">Done</Badge>
            ) : (
              <Badge variant="destructive">Pending</Badge>
            )
          }
        />
        <DetailCard
          label="QA Check"
          value={
            call.qa_check === "QA Done" ? (
              <Badge variant="default">QA Done</Badge>
            ) : (
              <Badge variant="secondary">Pending</Badge>
            )
          }
        />
      </section>

      <section className="flex xl:flex-row flex-col center gap-4 space-y-4">
        <div className="xl:w-1/2">
          <h2 className="text-lg font-semibold">Feedback</h2>
          <Textarea
            className="h-[95%]"
            placeholder="Add your feedback..."
            value={feedbackQA}
            onChange={(e) => {
              setFeedbackQA(e.target.value);
            }}
          />
        </div>
        <div className="xl:w-1/2 ">
          <h2 className="text-lg font-semibold">LLM Evaluation</h2>
          {call.llm_feedback ? (
            <p className="bg-muted p-4 rounded-md">{call.llm_feedback}</p>
          ) : (
            <Badge variant="destructive">Missing LLM Evaluation</Badge>
          )}
        </div>
      </section>
      <Button onClick={handleSave}>Save Evaluation</Button>
    </main>
  );
}
