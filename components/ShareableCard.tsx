import React, { forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styles from './ShareableCard.module.css';

interface FormData {
  name: string;
  avatar: string;
  monthlySavings: number;
  retireAge: number;
}

interface ShareableCardProps {
  data: FormData;
  persona: string;
  activeTheme: string;
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(({ data, persona, activeTheme }, ref) => {
  const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const totalSavings = data.monthlySavings * (data.retireAge - 25) * 12; // Simplified calculation for display

  return (
    <div ref={ref} className={`${styles.cardContainer} ${activeTheme}`}>
      <div className={styles.cardHeader}>
        <img src={data.avatar} alt={data.name} className={styles.avatar} />
        <div className={styles.headerText}>
          <h2 className={styles.name}>{data.name}</h2>
          <p className={styles.personaTitle}>Financial Persona</p>
          <p className={styles.persona}>{persona}</p>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Retirement Age</p>
            <p className={styles.statValue}>{data.retireAge}</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statLabel}>Total Stash</p>
            <p className={styles.statValue}>${(totalSavings / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.qrCode}>
          <QRCodeCanvas value={appUrl} size={64} bgColor="transparent" fgColor="#FFFFFF" />
        </div>
        <div className={styles.footerText}>
          <p className={styles.appName}>Retire-A-Friend</p>
          <p className={styles.footerUrl}>{appUrl.replace(/^https?:\/\//, '')}</p>
        </div>
      </div>
    </div>
  );
});

ShareableCard.displayName = 'ShareableCard';
export default ShareableCard;
