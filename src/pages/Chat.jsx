import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'wouter'
import { Send } from 'lucide-react'

export default function Chat() {
  const [, setLocation] = useLocation()
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Arabic detection function (exact specification)
  const containsArabicCharacters = (text) => {
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
    return arabicPattern.test(text)
  }

  // Check authentication
  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail')
    if (!userEmail) {
      setLocation('/')
    }
  }, [setLocation])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return

    // Enforce 5,000 character limit
    if (messageInput.length > 5000) {
      alert('Message too long. Maximum 5,000 characters allowed.')
      return
    }

    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: messageInput.trim(),
      timestamp: new Date(),
      isArabic: containsArabicCharacters(messageInput.trim())
    }

    // Add user message
    setMessages(prev => [...prev, newUserMessage])
    setMessageInput('')
    setIsLoading(true)

    // Simulate AI thinking (1.5 seconds)
    setTimeout(() => {
      const aiResponseMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'This is a test response. [هذا رد تجريبي].',
        timestamp: new Date(),
        isArabic: false
      }
      setMessages(prev => [...prev, aiResponseMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle Enter key (Shift+Enter for new line)
  const handleMessageKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle end session
  const handleEndChatSession = () => {
    sessionStorage.removeItem('userEmail')
    setLocation('/')
  }

  const userEmail = sessionStorage.getItem('userEmail')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header (Fixed Top) */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 fixed top-0 w-full z-10">
        <img 
          src="/contramind-horizontal-transparent.svg" 
          alt="ContraMind AI" 
          className="h-8 w-auto"
        />
        <button
          onClick={handleEndChatSession}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          End Session
        </button>
      </header>

      {/* Disclaimer Strip (Fixed below Header) */}
      <div className="h-8 bg-yellow-50 flex items-center justify-center border-b fixed top-16 w-full z-10">
        <p className="text-xs text-yellow-800 font-medium">
          ⚠️ POC Version - AI Output is NOT Legal Advice
        </p>
      </div>

      {/* Chat Area (Scrollable Middle) */}
      <div className="pt-28 pb-24 px-4 min-h-screen">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 14rem)' }}>
            <div className="text-center max-w-md">
              <h2 className="text-xl font-heading font-bold text-primary mb-2">
                Welcome, {userEmail}!
              </h2>
              <p className="text-sm text-gray-600">
                Start a conversation by typing your legal question below.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-white rounded-2xl rounded-tr-sm ml-auto'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm mr-auto shadow-sm'
                  }`}
                  dir={message.isArabic ? 'rtl' : 'ltr'}
                >
                  <p className={`text-sm leading-relaxed ${message.isArabic ? 'font-arabic' : 'font-sans'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 opacity-60 ${message.isArabic ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area (Fixed Bottom) */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleMessageKeyDown}
              placeholder="Type your legal question... (English or Arabic)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none"
              rows={1}
              style={{
                maxHeight: '120px',
                minHeight: '48px'
              }}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || isLoading}
              className="bg-primary hover:bg-opacity-90 text-white p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Character counter */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Enter to send • Shift+Enter for new line</span>
            <span className={messageInput.length > 4500 ? 'text-yellow-600 font-medium' : ''}>
              {messageInput.length} / 5,000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
