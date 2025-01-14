import React from 'react';
import { Github, Instagram, Linkedin, Globe, Heart } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/iqlipx',
      label: 'GitHub'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/iqlip7',
      label: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/iqlip',
      label: 'LinkedIn'
    },
    {
      icon: Globe,
      href: 'https://iqlip.vercel.app',
      label: 'Portfolio'
    }
  ];

  return (
    <footer className="w-full py-6 mt-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 
                       dark:hover:text-blue-400 transition-colors"
              aria-label={link.label}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <span>Made by iqlip with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
        </div>
      </div>
    </footer>
  );
}