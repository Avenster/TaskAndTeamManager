import React, { useState, useEffect } from 'react';
import { 
  Plus, ListTodo, Users, Settings, 
  LayoutDashboard, Calendar, BarChart2, 
  Clock, Target
} from 'lucide-react';

const Sidebar = ({ onPageChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <aside className="flex w-64 h-full bg-black border-b border-l border-r border-white/10 flex flex-col">
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-custom">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        
        {/* Action Buttons */}
        <div className="space-y-2 mb-6">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </button>
          <button className="w-full bg-black border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
            <Users className="w-4 h-4 mr-2" />
            Create Team
          </button>
        </div>

        {/* Main Navigation */}
        <div className="mb-6 space-y-1">
          <button 
            onClick={() => onPageChange('dashboard')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Introduction
          </button>
          <button 
            onClick={() => onPageChange('tasks')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ListTodo className="w-4 h-4 mr-3" />
            My Tasks
          </button>
          <button 
            onClick={() => onPageChange('calendar')}
            className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Calendar className="w-4 h-4 mr-3" />
            Calendar
          </button>
        </div>

        {/* Team Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2 px-3">Team</h3>
          <div className="space-y-1">
            <button 
              onClick={() => onPageChange('teams')}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Target className="w-4 h-4 mr-3" />
              Team Tasks
            </button>
            <button 
              onClick={() => onPageChange('team-members')}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4 mr-3" />
              Members
            </button>
            <button 
              onClick={() => onPageChange('analytics')}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <BarChart2 className="w-4 h-4 mr-3" />
              Analytics
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-2 px-3">Recent</h3>
          <div className="space-y-1">
            <button 
              onClick={() => onPageChange('activity')}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Clock className="w-4 h-4 mr-3" />
              Activity Log
            </button>
          </div>
        </div>
      </div>

      {/* User Profile and Settings */}
      <div className="border-t border-white/10 p-4">
        {user && (
          <div className="flex items-center py-1 text-white mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
              {/* {user.username?.[0]?.toUpperCase()} */}

              <img src={user.avatar_url} alt="" />
            </div>
            <span className="ml-2">{user.username}</span>
          </div>
        )}
        <button 
          onClick={() => onPageChange('settings')}
          className="flex items-center text-gray-300 hover:text-white transition-colors w-full"
        >
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;