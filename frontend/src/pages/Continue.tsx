import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const Continue: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-slate-200 rounded-xl p-8 shadow-sm text-center">
        {/* Brand Header */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Synctex</h1>

        {/* Welcome Back Card */}
        <div className="my-6 py-4 bg-slate-50 rounded-lg border border-slate-100">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase px-2.5 py-1 rounded-full mb-3">
            Welcome Back
          </span>
          <h2 className="text-xl font-semibold text-slate-800">
            {user?.name || user?.email || 'User'}
          </h2>
          <p className="text-slate-500 text-xs mt-2 px-4">
            You are successfully signed in.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};