import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser.js';
import logo from '../assets/nav_icon.png';
    
  const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
      { to: '/', label: 'Home', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.4-.4V19.5A2.25 2.25 0 0 1 17.5 21.75h-2.25a.75.75 0 0 1-.75-.75v-3.75a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5V21a.75.75 0 0 1-.75.75H5.5A2.25 2.25 0 0 1 3.25 19.5v-6.31l-.4.4a.75.75 0 1 1-1.06-1.06l8.69-8.69Z"/>
        </svg>
      ) },
      { to: '/notifications', label: 'Notifications', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M14.25 18.75a2.25 2.25 0 1 1-4.5 0h4.5Z"/>
          <path fillRule="evenodd" d="M4.5 9.75a7.5 7.5 0 1 1 15 0v4.318l.964 1.607A1.5 1.5 0 0 1 19.152 18H4.848a1.5 1.5 0 0 1-1.312-2.325L4.5 14.068V9.75Z" clipRule="evenodd"/>
        </svg>
      ) },
    ];

    const linkBase = 'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors';
    const linkActive = 'bg-base-300 text-primary';
    const linkHover = 'hover:bg-base-300';

    return (
      <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
        {/* Header / Brand */}
        <div className="p-5 border-b border-base-300">
          <Link to='/' className='flex items-center gap-2.5'>
            <img src={logo} alt="IntraMeet Logo" className="h-6" />
            <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              IntraMeet
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => [
                linkBase,
                isActive ? linkActive : linkHover,
              ].join(' ')}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="p-4 border-t border-base-300">
          <div className="flex items-center gap-3">
            {authUser?.avatar ? (
              <img src={authUser.avatar} alt={authUser?.name || 'User'} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center text-sm font-semibold">
                {(authUser?.name||'U').slice(0,1).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{authUser?.name || 'Guest'}</p>
              <p className="text-xs text-base-content/60 truncate">{authUser?.email || 'Not signed in'}</p>
            </div>
          </div>
        </div>
      </aside>
    )
  }
    
  export default Sidebar
