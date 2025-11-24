import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function Chat() {
  const [, setLocation] = useLocation()

  useEffect(() => {
    // Check if user has email in session
    const userEmail = sessionStorage.getItem('userEmail')
    if (!userEmail) {
      // Redirect to login if no email found
      setLocation('/')
    }
  }, [setLocation])

  const userEmail = sessionStorage.getItem('userEmail')

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
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Welcome to ContraMind AI
          </h1>
          <p className="text-gray-600 mb-2 text-lg">
            Hello, <span className="font-medium text-primary">{userEmail}</span>!
          </p>
          <div className="mt-8 p-6 bg-surface rounded-lg border border-gray-200 inline-block">
            <p className="text-gray-500">
              Chat interface coming in Phase 2...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
