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
  AlertCircle,
  X,
  Bell
} from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      date: '2024-12-28',
      events: [
        { id: 1, title: 'Team Meeting', time: '10:00', priority: 'high', description: 'Weekly team sync' },
        { id: 2, title: 'Project Review', time: '14:00', priority: 'medium', description: 'Review Q4 deliverables' }
      ]
    },
    {
      date: '2024-12-29',
      events: [
        { id: 3, title: 'Client Call', time: '11:30', priority: 'high', description: 'Product demo' }
      ]
    }
  ]);

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium',
    reminder: false
  });

  // Calendar generation helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setEventForm(prev => ({
      ...prev,
      date: formatDate(clickedDate)
    }));
    setShowEventForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title: eventForm.title,
      time: eventForm.time,
      priority: eventForm.priority,
      description: eventForm.description
    };

    setEvents(prevEvents => {
      const existingDateIndex = prevEvents.findIndex(e => e.date === eventForm.date);
      
      if (existingDateIndex >= 0) {
        const updatedEvents = [...prevEvents];
        updatedEvents[existingDateIndex] = {
          ...updatedEvents[existingDateIndex],
          events: [...updatedEvents[existingDateIndex].events, newEvent]
        };
        return updatedEvents;
      } else {
        return [...prevEvents, {
          date: eventForm.date,
          events: [newEvent]
        }];
      }
    });

    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'medium',
      reminder: false
    });
    setShowEventForm(false);
  };

  const getTotalEvents = () => {
    return events.reduce((total, dateEvents) => total + dateEvents.events.length, 0);
  };

  const getTodayEvents = () => {
    const today = formatDate(new Date());
    const todayEvents = events.find(e => e.date === today);
    return todayEvents ? todayEvents.events.length : 0;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const futureEvents = events.filter(dateEvent => {
      const eventDate = new Date(dateEvent.date);
      return eventDate > today;
    });
    return futureEvents.reduce((total, dateEvents) => total + dateEvents.events.length, 0);
  };

  const statCards = [
    {
      label: 'Total Events',
      value: getTotalEvents(),
      trend: `${getUpcomingEvents()} upcoming`,
      icon: CalendarIcon
    },
    {
      label: 'Today\'s Events',
      value: getTodayEvents(),
      trend: 'Active now',
      icon: Clock
    },
    {
      label: 'Upcoming',
      value: getUpcomingEvents(),
      trend: 'Next 7 days',
      icon: AlertCircle
    }
  ];

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-36 border border-white/10 bg-black/20 rounded-lg" />
      );
    }

    // Cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      const dayEvents = events.find(e => e.date === dateString)?.events || [];
      const isToday = dateString === formatDate(new Date());

      days.push(
        <div 
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-36 border cursor-pointer ${
            isToday ? 'border-cyan-500' : 'border-white/10'
          } bg-black rounded-lg p-2 hover:border-cyan-500/50 transition-all group relative overflow-hidden`}
        >
          {isToday && (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
          )}
          <div className="relative">
            <div className="flex justify-between items-start">
              <span className={`text-sm font-medium ${
                isToday ? 'text-cyan-500' : 'text-gray-400'
              }`}>{day}</span>
              {dayEvents.length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/20">
                  {dayEvents.length} events
                </span>
              )}
            </div>
            <div className="mt-2 space-y-1 max-h-24 overflow-auto">
              {dayEvents.map((event) => (
                <div 
                  key={event.id}
                  className="group/event bg-gradient-to-r from-black to-black/95 border border-white/10 rounded-lg p-2 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{event.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      event.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-400/20' :
                      event.priority === 'medium' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20' :
                      'bg-green-500/10 text-green-400 border border-green-400/20'
                    }`}>
                      {event.priority}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 truncate mt-1">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="px-6 py-3 h-full overflow-auto from-black to-gray-900">
      {/* Header navigation */}
      <div className="flex items-center space-x-2 bg-black text-xs mb-8">
        <Home className="w-4 h-4 text-white/80" />
        <span className="text-white/80">/</span>
        <span className="text-cyan-500">Calendar</span>
      </div>

      {/* Hero section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-xl transition-all duration-500" />
        <div className="relative rounded-lg border border-white/10 p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
              <Sparkles className="w-5 h-5 text-cyan-500" />
            </div>
            <h1 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              Calendar Management
            </h1>
          </div>
          <p className="text-sm text-white/70">
            Plan and organize your schedule with our advanced calendar system
          </p>
        </div>
      </div>

      {/* Stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden bg-black border border-white/10 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/80">{stat.label}</p>
                <stat.icon className="w-4 h-4 text-cyan-500/90" />
              </div>
              <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3">
          <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all">
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-gray-400" />
          </button>
          <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 border border-white/10 rounded-lg hover:border-cyan-500/50 transition-all"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs text-cyan-500 font-medium py-2">
            {day}
          </div>
        ))}
        {renderCalendarGrid()}
      </div>

      {/* Create event button */}
      {!showEventForm && (
        <button
          onClick={() => setShowEventForm(true)}
          className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Create New Event</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {/* Event form modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
                  <h2 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    Create New Event
                  </h2>
                </div>
                <button 
                  onClick={() => setShowEventForm(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-cyan-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Enter event description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={eventForm.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={eventForm.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={eventForm.priority}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="reminder"
                    id="reminder"
                    checked={eventForm.reminder}
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
                    onClick={() => setShowEventForm(false)}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-gray-400 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )};

  export default CalendarPage;
          