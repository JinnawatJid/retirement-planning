import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './WrappedResult.module.css';
import { X, MoreHorizontal, Pencil, Share2 } from 'lucide-react';
import ThemeModal from './ThemeModal';
import ShareableCard from './ShareableCard';

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
}

const WrappedResult: React.FC<WrappedResultProps> = ({ data, onClose }) => {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const handleShareAsImage = async () => {
    if (!cardRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'retirement-card.png', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Retirement Plan!',
          text: 'Check out my retirement plan card!',
        });
      } else {
        throw new Error("Web Share API not supported for files.");
      }
    } catch (error) {
      console.error('Sharing failed, falling back to download', error);
      // Fallback to download
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = 'retirement-card.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleThemeSelect = (theme: string) => {
    setActiveTheme(theme);
    setIsThemeModalOpen(false);
  };

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

  const getFinancialPersona = (data: FormData): string => {
    const savingsRate = (data.monthlySavings * 12) / data.salary;
    if (data.retireAge < 50) return "Chillonaire";
    if (savingsRate > 0.3) return "Future Mogul";
    if (savingsRate > 0.15) return "Side-Hustle Superstar";
    if (isSufficient && data.retireAge <= 65) return "Golden Years Guru";
    if (!isSufficient) return "Vibe Curator";
    return "Slow and Steady";
  };
  const persona = getFinancialPersona(data);

  useEffect(() => {
    // Set default theme based on results
    setActiveTheme(isSufficient ? 'theme-sunny-day' : 'theme-starry-night');
  }, [isSufficient]);

  return (
    <div className={`${styles.wrappedContainer} ${activeTheme}`}>
      <div className={styles.menuContainer}>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.menuButton}>
          <MoreHorizontal size={24} />
        </button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button onClick={() => { handleShareAsImage(); setIsMenuOpen(false); }} className={styles.dropdownItem}>
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
        onSelectTheme={handleThemeSelect}
      />
      <ShareableCard ref={cardRef} data={data} persona={persona} activeTheme={activeTheme} />
    </div>
  );
};

export default WrappedResult;
