import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'amber';
}

export default function StatsCard({ title, value, trend, icon: Icon, color = 'blue' }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{trend}</p>
      </div>
    </div>
  );
}