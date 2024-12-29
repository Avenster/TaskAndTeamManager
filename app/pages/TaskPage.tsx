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
} from "~/components/ui/alert-dialog"

const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
  });
  const [taskToComplete, setTaskToComplete] = useState(null);
 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Task to create:", taskForm);
  //   setShowCreateTask(false);
  //   setTaskForm({
  //     title: "",
  //     description: "",
  //     dueDate: "",
  //     priority: "medium",
  //     status: "todo",
  //   });
  // };

  // const getPriorityColor = (priority) => {
  //   switch (priority) {
  //     case "high":
  //       return "text-cyan-500";
  //     case "medium":
  //       return "text-blue-400";
  //     case "low":
  //       return "text-cyan-300";
  //     default:
  //       return "text-cyan-500";
  //   }
  // };

  const statCards = [
    {
      label: "Total Tasks",
      value: "12",
      icon: CheckCircle,
      trend: "+2 this week",
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "In Progress",
      value: "5",
      icon: Clock3,
      trend: "3 due today",
      color: "from-blue-400 to-cyan-400",
    },
    {
      label: "High Priority",
      value: "3",
      icon: AlertCircle,
      trend: "1 overdue",
      color: "from-cyan-500 to-blue-400",
    },
  ];

  const tasks = [
    {
      title: "Update Documentation",
      description: "Review and update API documentation for new features",
      priority: "high",
      dueDate: "Tomorrow",
      progress: 75,
    },
    {
      title: "Fix Login Issues",
      description: "Investigate and resolve user authentication bugs",
      priority: "medium",
      dueDate: "Next Week",
      progress: 30,
    },
    {
      title: "Design Review",
      description: "Review new UI components with the design team",
      priority: "low",
      dueDate: "In 2 Days",
      progress: 90,
    },
  ];

  const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      text: "Review project proposal",
      dueDate: "2024-01-05",
      priority: "high",
      reminder: true,
    },
    {
      id: 2,
      text: "Schedule team meeting",
      dueDate: "2024-01-07",
      priority: "medium",
      reminder: true
    },
    {
      id: 3,
      text: "Update sprint board",
      dueDate: "2024-01-06",
      priority: "low",
      reminder: true
    },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    {
      id: 4,
      text: "Send client report",
      dueDate: "2024-01-03",
      priority: "high",
      completedDate: "2024-01-03",
      reminder: true
    },
    {
      id: 5,
      text: "Update documentation",
      dueDate: "2024-01-02",
      priority: "medium",
      completedDate: "2024-01-02",
      reminder: true
    },
  ]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new task object
    const newTask = {
      id: Date.now(), // Simple way to generate unique id
      text: taskForm.title,
      description: taskForm.description,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority,
      reminder: taskForm.reminder
    };

    // Add to todoTasks
    setTodoTasks(prev => [newTask, ...prev]);

    // Reset form and close
    setTaskForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      reminder: false
    });
    setShowCreateTask(false);
  };

  // Add this helper function for priority colors (reuse existing one or add if missing)
  const getPriorityColor = (priority) => {
    switch (priority) {
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
    const taskToComplete = todoTasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      // Move task from todo to completed
      setTodoTasks(todoTasks.filter((task) => task.id !== taskId));
      setCompletedTasks([
        ...completedTasks,
        { ...taskToComplete, completedDate: new Date() },
      ]);
    }
  };

  const handleUncompleteTask = (taskId) => {
    const taskToUncomplete = completedTasks.find((task) => task.id === taskId);
    if (taskToUncomplete) {
      // Move task back to todo
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
      setTodoTasks([...todoTasks, { ...taskToUncomplete }]);
    }
  };

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
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Task Management
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Organize, track, and conquer your tasks with our powerful
              management tools. Stay on top of deadlines and collaborate
              efficiently. 🎯
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
                    style={{ width: "60%" }}
                  />
                </div>
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
            <span>Create New Task</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Todo Tasks */}
          <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-cyan-500 mr-2" />
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Tasks To Do
                  </h3>
                </div>
                <span className="text-sm text-gray-400">
                  {todoTasks.length} tasks
                </span>
              </div>
              <div className="space-y-3">
                {todoTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center space-x-3 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all"
                  >
                    <button
                      onClick={() => setTaskToComplete(task)}
                      className="w-5 h-5 border-2 border-cyan-500/50 rounded flex items-center justify-center hover:bg-cyan-500/10 transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 text-transparent group-hover:text-cyan-500/50" />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-300 group-hover:text-white transition-colors">
                          {task.text}
                        </p>
                        <span
                          className={`text-sm ${getPriorityColor(
                            task.priority
                          )} flex items-center`}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Due: {task.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-cyan-500 mr-2" />
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Completed Tasks
                  </h3>
                </div>
                <span className="text-sm text-gray-400">
                  {completedTasks.length} completed
                </span>
              </div>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center space-x-3 p-3 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-all bg-cyan-500/5"
                  >
                    <div className="w-5 h-5 border-2 border-cyan-500 rounded flex items-center justify-center bg-cyan-500/10">
                      <CheckCircle className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 ">{task.text}</p>
                        <span
                          className={`text-sm ${getPriorityColor(
                            task.priority
                          )} flex items-center opacity-50`}
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {task.dueDate}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed: {task.completedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Enhanced Confirmation Dialog */}
          {/* Enhanced Confirmation Dialog */}
<AlertDialog 
  open={taskToComplete !== null} 
  onOpenChange={() => setTaskToComplete(null)}
>
  {taskToComplete && (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
      <AlertDialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border border-white/10 bg-black/95 shadow-xl max-w-md w-full rounded-xl z-50">
        {/* Gradient blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl" />
        
        {/* Content with relative positioning */}
        <div className="relative">
          <AlertDialogHeader className="space-y-4">
            {/* Cool icon header */}
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                <Sparkles className="w-5 h-5 text-cyan-500" />
              </div>
              <AlertDialogTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Complete This Task?
              </AlertDialogTitle>
            </div>

            <AlertDialogDescription className="space-y-4">
              {/* Task preview card */}
              <div className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">{taskToComplete?.text}</span>
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

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300 rounded-lg transition-all duration-200">
              Nah, keep it pending
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center space-x-2"
              onClick={() => {
                const completedTask = {
                  ...taskToComplete,
                  completedDate: new Date().toISOString().split('T')[0]
                };
                setCompletedTasks([completedTask, ...completedTasks]);
                setTodoTasks(todoTasks.filter(t => t.id !== taskToComplete.id));
                setTaskToComplete(null);
              }}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Yes, mark as done!</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </>
  )}
</AlertDialog>

        </div>

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
                  <span
                    className={`${getPriorityColor(
                      task.priority
                    )} flex items-center`}
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
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
