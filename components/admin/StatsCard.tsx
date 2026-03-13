import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
}: StatsCardProps) {
  const changeColor = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-gray-400",
  }[changeType];

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-text mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <p className={`text-xs ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
}
