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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-legal-blue-900 mb-2">
            ContraMind Legal AI Chat POC
          </h1>
          <p className="text-gray-600">
            Legal AI Assistant - Proof of Concept
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-legal-blue-500 focus:border-transparent outline-none"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-legal-blue-900 hover:bg-legal-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
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
        <p className="text-center text-sm text-gray-600 mt-6">
          ⚠️ POC Version - AI Output is NOT Legal Advice
        </p>
      </div>
    </div>
  )
}
