import React, { useState } from 'react';
import { 
  Users, Home, Plus, ArrowRight, Search, Filter, 
  UserPlus, Mail, MessageSquare, Activity, ChevronRight,
  BarChart, UserCheck, AlertCircle, Edit, Trash2
} from 'lucide-react';

const TeamPage = () => {
  const [showCreateMember, setShowCreateMember] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [teamForm, setTeamForm] = useState({
    name: '',
    description: '',
    category: 'development',
    status: 'active'
  });
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active'
  });

  const statCards = [
    {
      label: 'Total Members',
      value: '24',
      icon: UserCheck,
      trend: '+3 this month',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Active Projects',
      value: '8',
      icon: Activity,
      trend: '2 due soon',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Team Performance',
      value: '92%',
      icon: BarChart,
      trend: '+5% from last month',
      color: 'from-cyan-500 to-blue-400'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Team Lead',
      email: 'sarah.j@company.com',
      status: 'active',
      projects: 5,
      performance: 95
    },
    {
      name: 'Michael Chen',
      role: 'Senior Developer',
      email: 'michael.c@company.com',
      status: 'active',
      projects: 4,
      performance: 88
    },
    {
      name: 'Emma Watson',
      role: 'UI/UX Designer',
      email: 'emma.w@company.com',
      status: 'active',
      projects: 3,
      performance: 92
    }
  ];

  const handleMemberSubmit = (e) => {
    e.preventDefault();
    console.log('Member to add:', memberForm);
    setShowCreateMember(false);
    setMemberForm({
      name: '',
      email: '',
      role: '',
      status: 'active'
    });
  };

  const handleTeamSubmit = (e) => {
    e.preventDefault();
    console.log('Team to create:', teamForm);
    setShowCreateTeam(false);
    setTeamForm({
      name: '',
      description: '',
      category: 'development',
      status: 'active'
    });
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
          Team
        </span>
      </div>

      {/* Hero Section */}
      <div className="relative mb-12">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 text-cyan-500 mr-2" />
              <span className="text-sm font-medium text-cyan-500">Team Central</span>
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Team Overview
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Manage your team members, track performance, and ensure effective collaboration.
              Build stronger teams together. 🚀
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

      <div className="space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Team Button and Form */}
        {!showCreateTeam ? (
          <button
            onClick={() => setShowCreateTeam(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2 mb-4"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Team</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-6">
                Create New Team
              </h2>
              <form onSubmit={handleTeamSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
                    <input
                      type="text"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Enter team name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                    <textarea
                      value={teamForm.description}
                      onChange={(e) => setTeamForm({...teamForm, description: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                      placeholder="Team description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                    <select
                      value={teamForm.category}
                      onChange={(e) => setTeamForm({...teamForm, category: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateTeam(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Member Button or Form */}
        {!showCreateMember ? (
          <button
            onClick={() => setShowCreateMember(true)}
            className="group bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Team Member</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl" />
            <div className="relative bg-black border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-6">
                Add New Team Member
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields would go here */}
              </form>
            </div>
          </div>
        )}

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group bg-black border border-white/10 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Activity className="w-4 h-4 mr-2" />
                    {member.projects} Active Projects
                  </div>
                </div>

                {/* Performance bar */}
                <div className="w-full h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${member.performance}%` }}
                  />
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

export default TeamPage;