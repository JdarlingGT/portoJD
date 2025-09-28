interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricCard({ value, label, className = "" }: MetricCardProps) {
  return (
    <div className={`text-center ${className}`} data-testid={`metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
