'use client';

import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2, Download, ArrowLeft } from 'lucide-react';
import html2canvas from 'html2canvas';

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

interface ResultsPageProps {
  data: FormData;
  onClose: () => void;
  onShare: () => void;
}

export default function ResultsPage({ data, onClose, onShare }: ResultsPageProps) {
  const { t, language } = useLanguage();

  // Calculations
  const workingYears = data.retireAge - data.startAge;
  const workingMonths = workingYears * 12;
  const retirementYears = data.lifeExpectancy - data.retireAge;
  const retirementMonths = retirementYears * 12;
  const totalSavings = data.monthlySavings * workingMonths;
  const totalExpenses = data.monthlyExpense * retirementMonths;
  const currency = language === 'th' ? 'บาท' : 'USD';

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'th' ? 'th-TH' : 'en-US').format(num);
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const saveResults = async () => {
    if (!resultsRef.current) return;

    const canvas = await html2canvas(resultsRef.current, {
      useCORS: true,
      onclone: (document) => {
        const adElement = document.querySelector('#ad-space');
        if (adElement) {
          (adElement as HTMLElement).style.display = 'none';
        }
      },
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `retirement-plan-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Progress bar calculation (working period vs total life span considered)
  const totalLifeSpan = data.lifeExpectancy - data.startAge;
  const workingProgress = (workingYears / totalLifeSpan) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === 'th' ? 'กลับ' : 'Back'}
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('results.title')}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={saveResults}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('results.save')}
              </button>
              <button
                onClick={onShare}
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t('results.share')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={resultsRef} className="container mx-auto px-4 py-8">
        {/* User Avatar Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <img src={data.avatar} alt={data.name} className="w-24 h-24 rounded-full mr-6 object-cover" />
            <div>
              <h2 className="text-lg text-gray-900 dark:text-white">
                {t('results.planFor')}
              </h2>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('results.summary', { name: data.name })}
              </h2>
            </div>
          </div>
        </div>
        {/* Main Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Working Period */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('results.workPeriod')}
              </h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {workingYears} {t('results.years')}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                {t('results.or')} {formatNumber(workingMonths)} {t('results.months')}
              </div>
            </div>
          </div>

          {/* Right Side - Retirement Period */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🏖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('results.retirePeriod')}
              </h3>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {retirementYears} {t('results.years')}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400">
                {t('results.or')} {formatNumber(retirementMonths)} {t('results.months')}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {language === 'th' ? 'ช่วงเวลาชีวิต' : 'Life Timeline'}
          </h3>
          <div className="relative">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                style={{ width: `${workingProgress}%` }}
              >
                {t('results.working')}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{data.startAge} {t('common.age')}</span>
              <span>{data.retireAge} {t('common.age')}</span>
              <span>{data.lifeExpectancy} {t('common.age')}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Total Savings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('results.totalSavings')}
              </h3>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {formatNumber(data.monthlySavings)} {currency} × {formatNumber(workingMonths)} {t('results.months')} =
              </div>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatNumber(totalSavings)} {currency}
              </div>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💸</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('results.totalExpense')}
              </h3>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {formatNumber(data.monthlyExpense)} {currency} × {formatNumber(retirementMonths)} {t('results.months')} =
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatNumber(totalExpenses)} {currency}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'th' ? 'การวิเคราะห์' : 'Analysis'}
          </h3>
          <div className="space-y-4">
            {totalSavings >= totalExpenses ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <h4 className="font-bold text-green-800 dark:text-green-400">
                      {language === 'th' ? 'แผนการออมของฉันเพียงพอ!' : 'Your savings plan is sufficient!'}
                    </h4>
                    <p className="text-green-700 dark:text-green-300">
                      {language === 'th' 
                        ? `คุณจะมีเงินเหลือ ${formatNumber(totalSavings - totalExpenses)} ${currency} หลังเกษียณ`
                        : `You will have ${formatNumber(totalSavings - totalExpenses)} ${currency} remaining after retirement`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-400">
                      {language === 'th' ? 'แผนการออมของฉันไม่เพียงพอ' : 'Your savings plan is insufficient'}
                    </h4>
                    <p className="text-red-700 dark:text-red-300">
                      {language === 'th' 
                        ? `คุณขาดเงิน ${formatNumber(totalExpenses - totalSavings)} ${currency} สำหรับการเกษียณ`
                        : `You are short ${formatNumber(totalExpenses - totalSavings)} ${currency} for retirement`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ad Space */}
        <div id="ad-space" className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            Advertisement Space
          </p>
          <div className="h-24 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">
              [Your Ad Here]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
