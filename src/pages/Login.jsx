import { useState } from 'react'
import { useLocation } from 'wouter'

export default function Login() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [, setLocation] = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    // Save email to sessionStorage
    sessionStorage.setItem('userEmail', email)
    
    // Redirect to chat page
    setLocation('/chat')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Logo */}
      <header className="w-full py-6 px-4 border-b border-gray-200">
        <div className="container mx-auto">
          <img 
            src="/contramind-horizontal-transparent.svg" 
            alt="ContraMind AI" 
            className="h-10 w-auto"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-3">
              Legal AI Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Proof of Concept
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-surface rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-heading font-semibold text-primary mb-6 text-center">
              Enter your email to start
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Start Chat
              </button>
            </form>

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to quality monitoring of conversations for improvement purposes.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-center text-sm text-yellow-800 font-medium">
              ⚠️ POC Version - AI Output is NOT Legal Advice
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
