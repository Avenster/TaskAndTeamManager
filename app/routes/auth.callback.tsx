// app/routes/auth.callback.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  provider: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (!token || !userStr) {
      navigate('/auth/login?error=Authentication failed');
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userStr)) as GoogleUser;
      
      // Store authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to profile page
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Error processing authentication:', error);
      navigate('/auth/login?error=Invalid authentication data');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Loading spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
        <p className="text-gray-400">Completing your sign in...</p>
      </div>
    </div>
  );
}