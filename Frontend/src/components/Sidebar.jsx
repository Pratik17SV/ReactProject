import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import useAuthUser from '../hooks/useAuthUser.js';
import { HomeIcon, MessageSquare, BellIcon } from "lucide-react";
import navIcon from '../assets/nav_icon.png';

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      {/* Header / Brand */}
      <div className="p-5 border-b border-base-300">
        <Link to='/' className='flex items-center gap-2.5'>
          <img src={navIcon} alt="IntraMeet" className="h-8 w-8" />
          <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
            IntraMeet
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">

        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>

        <Link
          to="/messages"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/messages" ? "btn-active" : ""
          }`}
        >
          <MessageSquare className="size-5 text-base-content opacity-70" />
          <span>Messages</span>
        </Link>

        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notifications</span>
        </Link>

      </nav>

      {/* User card (click to edit profile) */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <Link to="/profile" className="flex items-center gap-3 group">
          {authUser?.avatar ? (
            <img src={authUser.avatar} alt={authUser?.name || 'User'} className="h-10 w-10 rounded-full object-cover ring-1 ring-base-300 group-hover:ring-primary transition" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-base-300 flex items-center justify-center text-sm font-semibold ring-1 ring-base-300 group-hover:ring-primary transition">
              {(authUser?.name || 'U').slice(0,1).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.name || 'Guest'}</p>
            <p className="text-xs text-base-content/60 truncate">{authUser?.email || 'Not signed in'}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar;
