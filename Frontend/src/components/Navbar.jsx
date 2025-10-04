import React from 'react'
import useAuthUser from '../hooks/useAuthUser.js';
import { useLocation, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import { BellIcon, LogOutIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';
import navIcon from '../assets/nav_icon.png';

const Navbar = ({ hasSidebar = false }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat/');

  const queryClient = useQueryClient();

  const { mutate: logourMutaion } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    }
  });

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center w-full'>

          {/* Logo Section */}
          {!isChatPage && (
            <Link
              to='/'
              className={`flex items-center gap-2.5 ${hasSidebar ? 'lg:hidden' : ''}`}
            >
              <img src={navIcon} alt="IntraMeet" className="h-8 w-8" />
              <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                IntraMeet
              </span>
            </Link>
          )}

          {/* Right Side Icons – All grouped with 13px gap */}
          <div className="flex items-center ml-auto gap-[13px]">

            {/* Notifications */}
            <Link to="/notifications" className="btn btn-ghost btn-circle">
              <BellIcon className="h-8 w-6 text-base-content opacity-80" />
            </Link>

            {/* Theme Toggle */}
            <ThemeSelector />

            {/* User Avatar (click to edit profile) */}
            <Link to="/profile" title="Edit profile" className="avatar">
              <div className="w-9 rounded-full ring-1 ring-base-300 hover:ring-primary transition">
                <img src={authUser?.avatar} alt="User Avatar" />
              </div>
            </Link>

            {/* Logout */}
            <button className="btn btn-ghost btn-circle" onClick={logourMutaion}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-80" />
            </button>

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;
