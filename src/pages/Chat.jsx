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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-legal-blue-900 mb-4">
          ContraMind Legal AI Chat POC
        </h1>
        <p className="text-gray-600 mb-2">
          Welcome, {userEmail}!
        </p>
        <p className="text-gray-500 text-sm">
          Chat interface coming in Phase 2...
        </p>
      </div>
    </div>
  )
}
