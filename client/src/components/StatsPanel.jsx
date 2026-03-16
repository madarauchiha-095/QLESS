import { Users, CheckCircle, Clock, Activity } from 'lucide-react';

const StatsPanel = ({ stats }) => {
  const statItems = [
    {
      icon: Activity,
      label: 'Current Token',
      value: stats?.current_token ? `#${stats.current_token.token_number}` : 'None',
      color: 'text-teal',
      bgColor: 'bg-teal/20',
    },
    {
      icon: Users,
      label: 'Waiting',
      value: stats?.waiting_list?.length || 0,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats?.completed_count || 0,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      icon: Clock,
      label: 'Total Today',
      value: stats?.total_count || 0,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="glass p-4 rounded-xl">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bgColor} mb-3`}>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsPanel;
