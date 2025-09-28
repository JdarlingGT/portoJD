export function formatMetric(value: number, unit?: string): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ""}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k${unit ? ` ${unit}` : ""}`;
  }
  return `${value}${unit ? ` ${unit}` : ""}`;
}

export function formatPercentage(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

export function formatDelta(baseline: number, value: number, unit?: string): string {
  const delta = ((value - baseline) / baseline) * 100;
  const sign = delta > 0 ? "+" : "";
  return `${sign}${Math.round(delta)}%`;
}

export function formatPeriod(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  
  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });
  
  if (startYear === endYear) {
    return `${startMonth} – ${endMonth} ${endYear}`;
  }
  
  return `${startMonth} ${startYear} – ${endMonth} ${endYear}`;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString();
}
