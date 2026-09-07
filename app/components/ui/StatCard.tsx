import type { ReactNode } from "react";

export type StatCardTrend = "up" | "down" | "neutral";

export interface StatCardProps {
  /** Tiêu đề của chỉ số */
  label: string;
  /** Giá trị hiển thị (string hoặc number) */
  value: string | number;
  /** Mô tả phụ hoặc đơn vị */
  description?: string;
  /** Icon hiển thị bên phải label (React node) */
  icon?: ReactNode;
  /** Phần trăm thay đổi, ví dụ: "+12.5%" hoặc "-3.2%" */
  changePercent?: string;
  /** Chiều hướng thay đổi */
  trend?: StatCardTrend;
  /** Màu nhấn (Tailwind background class), mặc định "bg-indigo-500" */
  accentColor?: string;
}

const TrendArrow = ({ trend }: { trend: StatCardTrend }) => {
  if (trend === "up") {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 3L14 9H2L8 3Z" fill="currentColor" />
      </svg>
    );
  }
  if (trend === "down") {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13L2 7H14L8 13Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
    </svg>
  );
};

const trendColorMap: Record<StatCardTrend, string> = {
  up: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40",
  down: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40",
  neutral: "text-zinc-500 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800/40",
};

/**
 * StatCard – hiển thị một chỉ số (metric) trên dashboard.
 *
 * Server Component: không cần interactivity, render hoàn toàn trên server.
 *
 * @example
 * ```tsx
 * <StatCard
 *   label="Doanh thu"
 *   value="₫ 128.4M"
 *   description="Tháng này"
 *   changePercent="+12.5%"
 *   trend="up"
 *   icon={<RevenueIcon />}
 * />
 * ```
 */
export default function StatCard({
  label,
  value,
  description,
  icon,
  changePercent,
  trend = "neutral",
  accentColor = "bg-indigo-500",
}: StatCardProps) {
  const trendColors = trendColorMap[trend];

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Accent bar bên trái */}
      <span
        className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full ${accentColor}`}
        aria-hidden="true"
      />

      {/* Header: label + icon */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            {icon}
          </span>
        )}
      </div>

      {/* Giá trị chính */}
      <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {value}
      </p>

      {/* Footer: description + trend badge */}
      <div className="flex items-center justify-between gap-2">
        {description && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {description}
          </span>
        )}
        {changePercent && (
          <span
            className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${trendColors}`}
          >
            <TrendArrow trend={trend} />
            {changePercent}
          </span>
        )}
      </div>
    </article>
  );
}
