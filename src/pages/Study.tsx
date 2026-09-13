import React from 'react';
import styles from './Study.module.css';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft } from 'lucide-react';

interface StudyProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export const Study: React.FC<StudyProps> = ({ onBack, onNavigate }) => {
  const features = [
    { id: 'summary', label: 'Ringkasan Materi', icon: '📚' },
    { id: 'notes', label: 'Buat Catatan', icon: '📝' },
    { id: 'flashcard', label: 'Flashcard', icon: '🎓' },
    { id: 'quiz', label: 'Quiz', icon: '❓' },
    { id: 'practice', label: 'Soal Latihan', icon: '✏️' },
    { id: 'guide', label: 'Study Guide', icon: '📖' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={onBack} aria-label="Kembali">
          <ArrowLeft size={24} />
        </button>
        <h1>Belajar</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.content}>
        <div className={styles.grid}>
          {features.map((feature) => (
            <button key={feature.id} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <span>{feature.label}</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="study" onNavigate={onNavigate} />
    </div>
  );
};
