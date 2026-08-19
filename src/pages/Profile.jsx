import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Bell, Settings, LogOut, Grid, Bookmark, Heart, MessageCircle } from 'lucide-react'

// Dummy data
const PROFILE_USER = {
  name: 'John Doe',
  handle: '@johndoe',
  bio: 'Frontend Developer & UI/UX Enthusiast. Building modern web experiences. 🚀',
  followers: '12.4K',
  following: '842',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
  cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000'
}

const USER_POSTS = [
  {
    id: 101,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500',
    likes: 342,
    comments: 56
  },
  {
    id: 102,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=500',
    likes: 124,
    comments: 18
  },
  {
    id: 103,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500',
    likes: 89,
    comments: 12
  }
]

function Profile() {
  const [profileData, setProfileData] = useState(PROFILE_USER)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(PROFILE_USER)
  const [activeTab, setActiveTab] = useState('posts')
  const avatarInputRef = useRef(null)

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditForm({...editForm, avatar: e.target.result});
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
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
          <NavItem to="/settings" icon={<Settings />} label="Settings" />
        </nav>

        <Link to="/" className="flex items-center space-x-3 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors p-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </Link>
      </aside>

      {/* Main Profile Content */}
      <main className="w-full max-w-4xl md:ml-64 p-4 sm:p-6 lg:p-10">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-8 transition-colors duration-300">
          {/* Cover Photo */}
          <div className="h-48 w-full bg-slate-200 dark:bg-slate-700 relative">
            <img 
              src={profileData.cover} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-6 group">
              <img 
                src={isEditing ? editForm.avatar : profileData.avatar} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 shadow-md object-cover transition-colors duration-300"
              />
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer m-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <span className="text-white text-xs font-medium">Change Photo</span>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={avatarInputRef} 
                onChange={handleAvatarChange} 
              />
            </div>
            
            <div className="flex justify-end mt-4 mb-4 space-x-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(profileData);
                    }}
                    className="border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 py-2 px-6 rounded-full text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setProfileData(editForm);
                      setIsEditing(false);
                    }}
                    className="btn-primary py-2 px-6 rounded-full text-sm"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-primary py-2 px-6 rounded-full text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            <div className="mt-8">
              {isEditing ? (
                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                      value={editForm.name}
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Handle</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary-500 transition-colors"
                      value={editForm.handle}
                      onChange={e => setEditForm({...editForm, handle: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bio</label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-primary-500 resize-none transition-colors"
                      rows="3"
                      value={editForm.bio}
                      onChange={e => setEditForm({...editForm, bio: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{profileData.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{profileData.handle}</p>
                  
                  <p className="text-slate-700 dark:text-slate-300 mt-4 max-w-2xl leading-relaxed">
                    {profileData.bio}
                  </p>
                </>
              )}
              
              <div className="flex items-center space-x-6 mt-6 border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{profileData.followers}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{profileData.following}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex items-center space-x-8 border-b border-slate-200 dark:border-slate-700 mb-8 overflow-x-auto transition-colors duration-300">
          <button 
            onClick={() => setActiveTab('posts')}
            className={`flex items-center space-x-2 pb-4 border-b-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'posts' ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <Grid size={18} />
            <span>Posts</span>
          </button>
          <button 
            onClick={() => setActiveTab('likes')}
            className={`flex items-center space-x-2 pb-4 border-b-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'likes' ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <Heart size={18} />
            <span>Likes</span>
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center space-x-2 pb-4 border-b-2 font-medium whitespace-nowrap transition-colors ${activeTab === 'saved' ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <Bookmark size={18} />
            <span>Saved</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {USER_POSTS.map(post => (
              <div key={post.id} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative group cursor-pointer transition-colors duration-300">
                <img src={post.image} alt="Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6 text-white">
                  <div className="flex items-center space-x-2 font-medium">
                    <Heart fill="currentColor" size={20} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2 font-medium">
                    <MessageCircle fill="currentColor" size={20} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'likes' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Heart className="text-slate-300 dark:text-slate-600 mb-4 transition-colors" size={48} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">No Liked Posts Yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Posts you like will appear here.</p>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Bookmark className="text-slate-300 dark:text-slate-600 mb-4 transition-colors" size={48} />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">No Saved Posts Yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Save posts you want to see again later.</p>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-50 transition-colors duration-300">
        <MobileNavItem to="/feed" icon={<Home size={24} />} />
        <MobileNavItem to="/notifications" icon={<Bell size={24} />} />
        <MobileNavItem to="/profile" icon={<User size={24} />} active />
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

export default Profile
