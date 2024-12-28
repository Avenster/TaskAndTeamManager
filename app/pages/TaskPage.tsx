import React, { useState } from 'react';
import { 
  Calendar, Clock, Tag, Plus, ArrowRight, CheckCircle, Clock3, 
  AlertCircle, Sparkles, List, Filter, Search, Zap, Home,Edit,Trash2
} from 'lucide-react';

const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Task to create:', taskForm);
    setShowCreateTask(false);
    setTaskForm({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'todo'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-cyan-500';
      case 'medium':
        return 'text-blue-400';
      case 'low':
        return 'text-cyan-300';
      default:
        return 'text-cyan-500';
    }
  };

  const statCards = [
    { 
      label: 'Total Tasks', 
      value: '12', 
      icon: CheckCircle,
      trend: '+2 this week',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      label: 'In Progress', 
      value: '5', 
      icon: Clock3,
      trend: '3 due today',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      label: 'High Priority', 
      value: '3', 
      icon: AlertCircle,
      trend: '1 overdue',
      color: 'from-cyan-500 to-blue-400'
    }
  ];

  const tasks = [
    { 
      title: 'Update Documentation', 
      description: 'Review and update API documentation for new features', 
      priority: 'high', 
      dueDate: 'Tomorrow',
      progress: 75
    },
    { 
      title: 'Fix Login Issues', 
      description: 'Investigate and resolve user authentication bugs', 
      priority: 'medium', 
      dueDate: 'Next Week',
      progress: 30
    },
    { 
      title: 'Design Review', 
      description: 'Review new UI components with the design team', 
      priority: 'low', 
      dueDate: 'In 2 Days',  
      progress: 90
    }
  ];

  return (
    <div className="p-6 h-full overflow-auto scrollbar-custom">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm mb-8">
        <Home className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">/</span>
        <span className="text-gray-400 hover:text-cyan-500 cursor-pointer transition-colors">Dashboard</span>
        <span className="text-gray-400">/</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-medium">
          Tasks
        </span>
      </div>

      {/* Hero Section with Enhanced Gradient Border */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Task Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Task Management
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Organize, track, and conquer your tasks with our powerful management tools. 
              Stay on top of deadlines and collaborate efficiently. 🎯
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Search className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Filter className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
            <button 
              className={`p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group ${
                viewType === 'grid' ? 'border-cyan-500/50' : ''
              }`}
              onClick={() => setViewType('grid')}
            >
              <List className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {/* Progress indicator */}
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

        {/* Create Task Button or Form */}
        {!showCreateTask ? (
          <button
            onClick={() => setShowCreateTask(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Task</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <Zap className="w-5 h-5 text-cyan-500 mr-2" />
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  Create New Task
                </h2>
              </div>
              
              {/* Your existing form code remains the same */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... form fields ... */}
              </form>
            </div>
          </div>
        )}

        {/* Enhanced Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <div 
              key={index}
              className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 transition-all">
                  {task.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{task.description}</p>
                
                {/* Progress bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className={`${getPriorityColor(task.priority)} flex items-center`}>
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {task.dueDate}
                  </span>
                </div>

                {/* Quick actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button className="p-1 hover:text-cyan-500 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:text-cyan-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;