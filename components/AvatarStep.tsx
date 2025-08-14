'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Pencil } from 'lucide-react';

interface AvatarStepProps {
  name: string;
  avatar: string;
    updateField: (field: 'name' | 'avatar', value: string) => void;
}

const AVATARS = [
  'Adam.png', 'Albert.png', 'Jackson.png', 'James.png', 
  'Maria.png', 'Mavis.png', 'Selma.png', 'Tisha.png'
];

export default function AvatarStep({ name, avatar, updateField }: AvatarStepProps) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarSelect = (avatarUrl: string) => {
    updateField('avatar', avatarUrl);
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleAvatarSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t('form.whoAreYou')}
      </h2>
      
      <div className="relative">
        <div 
          className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <Pencil className="w-12 h-12 text-gray-500" />
          )}
        </div>
        <div 
          className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('form.yourName')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder={t('form.namePlaceholder')}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{t('form.selectAvatar')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-4">
              {AVATARS.map(avatarFile => (
                <img
                  key={avatarFile}
                  src={`/avatar/${avatarFile}`}
                  alt={avatarFile}
                  className="w-20 h-20 rounded-full object-cover cursor-pointer hover:ring-4 hover:ring-primary-500"
                  onClick={() => handleAvatarSelect(`/avatar/${avatarFile}`)}
                />
              ))}
            </div>

            <div>
              <label htmlFor="upload-avatar" className="w-full text-center px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 block">
                {t('form.uploadAvatar')}
              </label>
              <input
                id="upload-avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
