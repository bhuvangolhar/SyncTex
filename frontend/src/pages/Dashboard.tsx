import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface UserData {
  id?: number;
  name?: string;
  fullName?: string;
  email?: string;
  role?: string;
  organization?: {
    orgName?: string;
  };
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<UserData | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const currentTab = location.pathname === '/dashboard/tasks' ? 'tasks' : 'dashboard';
    setActiveTab(currentTab);
  }, [location.pathname]);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse user data', err);
      }
    }
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate greeting based on local time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'User';

  type NavItem = {
    id: string;
    label: string;
    path?: string;
    badge?: string;
    icon: React.ReactNode;
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'tasks', label: 'Tasks', path: '/dashboard/tasks', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )},
    { id: 'enquiries', label: 'Enquiries', path: '/dashboard/enquiry', badge: '4', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )},
    { id: 'projects', label: 'Projects', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )},
    { id: 'analytics', label: 'Analytics', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { id: 'team', label: 'Team', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation Component */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Sidebar Header / Brand */}
          <div className={`h-20 px-3 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} border-b border-slate-100`}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0">
                S
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">Synctex</h1>
                  <p className="text-[10px] text-slate-400 font-medium">WORKSPACE</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                className="hidden lg:inline-flex text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                </svg>
              </button>
              {/* Close Button Mobile */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Navigation
              </div>
            )}
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.path && item.path !== '#') {
                      navigate(item.path);
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0 py-2.5' : 'justify-between px-3'} rounded-lg text-xs font-semibold transition-all duration-150
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                    <span className={isActive ? 'text-indigo-600' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3 min-w-0'}`}>
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800 truncate">{userName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.role || 'Admin'}</p>
                </div>
              )}
            </div>
            {!isSidebarCollapsed ? (
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Layout Right Side */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Header / Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Left Header Controls & Brand Greeting */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Mobile Sidebar Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:hidden">Synctex</h1>
              
              <div className="hidden sm:block border-l border-slate-200 pl-6 lg:border-l-0 lg:pl-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-slate-800">
                    {getGreeting()}, {userName}
                  </span>
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-medium border border-indigo-100">
                    {user?.role || 'Admin'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user?.organization?.orgName || 'Workspace Overview'}
                </p>
              </div>
            </div>

            {/* Clock & Profile Action */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
                <div className="text-xs font-mono font-semibold text-slate-800">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-[10px] text-slate-500">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-medium text-slate-600 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 px-3 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 w-full">
          
          {/* KPI Metrics Row */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Active Tasks
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mt-2">128</div>
              <p className="text-xs text-slate-500 mt-1">24 completed this week</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Projects In Progress
                <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mt-2">14</div>
              <p className="text-xs text-slate-500 mt-1">3 pending client review</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Hours Logged
                <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">+4.2h</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mt-2">164.5 <span className="text-sm font-normal text-slate-500">hrs</span></div>
              <p className="text-xs text-slate-500 mt-1">Target: 180 hrs / month</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Team Velocity
                <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">On Track</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mt-2">92.4%</div>
              <p className="text-xs text-slate-500 mt-1">Sprint completion rate</p>
            </div>
          </section>

          {/* Analytics & Graphs Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weekly Task Activity Line Chart */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Weekly Task Completion Trend</h3>
                  <p className="text-xs text-slate-500">Output performance across the last 7 days</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-md">This Week</span>
              </div>

              {/* SVG Line Graph */}
              <div className="h-56 w-full flex flex-col justify-end">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Background Grid Lines */}
                  <line x1="0" y1="0" x2="500" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Filled Area */}
                  <path
                    d="M 0,110 Q 80,40 160,80 T 320,30 T 500,60 L 500,150 L 0,150 Z"
                    fill="url(#gradient)"
                  />
                  {/* Line Path */}
                  <path
                    d="M 0,110 Q 80,40 160,80 T 320,30 T 500,60"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Data Points */}
                  <circle cx="0" cy="110" r="4" fill="#4f46e5" className="hover:r-6 transition-all" />
                  <circle cx="80" cy="55" r="4" fill="#4f46e5" />
                  <circle cx="160" cy="80" r="4" fill="#4f46e5" />
                  <circle cx="240" cy="45" r="4" fill="#4f46e5" />
                  <circle cx="320" cy="30" r="4" fill="#4f46e5" />
                  <circle cx="410" cy="85" r="4" fill="#4f46e5" />
                  <circle cx="500" cy="60" r="4" fill="#4f46e5" />
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-xs text-slate-400 mt-4 px-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            {/* Donut Chart: Task Distribution */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Task Allocation</h3>
                <p className="text-xs text-slate-500">Breakdown by current status</p>
              </div>

              {/* SVG Donut Chart */}
              <div className="relative flex items-center justify-center my-4">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Ring */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="3.8"
                  />
                  {/* Segment 1: Completed (55%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3.8"
                    strokeDasharray="55, 100"
                  />
                  {/* Segment 2: In Progress (30%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.8"
                    strokeDasharray="30, 100"
                    strokeDashoffset="-55"
                  />
                  {/* Segment 3: Pending (15%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="3.8"
                    strokeDasharray="15, 100"
                    strokeDashoffset="-85"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="block text-xl font-bold text-slate-900">128</span>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-medium">Tasks</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-600">Completed</span>
                  </div>
                  <span className="font-semibold text-slate-900">55% (70)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                    <span className="text-slate-600">In Progress</span>
                  </div>
                  <span className="font-semibold text-slate-900">30% (38)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="text-slate-600">Pending Review</span>
                  </div>
                  <span className="font-semibold text-slate-900">15% (20)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Data Table & Activity Feed Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Tasks Table */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900">Recent Workspace Tasks</h3>
                <button className="text-xs text-indigo-600 hover:underline font-medium">View All Tasks</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-2">Task Title</th>
                      <th className="py-3 px-2">Assignee</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    <tr>
                      <td className="py-3 px-2 font-medium text-slate-800">Design Authentication Flow</td>
                      <td className="py-3 px-2 text-slate-600">Sarah Jenkins</td>
                      <td className="py-3 px-2">
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium text-[11px]">Completed</span>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-700">High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium text-slate-800">API Gateway Integration</td>
                      <td className="py-3 px-2 text-slate-600">Alex Rivera</td>
                      <td className="py-3 px-2">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium text-[11px]">In Progress</span>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-700">High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium text-slate-800">PostgreSQL Migration Script</td>
                      <td className="py-3 px-2 text-slate-600">Justin Eilish</td>
                      <td className="py-3 px-2">
                        <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium text-[11px]">In Review</span>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-700">Medium</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium text-slate-800">User Profile Permissions UI</td>
                      <td className="py-3 px-2 text-slate-600">Elena Rostova</td>
                      <td className="py-3 px-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium text-[11px]">Pending</span>
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-700">Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scrollable Activity Feed */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900 mb-1">Activity Stream</h3>
              <p className="text-xs text-slate-500 mb-4">Real-time team updates</p>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                <div className="flex space-x-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    SJ
                  </div>
                  <div>
                    <p className="text-slate-800"><span className="font-semibold text-slate-900">Sarah Jenkins</span> attached design assets to <span className="text-indigo-600">Auth Flow</span>.</p>
                    <span className="text-[10px] text-slate-400">10 mins ago</span>
                  </div>
                </div>

                <div className="flex space-x-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
                    AR
                  </div>
                  <div>
                    <p className="text-slate-800"><span className="font-semibold text-slate-900">Alex Rivera</span> created new endpoint <span className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded">POST /api/users</span>.</p>
                    <span className="text-[10px] text-slate-400">25 mins ago</span>
                  </div>
                </div>

                <div className="flex space-x-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                    BG
                  </div>
                  <div>
                    <p className="text-slate-800"><span className="font-semibold text-slate-900">Maya Oliver</span> updated organization settings.</p>
                    <span className="text-[10px] text-slate-400">1 hour ago</span>
                  </div>
                </div>

                <div className="flex space-x-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    ER
                  </div>
                  <div>
                    <p className="text-slate-800"><span className="font-semibold text-slate-900">Elena Rostova</span> submitted weekly progress report.</p>
                    <span className="text-[10px] text-slate-400">2 hours ago</span>
                  </div>
                </div>

                <div className="flex space-x-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    SY
                  </div>
                  <div>
                    <p className="text-slate-800"><span className="font-semibold text-slate-900">System Bot</span> auto-backed up workspace database.</p>
                    <span className="text-[10px] text-slate-400">5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};