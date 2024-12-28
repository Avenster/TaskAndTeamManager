import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  BarChart2,
  TrendingUp,
  Users,
  Clock,
  Calendar,
  RefreshCcw,
  ChevronDown,
  Target,
  PieChart as PieChartIcon,
  Activity,
  MoreVertical
} from 'lucide-react';
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  // Sample data for charts
  const performanceData = [
    { date: 'Mon', completed: 45, inProgress: 32, newTasks: 12 },
    { date: 'Tue', completed: 55, inProgress: 28, newTasks: 15 },
    { date: 'Wed', completed: 38, inProgress: 35, newTasks: 10 },
    { date: 'Thu', completed: 62, inProgress: 25, newTasks: 18 },
    { date: 'Fri', completed: 51, inProgress: 30, newTasks: 14 },
    { date: 'Sat', completed: 42, inProgress: 28, newTasks: 8 },
    { date: 'Sun', completed: 35, inProgress: 22, newTasks: 6 }
  ];

  const productivityData = [
    { name: 'Week 1', productivity: 85 },
    { name: 'Week 2', productivity: 92 },
    { name: 'Week 3', productivity: 88 },
    { name: 'Week 4', productivity: 95 }
  ];

  const teamPerformanceData = [
    { name: 'Development', completed: 85, total: 100 },
    { name: 'Design', completed: 75, total: 100 },
    { name: 'Marketing', completed: 92, total: 100 },
    { name: 'Sales', completed: 88, total: 100 }
  ];

  const timeDistributionData = [
    { name: 'Development', value: 35 },
    { name: 'Meetings', value: 20 },
    { name: 'Planning', value: 15 },
    { name: 'Research', value: 30 }
  ];
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const statCards = [
    {
      label: 'Total Tasks',
      value: '245',
      trend: '+12.5%',
      isPositive: true,
      icon: Target,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Team Productivity',
      value: '89%',
      trend: '+5.2%',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Active Members',
      value: '18',
      trend: '-2.1%',
      isPositive: false,
      icon: Users,
      color: 'from-cyan-500 to-blue-400'
    },
    {
      label: 'Completion Rate',
      value: '94.2%',
      trend: '+3.1%',
      isPositive: true,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-white/10 rounded-lg p-3">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 h-full overflow-auto scrollbar-custom">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm mb-8">
        <Home className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">/</span>
        <span className="text-gray-400 hover:text-cyan-500 cursor-pointer transition-colors">Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-medium">
          Analytics
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Analytics Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Track your team's performance metrics, analyze trends, and make data-driven decisions.
              Optimize workflow and boost productivity. 📊
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-black border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Calendar className="w-4 h-4 text-gray-400 group-hover:text-cyan-500" />
              <span className="text-gray-400 group-hover:text-cyan-500">{timeRange}</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-cyan-500" />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <RefreshCcw className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Download className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400">{stat.label}</p>
                <stat.icon className="w-8 h-8 text-cyan-500/30 group-hover:text-cyan-500/50 transition-colors" />
              </div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                {stat.isPositive ? (
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={stat.isPositive ? 'text-green-500' : 'text-red-500'}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Task Performance Chart */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Task Performance</h2>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#22d3ee" 
                  fill="url(#completedGradient)"
                />
                <Area 
                  type="monotone" 
                  dataKey="inProgress" 
                  stroke="#60a5fa" 
                  fill="url(#completedGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance Chart */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Team Performance</h2>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="completed" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Trend */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Productivity Trend</h2>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Filter className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="productivity" 
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={{ fill: '#22d3ee', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Time Distribution</h2>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Clock className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#22d3ee"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeDistributionData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#22d3ee', '#60a5fa', '#818cf8', '#4f46e5'][index % 4]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  content={({ payload }) => (
                    <div className="flex justify-center space-x-4">
                      {payload.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-gray-400 text-sm">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Summary */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Summary</h3>
          <div className="space-y-4">
            {[
              { label: 'Tasks Completed', value: 45, increase: true, percent: '12%' },
              { label: 'Hours Logged', value: 128, increase: true, percent: '8%' },
              { label: 'Team Velocity', value: '24.5', increase: false, percent: '3%' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400">{metric.label}</p>
                  <p className="text-xl font-semibold text-white">{metric.value}</p>
                </div>
                <div className="flex items-center">
                  {metric.increase ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.increase ? 'text-green-500' : 'text-red-500'}>
                    {metric.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <h3 className="text-lg font-semibold text-white mb-4">Active Projects</h3>
          <div className="space-y-4">
            {[
              { name: 'Website Redesign', progress: 75, color: 'from-cyan-500 to-blue-500' },
              { name: 'Mobile App', progress: 45, color: 'from-blue-400 to-cyan-400' },
              { name: 'Marketing Campaign', progress: 90, color: 'from-cyan-500 to-blue-400' }
            ].map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{project.name}</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Updates</h3>
          <div className="space-y-4">
            {[
              { 
                title: 'Performance Review',
                description: 'Team productivity increased by 15%',
                time: '2 hours ago',
                icon: TrendingUp
              },
              { 
                title: 'New Milestone',
                description: 'Project Alpha reached 75% completion',
                time: '5 hours ago',
                icon: Target
              },
              { 
                title: 'Team Update',
                description: '3 new members joined the project',
                time: '1 day ago',
                icon: Users
              }
            ].map((update, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
                  <update.icon className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-white font-medium">{update.title}</p>
                  <p className="text-gray-400 text-sm">{update.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;