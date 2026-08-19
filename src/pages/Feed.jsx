import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, Bell, Settings, Image as ImageIcon, Heart, MessageCircle, Share2, LogOut, Sparkles, Loader2 } from 'lucide-react'

// Dummy data for initial UI
const DUMMY_POSTS = [
  {
    id: 1,
    author: { name: 'Alex Johnson', handle: '@alexj', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    content: 'Just launched my new portfolio built with React and Tailwind CSS! 🚀 So excited to share it with everyone.',
    likes: 42,
    comments: 12,
    replies: [],
    time: '2h ago',
    isLiked: false
  },
  {
    id: 2,
    author: { name: 'Sarah Smith', handle: '@sarah_designs', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    content: 'The new glassmorphism UI trends are absolutely stunning. What do you guys think?',
    likes: 128,
    comments: 34,
    replies: [
      { id: 1, author: 'Jane', content: 'Looks amazing!', time: '1h ago' }
    ],
    time: '5h ago',
    isLiked: true
  }
]

const AI_IDEAS = [
  "Just had a great coffee and figured out a bug that was haunting me for 3 days! ☕️🐛 #developerlife",
  "What's everyone's favorite framework in 2026? I'm still loving React but experimenting with some new tools. 🤔",
  "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs 🎨",
  "Taking a much-needed break from the screen today to enjoy the outdoors. Remember to rest your eyes! 🌲☀️"
]

function Feed() {
  const [posts, setPosts] = useState(DUMMY_POSTS)
  const [newPostContent, setNewPostContent] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeCommentId, setActiveCommentId] = useState(null)
  const [commentInput, setCommentInput] = useState('')
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !selectedImage) return

    const newPost = {
      id: Date.now(),
      author: { name: 'You', handle: '@you', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' },
      content: newPostContent,
      image: selectedImage,
      likes: 0,
      comments: 0,
      replies: [],
      time: 'Just now',
      isLiked: false
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setSelectedImage(null)
  }

  const handleGenerateAI = () => {
    setIsGeneratingAI(true)
    setTimeout(() => {
      const randomIdea = AI_IDEAS[Math.floor(Math.random() * AI_IDEAS.length)]
      setNewPostContent(randomIdea)
      setIsGeneratingAI(false)
    }, 1500)
  }

  const toggleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return { 
          ...post, 
          isLiked: !post.isLiked, 
          likes: post.isLiked ? post.likes - 1 : post.likes + 1 
        }
      }
      return post
    }))
  }

  const handleShare = async (postId) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`)
      alert('Post link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const submitComment = (postId) => {
    if (!commentInput.trim()) return
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          replies: [
            ...post.replies,
            { id: Date.now(), author: 'You', content: commentInput, time: 'Just now' }
          ]
        }
      }
      return post
    }))
    setCommentInput('')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center pb-16 md:pb-0 transition-colors duration-300">
      
      {/* Left Sidebar Navigation (Desktop) */}
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

      {/* Main Feed Content */}
      <main className="w-full max-w-2xl md:ml-64 p-4 sm:p-6">
        
        {/* Create Post Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 mb-6 transition-colors duration-300">
          <div className="flex space-x-4">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
              alt="Your avatar" 
              className="w-10 h-10 rounded-full bg-slate-100"
            />
            <div className="flex-1">
              <textarea 
                placeholder="What's on your mind?"
                className="w-full bg-transparent resize-none outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 mt-2"
                rows="3"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              ></textarea>
              {selectedImage && (
                <div className="relative mt-3 mb-2">
                  <img src={selectedImage} alt="Preview" className="max-h-64 rounded-xl object-cover" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              )}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex space-x-2">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-slate-500 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30"
                  >
                    <ImageIcon size={20} />
                    <span className="text-sm font-medium hidden sm:inline">Photo</span>
                  </button>
                  <button 
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI}
                    className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 disabled:opacity-50"
                  >
                    {isGeneratingAI ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
                    <span className="text-sm font-medium hidden sm:inline">{isGeneratingAI ? 'Generating...' : 'AI Assist'}</span>
                  </button>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={(!newPostContent.trim() && !selectedImage) || isGeneratingAI}
                  className="btn-primary py-1.5 px-6 rounded-full text-sm disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full bg-slate-100" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{post.author.name}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{post.author.handle} • {post.time}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                {post.content}
              </p>

              {post.image && (
                <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                  <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-96" />
                </div>
              )}

              <div className="flex items-center space-x-6 border-t border-slate-100 dark:border-slate-700 pt-3 text-slate-500 dark:text-slate-400">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors group ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                >
                  <div className={`p-1.5 rounded-full transition-colors ${post.isLiked ? 'bg-red-50 dark:bg-red-900/30' : 'group-hover:bg-red-50 dark:group-hover:bg-red-900/20'}`}>
                    <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
                  </div>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button 
                  onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                  className="flex items-center space-x-2 hover:text-primary-500 transition-colors group"
                >
                  <div className="p-1.5 rounded-full group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button 
                  onClick={() => handleShare(post.id)}
                  className="flex items-center space-x-2 hover:text-green-500 transition-colors group ml-auto"
                >
                  <div className="p-1.5 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                    <Share2 size={18} />
                  </div>
                </button>
              </div>

              {/* Comments Section */}
              {activeCommentId === post.id && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {post.replies && post.replies.map(reply => (
                      <div key={reply.id} className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{reply.author} <span className="text-slate-400 font-normal ml-1">{reply.time}</span></p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{reply.content}</p>
                      </div>
                    ))}
                    {(!post.replies || post.replies.length === 0) && (
                      <p className="text-sm text-slate-400 text-center py-2">No comments yet. Be the first!</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <input 
                      type="text" 
                      placeholder="Write a comment..."
                      className="flex-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 dark:text-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-500"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') submitComment(post.id)
                      }}
                    />
                    <button 
                      onClick={() => submitComment(post.id)}
                      disabled={!commentInput.trim()}
                      className="bg-primary-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-around p-3 pb-safe z-50 transition-colors duration-300">
        <MobileNavItem to="/feed" icon={<Home size={24} />} active />
        <MobileNavItem to="/notifications" icon={<Bell size={24} />} />
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

export default Feed
