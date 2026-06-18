import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
BarChart,
Bar,
PieChart,
Pie,
Cell,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
Legend,
} from "recharts";

import {
FileText,
Building2,
BarChart3,
TrendingUp,
} from "lucide-react";

import Layout from "../components/Layout";
import { analyticsApi } from "../utils/api";

const COLORS = [
"#6366F1",
"#8B5CF6",
"#06B6D4",
"#10B981",
"#F59E0B",
"#EF4444",
];

function StatCard({
title,
value,
icon,
}) {
return (
<motion.div
whileHover={{
y: -4,
}}
className="
group


    relative

    overflow-hidden

    rounded-3xl

    border
    border-white/30

    bg-gradient-to-br
    from-white
    via-indigo-50/80
    to-violet-50/80

    dark:from-slate-800/60
    dark:via-indigo-900/20
    dark:to-violet-900/20

    backdrop-blur-xl

    shadow-lg
    shadow-indigo-100/50

    dark:shadow-indigo-900/10

    p-6
  "
>
  <div
    className="
      absolute
      top-0
      right-0

      h-28
      w-28

      rounded-full

      bg-gradient-to-br
      from-indigo-400/20
      to-violet-500/20

      blur-2xl
    "
  />

  <div className="relative z-10">
    <div className="flex items-center justify-between">
      <span
        className="
          text-sm
          font-medium

          text-slate-500
          dark:text-slate-300
        "
      >
        {title}
      </span>

      <div
        className="
          h-12
          w-12

          rounded-2xl

          bg-gradient-to-br
          from-indigo-500
          to-violet-600

          text-white

          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>
    </div>

    <h3
      className="
        mt-5

        text-4xl
        font-bold

        text-slate-800
        dark:text-white
      "
    >
      {value}
    </h3>
  </div>
</motion.div>


);
}


