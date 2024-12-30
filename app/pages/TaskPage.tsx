import { useState } from 'react';
import {  Clock, Plus, ArrowRight, CheckCircle, Clock3, AlertCircle, 
  Sparkles, List, Filter, Search, Zap, Home, X, Bell, LayoutGrid } from "lucide-react";
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
import TaskTable from '~/components/TaskTable';


const TaskGrid = ({ tasks, onCompleteTask }) => {
  const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.completed];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allTasks.map(task => (
        <div key={task.id} className="group bg-black border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-full border border-white/10 bg-black checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500"
                onChange={() => onCompleteTask(task)}
              />
              <span className="text-xs text-gray-400">TASK-{task.id}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              task.priority === 'high' ? 'text-red-400 border border-red-400/20' :
              task.priority === 'medium' ? 'text-cyan-400 border border-cyan-400/20' :
              'text-green-400 border border-green-400/20'
            }`}>
              {task.priority}
            </span>
          </div>
          
          <h3 className="text-sm text-gray-300 mb-2">{task.title}</h3>
          <p className="text-xs text-gray-500 mb-3">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {task.categories?.map(category => (
              <span key={category} className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20">
                {category}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {task.dueDate}
            </div>
            <span className={`flex items-center space-x-1 ${
              task.progress === 100 ? 'text-green-400' :
              task.progress > 0 ? 'text-yellow-400' :
              'text-gray-400'
            }`}>
              <AlertCircle className="w-3 h-3" />
              <span>{task.progress === 100 ? 'Completed' : task.progress > 0 ? 'In Progress' : 'Todo'}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [viewType, setViewType] = useState("table");
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    status: "todo",
    reminder: false,
    categories: [],
  });
  const [taskToComplete, setTaskToComplete] = useState(null);

  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Review project proposal",
        description: "Review and provide feedback on the new project proposal",
        dueDate: "2024-01-05",
        priority: "high",
        reminder: true,
        progress: 0,
        categories: ["Documentation", "Review"]
      },
      {
        id: 2,
        title: "Schedule team meeting",
        description: "Set up weekly team sync meeting",
        dueDate: "2024-01-07",
        priority: "medium",
        reminder: true,
        progress: 0,
        categories: ["Meeting"]
      }
    ],
    inProgress: [
      {
        id: 3,
        title: "Update Documentation",
        description: "Review and update API documentation",
        priority: "high",
        dueDate: "2024-01-06",
        reminder: true,
        progress: 75,
        categories: ["Documentation"]
      },
      {
        id: 4,
        title: "Fix Login Issues",
        description: "Investigate and resolve user authentication bugs",
        priority: "medium",
        dueDate: "2024-01-08",
        progress: 30,
        categories: ["Bug Fix"]
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
        progress: 100,
        categories: ["Documentation"]
      }
    ]
  });

  const statCards = [
    {
      label: "Total Tasks",
      value: Object.values(tasks).flat().length,
      icon: CheckCircle,
      trend: `${tasks.completed.length} completed`,
    },
    {
      label: "In Progress",
      value: tasks.inProgress.length,
      icon: Clock3,
      trend: "Active tasks",
    },
    {
      label: "To Do",
      value: tasks.todo.length,
      icon: AlertCircle,
      trend: "Pending tasks",
    },
  ];

  const categories = [
    'Work',
    'Personal',
    'Design',
    'Development',
    'Bug Fix',
    'Feature',
    'Documentation',
    'Meeting',
    'Review'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategorySelect = (category) => {
    setTaskForm(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: Date.now(),
      ...taskForm,
      progress: 0
    };
  
    setTasks(prev => ({
      ...prev,
      todo: [newTask, ...prev.todo]
    }));
  
    setTaskForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      reminder: false,
      categories: [],
    });
    setShowCreateTask(false);
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

  return (
    <div className="px-6 py-3 h-full overflow-auto">
      <div className="flex items-center space-x-2 text-xs mb-8">
        <Home className="w-4 h-4 text-white/80" />
        <span className="text-white/80">/</span>
        <span className="text-cyan-500">Tasks</span>
      </div>

      <div className="relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-xl transition-all duration-500 group-hover:blur-2xl" />
        <div className="relative rounded-lg border border-white/10 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
              <Sparkles className="w-5 h-5 text-cyan-500" />
            </div>
            <h1 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Task Management
            </h1>
          </div>
          <p className="text-xs text-white/70">
            Manage and track your tasks efficiently with our advanced task management system
          </p>
        </div>
      </div>

      <div className="space-y-8">
         <div className="relative mb-8">
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button
            className={`p-2 border rounded-lg transition-all ${
              viewType === "table" ? "border-cyan-500/50" : "border-white/10 hover:border-cyan-500/50"
            }`}
            onClick={() => setViewType("table")}
          >
            <List className="w-4 h-4 text-gray-400" />
          </button>
          <button
            className={`p-2 border rounded-lg transition-all ${
              viewType === "grid" ? "border-cyan-500/50" : "border-white/10 hover:border-cyan-500/50"
            }`}
            onClick={() => setViewType("grid")}
          >
            <LayoutGrid className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="group bg-black border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/80">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-cyan-500/90" />
            </div>
            <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {stat.value}
            </p>
            <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
          </div>
        ))}
      </div>

        
        {viewType === "table" ? (
        <TaskTable tasks={tasks} onCompleteTask={setTaskToComplete} />
      ) : (
        <TaskGrid tasks={tasks} onCompleteTask={setTaskToComplete} />
      )}
        {!showCreateTask ? (
          <button
            onClick={() => setShowCreateTask(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span className='text-xs'>Create New Task</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="relative w-full max-w-2xl mx-4">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
          <div className="relative bg-black border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
                <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
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
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={taskForm.title}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={taskForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={taskForm.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={taskForm.priority}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-medium text-gray-400 mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${
                        taskForm.categories.includes(category)
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                          : 'bg-black text-gray-400 border border-white/10 hover:border-cyan-500/50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="reminder"
                  id="reminder"
                  checked={taskForm.reminder}
                  onChange={handleInputChange}
                  className="w-4 h-4 border-2 border-white/10 rounded focus:ring-cyan-500 bg-black text-cyan-500"
                />
                <label htmlFor="reminder" className="text-xs text-gray-400 flex items-center">
                  <Bell className="w-4 h-4 mr-1 text-cyan-500" />
                  Enable Reminders
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateTask(false)}
                  className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}


        <AlertDialog open={taskToComplete !== null} onOpenChange={() => setTaskToComplete(null)}>
          {taskToComplete && (
            <AlertDialogContent className="border border-white/10 bg-black/90 max-w-md w-full rounded-xl">
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
                  <div className="group p-4 rounded-lg border border-white/10 bg-white/5 hover:border-cyan-500/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{taskToComplete.title}</span>
                      <span className="text-sm text-cyan-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {taskToComplete.priority}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Due: {taskToComplete.dueDate}
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-6">
                <AlertDialogCancel className="bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-gray-300">
                  Keep in progress
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90"
                  onClick={() => {
                    handleCompleteTask(taskToComplete.id);
                    setTaskToComplete(null);
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete task
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </div>
    </div>
  );
};

export default TaskPage;