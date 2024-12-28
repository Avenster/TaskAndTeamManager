import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Search, 
  Filter,
  Users,
  Plus,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  BarChart2,
  CheckCircle,
  Clock,
  Settings,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus
} from 'lucide-react';

const MembersPage = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Sample member data
  const members = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Team Lead',
      email: 'sarah.chen@example.com',
      phone: '+1 (555) 123-4567',
      avatar: 'SC',
      location: 'San Francisco, CA',
      status: 'active',
      assignedTasks: 8,
      completedTasks: 45,
      activeTime: '2 hours ago'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      role: 'Developer',
      email: 'mike.wilson@example.com',
      phone: '+1 (555) 234-5678',
      avatar: 'MW',
      location: 'New York, NY',
      status: 'active',
      assignedTasks: 5,
      completedTasks: 32,
      activeTime: '5 mins ago'
    },
    {
      id: 3,
      name: 'Jessica Park',
      role: 'Designer',
      email: 'jessica.park@example.com',
      phone: '+1 (555) 345-6789',
      avatar: 'JP',
      location: 'Los Angeles, CA',
      status: 'away',
      assignedTasks: 3,
      completedTasks: 28,
      activeTime: '1 day ago'
    }
  ];

  const statCards = [
    {
      label: 'Total Members',
      value: '12',
      trend: '+2 this month',
      icon: Users,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Active Now',
      value: '8',
      trend: '67% of team',
      icon: CheckCircle,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Avg. Tasks',
      value: '6.5',
      trend: '↑ 12% increase',
      icon: BarChart2,
      color: 'from-cyan-500 to-blue-400'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'away':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
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
          Team Members
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Team Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Team Members
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Manage your team members, track their progress, and collaborate effectively.
              Build stronger teams and achieve greater success together. 👥
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-4 py-2 pl-10 text-gray-300 focus:border-cyan-500/50 transition-all outline-none w-64"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
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
                <stat.icon className="w-8 h-8 text-cyan-500/30 group-hover:text-cyan-500/50 transition-colors" />
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

      {/* Invite Member Button/Form */}
      {!showInviteForm ? (
        <button
          onClick={() => setShowInviteForm(true)}
          className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2 mb-8"
        >
          <UserPlus className="w-5 h-5" />
          <span>Invite New Member</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
          <div className="relative bg-black border border-white/10 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <UserPlus className="w-5 h-5 text-cyan-500 mr-2" />
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Invite New Member
              </h2>
            </div>
            
            {/* Add your invite form fields here */}
            <button
              onClick={() => setShowInviteForm(false)}
              className="mt-4 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div 
            key={member.id}
            className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium text-lg">
                    {member.avatar}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500">
                      {member.name}
                    </h3>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 hover:text-cyan-500 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:text-cyan-500 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-400">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{member.location}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-gray-400 text-sm">Assigned</p>
                    <p className="text-lg font-semibold text-white">{member.assignedTasks}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <p className="text-lg font-semibold text-white">{member.completedTasks}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`text-sm font-medium ${getStatusColor(member.status)} capitalize`}>
                      {member.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last active {member.activeTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;