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

export interface Enquiry {
  id: string;
  clientName: string;
  email: string;
  status: 'Fresh' | 'In Contact' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'ENQ-101',
    clientName: 'Acme Corp (John Doe)',
    email: 'john@acme.com',
    status: 'Fresh',
    priority: 'High',
    date: 'Aug 14, 2026',
  },
  {
    id: 'ENQ-102',
    clientName: 'TechStart Inc',
    email: 'contact@techstart.io',
    status: 'In Contact',
    priority: 'High',
    date: 'Aug 13, 2026',
  },
  {
    id: 'ENQ-103',
    clientName: 'Sarah Smith',
    email: 'sarah.s@gmail.com',
    status: 'In Contact',
    priority: 'Medium',
    date: 'Aug 11, 2026',
  },
  {
    id: 'ENQ-104',
    clientName: 'Global Logistics LLC',
    email: 'info@globallogistics.com',
    status: 'Closed',
    priority: 'Low',
    date: 'Aug 09, 2026',
  },
];

export const Enquiries: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Core App State
  const [user, setUser] = useState<UserData | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('enquiries');

  // Enquiries & Filter State
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  // Modal Control States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Form Fields State
  const [formClientName, setFormClientName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPriority, setFormPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [formStatus, setFormStatus] = useState<'Fresh' | 'In Contact' | 'Closed'>('Fresh');

  useEffect(() => {
    const currentTab = location.pathname === '/dashboard/enquiry' ? 'enquiries' : 'dashboard';
    setActiveTab(currentTab);
  }, [location.pathname]);

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const userName = user?.name || user?.fullName || user?.email?.split('@')[0] || 'User';

  // Navigation Items aligned with Sidebar & Dashboard
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
    { id: 'enquiries', label: 'Enquiries', path: '/dashboard/enquiry', badge: `${enquiries.length}`, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )},
    { id: 'projects', label: 'Projects', path: '#', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )},
    { id: 'analytics', label: 'Analytics', path: '#', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { id: 'team', label: 'Team', path: '#', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { id: 'settings', label: 'Settings', path: '#', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  // Helper Badges
  const getStatusBadge = (status: Enquiry['status']) => {
    switch (status) {
      case 'Fresh':
        return <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium text-[11px] border border-blue-100">Fresh</span>;
      case 'In Contact':
        return <span className="bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-medium text-[11px] border border-amber-100">In Contact</span>;
      case 'Closed':
      default:
        return <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium text-[11px] border border-slate-200">Closed</span>;
    }
  };

  const getPriorityBadge = (priority: Enquiry['priority']) => {
    switch (priority) {
      case 'High':
        return <span className="text-red-600 font-semibold text-xs bg-red-50 px-2 py-0.5 rounded border border-red-100">High</span>;
      case 'Medium':
        return <span className="text-amber-600 font-semibold text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Medium</span>;
      case 'Low':
      default:
        return <span className="text-slate-600 font-semibold text-xs bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Low</span>;
    }
  };

  // Filter Logic
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || enquiry.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || enquiry.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Modal Action Handlers
  const openCreateModal = () => {
    setFormClientName('');
    setFormEmail('');
    setFormPriority('Medium');
    setFormStatus('New');
    setIsCreateModalOpen(true);
  };

  const handleCreateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClientName) return;

    const newEnquiry: Enquiry = {
      id: `ENQ-${100 + enquiries.length + 1}`,
      clientName: formClientName,
      email: formEmail || 'no-email@provided.com',
      status: formStatus,
      priority: formPriority,
      date: 'Aug 14, 2026',
    };

    setEnquiries([newEnquiry, ...enquiries]);
    setIsCreateModalOpen(false);
  };

  const openEditModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setFormClientName(enquiry.clientName);
    setFormEmail(enquiry.email);
    setFormPriority(enquiry.priority);
    setFormStatus(enquiry.status);
    setIsEditModalOpen(true);
  };

  const handleUpdateEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === selectedEnquiry.id
          ? {
              ...item,
              clientName: formClientName,
              email: formEmail,
              priority: formPriority,
              status: formStatus,
            }
          : item
      )
    );
    setIsEditModalOpen(false);
    setSelectedEnquiry(null);
  };

  const openDeleteModal = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEnquiry = () => {
    if (!selectedEnquiry) return;
    setEnquiries((prev) => prev.filter((item) => item.id !== selectedEnquiry.id));
    setIsDeleteModalOpen(false);
    setSelectedEnquiry(null);
  };

  // KPI Calculations
  const totalCount = enquiries.length;
  const freshCount = enquiries.filter((e) => e.status === 'Fresh').length;
  const highPriorityCount = enquiries.filter((e) => e.priority === 'High').length;
  const closedCount = enquiries.filter((e) => e.status === 'Closed').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
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

          {/* Navigation Items */}
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

        {/* Sidebar Footer */}
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
            {!isSidebarCollapsed && (
              <button onClick={handleLogout} title="Sign Out" className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Customer Enquiries</h2>
                <p className="text-xs text-slate-500">Manage client inquiries about services, products, and priority levels</p>
              </div>
            </div>

            {/* Right Clock & New Enquiry CTA */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200">
                <div className="text-xs font-mono font-semibold text-slate-800">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-[10px] text-slate-500">
                  {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <button
                onClick={openCreateModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition flex items-center space-x-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Enquiry</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-6 w-full">
          
          {/* KPI Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enquiries</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{totalCount}</div>
              <p className="text-xs text-slate-500 mt-1">All logged client enquiries</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-blue-600">Fresh Deals</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{freshCount}</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting initial response</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-red-600">High Priority</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{highPriorityCount}</div>
              <p className="text-xs text-slate-500 mt-1">Requires immediate attention</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-emerald-600">Closed Offers</div>
              <div className="text-3xl font-bold text-slate-900 mt-2">{closedCount}</div>
              <p className="text-xs text-slate-500 mt-1">Successfully handled</p>
            </div>
          </section>

          {/* Search & Filter Toolbar */}
          <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, ID, or subject..."
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:border-indigo-600"
              >
                <option value="ALL">All Statuses</option>
                <option value="Fresh">Fresh</option>
                <option value="In Contact">In Contact</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:border-indigo-600"
              >
                <option value="ALL">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </section>

          {/* Enquiries Data Table */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">All Enquiries</h3>
              <span className="text-xs text-slate-500">Showing {filteredEnquiries.length} items</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Enquiry ID</th>
                    <th className="py-3 px-4">Client / Contact</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredEnquiries.length > 0 ? (
                    filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                          {enquiry.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{enquiry.clientName}</div>
                          <div className="text-[11px] text-slate-400">{enquiry.email}</div>
                        </td>
                        <td className="py-3.5 px-4">{getStatusBadge(enquiry.status)}</td>
                        <td className="py-3.5 px-4">{getPriorityBadge(enquiry.priority)}</td>
                        <td className="py-3.5 px-4 text-slate-500 font-medium">{enquiry.date}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => openEditModal(enquiry)}
                              title="Edit Enquiry"
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={() => openDeleteModal(enquiry)}
                              title="Delete Enquiry"
                              className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No enquiries found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>

      {/* Modal: Create Enquiry */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Enquiry</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateEnquiry} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Name / Company</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp (John Doe)"
                  value={formClientName}
                  onChange={(e) => setFormClientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@acme.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="In Contact">In Contact</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Enquiry */}
      {isEditModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Enquiry ({selectedEnquiry.id})</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateEnquiry} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={formClientName}
                  onChange={(e) => setFormClientName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Fresh">Fresh</option>
                    <option value="In Contact">In Contact</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Update Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {isDeleteModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Enquiry</h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete enquiry <span className="font-semibold text-slate-700">{selectedEnquiry.id}</span>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center space-x-3 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEnquiry}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};