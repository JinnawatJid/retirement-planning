'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Calculator } from 'lucide-react';
import AvatarStep from './AvatarStep';

interface FormData {
  name: string;
  avatar: string;
  startAge: number;
  salary: number;
  monthlySavings: number;
  retireAge: number;
  monthlyExpense: number;
  lifeExpectancy: number;
}

interface RetirementFormProps {
  onClose: () => void;
  onCalculate: (data: FormData) => void;
}

export default function RetirementForm({ onClose, onCalculate }: RetirementFormProps) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    avatar: '',
    startAge: 22,
    salary: language === 'th' ? 30000 : 1000,
    monthlySavings: language === 'th' ? 5000 : 200,
    retireAge: 60,
    monthlyExpense: language === 'th' ? 20000 : 800,
    lifeExpectancy: 80,
  });

  const totalSteps = 7;

  const updateField = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onCalculate(formData);
  };

  const renderStep = () => {
    const currency = language === 'th' ? 'บาท' : 'USD';
    
    switch (currentStep) {
      case 1:
        return (
          <AvatarStep
            name={formData.name}
            avatar={formData.avatar}
            updateField={updateField}
          />
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.startAge.label')}
            </label>
            <input
              type="number"
              value={formData.startAge}
              onChange={(e) => updateField('startAge', parseInt(e.target.value) || 0)}
              placeholder={t('form.startAge.placeholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
              min="15"
              max="35"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.salary.label')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => updateField('salary', parseInt(e.target.value) || 0)}
                placeholder={t('form.salary.placeholder')}
                className="w-full px-4 py-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
                min="0"
              />
              <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                {currency}
              </span>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.monthlySavings.label')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.monthlySavings}
                onChange={(e) => updateField('monthlySavings', parseInt(e.target.value) || 0)}
                placeholder={t('form.monthlySavings.placeholder')}
                className="w-full px-4 py-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
                min="0"
              />
              <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                {currency}
              </span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.retireAge.label')}
            </label>
            <input
              type="number"
              value={formData.retireAge}
              onChange={(e) => updateField('retireAge', parseInt(e.target.value) || 0)}
              placeholder={t('form.retireAge.placeholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
              min="50"
              max="80"
            />
          </div>
        );
      case 6:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.monthlyExpense.label')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.monthlyExpense}
                onChange={(e) => updateField('monthlyExpense', parseInt(e.target.value) || 0)}
                placeholder={t('form.monthlyExpense.placeholder')}
                className="w-full px-4 py-3 pr-16 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
                min="0"
              />
              <span className="absolute right-3 top-3 text-gray-500 dark:text-gray-400">
                {currency}
              </span>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {t('form.lifeExpectancy.label')}
            </label>
            <input
              type="number"
              value={formData.lifeExpectancy}
              onChange={(e) => updateField('lifeExpectancy', parseInt(e.target.value) || 0)}
              placeholder={t('form.lifeExpectancy.placeholder')}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white number-input"
              min="65"
              max="100"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('form.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{t('form.step')} {currentStep} {t('form.of')} {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="progress-bar h-2 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 dark:hover:text-gray-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t('form.back')}
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {t('form.calculate')}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium"
              >
                {t('form.next')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
