import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Bell, Settings as SettingsIcon, LogOut, Heart, MessageCircle, UserPlus } from 'lucide-react'

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    user: { name: 'Sarah Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    content: 'liked your post "The new glassmorphism UI trends..."',
    time: '10m ago',
    unread: true
  },
  {
    id: 2,
    type: 'comment',
    user: { name: 'Alex Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    content: 'commented on your photo: "Wow, this looks amazing!"',
    time: '2h ago',
    unread: true
  },
  {
    id: 3,
    type: 'follow',
    user: { name: 'Mike Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
    content: 'started following you.',
    time: '1d ago',
    unread: false
  },
  {
    id: 4,
    type: 'like',
    user: { name: 'Emma UI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
    content: 'liked your post "Just launched my new portfolio..."',
    time: '2d ago',
    unread: false
  }
]

function Notifications() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center pb-16 md:pb-0 transition-colors duration-300">
      
      {/* Left Sidebar Navigation */}
      <aside className="w-64 fixed left-0 h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 hidden md:flex flex-col transition-colors duration-300">
        <div className="flex items-center space-x-3 text-primary-600 mb-10">
          <div className="bg-primary-100 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">Nexus</span>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem to="/feed" icon={<Home />} label="Home" />
          <NavItem to="/profile" icon={<User />} label="Profile" />
          <NavItem to="/notifications" icon={<Bell />} label="Notifications" />
          <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />
        </nav>

        <Link to="/" className="flex items-center space-x-3 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors p-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="w-full max-w-2xl md:ml-64 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Notifications</h1>
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
          {NOTIFICATIONS.map((notif, index) => (
            <div 
              key={notif.id} 
              className={`p-4 sm:p-5 flex items-start space-x-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer ${
                index !== NOTIFICATIONS.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''
              } ${notif.unread ? 'bg-primary-50/30 dark:bg-primary-900/20' : ''}`}
            >
              <div className="relative mt-1">
                <img src={notif.user.avatar} alt={notif.user.name} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                  {notif.type === 'like' && <Heart size={12} className="text-red-500" fill="currentColor" />}
                  {notif.type === 'comment' && <MessageCircle size={12} className="text-primary-500" fill="currentColor" />}
                  {notif.type === 'follow' && <UserPlus size={12} className="text-green-500" />}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-slate-800 dark:text-slate-200 text-sm">
                  <span className="font-semibold">{notif.user.name}</span> {notif.content}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">{notif.time}</p>
              </div>
              
              {notif.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-50 transition-colors duration-300">
        <MobileNavItem to="/feed" icon={<Home size={24} />} />
        <MobileNavItem to="/notifications" icon={<Bell size={24} />} active />
        <MobileNavItem to="/profile" icon={<User size={24} />} />
      </nav>
    </div>
  )
}

function NavItem({ to, icon, label }) {
  const location = useLocation()
  const active = location.pathname === to

  return (
    <Link to={to} className={`flex items-center space-x-3 p-3 w-full rounded-xl transition-all duration-200 font-medium ${
      active 
        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-primary-600 dark:hover:text-primary-400'
    }`}>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function MobileNavItem({ to, icon, active }) {
  const location = useLocation()
  const isActive = active || location.pathname === to
  return (
    <Link to={to} className={`p-2 rounded-xl transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-primary-500 dark:hover:text-primary-400'}`}>
      {icon}
    </Link>
  )
}

export default Notifications
