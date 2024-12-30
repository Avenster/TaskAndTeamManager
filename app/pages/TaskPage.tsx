import React, { useState } from 'react';
import { Calendar, Clock, Tag, Plus, ArrowRight, CheckCircle, Clock3, AlertCircle, Sparkles, List, Filter, Search, Zap, Home, Edit, Trash2, X, Bell } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";


const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    reminder: false,
    categories: [],
    labels: []
  });
  const [taskToComplete, setTaskToComplete] = useState(null);

  // Combined tasks state for better synchronization
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Review project proposal",
        description: "Review and provide feedback on the new project proposal",
        dueDate: "2024-01-05",
        priority: "high",
        reminder: true,
        progress: 0
      },
      {
        id: 2,
        title: "Schedule team meeting",
        description: "Set up weekly team sync meeting",
        dueDate: "2024-01-07",
        priority: "medium",
        reminder: true,
        progress: 0
      }
    ],
    inProgress: [
      {
        id: 3,
        title: "Update Documentation",
        description: "Review and update API documentation for new features",
        priority: "high",
        dueDate: "2024-01-06",
        reminder: true,
        progress: 75
      },
      {
        id: 4,
        title: "Fix Login Issues",
        description: "Investigate and resolve user authentication bugs",
        priority: "medium",
        dueDate: "2024-01-08",
        progress: 30
      }
    ],
    completed: [
      {
        id: 5,
        title: "Send client report",
        description: "Prepare and send monthly progress report",
        dueDate: "2024-01-03",
        priority: "high",
        completedDate: "2024-01-03",
        progress: 100
      }
    ]
  });

  const statCards = [
    {
      label: "Total Tasks",
      value: Object.values(tasks).flat().length,
      icon: CheckCircle,
      trend: `${tasks.completed.length} completed`,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "In Progress",
      value: tasks.inProgress.length,
      icon: Clock3,
      trend: "Active tasks",
      color: "from-blue-400 to-cyan-400",
    },
    {
      label: "To Do",
      value: tasks.todo.length,
      icon: AlertCircle,
      trend: "Pending tasks",
      color: "from-cyan-500 to-blue-400",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const [categories] = useState([
    'Work',
    'Personal',
    'Design',
    'Development',
    'Bug Fix',
    'Feature',
    'Documentation',
    'Meeting',
    'Other'

  ]);
  const handleCategorySelect = (category) => {
    setTaskForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category) // Remove if already selected
        : [...prev.categories, category]              // Add if not selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: Date.now(),
      title: taskForm.title,
      description: taskForm.description,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority,
      reminder: taskForm.reminder,
      categories: taskForm.categories, // Add this line
      progress: 0
    };
  
    setTasks(prev => ({
      ...prev,
      todo: [newTask, ...prev.todo]
    }));
  
    // Reset form
    setTaskForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      reminder: false,
      categories: [], // Reset categories
      labels: []
    });
    setShowCreateTask(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-cyan-500";
      case "low":
        return "text-green-500";
      default:
        return "text-cyan-500";
    }
  };

  const handleCompleteTask = (taskId) => {
    const taskToMove = tasks.todo.find(task => task.id === taskId) || 
                      tasks.inProgress.find(task => task.id === taskId);
    
    if (taskToMove) {
      const updatedTask = {
        ...taskToMove,
        completedDate: new Date().toISOString().split('T')[0],
        progress: 100
      };

      setTasks(prev => ({
        todo: prev.todo.filter(task => task.id !== taskId),
        inProgress: prev.inProgress.filter(task => task.id !== taskId),
        completed: [updatedTask, ...prev.completed]
      }));
    }
  };
  const CategoryTags = ({ categories }) => {
    if (!categories?.length) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {categories.map(category => (
          <span
            key={category}
            className="px-2 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          >
            {category}
          </span>
        ))}
      </div>
    );
  };

  const renderTaskCard = (task, status) => (
    <div
      key={task.id}
      className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 
      hover:border-cyan-500/50  transition-all duration-500 relative overflow-hidden 
      group h-full hover:shadow-xl hover:shadow-cyan-500/20"
    >
      {/* Enhanced blur gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
        opacity-10 group-hover:opacity-100 transition-all duration-500 blur-7xl" />
      
      {/* Stronger glassmorphism effect on hover */}
      <div className="absolute inset-0 backdrop-blur-7xl bg-black/90 opacity-0
        group-hover:opacity-90 transition-all duration-500" />
  
      <div className="relative h-full flex flex-col">
        {/* Title section with enhanced glow effect */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white 
            group-hover:text-transparent group-hover:bg-clip-text 
            group-hover:bg-gradient-to-r group-hover:from-cyan-400 
            group-hover:to-blue-400 transition-all duration-500
            group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            {task.title}
          </h3>
          {task.reminder && (
            <Bell className="w-5 h-5 text-cyan-400 hover:text-cyan-300 transition-colors" />
          )}
        </div>
        
  
        {/* Description with improved contrast */}
        <p className="text-gray-400 text-sm mb-6 flex-grow font-medium
          group-hover:text-gray-300 transition-colors duration-300">
          {task.description}
        </p>
        
        
  
        <div className="space-y-5">
          {/* Enhanced progress bar with cleaner gradient */}
          <div className="w-full h-2 bg-gray-800/50 rounded-full overflow-hidden 
            backdrop-blur-xl p-0.5 group-hover:bg-gray-800/70 transition-colors">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 
              rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <CategoryTags categories={task.categories} />
  
          {/* Status section with enhanced blur effects */}
          <div className="flex items-center justify-between text-sm">
            <span className={`${getPriorityColor(task.priority)} flex items-center 
              px-3 py-1 rounded-full bg-black/20 backdrop-blur-xl
              group-hover:bg-black/30 transition-all duration-300`}>
              <AlertCircle className="w-4 h-4 mr-2" />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="text-gray-400 flex items-center backdrop-blur-xl
              group-hover:text-cyan-400/80 transition-colors duration-300">
              {/* <Clock className="w-4 h-4 mr-2" /> */}
              {status === 'completed' ? `Completed: ${task.completedDate}` : `Due: ${task.dueDate}`}
            </span>
          </div>
          
        </div>
  
        {/* Action buttons with enhanced hover effects */}
        {status !== 'completed' && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
            transition-all duration-300 flex space-x-2 backdrop-blur-2xl 
            bg-black/30 rounded-full p-1.5">
            <button 
              onClick={() => setTaskToComplete(task)}
              className="p-1.5 hover:text-cyan-400 transition-all duration-300 
                hover:scale-110 transform hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 hover:text-blue-400 transition-all duration-300 
                hover:scale-110 transform hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 hover:text-red-400 transition-all duration-300 
                hover:scale-110 transform"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        
      
      </div>
    </div>
  );


  return (
    <div className="p-6 h-full overflow-auto scrollbar-custom">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm mb-8">
        <Home className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400">/</span>
        <span className="text-gray-400 hover:text-cyan-500 cursor-pointer transition-colors">
          Dashboard
        </span>
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
              <span className="text-sm font-medium text-cyan-500">
                Task Central
              </span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-3">
              Task Management
            </h1>
            <p className="text-gray-400 text-base max-w-2xl">
              Organize, track, and conquer your tasks with our powerful
              management tools. Stay on top of deadlines and collaborate
              efficiently. 🎯
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Search className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group">
              <Filter className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
            </button>
            <button
              className={`p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group ${
                viewType === "grid" ? "border-cyan-500/50" : ""
              }`}
              onClick={() => setViewType("grid")}
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
            <div
              key={index}
              className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <stat.icon className="w-8 h-8 text-cyan-500/30 group-hover:text-cyan-500/50 transition-colors" />
                </div>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-2">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {!showCreateTask ? (
          <button
            onClick={() => setShowCreateTask(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create New Task</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Create New Task
                  </h2>
                </div>
                <button 
                  onClick={() => setShowCreateTask(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Task Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Task Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={taskForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="Enter task name"
                  />
                </div>
                <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-400 mb-2">
      Categories
    </label>
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <button
          key={category}
          type="button" // Important: Add this to prevent form submission
          onClick={() => handleCategorySelect(category)}
          className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
            taskForm.categories.includes(category)
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
              : 'bg-black/30 text-gray-400 border border-white/10 hover:border-cyan-500/50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
 

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={taskForm.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    placeholder="Enter task description"
                  />
                </div>
                

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskForm.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* Reminder Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="reminder"
                    id="reminder"
                    checked={taskForm.reminder}
                    onChange={handleInputChange}
                    className="w-4 h-4 border-2 border-white/10 rounded focus:ring-cyan-500 bg-black text-cyan-500"
                  />
                  <label htmlFor="reminder" className="text-sm text-gray-400 flex items-center">
                    <Bell className="w-4 h-4 mr-1 text-cyan-500" />
                    Enable Reminders
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateTask(false)}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task Lists Section */}
        <div className="grid grid-cols-1 gap-8 mt-8">
          {/* Todo Tasks */}
          <section>
          <div className="flex items-center mb-6">
            <Tag className="w-5 h-5 text-cyan-500 mr-2" />
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              To Do
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.todo.map(task => renderTaskCard(task, 'todo'))}
          </div>
        </section>
          {/* Completed Tasks */}
          <section>
            <div className="flex items-center mb-6">
              <Clock3 className="w-5 h-5 text-cyan-500 mr-2" />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                In Progress
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.inProgress.map(task => renderTaskCard(task, 'inProgress'))}
            </div>
          </section>
          <section>
          <div className="flex items-center mb-6">
              <CheckCircle className="w-5 h-5 text-cyan-500 mr-2" />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Completed
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.completed.map(task => renderTaskCard(task, 'completed'))}
            </div>
          </section>

          {/* Enhanced Confirmation Dialog */}
          {/* Enhanced Confirmation Dialog */}
          </div>

    </div>
    <AlertDialog 
        open={taskToComplete !== null} 
        onOpenChange={() => setTaskToComplete(null)}
      >
        {taskToComplete && (
          <>
            <div className="fixed inset-0 bg-white/10 backdrop-blur-m" aria-hidden="true" />
            <AlertDialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border border-white/10 bg-black/90 shadow-xl max-w-md w-full rounded-xl z-50">
              <div className="absolute inset-0 blur-xl" />
              
              <div className="relative">
                <AlertDialogHeader className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                      <Sparkles className="w-5 h-5 text-cyan-500" />
                    </div>
                    <AlertDialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                      Complete This Task?
                    </AlertDialogTitle>
                  </div>

                  <AlertDialogDescription className="space-y-4">
                    <div className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">{taskToComplete.title}</span>
                        <span className={`text-sm ${getPriorityColor(taskToComplete.priority)} flex items-center`}>
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {taskToComplete.priority}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        Due: {taskToComplete.dueDate}
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm">
                      This task will be moved to your completed tasks list ✨
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 flex flex-row justify-between bg-yellow-900">
                  <AlertDialogCancel className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 rounded-lg transition-all duration-200">
                    Keep in progress
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center space-x-2"
                    onClick={() => {
                      handleCompleteTask(taskToComplete.id);
                      setTaskToComplete(null);
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete task</span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </>
        )}
      </AlertDialog>
    </div>
  )};

export default TaskPage;
