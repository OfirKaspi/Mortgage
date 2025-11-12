"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

function SavingsGraph() {
  const minSavings = 80000;
  const maxSavings = 150000;
  const avgSavings = 115000;
  const withoutConsultation = 20000;

  // Prepare data showing savings over time periods or comparison points
  const chartData = [
    { period: "שנה 1", withoutConsultation: withoutConsultation, withConsultation: minSavings },
    { period: "שנה 5", withoutConsultation: withoutConsultation * 1.1, withConsultation: avgSavings * 0.7 },
    { period: "שנה 10", withoutConsultation: withoutConsultation * 1.2, withConsultation: avgSavings * 0.85 },
    { period: "שנה 15", withoutConsultation: withoutConsultation * 1.3, withConsultation: avgSavings },
    { period: "שנה 20", withoutConsultation: withoutConsultation * 1.4, withConsultation: avgSavings * 1.1 },
    { period: "שנה 25", withoutConsultation: withoutConsultation * 1.5, withConsultation: maxSavings },
  ];

  // Custom tooltip - mobile friendly with better visibility
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string; payload: { period: string } }> }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-2xl border-2 border-white/60 text-base md:text-lg">
        <p className="font-bold text-foreground mb-4 text-lg md:text-xl">{payload[0]?.payload?.period || ""}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 mb-3">
            <div
              className="w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: entry.color }}
            />
            <p className="font-bold text-foreground text-base md:text-lg">
              {entry.name === "withoutConsultation" ? "ללא ייעוץ" : "עם ייעוץ שלנו"}:
            </p>
            <p className="font-bold text-foreground text-xl md:text-2xl">
              {entry.value.toLocaleString("he-IL")}₪
            </p>
          </div>
        ))}
        {payload.length === 2 && (
          <p className="text-lg md:text-xl font-bold text-primary-foreground mt-4 pt-4 border-t-2 border-gray-200">
            הבדל: {(payload[1].value - payload[0].value).toLocaleString("he-IL")}₪
          </p>
        )}
      </div>
    );
  };

  // Color definitions - aligned with white/primary background theme
  const withoutColor = "rgba(255, 200, 200, 0.9)"; // Light red/pink - visible on primary background
  const withColor = "rgba(255, 255, 255, 1)"; // White - high contrast on primary background

  // Bar chart data for mobile (towers graph) - using same data constants
  const barChartData = [
    { name: "ללא ייעוץ", value: withoutConsultation, color: withoutColor },
    { name: "עם ייעוץ שלנו", value: maxSavings, color: withColor, min: minSavings, max: maxSavings },
  ];

  // Custom tooltip for bar chart
  const BarTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { name: string; min?: number; max?: number } }> }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;
    return (
      <div className="bg-white backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-2xl border-2 border-white/60 text-base">
        <p className="font-bold text-foreground mb-3 text-lg">{data.name}</p>
        {data.min && data.max ? (
          <>
            <p className="font-bold text-foreground text-xl">
              ממוצע: {payload[0].value.toLocaleString("he-IL")}₪
            </p>
            <p className="text-sm text-foreground mt-2">
              טווח: {data.min.toLocaleString("he-IL")} - {data.max.toLocaleString("he-IL")} ₪
            </p>
          </>
        ) : (
          <p className="font-bold text-foreground text-xl">
            {payload[0].value.toLocaleString("he-IL")}₪
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-2 md:my-4">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2 md:p-3 lg:p-4 border-2 border-white/40 shadow-xl">
        {/* Mobile Bar Chart (Towers) - visible on mobile only */}
        <div className="block md:hidden h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barChartData}
              margin={{ top: 10, right: -5, left: -5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="rgba(255, 255, 255, 1)"
                tick={{
                  fill: "rgba(255, 255, 255, 1)",
                  fontSize: 13,
                  fontWeight: 700
                }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.7)", strokeWidth: 2 }}
                tickMargin={2}
              />
              <YAxis
                domain={[0, 150000]}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                stroke="rgba(255, 255, 255, 1)"
                tick={{
                  fill: "rgba(255, 255, 255, 1)",
                  fontSize: 11,
                  fontWeight: 700
                }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.7)", strokeWidth: 2 }}
                width={35}
                tickMargin={2}
              />
              <Tooltip content={<BarTooltip />} />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                animationDuration={1500}
              >
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Desktop Line Chart - visible on desktop only */}
        <div className="hidden md:block h-80 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: -5,
                left: -15,
                bottom: 5
              }}
            >
              <defs>
                <linearGradient id="withConsultationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={withColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={withColor} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="withoutConsultationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={withoutColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={withoutColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.3)"
                vertical={false}
              />
              <XAxis
                dataKey="period"
                stroke="rgba(255, 255, 255, 1)"
                tick={{
                  fill: "rgba(255, 255, 255, 1)",
                  fontSize: 15,
                  fontWeight: 700
                }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.7)", strokeWidth: 2 }}
                tickMargin={5}
              />
              <YAxis
                domain={[0, 150000]}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                stroke="rgba(255, 255, 255, 1)"
                tick={{
                  fill: "rgba(255, 255, 255, 1)",
                  fontSize: 13,
                  fontWeight: 700
                }}
                axisLine={{ stroke: "rgba(255, 255, 255, 0.7)", strokeWidth: 2 }}
                width={50}
                tickMargin={3}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: "15px",
                  fontSize: "15px"
                }}
                iconType="line"
                iconSize={20}
                formatter={(value) => (
                  <span
                    className="text-base md:text-lg font-bold"
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)",
                      fontWeight: 700
                    }}
                  >
                    {value === "withoutConsultation" ? "ללא ייעוץ" : "עם ייעוץ שלנו"}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="withoutConsultation"
                name="withoutConsultation"
                stroke={withoutColor}
                strokeWidth={4}
                dot={{ fill: withoutColor, r: 5, strokeWidth: 3, stroke: "rgba(255, 255, 255, 0.8)" }}
                activeDot={{ r: 7, strokeWidth: 3, stroke: "rgba(255, 255, 255, 1)" }}
                strokeDasharray="6 6"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="withConsultation"
                name="withConsultation"
                stroke={withColor}
                strokeWidth={5}
                dot={{ fill: withColor, r: 6, strokeWidth: 3, stroke: "rgba(0, 0, 0, 0.2)" }}
                activeDot={{ r: 8, strokeWidth: 3, stroke: "rgba(0, 0, 0, 0.3)" }}
                animationDuration={1500}
                animationBegin={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function TrustSection() {
  const benefits = [
    {
      title: "מעל 5 שנים של ניסיון ייעוצי",
      description:
        "הצלנו לקוחות במצבי חילוץ קיצוניים וסייענו לאלפי משפחות למצוא את הפתרון הנכון",
    },
    {
      title: "ייעוץ 1 על 1 וליווי צמוד",
      description:
        "אתם הלקוח היחיד בחדר, לא מספר במערכת. ליווי אישי מקצועי לכל אורך התהליך",
    },
    {
      title: "מומחיות מוכחת באישור משכנתאות",
      description:
        "אישרנו משכנתאות במקרים שהבנק כבר אמר 'לא'. הניסיון שלנו עושה את ההבדל",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            למה לבחור בנו?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            אנחנו לא רק יועצי משכנתאות - אנחנו השותפים שלכם להצלחה פיננסית
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dudwjf2pu/image/upload/v1762967365/BishvilHamashkanta/freepik__adjust__47782_fwmkup.png"
                  alt="Trust Icon"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Numbers */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl text-center shadow-2xl p-10 md:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary-foreground">
              חסכנו ללקוחותינו בממוצע
            </h3>
            <div className="mb-6">
              <p className="text-5xl md:text-6xl font-bold mb-2 text-primary-foreground">
                80,000₪ עד 150,000₪
              </p>
            </div>

            {/* Savings Comparison Graph */}
            <SavingsGraph />

            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground max-w-3xl mx-auto mt-8 leading-relaxed drop-shadow-sm">
              לאורך חיי המשכנתא - זה ההבדל בין ייעוץ מקצועי לבין בחירה אקראית
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

