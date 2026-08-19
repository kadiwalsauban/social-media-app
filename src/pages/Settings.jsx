import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, User, Bell, Settings as SettingsIcon, LogOut, Moon, Sun, Lock, Shield, UserCog } from 'lucide-react'

function Settings() {
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
  
  const handleDarkModeToggle = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const navigate = useNavigate()

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
      <main className="w-full max-w-2xl md:ml-64 p-4 sm:p-6 lg:p-10">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8">Settings</h1>
        
        <div className="space-y-6">
          
          {/* Account Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center space-x-3">
              <UserCog className="text-primary-500" size={24} />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Account Preferences</h2>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Edit Profile</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Change your display name, handle, and bio.</p>
                </div>
                <button onClick={() => navigate('/profile')} className="btn-primary py-1.5 px-4 rounded-full text-sm">Edit</button>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Push Notifications</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts for likes and comments.</p>
                </div>
                <Toggle enabled={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center space-x-3">
              <Shield className="text-green-500" size={24} />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Privacy & Security</h2>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Private Account</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Only approved followers can see your posts.</p>
                </div>
                <Toggle enabled={privateAccount} onChange={() => setPrivateAccount(!privateAccount)} />
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Change Password</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Update your account password.</p>
                </div>
                <button onClick={() => alert('A password reset link has been sent to your registered email address.')} className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">Update</button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center space-x-3">
              <Moon className="text-purple-500" size={24} />
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Appearance</h2>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">Dark Mode</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark theme across the app.</p>
                </div>
                <Toggle enabled={darkMode} onChange={handleDarkModeToggle} />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/50 overflow-hidden transition-colors duration-300">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-600 dark:text-red-500">Delete Account</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete your data.</p>
                </div>
                <button onClick={() => { if(window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) { alert('Account deleted. (Simulated)') } }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 py-1.5 px-4 rounded-full text-sm font-medium transition-colors border border-red-200 dark:border-red-800/50">Delete</button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-50 transition-colors duration-300">
        <MobileNavItem to="/feed" icon={<Home size={24} />} />
        <MobileNavItem to="/notifications" icon={<Bell size={24} />} />
        <MobileNavItem to="/profile" icon={<User size={24} />} />
      </nav>
    </div>
  )
}

function Toggle({ enabled, onChange }) {
  return (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        enabled ? 'bg-primary-500' : 'bg-slate-200'
      }`}
    >
      <span 
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
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

export default Settings
