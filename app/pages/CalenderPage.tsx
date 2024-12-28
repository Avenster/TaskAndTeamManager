import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Home, 
  Plus, 
  ArrowRight, 
  Sparkles,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium'
  });

  // Calendar generation helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Sample events data
  const events = [
    {
      date: '2024-12-28',
      events: [
        { title: 'Team Meeting', time: '10:00 AM', priority: 'high' },
        { title: 'Project Review', time: '2:00 PM', priority: 'medium' }
      ]
    },
    {
      date: '2024-12-29',
      events: [
        { title: 'Client Call', time: '11:30 AM', priority: 'high' }
      ]
    }
  ];

  const statCards = [
    {
      label: 'Total Events',
      value: '8',
      trend: '+3 this week',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Upcoming Today',
      value: '3',
      trend: '2 high priority',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Week Overview',
      value: '12',
      trend: '4 team events',
      color: 'from-cyan-500 to-blue-400'
    }
  ];

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-white/10 bg-black/20 rounded-lg" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.find(e => e.date === dateString)?.events || [];

      days.push(
        <div 
          key={day}
          className="h-32 border border-white/10 bg-black rounded-lg p-2 hover:border-cyan-500/50 transition-all group"
        >
          <div className="flex justify-between items-start">
            <span className="text-gray-400">{day}</span>
            {dayEvents.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-500">
                {dayEvents.length} events
              </span>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayEvents.map((event, idx) => (
              <div 
                key={idx}
                className="text-xs p-1 rounded bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-gray-300"
              >
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1 text-cyan-500" />
                  {event.time}
                </div>
                <div className="truncate">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
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
          Calendar
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Event Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Calendar Overview
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Plan your schedule, manage events, and stay organized with our interactive calendar. 
              Track important dates and never miss a deadline. 📅
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
                <CalendarIcon className="w-8 h-8 text-cyan-500/30 group-hover:text-cyan-500/50 transition-colors" />
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

      {/* Calendar Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowEventForm(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Event</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-cyan-500" />
          </button>
          <h2 className="text-xl font-semibold text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all group"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-500" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-gray-400 font-medium py-2">
            {day}
          </div>
        ))}
        {renderCalendarGrid()}
      </div>
    </div>
  );
};

export default CalendarPage;