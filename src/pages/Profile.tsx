import React from 'react';
import styles from './Profile.module.css';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { useAISettings } from '@/hooks/useDB';

interface ProfileProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
  onCustomize?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onBack, onNavigate, onCustomize }) => {
  const { settings } = useAISettings();

  const aiName = settings?.name || 'Zee';
  const aiAvatar = settings?.avatar;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={onBack} aria-label="Kembali">
          <ArrowLeft size={24} />
        </button>
        <h1>Profil AI</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.content}>
        {/* Character Preview */}
        <div className={styles.character_preview}>
          <img
            src={aiAvatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 240%22%3E%3C/svg%3E'}
            alt={aiName}
            className={styles.avatar}
          />
          <div className={styles.info}>
            <h2>{aiName}</h2>
            <p>AI Companion</p>
            <div className={styles.status}>
              <span className={styles.dot}>●</span>
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className={styles.sections}>
          <div className={styles.section}>
            <h3>Kepribadian</h3>
            <p>Cute, warm, friendly, caring, intelligent</p>
          </div>

          <div className={styles.section}>
            <h3>Kemampuan</h3>
            <p>Chat, Homework, Study, Image, Document, Coding, Website Builder, Tools</p>
          </div>

          <div className={styles.section}>
            <h3>Gaya Percakapan</h3>
            <p>Bahasa Indonesia dengan sentuhan casual dan manja</p>
          </div>

          <div className={styles.section}>
            <h3>Suara</h3>
            <p>Tidak tersedia di platform ini</p>
          </div>

          {/* Customization Button */}
          <button className={styles.customize_btn} onClick={onCustomize}>
            <Edit2 size={18} />
            <span>Kustomisasi AI</span>
          </button>
        </div>
      </div>

      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
};
