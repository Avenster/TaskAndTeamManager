import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Shield, Bell, Moon, Globe, 
  Smartphone, Camera, Save, Key, LogOut,
  CheckCircle, AlertCircle
} from 'lucide-react';

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    notifications: {
      email: true,
      desktop: true,
      updates: false
    },
    theme: 'system',
    language: 'en'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        username: parsedUser.username || parsedUser.name,
        email: parsedUser.email
      }));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe }
  ];

  return (
    <div className="p-6 h-full overflow-auto scrollbar-custom">
      {/* Header with Gradient Border */}
      <div className="relative mb-8 pb-8">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl" />
        <div className="relative">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
            Profile Settings
          </h1>
          <p className="text-gray-400 text-lg">Customize your account preferences and settings ✨</p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500/10 border border-green-500 text-green-500 px-6 py-3 rounded-lg flex items-center animate-fade-in">
          <CheckCircle className="w-5 h-5 mr-2" />
          Settings saved successfully!
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Tabs Navigation */}
        <div className="col-span-12 md:col-span-3">
          <div className="space-y-2">
          {tabs.map(tab => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 border ${
      activeTab === tab.id
        ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 text-white'
        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <tab.icon className="w-5 h-5 mr-3" />
    {tab.label}
  </button>
))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-black border border-white/10 rounded-lg p-6">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                      {/* {user?.avatar_url || user?.picture || user?.username?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase()} */}
                      {user?.avatar_url || user?.picture ? (
                        <img src={user.avatar_url || user.picture} alt="" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user?.username?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase()
                      )}
                      
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-black border border-white/10 rounded-full group-hover:border-cyan-500/50 transition-colors">
                      <Camera className="w-4 h-4 text-gray-400 group-hover:text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{user?.username || user?.name}</h3>
                    <p className="text-gray-400">{user?.email}</p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Section */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Change Password</h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Connected Devices</h3>
                  <div className="space-y-4">
                    {[
                      { device: 'MacBook Pro', location: 'New York, US', active: true },
                      { device: 'iPhone 13', location: 'New York, US', active: true }
                    ].map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                        <div className="flex items-center">
                          <Smartphone className="w-5 h-5 text-cyan-500 mr-3" />
                          <div>
                            <p className="text-white font-medium">{device.device}</p>
                            <p className="text-gray-400 text-sm">{device.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {device.active && (
                            <span className="text-xs text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-full mr-3">
                              Active Now
                            </span>
                          )}
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                    { id: 'desktop', label: 'Desktop Notifications', description: 'Show desktop push notifications' },
                    { id: 'updates', label: 'Product Updates', description: 'Get notified about new features and updates' }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications[item.id]}
                          onChange={() => setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              [item.id]: !formData.notifications[item.id]
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-blue-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Theme Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light' },
                      { id: 'dark', label: 'Dark' },
                      { id: 'system', label: 'System' }
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setFormData({ ...formData, theme: theme.id })}
                        className={`p-4 rounded-lg border transition-all ${
                          formData.theme === theme.id
                            ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <Moon className="w-6 h-6 mb-2 text-cyan-500" />
                        <p className="text-white font-medium">{theme.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Language</h3>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;