import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'wouter'
import { Send, LogOut } from 'lucide-react'

export default function Chat() {
  const [, setLocation] = useLocation()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Arabic detection function (exact specification)
  const isArabic = (text) => {
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
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    // Enforce 5,000 character limit
    if (inputValue.length > 5000) {
      alert('Message too long. Maximum 5,000 characters allowed.')
      return
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      isArabic: isArabic(inputValue.trim())
    }

    // Add user message
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI thinking (1.5 seconds)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'This is a test response. [هذا رد تجريبي].',
        timestamp: new Date(),
        isArabic: false
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Handle Enter key (Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Handle end session
  const handleEndSession = () => {
    sessionStorage.removeItem('userEmail')
    setLocation('/')
  }

  const userEmail = sessionStorage.getItem('userEmail')

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header (Fixed) */}
      <header className="border-b border-gray-200">
        {/* Top Bar with Logo and End Session */}
        <div className="flex items-center justify-between px-4 py-4">
          <img 
            src="/contramind-horizontal-transparent.svg" 
            alt="ContraMind AI" 
            className="h-8 w-auto"
          />
          <button
            onClick={handleEndSession}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary border border-gray-300 rounded-lg hover:border-primary transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">End Session</span>
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-t border-b border-yellow-200 px-4 py-2">
          <p className="text-center text-sm text-yellow-800 font-medium">
            ⚠️ POC Version - AI Output is NOT Legal Advice
          </p>
        </div>
      </header>

      {/* Message Area (Grow/Scroll) */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">
                Welcome, {userEmail}!
              </h2>
              <p className="text-gray-600 mb-4">
                Start a conversation by typing your legal question below.
              </p>
              <p className="text-sm text-gray-500">
                The AI will respond in the same language you use (English or Arabic).
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  dir={message.isArabic ? 'rtl' : 'ltr'}
                >
                  <p className={`text-sm leading-relaxed ${message.isArabic ? 'font-arabic' : 'font-sans'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-2 opacity-70 ${message.isArabic ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3">
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
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your legal question here... (English or Arabic)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none resize-none transition-all"
              rows={1}
              style={{
                maxHeight: '120px',
                minHeight: '48px',
                height: 'auto',
                overflowY: inputValue.split('\n').length > 3 ? 'auto' : 'hidden'
              }}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="bg-primary hover:bg-opacity-90 text-white p-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Character counter */}
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className={inputValue.length > 4500 ? 'text-yellow-600 font-medium' : ''}>
              {inputValue.length} / 5,000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
