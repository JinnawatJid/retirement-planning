'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Globe, Heart } from 'lucide-react';

interface HeaderProps {
  onDonationClick: () => void;
}

export default function Header({ onDonationClick }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle between a default light and dark theme
    const newTheme = theme === 'theme-sunny-day' ? 'theme-starry-night' : 'theme-sunny-day';
    setTheme(newTheme);
  };

  const isLightTheme = theme === 'theme-sunny-day';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RP</span>
          </div>
          <h1 className="text-xl font-bold">{t('landing.title')}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Change Language"
          >
            <Globe className="w-5 h-5" />
            <span className="ml-1 text-sm font-medium">
              {language === 'th' ? 'EN' : 'TH'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isLightTheme ? t('common.darkMode') : t('common.lightMode')}
          >
            {isLightTheme ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Donation Button */}
          <button
            onClick={onDonationClick}
            className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'th' ? 'สนับสนุน' : 'Donate'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
