'use client';

import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Share2, Download, ArrowLeft, Briefcase, Sun, TrendingUp, TrendingDown, Award, BarChart2 } from 'lucide-react';
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
  const retirementYears = data.lifeExpectancy - data.retireAge;
  const totalSavings = data.monthlySavings * workingYears * 12;
  const totalExpenses = data.monthlyExpense * retirementYears * 12;
  const savingsVsExpenses = totalSavings - totalExpenses;
  const currency = language === 'th' ? 'THB' : 'USD';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'th' ? 'th-TH' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const resultsRef = useRef<HTMLDivElement>(null);

  const saveResults = async () => {
    if (!resultsRef.current) return;

    const canvas = await html2canvas(resultsRef.current, {
      useCORS: true,
      backgroundColor: null, // Use the actual background
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `MyRetirementStory-${data.name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const StatCard = ({ icon, title, value, unit, delay }: { icon: React.ReactNode, title: string, value: string, unit: string, delay: number }) => (
    <div className={`wrapped-card wrapped-card-${delay} text-center`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="wrapped-subtitle mb-2">{title}</h3>
      <p className="wrapped-highlight">{value}</p>
      <p className="opacity-70">{unit}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto wrapped-bg">
      <div className="sticky top-0 z-10 p-4 bg-black bg-opacity-20 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={onClose} className="flex items-center text-white hover:opacity-80">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="flex space-x-2">
            <button onClick={saveResults} className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Save
            </button>
            <button onClick={onShare} className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div ref={resultsRef} className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center text-center text-white pt-8 pb-12">
          <img src={data.avatar} alt={data.name} className="w-32 h-32 rounded-full mb-6 border-4 border-white/50 shadow-lg object-cover" />
          <h1 className="wrapped-title">
            {t('results.summary', { name: data.name }) || `${data.name}'s Retirement Story`}
          </h1>
          <p className="wrapped-subtitle mt-2 max-w-2xl">
            Here's a look at your journey to retirement and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <StatCard icon={<Briefcase />} title="Working Years" value={String(workingYears)} unit="Years" delay={1} />
          <StatCard icon={<Sun />} title="Retirement Years" value={String(retirementYears)} unit="Years" delay={2} />
          <StatCard icon={<TrendingUp />} title="Total Savings" value={formatCurrency(totalSavings)} unit="by age " delay={3} />
          <StatCard icon={<TrendingDown />} title="Total Expenses" value={formatCurrency(totalExpenses)} unit="in retirement" delay={4} />
        </div>

        <div className={`wrapped-card wrapped-card-5 mt-6 text-center`}>
          <div className="text-4xl mb-4">{savingsVsExpenses >= 0 ? <Award /> : <BarChart2 />}</div>
          <h3 className="wrapped-subtitle mb-2">Financial Outcome</h3>
          <p className="wrapped-highlight">{formatCurrency(savingsVsExpenses)}</p>
          <p className="opacity-70 mt-2">
            {savingsVsExpenses >= 0 ? "Surplus at the end of your plan!" : "Shortfall to be addressed."}
          </p>
        </div>

        <div className={`wrapped-card wrapped-card-6 mt-6 text-center`}>
          <p className="text-lg font-semibold">
            From age {data.startAge} to {data.retireAge}, you're in your earning era. Then, from {data.retireAge} to {data.lifeExpectancy}, it's time to enjoy the fruits of your labor.
          </p>
        </div>
      </div>
    </div>
  );
}
