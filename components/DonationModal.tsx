'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { X, Heart, CreditCard } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              🥺
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('donation.title')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            {t('donation.subtitle')}
          </p>

          {/* PromptPay Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('donation.promptpay')}
                </h4>
              </div>
              
              {/* QR Code */}
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img src="/qrcode/665857.jpg" alt="QR Code" className="w-40 h-40 object-cover" />
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'th' 
                    ? 'สแกน QR Code ด้วยแอปธนาคารของคุณ'
                    : 'Scan QR Code with your banking app'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Thank you message */}
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-400 font-medium">
              {t('donation.thanks')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
          >
            {t('donation.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
