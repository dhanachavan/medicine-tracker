import React from 'react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 11h8" />
        </svg>
      ),
    },
    {
      path: '/add',
      label: 'Add Medication',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Medicine Tracker</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your medications</p>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
              currentPath === item.path
                ? 'bg-apple-blue text-white border-r-3 border-apple-blue'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className={`mr-3 ${currentPath === item.path ? 'text-white' : 'text-gray-400'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2025 Medicine Tracker</p>
          <p className="mt-1">Keep track of your health</p>
        </div>
      </div>
    </div>
  );
};