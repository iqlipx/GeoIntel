import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 
                 dark:border-red-800 rounded-lg p-4"
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
        <p className="text-red-700 dark:text-red-300">{message}</p>
      </div>
    </motion.div>
  );
}