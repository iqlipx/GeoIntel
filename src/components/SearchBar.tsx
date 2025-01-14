import React, { useState } from 'react';
import { Search, Shuffle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidIPAddress, generateRandomIP } from '../utils/ipValidation';

interface SearchBarProps {
  onSearch: (ip: string) => void;
  isLoading: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!input.trim()) {
      setError('Please enter an IP address');
      return;
    }
    
    if (!isValidIPAddress(input.trim())) {
      setError('Please enter a valid IP address');
      return;
    }
    
    onSearch(input.trim());
  };

  const handleRandomIP = () => {
    const randomIP = generateRandomIP();
    setInput(randomIP);
    onSearch(randomIP);
  };

  return (
    <div className="w-full max-w-2xl space-y-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <motion.div
            className="relative flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Enter IP address..."
              className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 dark:border-gray-700 
                       focus:border-blue-500 focus:outline-none pr-32 bg-white/90 dark:bg-gray-800/90 
                       backdrop-blur-sm text-gray-900 dark:text-gray-100"
            />
            <div className="absolute right-2 flex space-x-2">
              <button
                type="button"
                onClick={handleRandomIP}
                className="p-3 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 
                         transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Shuffle className="w-6 h-6" />
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 text-white bg-blue-500 rounded-full hover:bg-blue-600 
                         transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <Search className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>
          
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-24 top-16 bg-gray-900 text-white px-3 py-1 rounded text-sm"
              >
                Try a random IP
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-red-500 dark:text-red-400 px-4"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}