// app/routes/profile.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { LogOut, Settings } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      navigate('/auth/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 border border-gray-800 rounded-lg p-8 bg-black/50">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="text-center space-y-4">
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-24 h-24 rounded-full mx-auto border-2 border-cyan-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

          <div className="flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm text-gray-300">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
              Signed in with {user.provider}
            </span>
          </div>
        </div>

        {/* Additional Profile Information */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Account ID</span>
              <span className="text-white font-mono text-sm">{user.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Provider</span>
              <span className="text-white capitalize">{user.provider}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}