export default function AnalyticsPage() {
const [data, setData] =
useState(null);

const [loading, setLoading] =
useState(true);

const [error, setError] =
useState("");

useEffect(() => {
loadAnalytics();
}, []);

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");

const aiSummary = [
  "Memo volume increased significantly from 2024 to 2026.",
  "Punjab National Bank is the most active receiver company.",
  "Tender Submission is the dominant communication category.",
  "Operational communication peaks during Q2 and Q3."
];

const loadAnalytics =
async () => {
try {
setLoading(true);


    const res =
      await analyticsApi.summary();

    setData(res.data);
  } catch (err) {
    console.error(err);

    setError(
      "Failed to load analytics"
    );
  } finally {
    setLoading(false);
  }
};


if (loading) {
return ( <Layout> <div className="flex items-center justify-center h-[60vh]"> <div
         className="
           rounded-2xl
           border
           border-slate-200/70
           dark:border-slate-800
           bg-white/80
           dark:bg-slate-950/80
           backdrop-blur-xl
           px-8
           py-6
         "
       > <p className="text-slate-600 dark:text-slate-300">
Loading Analytics... </p> </div> </div> </Layout>
);
}

if (error) {
return ( <Layout> <div className="text-center py-10 text-red-500">
{error} </div> </Layout>
);
}

const totalCompanies =
data?.topCompanies?.length || 0;

const totalPurposes =
data?.purposeBreakdown?.length || 0;

return ( <Layout> <div className="flex flex-col gap-4">


    {/* HEADER */}

    <motion.div
initial={{
opacity: 0,
y: 10,
}}
animate={{
opacity: 1,
y: 0,
}}
className="
relative


overflow-hidden

rounded-3xl

border
border-white/30

bg-gradient-to-r
from-indigo-500
via-violet-500
to-cyan-500

p-8

text-white

shadow-xl


"

>

  <div
    className="
      absolute
      top-0
      right-0


  h-64
  w-64

  rounded-full

  bg-white/10

  blur-3xl
"


/>

  <div className="relative z-10">
    <h1
      className="
        text-4xl
        md:text-5xl


    font-bold
  "
>
  MemoFlow Intelligence
</h1>

<p
  className="
    mt-3

    text-indigo-100

    max-w-2xl
  "
>
  AI-powered communication analytics,
  business intelligence, and operational insights.
</p>

<div
  className="
    mt-6

    flex
    flex-wrap
    gap-3
  "
>
  <div className="px-4 py-2 rounded-full bg-white/15">
    📊 {data.totalMemos} Total Memos
  </div>

  <div className="px-4 py-2 rounded-full bg-white/15">
    🏢 {totalCompanies} Partners
  </div>

  <div className="px-4 py-2 rounded-full bg-white/15">
    📄 {totalPurposes} Categories
  </div>

  <div className="px-4 py-2 rounded-full bg-white/15">
    🚀 2024-2026 Growth
  </div>
</div>


  </div>
</motion.div>


    {/* STATS */}

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
      "
    >
      <StatCard
        title="Total Memos"
        value={data.totalMemos}
        icon={<FileText size={18} />}
      />

      <StatCard
        title="Companies"
        value={totalCompanies}
        icon={<Building2 size={18} />}
      />

      <StatCard
        title="Purpose Types"
        value={totalPurposes}
        icon={<BarChart3 size={18} />}
      />

      <StatCard
        title="Growth Tracking"
        value="2024-2026"
        icon={<TrendingUp size={18} />}
      />
    </div>

    {/* MONTHLY TREND */}

    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-2xl

        border
        border-slate-200/70
        dark:border-slate-800

        bg-white/80
        dark:bg-slate-950/80

        backdrop-blur-xl

        p-5
      "
    >
      <h2
        className="
          text-lg
          font-semibold
          mb-4
        "
      >
        Monthly Memo Trend
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer>
          <BarChart
            data={
              data.volumeByMonth
            }
          >
            <XAxis
              dataKey="month"
            />
            <YAxis />
            <Tooltip />
            <Bar
  dataKey="count"
  fill="#6366F1"
  radius={[10, 10, 0, 0]}
/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>

    {/* TWO COLUMN */}

    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-4
      "
    >
      {/* TOP COMPANIES */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
       className="
rounded-3xl

border
border-white/30

bg-gradient-to-br
from-white
via-violet-50/70
to-indigo-50/70

dark:from-slate-800/50
dark:via-violet-900/10
dark:to-indigo-900/10

backdrop-blur-xl

shadow-lg
shadow-indigo-100/50

p-6
"
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Top Receiver Companies
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer>
  <BarChart data={data.topCompanies}>
    <defs>
      <linearGradient
        id="companyGradient"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop
          offset="0%"
          stopColor="#6366F1"
        />
        <stop
          offset="50%"
          stopColor="#8B5CF6"
        />
        <stop
          offset="100%"
          stopColor="#06B6D4"
        />
      </linearGradient>
    </defs>

    <XAxis
      dataKey="company"
      tick={{
        fontSize: 12,
        fill: "#64748B",
      }}
    />

    <YAxis
      tick={{
        fontSize: 12,
        fill: "#64748B",
      }}
    />

    <Tooltip
      contentStyle={{
        borderRadius: "16px",
        border: "none",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    />

   <Bar
  dataKey="count"
  radius={[12, 12, 0, 0]}
>
  {data.topCompanies?.map(
    (entry, index) => (
      <Cell
        key={index}
        fill={
          [
            "#6366F1",
            "#8B5CF6",
            "#06B6D4",
            "#10B981",
            "#F59E0B",
            "#EC4899",
          ][index % 6]
        }
      />
    )
  )}
</Bar>
  </BarChart>
</ResponsiveContainer>
        </div>
      </motion.div>

      {/* PURPOSE PIE */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-2xl

          border
          border-slate-200/70
          dark:border-slate-800

          bg-white/80
          dark:bg-slate-950/80

          p-5
        "
      >
        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Purpose Breakdown
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={
                  data.purposeBreakdown
                }
                dataKey="count"
                nameKey="purpose"
                outerRadius={100}
                label
              >
                {data.purposeBreakdown?.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={
                        index
                      }
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>

    {/* AI CARD */}

   <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    rounded-3xl
    p-6

    bg-gradient-to-r
    from-indigo-50
    via-violet-50
    to-cyan-50

    dark:from-indigo-500/10
    dark:via-violet-500/10
    dark:to-cyan-500/10

    border
    border-indigo-200
    dark:border-indigo-800
  "
>
  <h2 className="text-2xl font-bold mb-5">
    🤖 AI Executive Summary
  </h2>

  <div className="grid gap-3">
    {aiSummary.map((item, index) => (
      <div
        key={index}
        className="
          rounded-2xl
          bg-white/80
          dark:bg-white/5
          p-4
          border
          border-white/30
        "
      >
        {item}
      </div>
    ))}
  </div>
</motion.div>


<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    rounded-3xl

    border
    border-slate-200
    dark:border-slate-700

    bg-white/90
    dark:bg-white/5

    p-6
  "
>
  <h2 className="text-2xl font-bold mb-4">
    💬 Ask MemoFlow AI
  </h2>

  <p className="text-sm text-slate-500 mb-4">
    Ask questions about memo trends,
    companies, purposes, and communication patterns.
  </p>

  <textarea
    value={question}
    onChange={(e) =>
      setQuestion(e.target.value)
    }
    placeholder="Which company receives the most memos?"
    className="
      w-full
      h-32

      rounded-2xl

      border
      border-slate-200

      p-4

      bg-white

      focus:outline-none
      focus:ring-2
      focus:ring-indigo-500
    "
  />

  <div className="flex flex-wrap gap-2 mt-3">
    <button
      onClick={() =>
        setQuestion(
          "Which company receives the most memos?"
        )
      }
      className="px-3 py-2 rounded-xl bg-indigo-50"
    >
      Top Company
    </button>

    <button
      onClick={() =>
        setQuestion(
          "What was the busiest month?"
        )
      }
      className="px-3 py-2 rounded-xl bg-indigo-50"
    >
      Busiest Month
    </button>

    <button
      onClick={() =>
        setQuestion(
          "Summarize 2026 activity"
        )
      }
      className="px-3 py-2 rounded-xl bg-indigo-50"
    >
      Summary
    </button>
  </div>

  <button
    onClick={() =>
      setAnswer(
        "This is a demo AI response. Connect Gemini later to analyze real memo data."
      )
    }
    className="
      mt-4

      px-6
      py-3

      rounded-2xl

      bg-indigo-600
      hover:bg-indigo-700

      text-white
      font-semibold
    "
  >
    Ask AI
  </button>

  {answer && (
    <div
      className="
        mt-5

        rounded-2xl

        bg-slate-50
        dark:bg-white/5

        p-5

        border
        border-slate-200
      "
    >
      <h3 className="font-semibold mb-2">
        AI Response
      </h3>

      <p>{answer}</p>
    </div>
  )}
</motion.div>
  </div>
</Layout>


);
}


