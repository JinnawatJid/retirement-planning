'use client';

import { X } from 'lucide-react';
import React from 'react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: string) => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose, onSelectTheme }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center modal-backdrop">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose a Theme</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => onSelectTheme(theme.class)}
              className={`w-full h-24 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform transform hover:scale-105 ${theme.class}`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const themes = [
  { name: 'Sunny Day', class: 'theme-sunny-day' },
  { name: 'Starry Night', class: 'theme-starry-night' },
  { name: 'Party', class: 'theme-party' },
  { name: 'Focused', class: 'theme-focused' },
  { name: 'Retro Pop', class: 'theme-retro-pop' },
  { name: 'Lo-fi', class: 'theme-lofi' },
];

export default ThemeModal;
