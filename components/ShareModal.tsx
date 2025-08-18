'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Copy, Facebook, Link, X } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function ShareModal({ isOpen, onClose, data }: ShareModalProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      startAge: data.startAge.toString(),
      salary: data.salary.toString(),
      monthlySavings: data.monthlySavings.toString(),
      retireAge: data.retireAge.toString(),
      monthlyExpense: data.monthlyExpense.toString(),
      lifeExpectancy: data.lifeExpectancy.toString(),
      lang: language,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const shareUrl = generateShareUrl();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToFacebook = () => {
    const text = language === 'th' 
      ? 'ฉันได้วางแผนเกษียณแล้ว! มาดูผลการคำนวณของฉัน'
      : 'I just planned my retirement! Check out my calculation results';
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLine = () => {
    const text = language === 'th'
      ? 'ฉันได้วางแผนเกษียณแล้ว! มาดูผลการคำนวณของฉัน'
      : 'I just planned my retirement! Check out my calculation results';
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center modal-backdrop">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('share.title')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">
              {copied ? t('share.copied') : t('share.link')}
            </span>
          </button>

          {/* Facebook Share */}
          <button
            onClick={shareToFacebook}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Facebook className="w-5 h-5" />
            <span className="font-medium">{t('share.facebook')}</span>
          </button>

          {/* Line Share */}
          <button
            onClick={shareToLine}
            className="w-full flex items-center justify-center space-x-3 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <Link className="w-5 h-5" />
            <span className="font-medium">{t('share.line')}</span>
          </button>

          {/* Share URL Display */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {language === 'th' ? 'ลิงก์สำหรับแชร์:' : 'Share URL:'}
            </label>
            <div className="flex">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
