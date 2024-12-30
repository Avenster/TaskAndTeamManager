import React from 'react';
import { 
  Clock, AlertCircle, CheckCircle2, Circle, Timer,
  CalendarClock, Hash, ArrowDown, ArrowRight, ArrowUp,
  ChevronLeft, ChevronRight, Search
} from "lucide-react";

const TaskTable = ({ tasks, onCompleteTask }) => {
  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case "high": return <ArrowUp className="w-3 h-3" />;
      case "medium": return <ArrowRight className="w-3 h-3" />;
      case "low": return <ArrowDown className="w-3 h-3" />;
      default: return <ArrowRight className="w-3 h-3" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "todo": return <Circle className="w-3 h-3" />;
      case "in progress": return <Timer className="w-3 h-3" />;
      case "completed": return <CheckCircle2 className="w-3 h-3" />;
      default: return <Circle className="w-3 h-3" />;
    }
  };

  const getStatus = (task) => {
    if (task.progress === 100) return "completed";
    if (task.progress > 0) return "in progress";
    return "todo";
  };

  const renderTaskRow = (task) => {
    const status = getStatus(task);
    const statusColors = {
      completed: "text-green-400 border border-green-400/20",
      "in progress": "text-yellow-400 border border-yellow-400/20",
      todo: "text-gray-400 border border-gray-400/20"
    };

    return (
      <tr key={task.id} className="border-b border-white/10 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-blue-500/5 transition-all group">
        <td className="py-3 px-4">
          <input 
            type="checkbox" 
            className="appearance-none w-4 h-4 rounded-full border border-white/10 bg-black checked:border-0 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500 hover:border-cyan-500/50 transition-all cursor-pointer relative
            checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
            onChange={() => onCompleteTask && onCompleteTask(task)}
          />
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center space-x-1.5 text-gray-400">
            <Hash className="w-3 h-3 text-cyan-500/50" />
            <span className="text-xs">TASK-{task.id}</span>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-1.5">
            {task.categories?.map(category => (
              <span key={category} className="px-2 py-0.5 text-[0.65rem] rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20">
                {category}
              </span>
            ))}
          </div>
        </td>
        <td className="py-3 px-4">
          <span className="text-xs text-gray-300">{task.title}</span>
        </td>
        <td className="py-3 px-4">
          <span className={`inline-flex items-center space-x-1.5 text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </span>
        </td>
        <td className="py-3 px-4">
          <span className={`inline-flex items-center text-xs space-x-1.5 px-2 py-1 rounded-full ${
            task.priority === 'high' ? 'text-red-400 border border-red-400/20' : 
            task.priority === 'medium' ? 'text-cyan-400 border border-cyan-400/20' : 
            'text-green-400 border border-green-400/20'
          }`}>
            {getPriorityIcon(task.priority)}
            <span className="capitalize">{task.priority}</span>
          </span>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center space-x-1.5 text-gray-400">
            <CalendarClock className="w-3 h-3 text-cyan-500/50" />
            <span className="text-xs">{status === 'completed' ? task.completedDate : task.dueDate}</span>
          </div>
        </td>
      </tr>
    );
  };

  const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.completed];

  return (
    <div className="bg-black rounded-lg border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
              <AlertCircle className="w-4 h-4 text-cyan-500" />
            </div>
            <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Task Overview
            </h3>
          </div>
          <div className="relative">
            <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-8 pr-4 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-gray-300 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
              <th className="py-3 px-4">
                <input 
                  type="checkbox" 
                  className="appearance-none w-4 h-4 rounded-full border border-white/10 bg-black checked:border-0 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500 hover:border-cyan-500/50 transition-all cursor-pointer relative
                  checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                />
              </th>
              <th className="py-3 px-4 text-gray-400 font-medium">ID</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Categories</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Title</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Priority</th>
              <th className="py-3 px-4 text-gray-400 font-medium">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map(task => renderTaskRow(task))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">0 of {allTasks.length} row(s) selected</span>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Rows per page</span>
              <select className="bg-black border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">Page 1 of 1</span>
              <div className="flex space-x-1">
                <button className="p-1 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1 rounded-lg hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;