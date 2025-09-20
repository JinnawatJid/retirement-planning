import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './WrappedResult.module.css';
import { X, MoreHorizontal, Pencil, Share2 } from 'lucide-react';
import ThemeModal from './ThemeModal';
import { useTheme } from '@/contexts/ThemeContext';

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

interface WrappedResultProps {
  data: FormData;
  onClose: () => void;
  onShare: () => void;
}

const WrappedResult: React.FC<WrappedResultProps> = ({ data, onClose, onShare }) => {
  const { t, language } = useLanguage();
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'th' ? 'th-TH' : 'en-US').format(num);
  };

  const workingYears = data.retireAge - data.startAge;
  const workingMonths = workingYears * 12;
  const retirementYears = data.lifeExpectancy - data.retireAge;
  const retirementMonths = retirementYears * 12;
  const totalSavings = data.monthlySavings * (workingYears * 12);
  const totalExpenses = data.monthlyExpense * (retirementYears * 12);
  const currency = language === 'th' ? 'บาท' : 'USD';
  const lifeSpan = data.lifeExpectancy - data.startAge;
  const workingProgress = (workingYears / lifeSpan) * 100;

  const isSufficient = totalSavings >= totalExpenses;
  const balance = totalSavings - totalExpenses;

  useEffect(() => {
    // Set default theme based on results
    setTheme(isSufficient ? 'theme-sunny-day' : 'theme-starry-night');
  }, [isSufficient, setTheme]);

  useEffect(() => {
    const body = document.body;
    body.classList.add('wrapped-active');

    return () => {
      body.classList.remove('wrapped-active');
    };
  }, []);

  return (
    <div className={styles.wrappedContainer}>
      <div className={styles.menuContainer}>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.menuButton}>
          <MoreHorizontal size={24} />
        </button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button onClick={() => { onShare(); setIsMenuOpen(false); }} className={styles.dropdownItem}>
              <Share2 size={18} className="mr-2" />
              Share
            </button>
            <button onClick={() => { setIsThemeModalOpen(true); setIsMenuOpen(false); }} className={styles.dropdownItem}>
              <Pencil size={18} className="mr-2" />
              Edit Theme
            </button>
            <button onClick={onClose} className={styles.dropdownItem}>
              <X size={18} className="mr-2" />
              Close
            </button>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <header className={`${styles.header} wrapped-card wrapped-card-1`}>
          <img src={data.avatar} alt={data.name} className={styles.avatar} />
          <p className="wrapped-subtitle">{t('results.planFor')}</p>
          <h1 className="wrapped-title">{t('results.summary', { name: data.name })}</h1>
        </header>

        <div className={`${styles.grid}`}>
            <div className={`wrapped-card wrapped-card-2 ${styles.statCard}`}>
                <div className="text-4xl mb-2">💼</div>
                <div className={styles.statLabel}>{t('results.workPeriod')}</div>
                <div className={styles.statValue}>{workingYears} {t('results.years')}</div>
                <div className={styles.statDesc}>{t('results.or')} {formatNumber(workingMonths)} {t('results.months')}
                </div>
            </div>
            <div className={`wrapped-card wrapped-card-3 ${styles.statCard}`}>
                <div className="text-4xl mb-2">🏖️</div>
                <div className={styles.statLabel}>{t('results.retirePeriod')}</div>
                <div className={styles.statValue}>{retirementYears} {t('results.years')}</div>
                <div className={styles.statDesc}>{t('results.or')} {formatNumber(retirementMonths)} {t('results.months')}
                </div>
            </div>
        </div>

        <div className="wrapped-card wrapped-card-4">
            <h2 className="text-xl font-bold text-center mb-4">{t('Life Timeline')}</h2>
            <div className={styles.timeline}>
                <div className={styles.timelineProgress} style={{ width: `${workingProgress}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
                <span>{t('common.age')} {data.startAge}</span>
                <span>{t('common.age')} {data.retireAge}</span>
                <span>{t('common.age')} {data.lifeExpectancy}</span>
            </div>
        </div>

        <div className="wrapped-card wrapped-card-5 text-center">
            <div className="text-4xl mb-2">💰</div>
            <h2 className="text-xl font-bold mb-2">{t('results.totalSavings')}</h2>
            <div className="wrapped-highlight">{formatNumber(totalSavings)} {currency}</div>
        </div>

        <div className="wrapped-card wrapped-card-6 text-center">
            <div className="text-4xl mb-2">💸</div>
            <h2 className="text-xl font-bold mb-2">{t('results.totalExpense')}</h2>
            <div className="wrapped-highlight">{formatNumber(totalExpenses)} {currency}</div>
        </div>

        <div className={`wrapped-card wrapped-card-7 ${styles.finalVerdict}`}>
            <h2 className="text-2xl font-bold mb-2">
                {isSufficient
                    ? '✅ ' + (language === 'th' ? 'เพียงพอ!' : 'Sufficient!')
                    : '⚠️ ' + (language === 'th' ? 'ไม่เพียงพอ' : 'Insufficient')
                }
            </h2>
            <p className="text-lg">
                {isSufficient
                    ? (language === 'th' ? `ฉันจะมีเงินเหลืออีก ${formatNumber(balance)} ${currency}` : `You'll have a surplus of ${formatNumber(balance)} ${currency}`)
                    : (language === 'th' ? `ฉันขาดเงินอีก ${formatNumber(Math.abs(balance))} ${currency}` : `You're short by ${formatNumber(Math.abs(balance))} ${currency}`)
                }
            </p>
        </div>
      </div>
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </div>
  );
};

export default WrappedResult;
