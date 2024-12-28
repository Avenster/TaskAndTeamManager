import React, { useState, useEffect } from 'react';
import { Plus, ListTodo, Users, Settings, ChevronRight } from 'lucide-react';

const Sidebar = ({ onPageChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <aside className="flex  w-64 h-full bg-black border-b border-l border-r border-white/10 flex flex-col">
      <div className="flex-1  px-3 py-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
        
        {/* Action Buttons */}
        <div className="space-y-2 mb-6">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </button>
          <button className="w-full bg-black border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </button>
        </div>

        {/* Task Management Links */}
        <div className="mb-6 space-y-1">
          <button 
            onClick={() => onPageChange('tasks')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ListTodo className="w-4 h-4 mr-3" />
            Manage Tasks
          </button>
          <button 
            onClick={() => onPageChange('teams')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4 mr-3" />
            Team Overview
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <button 
            onClick={() => onPageChange('home')}
            className="w-full flex items-center px-3 py-2 text-white hover:bg-gray-800 rounded-lg"
          >
            Introduction
          </button>
          <button 
            onClick={() => onPageChange('installation')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Installation
          </button>
          <button 
            onClick={() => onPageChange('theming')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Theming
          </button>
          
          <div className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors group cursor-pointer">
            <span className="flex-1">Monorepo</span>
            <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-full">New</span>
          </div>
        </nav>
      </div>

      {/* User Profile and Settings */}
      <div className="border-t border-white/10 p-4 space-y-3">

      {user && (
          <div className="flex items-center py-1 text-white">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              {user.username?.[0]?.toUpperCase()}
            </div>
            <span className="ml-2">{user.username}</span>
          </div>
        )}
        </div>
      <div className="border-t border-white/10 p-4 space-y-3">
        
        <button 
          onClick={() => onPageChange('settings')}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;