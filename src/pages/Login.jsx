import { useState } from 'react'
import { useLocation } from 'wouter'

export default function Login() {
  const [emailInput, setEmailInput] = useState('')
  const [, setLocation] = useLocation()

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (emailInput.trim()) {
      sessionStorage.setItem('userEmail', emailInput.trim())
      setLocation('/chat')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Compact Header with Logo */}
      <header className="w-full pt-8 py-6 px-4 border-b border-gray-200">
        <div className="container mx-auto max-w-md">
          <img 
            src="/contramind-horizontal-transparent.svg" 
            alt="ContraMind AI" 
            className="h-12 md:h-16 max-w-[200px] mx-auto mb-8"
          />
        </div>
      </header>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
              Legal AI Assistant
            </h1>
            <p className="text-sm text-gray-600">
              Proof of Concept
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-surface border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-heading font-semibold text-primary mb-4 text-center">
              Enter your email to start
            </h2>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Start Chat
              </button>
            </form>

            {/* Quality Monitoring Notice */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to quality monitoring of conversations for improvement purposes.
            </p>
          </div>

          {/* Legal Disclaimer */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 text-center font-medium">
              ⚠️ POC Version - AI Output is NOT Legal Advice
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
