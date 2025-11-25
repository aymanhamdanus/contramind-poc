import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// --- 🧠 THE MANAGER'S CORNER (PROMPT ENGINEERING) ---
const SYSTEM_INSTRUCTION = `
You are a helpful, professional AI assistant for a company called Contramind.
- Your goal is to help the user build a Proof of Concept (POC).
- Keep answers concise, clear, and friendly.
- If asked about technical details, explain them simply.
`;
// ----------------------------------------------------

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the Contramind AI. How can I help you today? [مرحباً! أنا مساعد كونترا مايند. كيف يمكنني مساعدتك اليوم؟]' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    // 1. Add User Message to UI
    const userMessage = { role: 'user', content: messageInput };
    setMessages((prev) => [...prev, userMessage]);
    setMessageInput('');
    setIsLoading(true);

    // Validate API Key
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: "⚠️ Configuration Error: API Key is missing. Please check your .env.local file." 
      }]);
      setIsLoading(false);
      return;
    }

    try {
      // 2. Setup the AI Client
      const ai = new GoogleGenAI({ apiKey });

      // 3. Prepare History
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      // 4. Call the Real Brain
      const { response } = await ai.models.generateContent({
        model: 'gemini-1.5-pro',
        config: { systemInstruction: SYSTEM_INSTRUCTION },
        contents: [
          ...history, 
          { role: 'user', parts: [{ text: messageInput }] }
        ],
      });

      // 5. Show the Answer
      const aiText = response.text();
      setMessages((prev) => [...prev, { role: 'assistant', content: aiText }]);

    } catch (error) {
      console.error("Gemini Error:", error);
      
      let errorMessage = "⚠️ Sorry, I had trouble connecting to the AI. Please try again.";
      
      if (error.message?.includes('API_KEY') || error.message?.includes('apiKey') || error.message?.includes('401')) {
        errorMessage = "⚠️ Invalid API Key. Please check your configuration.";
      } else if (error.message?.includes('RATE_LIMIT') || error.message?.includes('429')) {
        errorMessage = "⚠️ Rate limit exceeded. Please wait a moment and try again.";
      } else if (error.message?.includes('network') || error.name === 'TypeError' || error.message?.includes('Failed to fetch')) {
        errorMessage = "⚠️ Network error. Please check your internet connection.";
      } else if (error.message?.includes('SAFETY') || error.message?.includes('blocked')) {
        errorMessage = "⚠️ The response was blocked due to safety filters. Please rephrase your question.";
      }
      
      setMessages((prev) => [...prev, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
             {/* ✅ LOGO: We forced the width to w-40 (roughly 160px) */}
             <img 
                src="/contramind-horizontal-transparent.svg" 
                alt="ContraMind AI" 
                className="h-10 w-40 object-contain"
              />
        </div>
        <a href="/" className="text-gray-500 hover:text-gray-900 text-sm font-medium">
          End Session
        </a>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
           <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3">
            <span className="text-blue-600 mt-0.5">ℹ️</span>
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Confidentiality Notice:</strong> This is a secure environment. 
              Always verify AI-generated information.
            </p>
          </div>

          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here... [اكتب رسالتك هنا...]"
            className="w-full pl-4 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none h-[60px] min-h-[60px] max-h-[120px]"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !messageInput.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;