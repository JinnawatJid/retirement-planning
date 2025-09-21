'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations = {
  th: {
    // Landing Page
    'landing.title': 'วางแผนเกษียณ',
    'landing.subtitle': 'วางแผนเกษียณเพื่ออนาคตที่มั่นคงของคุณ',
    'landing.why.title': 'ทำไมต้องวางแผนเกษียณ?',
    'landing.why.point1': 'เงินเฟ้อทำให้ค่าครองชีพสูงขึ้นเรื่อยๆ',
    'landing.why.point2': 'เงินเดือนหลังเกษียณอาจไม่เพียงพอ',
    'landing.why.point3': 'ออมเงินตั้งแต่วันนี้อนาคตมั่นคง',
    'landing.why.point4': 'ลงทุนระยะยาวสร้างผลตอบแทนที่ดี',
    'landing.cta': 'วางแผนเกษียณกัน!',
    
    // Form
    'form.title': 'แนะนำตัวหน่อยสิ!',
    'form.step': 'ขั้นตอนที่',
    'form.of': 'จาก',
    'form.next': 'ถัดไป',
    'form.back': 'กลับ',
    'form.calculate': 'คำนวณผล',
    
    'form.startAge.label': 'เธอเริ่มทำงานตอนอายุเท่าไหร่?',
    'form.startAge.placeholder': 'เช่น 22',
    'form.startAge.unit': 'ปี',
    
    'form.salary.label': 'เงินเดือนที่ได้รับล่ะ?',
    'form.salary.placeholder': 'เช่น 30,000',
    'form.salary.unit': 'บาท',
    
    'form.monthlySavings.label': 'แล้วออมเงินเดือนละเท่าไหร่?',
    'form.monthlySavings.placeholder': 'เช่น 5,000',
    'form.monthlySavings.unit': 'บาท',
    
    'form.retireAge.label': 'คิดว่าจะเกษียณตอนอายุเท่าไหร่?',
    'form.retireAge.placeholder': 'เช่น 60',
    'form.retireAge.unit': 'ปี',
    
    'form.monthlyExpense.label': 'จะใช้เงินเกษียณเดือนละเท่าไหร่?',
    'form.monthlyExpense.placeholder': 'เช่น 20,000',
    'form.monthlyExpense.unit': 'บาท',
    
    'form.lifeExpectancy.label': 'คิดว่าจะมีชีวิตอยู่ถึงเมื่อไหร่?',
    'form.lifeExpectancy.placeholder': 'เช่น 80',
    'form.lifeExpectancy.unit': 'ปี',

    'form.whoAreYou': 'เธอคือใคร?',
    'form.yourName': 'ชื่อของเธอละ?',
    'form.namePlaceholder': 'เช่น Jinnawat.Finance',
    'form.selectAvatar': 'เลือกอวตาร',
    'form.uploadAvatar': 'อัปโหลดรูปภาพ',
    
    // Results
    'results.title': 'ผลลัพธ์',
    'results.planFor': 'ฉันคือ',
    'results.summary': '{{name}}',
    'results.workPeriod': 'ฉันจะทำงาน',
    'results.retirePeriod': 'ใช้ชีวิตเกษียณ',
    'results.years': 'ปี',
    'results.months': 'เดือน',
    'results.or': 'หรือ',
    'results.totalSavings': 'เงินออมตลอดช่วงทำงาน',
    'results.totalExpense': 'ต้องการใช้เงินหลังเกษียณ',
    'results.perMonth': 'เดือนละ',
    'results.working': 'ทำงาน',
    'results.retired': 'เกษียณ',
    'results.save': 'บันทึก',
    'results.share': 'แชร์',
    
    // Share Modal
    'share.title': 'แชร์',
    'share.link': 'คัดลอกลิงก์',
    'share.facebook': 'แชร์ใน Facebook',
    'share.line': 'แชร์ใน Line',
    'share.copied': 'คัดลอกแล้ว!',
    
    // Donation
    'donation.title': 'สนับสนุนนักพัฒนา',
    'donation.subtitle': 'หากคุณชอบเครื่องมือนี้ สามารถสนับสนุนการพัฒนาได้',
    'donation.promptpay': 'โอนผ่าน PromptPay',
    'donation.bank': 'ธนาคารกรุงเทพ',
    'donation.thanks': 'ขอบคุณสำหรับการสนับสนุน!',
    'donation.close': 'ปิด',
    
    // Common
    'common.close': 'ปิด',
    'common.baht': 'บาท',
    'common.age': 'อายุ',
    'common.year': 'ปี',
    'common.month': 'เดือน',
    'common.darkMode': 'โหมดมืด',
    'common.lightMode': 'โหมดสว่าง',
  },
  en: {
    // Landing Page
    'landing.title': 'Retirement Planning',
    'landing.subtitle': 'Start planning your finances for a secure future',
    'landing.why.title': 'Why Plan for Retirement?',
    'landing.why.point1': 'Inflation increases cost of living over time',
    'landing.why.point2': 'Post-retirement income may not be sufficient',
    'landing.why.point3': 'Saving from today ensures a secure future',
    'landing.why.point4': 'Long-term investments provide good returns',
    'landing.cta': 'Start Retirement Calculator',
    
    // Form
    'form.title': 'Retirement Planning Information',
    'form.step': 'Step',
    'form.of': 'of',
    'form.next': 'Next',
    'form.back': 'Back',
    'form.calculate': 'Calculate',
    
    'form.startAge.label': 'What age did you start working?',
    'form.startAge.placeholder': 'e.g. 22',
    
    'form.salary.label': 'What is your monthly salary?',
    'form.salary.placeholder': 'e.g. 1,000',
    'form.salary.unit': 'USD',
    
    'form.monthlySavings.label': 'How much do you save monthly?',
    'form.monthlySavings.placeholder': 'e.g. 200',
    'form.monthlySavings.unit': 'USD',
    
    'form.retireAge.label': 'At what age will you retire?',
    'form.retireAge.placeholder': 'e.g. 60',
    
    'form.monthlyExpense.label': 'How much do you need monthly after retirement?',
    'form.monthlyExpense.placeholder': 'e.g. 800',
    'form.monthlyExpense.unit': 'USD',
    
    'form.lifeExpectancy.label': 'What is your expected lifespan?',
    'form.lifeExpectancy.placeholder': 'e.g. 80',

    'form.whoAreYou': 'Who are you?',
    'form.yourName': 'Your Name',
    'form.namePlaceholder': 'e.g. John Doe',
    'form.selectAvatar': 'Select Avatar',
    'form.uploadAvatar': 'Upload Image',
    
    // Results
    'results.title': 'Retirement Planning Results',
    'results.planFor': 'Retirement Plan for {{name}}',
    'results.summary': 'Summary of your retirement planning calculations',
    'results.workPeriod': 'Total working period',
    'results.retirePeriod': 'Life after retirement',
    'results.years': 'years',
    'results.months': 'months',
    'results.or': 'or',
    'results.totalSavings': 'Total savings during working period',
    'results.totalExpense': 'Total expenses needed after retirement',
    'results.perMonth': 'per month',
    'results.working': 'Working',
    'results.retired': 'Retired',
    'results.save': 'Save',
    'results.share': 'Share',
    
    // Share Modal
    'share.title': 'Share Results',
    'share.link': 'Copy Link',
    'share.facebook': 'Share on Facebook',
    'share.line': 'Share on Line',
    'share.copied': 'Copied!',
    
    // Donation
    'donation.title': 'Support the Developer',
    'donation.subtitle': 'If you like this tool, you can support its development',
    'donation.promptpay': 'Transfer via PromptPay',
    'donation.bank': 'Bangkok Bank',
    'donation.thanks': 'Thank you for your support!',
    'donation.close': 'Close',
    
    // Common
    'common.close': 'Close',
    'common.baht': 'USD',
    'common.age': 'age',
    'common.year': 'year',
    'common.month': 'month',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'th' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
