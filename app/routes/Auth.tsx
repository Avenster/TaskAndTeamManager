import  { useState,useEffect } from 'react';
import { Mail, Lock, ArrowRight, Github, User, AlertCircle } from 'lucide-react';
import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { getSession } from "~/sessions"; 

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  
  // Check for server-side session token
  if (session.has("token")) {
    return redirect("/");
  }
  
  return null;
}

const AuthPage = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CLIENT_ID ="Ov23liblcsy9A9MU6zSC";
  const API_URL = "http://localhost:5000";
  const [rerender, setRerender] = useState(false);
  const navigate = useNavigate()
  //83cddc16868f7864b279
  useEffect(() => {
    const token = localStorage.getItem('token');
    const accessToken = localStorage.getItem('access_token');
    if (token || accessToken) {
      navigate('/', { replace: true });
    }
  }, [navigate]);


  

  const loginwithgithub=()=>{
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  const checkUsername = async (value) => {
    setUsername(value);
    if (value.length >= 3) {
      try {
        const response = await fetch(`${API_URL}/api/check-username`, {
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
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
  
    if (code && !localStorage.getItem("accessToken")) {
      const getAccessToken = async () => {
        try {
          const response = await fetch(`${API_URL}/getAccessToken?code=${code}`);
          const data = await response.json();
  
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
  
            const authResponse = await fetch(`${API_URL}/getUserData`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${data.access_token}`
              }
            });

            console.log(authResponse);
  
            const authData = await authResponse.json();
  
            if (authResponse.ok) {
              localStorage.setItem('token', authData.token);
              localStorage.setItem('user', JSON.stringify(authData.user));
              window.location.href = '/intro';
            } else {
              setError('Failed to authenticate with GitHub');
            }
          } else {
            setError('Failed to obtain access token');
          }
        } catch (error) {
          console.error('Error during GitHub authentication:', error);
          setError('Authentication failed');
        }
      };
  
      getAccessToken();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const body = isLogin 
        ? { email, password }
        : { username, email, password };

      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect or update app state
      window.location.href = '/Dashboard'; // Or use React Router navigation
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
            onClick={() => setIsLogin(true)}
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
            onClick={() => setIsLogin(false)}
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <a href="#" className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || (!isLogin && !isUsernameAvailable)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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
        </form>

        {/* Alternative Login */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <button 
  type="button"
  onClick={loginwithgithub}
  className="w-full bg-gray-900/50 text-white py-2.5 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors flex items-center justify-center"
>
  <Github className="w-5 h-5 mr-2" />
  Continue with GitHub
</button>

        {/* Toggle Auth Mode */}
        <p className="text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;