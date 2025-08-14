'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator, TrendingUp, Shield, DollarSign, Clock, Target } from 'lucide-react';

interface LandingPageProps {
  onStartCalculator: () => void;
}

export default function LandingPage({ onStartCalculator }: LandingPageProps) {
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: t('landing.why.point1'),
      description: 'การเงินเฟ้อเฉลี่ย 2-3% ต่อปี',
    },
    {
      icon: Shield,
      title: t('landing.why.point2'),
      description: 'เงินบำนาญอาจไม่เพียงพอสำหรับค่าใช้จ่าย',
    },
    {
      icon: DollarSign,
      title: t('landing.why.point3'),
      description: 'การออมเงินสม่ำเสมอสร้างความมั่นคง',
    },
    {
      icon: Clock,
      title: t('landing.why.point4'),
      description: 'เวลาคือปัจจัยสำคัญในการลงทุน',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('landing.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12">
              {t('landing.subtitle')}
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={onStartCalculator}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Calculator className="w-6 h-6 mr-3" />
              {t('landing.cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Why Plan Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('landing.why.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg card-hover animate-fadeInUp"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fadeInUp">
              <div className="text-4xl font-bold text-primary-500 mb-2">65%</div>
              <p className="text-gray-600 dark:text-gray-300">
                ของคนไทยไม่มีเงินออมเพียงพอสำหรับเกษียณ
              </p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary-500 mb-2">20x</div>
              <p className="text-gray-600 dark:text-gray-300">
                เงินเดือนต่อปีที่ควรมีเมื่อเกษียณ
              </p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary-500 mb-2">30</div>
              <p className="text-gray-600 dark:text-gray-300">
                ปีที่ควรเริ่มวางแผนเกษียณ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
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
