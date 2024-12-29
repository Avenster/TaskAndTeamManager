import React, { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const NotificationDropdown = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      message: 'ur task "Design Homepage" is complete fr fr',
      time: '2m ago',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'alert',
      message: 'no cap, deadline approaching for "User Research"',
      time: '1h ago',
      icon: AlertCircle
    },
    {
      id: 3,
      type: 'reminder',
      message: 'bestie, team meeting starts in 15 mins',
      time: '15m ago',
      icon: Clock
    }
  ];

  const getIconColor = (type) => {
    switch(type) {
      case 'success': return 'text-cyan-500';
      case 'alert': return 'text-blue-500';
      case 'reminder': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-black border border-white/10 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-white font-medium">the notifs</h3>
            <button 
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className="p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <notification.icon className={`w-5 h-5 mt-0.5 ${getIconColor(notification.type)}`} />
                  <div className="flex-1">
                    <p className="text-sm bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-white/10">
            <button className="w-full px-4 py-2 text-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-white rounded-lg hover:from-cyan-500/20 hover:to-blue-500/20 transition-colors">
              clear all notifs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;