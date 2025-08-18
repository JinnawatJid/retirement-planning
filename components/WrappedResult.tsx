import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './WrappedResult.module.css';
import { X, Share2 } from 'lucide-react';

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

  return (
      <div className={`${styles.wrappedContainer} wrapped-bg`}>
        <div className={styles.content}>
          <header className={`${styles.header} wrapped-card wrapped-card-1`}>
            <img src={data.avatar} alt={data.name} className={styles.avatar} />
          <p className="wrapped-subtitle">{t('results.planFor')}</p>
          <h1 className="wrapped-title">{t('results.summary', { name: data.name })}</h1>
        </header>

        <div className={`${styles.grid}`}>
            <div className={`wrapped-card wrapped-card-2 ${styles.statCard}`}>
                <div className={styles.statLabel}>{t('results.workPeriod')}</div>
                <div className={styles.statValue}>{workingYears} {t('results.years')}</div>
                <div className={styles.statDesc}>{t('results.or')} {formatNumber(workingMonths)} {t('results.months')}
                </div>
            </div>
            <div className={`wrapped-card wrapped-card-3 ${styles.statCard}`}>
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
                <span>{t('common.age')} {data.startAge} {t('common.year')}</span>
                <span>{t('common.age')} {data.retireAge} {t('common.year')}</span>
                <span>{t('common.age')} {data.lifeExpectancy} {t('common.year')}</span>
            </div>
        </div>

        <div className="wrapped-card wrapped-card-5">
            <h2 className="text-xl font-bold text-center mb-4">{t('results.totalSavings')}</h2>
            <div className="text-center">
                <div className="wrapped-highlight">{formatNumber(totalSavings)} {currency}</div>
            </div>
        </div>

        <div className="wrapped-card wrapped-card-6">
            <h2 className="text-xl font-bold text-center mb-4">{t('results.totalExpense')}</h2>
            <div className="text-center">
                <div className="wrapped-highlight">{formatNumber(totalExpenses)} {currency}</div>
            </div>
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
      <button onClick={onShare} className={styles.shareButton}>
        <Share2 size={24} />
      </button>
      <button onClick={onClose} className={styles.closeButton}>
        <X size={24} />
      </button>
    </div>
  );
};

export default WrappedResult;
