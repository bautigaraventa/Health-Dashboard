# 📞 QA Dashboard — Voice AI Agent Call Evaluation

Solum Health Technical Challenge by bautigaraventa

Live demo: https://health-dashboard-bauti.vercel.app/

## 🧠 Overview

This is a responsive, production-grade QA Dashboard that replaces a cluttered Google Sheet currently used to track and evaluate Voice AI agent calls.

It allows quality reviewers to:

- Listen to recorded calls
- Compare human vs LLM evaluations (if available)
- Track agent performance over time
- Filter and explore call metadata
- Visualize metrics with interactive charts

Built with scalability, clarity, and performance in mind using **Next.js 15**, **shadcn/ui**, **Recharts**, and **TailwindCSS**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 App Router (with `app/` directory)
- **Styling**: TailwindCSS, shadcn/ui components, framer-motion
- **Charts**: Recharts
- **Tables**: TanStack Table
- **Audio**: WaveSurfer.js (via `@wavesurfer/react`)
- **Date utils**: date-fns
- **State**: React hooks + local state
- **Deployment**: Vercel

---

## 🧱 Project Structure

```src/
│
├── app/
│ ├── page.tsx # Main dashboard
│ ├── calls/ # Table view + Call Detail view
│
├── components/
│ ├── calls/ # Call details
│ ├── charts/ # Reusable data visualizations
│ ├── dashboard/ # KPI cards and DashboardHeader
│ ├── layout/ # Shell
│ ├── ui/ # shadcn-ui and generic components
│
├── lib/ # Utilities
├── mock/ # Sample data (calls.json)
└── types/ # TypeScript types
```

---

## 🚀 Getting Started

Clone this repo

Set ENV variable in your .env.local: `AVATAR_URL=https://api.dicebear.com/6.x/initials/svg?seed=`

```bash
npm install
npm run dev
```

Open in browser http://localhost:3000

---

## ✨ Key Features

- 📊 **Dashboard View**

  Real-time metrics, KPI cards, and historical performance graphs by agent/company.

- 📁 **Calls Table**

  Powerful TanStack table with sorting, filtering, date range picker, and pagination.

- 🎧 **Call Detail Page**

  Listen to the recording via waveform. See metadata, summaries, reviewer feedback.

- 📉 **Evaluation Comparison**

  Side-by-side display of QA review vs LLM-generated evaluation (if available).

- 📅 **Filtering and Navigation**

  Easily filter by agent, company, and time ranges.

---

## ⚙️ Technical Decisions

- **App Router (Next.js 15)**: Enables layout composition and route-based data loading.
- **shadcn/ui**: For consistency and fast iteration with accessible, customizable UI.
- **WaveSurfer**: Waveform player makes it intuitive for reviewers to scrub through calls.
- **Charts**: Recharts was chosen for responsive and declarative charting.
- **TanStack Table**: Highly composable table logic with custom renderers.
- **Modular Components**: All logic broken down into reusable, scalable components.

---

## 🤖 AI Integrations & Future Work

📌 Already AI-Friendly:

- Call summary already assumed to be AI-generated (LLM).
- Evaluation section is structured to support LLM judge feedback next to human QA.

💡 Future AI Integrations:
| AI Capability | Description | Tools/Models |
|-------------------------|-----------------------------------------------------------------------------|---------------------------------------|
| Auto Transcription | Run OpenAI Whisper or Deepgram to auto-generate transcripts from `recording_url`. | Whisper API, ffmpeg, Supabase Storage |
| LLM-based Evaluation | Use GPT-4 or fine-tuned LLM to evaluate call effectiveness and empathy. | OpenAI, Prompt engineering, LangChain |
| Semantic Search | Embed call summaries and enable semantic search across calls. | Supabase + pgvector, OpenAI Embeddings|
| Auto Tagging | Automatically tag intent, sentiment, call outcome. | LlamaIndex, HuggingFace Models |
| Dashboard Anomaly Alerts| Use LLMs or statistical models to detect outliers or unusual call behaviors.| n8n workflows |
| Nudges for QA | Suggest which calls should be reviewed based on LLM triage. | OpenAI, queue scoring |
| Voice Emotion Analysis | Analyze tone/emotion in voice using ML audio models. | TensorFlow Audio, Hume AI |

---

## 📈 Future Improvements

- [ ] Whisper transcription + synced transcript view
- [ ] Supabase Postgres schema + Prisma integration
- [ ] Real user auth and role-based dashboards (QA, manager, engineer)
- [ ] Call scoring & leaderboards
- [ ] SLA-based filters (e.g. calls over 2 min or failed outcome)
- [ ] Highlight important keywords in transcript
- [ ] Export reports as CSV / PDF
- [ ] Voice-based QA via browser mic + AI
- [ ] A11y testing and full screen reader support
- [ ] Datadog or any tool for error monitoring
- [ ] Unit tests
