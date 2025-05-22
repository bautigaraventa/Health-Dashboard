// src/app/calls/[id]/page.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { AudioPlayer } from "@/components/audio-player";
import { Call } from "@/types";

type Props = {
  call: Call;
};

export function CallDetailView({ call }: Props) {
  const [evaluationDone, setEvaluationDone] = useState(!!call.evaluation);
  const [feedbackQA, setFeedbackQA] = useState(call.feedback_qa || "");
  const [statusSaved, setStatusSaved] = useState(false);

  const handleSave = () => {
    setEvaluationDone(true);
    setStatusSaved(true);
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
        <Detail label="Call ID" value={call.call_id} />
        <Detail label="Customer Phone" value={call.customer_phone_number} />
        <Detail label="Assistant" value={call.assistant} />
        <Detail
          label="Call Start"
          value={format(new Date(call.call_start_time), "PPpp")}
        />
        <Detail label="Duration" value={`${Math.round(call.duration)} sec`} />
        <Detail label="Ended Reason" value={call.ended_reason} />
        <Detail
          label="Evaluation"
          value={
            evaluationDone ? (
              <Badge variant="default">Done</Badge>
            ) : (
              <Badge variant="destructive">Pending</Badge>
            )
          }
        />
        <Detail
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

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">QA Feedback</h2>
        <Textarea
          placeholder="Add your QA feedback..."
          value={feedbackQA}
          onChange={(e) => {
            setFeedbackQA(e.target.value);
            setStatusSaved(false);
          }}
        />
        <Button onClick={handleSave}>Save Evaluation</Button>
        {statusSaved && <Badge variant="outline">✅ Saved (mocked)</Badge>}
      </section>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-4 space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}
