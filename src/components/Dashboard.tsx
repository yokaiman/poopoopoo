import React from 'react';
import { Activity, Rss, Brain, PenTool } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Active Automations"
          value="5"
          icon={<Activity className="text-blue-500" size={24} />}
        />
        <DashboardCard
          title="RSS Feeds"
          value="10"
          icon={<Rss className="text-green-500" size={24} />}
        />
        <DashboardCard
          title="LLM Integrations"
          value="3"
          icon={<Brain className="text-purple-500" size={24} />}
        />
        <DashboardCard
          title="Posts Generated"
          value="42"
          icon={<PenTool className="text-yellow-500" size={24} />}
        />
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default Dashboard;