import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="glass-panel p-8 max-w-md w-full text-center space-y-6">
        <div className="mx-auto bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome to Nexus</h1>
        <p className="text-slate-500 dark:text-slate-400">Your modern social media experience powered by React, Tailwind CSS, and Supabase.</p>
        <Link to="/auth" className="btn-primary w-full inline-block mt-4">
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Landing
