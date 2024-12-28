import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  MessageSquare,
  User,
  FileText,
  BarChart2,
  Calendar
} from 'lucide-react';

const ActivityLog = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample activity data
  const activities = [
    {
      id: 1,
      type: 'task',
      action: 'completed',
      title: 'Update Documentation',
      user: 'Sarah Chen',
      timestamp: '2 hours ago',
      avatar: 'SC',
      priority: 'high',
      description: 'Completed the API documentation update with new endpoints'
    },
    {
      id: 2,
      type: 'comment',
      action: 'added',
      title: 'Design Review Feedback',
      user: 'Mike Wilson',
      timestamp: '3 hours ago',
      avatar: 'MW',
      description: 'Added comments on the new UI components design'
    },
    {
      id: 3,
      type: 'task',
      action: 'created',
      title: 'Setup Development Environment',
      user: 'Alex Kumar',
      timestamp: '5 hours ago',
      avatar: 'AK',
      priority: 'medium',
      description: 'Created new task for environment setup'
    },
    {
      id: 4,
      type: 'meeting',
      action: 'scheduled',
      title: 'Team Sprint Planning',
      user: 'Jessica Park',
      timestamp: '1 day ago',
      avatar: 'JP',
      description: 'Scheduled sprint planning meeting for next week'
    },
    {
      id: 5,
      type: 'analytics',
      action: 'generated',
      title: 'Monthly Performance Report',
      user: 'David Smith',
      timestamp: '1 day ago',
      avatar: 'DS',
      description: 'Generated and shared the monthly team performance metrics'
    }
  ];

  const statCards = [
    {
      label: 'Total Activities',
      value: '156',
      trend: '+23 this week',
      icon: BarChart2,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Task Updates',
      value: '45',
      trend: '12 today',
      icon: CheckCircle,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Team Comments',
      value: '89',
      trend: '↑ 15% increase',
      icon: MessageSquare,
      color: 'from-cyan-500 to-blue-400'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'task':
        return CheckCircle;
      case 'comment':
        return MessageSquare;
      case 'meeting':
        return Calendar;
      case 'analytics':
        return BarChart2;
      default:
        return FileText;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'task':
        return 'text-cyan-500';
      case 'comment':
        return 'text-blue-400';
      case 'meeting':
        return 'text-cyan-400';
      case 'analytics':
        return 'text-blue-500';
      default:
        return 'text-cyan-500';
    }
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
          Activity Log
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Activity Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Activity Log
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Track all team activities, updates, and changes in real-time. 
              Stay informed about the latest developments and team collaboration. 📊
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-4 py-2 pl-10 text-gray-300 focus:border-cyan-500/50 transition-all outline-none w-64"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Filter className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-sm text-gray-400 mt-2">{stat.trend}</p>
              <div className="w-full h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        {activities.map((activity) => {
          const ActionIcon = getActionIcon(activity.type);
          return (
            <div 
              key={activity.id}
              className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium mr-4">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white">{activity.user}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className={getActivityColor(activity.type)}>{activity.action}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-400">{activity.timestamp}</span>
                    </div>
                    <ActionIcon className={`w-5 h-5 ${getActivityColor(activity.type)}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400 mt-1">{activity.description}</p>
                  {activity.priority && (
                    <div className="mt-3 flex items-center">
                      <AlertCircle className="w-4 h-4 text-cyan-500 mr-1" />
                      <span className="text-sm text-cyan-500 capitalize">{activity.priority} Priority</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLog;