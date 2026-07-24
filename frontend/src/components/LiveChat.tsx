'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Welcome to the GOATHIDES Concierge. How may we assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Trigger Bot Response
    setTimeout(() => {
      let botResponse = 'Thank you for contacting us. A client advisor will join shortly. Alternatively, you can reach us instantly on WhatsApp.';
      const query = inputText.toLowerCase();

      if (query.includes('order') || query.includes('track')) {
        botResponse = 'To track an order, please visit our Order Tracking page under the profile menu, or supply your GH- order number here.';
      } else if (query.includes('leather') || query.includes('quality') || query.includes('goat')) {
        botResponse = 'Our leather is sourced responsibly from regional farms. We specialize in full-grain goat leather which is lighter, stronger, and more water-resistant than traditional cowhide.';
      } else if (query.includes('care') || query.includes('clean')) {
        botResponse = 'For details on leather preservation, check our Leather Care page. We recommend avoiding direct prolonged exposure to extreme moisture and utilizing specialized leather balms.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 border border-luxury-gold-500/20 shadow-2xl rounded-lg w-80 sm:w-96 overflow-hidden flex flex-col mb-4 h-[450px]"
          >
            {/* Header */}
            <div className="bg-luxury-charcoal-900 text-luxury-gold-200 px-4 py-3 flex justify-between items-center border-b border-luxury-gold-500/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="font-serif text-sm tracking-wider">GOATHIDES Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-luxury-charcoal-400 hover:text-luxury-gold-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-luxury-ivory-100/40 dark:bg-black/10">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] rounded p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-luxury-gold-500 text-luxury-charcoal-900 font-medium'
                        : 'bg-white dark:bg-luxury-charcoal-800 text-luxury-charcoal-800 dark:text-luxury-ivory-100 border border-luxury-gold-500/5 shadow-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-60 block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Integration Button */}
            <div className="px-4 py-2 border-t border-luxury-gold-500/10 bg-white/40 dark:bg-black/20 flex items-center justify-between">
              <span className="text-[10px] text-luxury-charcoal-400 font-medium">Need instant human response?</span>
              <a
                href="https://wa.me/180046284433"
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-3 py-1 font-bold rounded flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-luxury-gold-500/10 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your inquiry..."
                className="flex-1 bg-transparent border border-luxury-gold-500/20 px-3 py-2 text-xs focus:outline-none focus:border-luxury-gold-500 text-luxury-charcoal-900 dark:text-luxury-ivory-100 rounded"
              />
              <button
                type="submit"
                className="bg-luxury-charcoal-900 dark:bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-gold-500 dark:text-luxury-charcoal-900 p-2 rounded transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-luxury-charcoal-900 dark:bg-luxury-gold-500 hover:bg-luxury-gold-500 dark:hover:bg-luxury-gold-600 text-luxury-gold-500 dark:text-luxury-charcoal-900 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-115 flex items-center justify-center border border-luxury-gold-500/20"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
};
export default LiveChat;
