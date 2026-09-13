import React from 'react';
import styles from './Tools.module.css';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft } from 'lucide-react';

interface ToolsProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export const Tools: React.FC<ToolsProps> = ({ onBack, onNavigate }) => {
  const tools = [
    { id: 'calculator', label: 'Kalkulator', icon: '🧮' },
    { id: 'converter', label: 'Konverter Satuan', icon: '📏' },
    { id: 'percentage', label: 'Persentase', icon: '%' },
    { id: 'date', label: 'Kalkulator Tanggal', icon: '📅' },
    { id: 'text', label: 'Penghitung Teks', icon: '📝' },
    { id: 'base64', label: 'Base64 Encoder', icon: '🔐' },
    { id: 'json', label: 'JSON Formatter', icon: '{}' },
    { id: 'regex', label: 'Regex Tester', icon: '🔍' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={onBack} aria-label="Kembali">
          <ArrowLeft size={24} />
        </button>
        <h1>Tools</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.content}>
        <div className={styles.grid}>
          {tools.map((tool) => (
            <button key={tool.id} className={styles.card}>
              <div className={styles.icon}>{tool.icon}</div>
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="tools" onNavigate={onNavigate} />
    </div>
  );
};
