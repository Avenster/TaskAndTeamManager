import { Form, Link, useNavigate } from '@remix-run/react';
import { Mail, Lock, ArrowRight, Github, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface AuthPageProps {
  isLogin: boolean;
  error?: string;
  isSubmitting?: boolean;
}

export const AuthPage = ({ isLogin, error, isSubmitting }: AuthPageProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const checkUsername = async (value: string) => {
    setUsername(value);
    if (value.length >= 3) {
      try {
        const response = await fetch('/api/check-username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: value }),
        });
        const data = await response.json();
        setIsUsernameAvailable(data.isAvailable);
      } catch (err) {
        console.error('Error checking username:', err);
        setIsUsernameAvailable(false);
      }
    } else {
      setIsUsernameAvailable(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 border border-gray-800 rounded-lg p-8 bg-black/50">
        {/* Logo and Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3.5 5.5L5 7l2.5-2.5m3.5 0L5 10.5m8-5.5L7 11m7.5-5.5L9 11m7.5-5.5L11 11m7.5-5.5L13 11" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-white">TaskManager</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gray-400">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Join us to start managing your tasks efficiently'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border border-gray-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              isLogin 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/auth/register')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              !isLogin 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Auth Form */}
        <Form method="post" className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => checkUsername(e.target.value)}
                  required
                  className={`block w-full pl-10 bg-gray-900/50 border rounded-lg py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all ${
                    username && (isUsernameAvailable ? 'border-green-500' : 'border-red-500')
                  }`}
                  placeholder="Choose a unique username"
                />
                {username && !isUsernameAvailable && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {username && !isUsernameAvailable && (
                <p className="mt-1 text-sm text-red-500">
                  Username is either taken or invalid
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 bg-gray-900/50 border border-gray-800 rounded-lg py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 bg-gray-900/50 border border-gray-800 rounded-lg py-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-800 bg-gray-900/50 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>
              <Link to="/auth/forgot-password" className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || (!isLogin && !isUsernameAvailable)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                Loading...
              </span>
            ) : (
              <>
                {isLogin ? 'Sign in' : 'Create account'}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </Form>

        {/* Alternative Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <Form action="/auth/github" method="post">
          <button 
            type="submit"
            className="w-full bg-gray-900/50 text-white py-2.5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-center"
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </button>
        </Form>

        {/* Toggle Auth Mode */}
        <p className="text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            to={isLogin ? '/auth/register' : '/auth/login'}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;