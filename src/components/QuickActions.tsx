import React from 'react';
import styles from './QuickActions.module.css';
import { MessageCircle, BookOpen, Image, Code2, Globe } from 'lucide-react';

interface QuickActionsProps {
  onActionClick?: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    { id: 'general', label: 'Tanya apa aja', icon: MessageCircle },
    { id: 'homework', label: 'Kerjakan tugas', icon: BookOpen },
    { id: 'image', label: 'Analisis foto', icon: Image },
    { id: 'coding', label: 'Bantu coding', icon: Code2 },
    { id: 'website', label: 'Buat website', icon: Globe },
  ];

  return (
    <div className={styles.actions}>
      {actions.slice(0, 4).map((action, idx) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            className={styles.action}
            onClick={() => onActionClick?.(action.id)}
            aria-label={action.label}
          >
            <Icon size={18} />
            <span>{action.label}</span>
          </button>
        );
      })}
      <button
        className={`${styles.action} ${styles.full}`}
        onClick={() => onActionClick?.(actions[4].id)}
        aria-label={actions[4].label}
      >
        <actions[4].icon size={18} />
        <span>{actions[4].label}</span>
      </button>
    </div>
  );
};
