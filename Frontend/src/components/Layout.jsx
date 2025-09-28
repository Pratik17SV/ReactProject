import { Outlet } from 'react-router-dom';

const Layout = ({ showSidebar = false, children }) => {
  return (
    <div className="flex h-screen">
      {showSidebar && (
        <div className="w-64 bg-base-200 border-r border-base-300">
          {/* Sidebar content */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">Navigation</h2>
            {/* Add sidebar navigation items here */}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default Layout;
