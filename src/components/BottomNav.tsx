import React from 'react';
import styles from './BottomNav.module.css';
import { Home, BookOpen, Zap, User } from 'lucide-react';

interface BottomNavProps {
  active?: 'home' | 'study' | 'tools' | 'profile';
  onNavigate?: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ active = 'home', onNavigate }) => {
  const items = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'study', label: 'Belajar', icon: BookOpen },
    { id: 'tools', label: 'Tools', icon: Zap },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`${styles.item} ${active === item.id ? styles.active : ''}`}
              onClick={() => onNavigate?.(item.id)}
              aria-label={item.label}
              aria-current={active === item.id ? 'page' : undefined}
            >
              <Icon size={24} />
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
