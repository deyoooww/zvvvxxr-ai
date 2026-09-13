import React from 'react';
import styles from './Header.module.css';
import { Sparkles } from 'lucide-react';
import { AISettings } from '@/types';

interface HeaderProps {
  aiName?: string;
  aiAvatar?: string;
  settings?: AISettings;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  aiName = 'Zee',
  aiAvatar,
  settings,
  onMenuClick 
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img 
          src={aiAvatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 48 48%22%3E%3Crect fill=%22%239d4edd%22 width=%2248%22 height=%2248%22/%3E%3C/svg%3E'}
          alt={aiName}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>ZVVVXXR AI</h1>
          <p className={styles.status}>
            <span className={styles.dot}>●</span>
            Online
          </p>
        </div>
      </div>
      <button className={styles.menu} onClick={onMenuClick} aria-label="Menu">
        <Sparkles size={20} />
      </button>
    </header>
  );
};
