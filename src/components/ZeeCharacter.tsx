import React from 'react';
import styles from './ZeeCharacter.module.css';
import { AISettings } from '@/types';

interface ZeeCharacterProps {
  settings?: AISettings;
  state?: 'idle' | 'thinking' | 'listening' | 'working' | 'success' | 'error' | 'happy';
  customAvatar?: string;
}

export const ZeeCharacter: React.FC<ZeeCharacterProps> = ({ 
  settings, 
  state = 'idle',
  customAvatar 
}) => {
  const characterSize = settings?.characterSize || 'medium';
  const glowIntensity = settings?.glowIntensity || 'medium';
  const particleIntensity = settings?.particleIntensity || 'medium';
  const animationLevel = settings?.animationLevel || 'medium';
  const ringEffect = settings?.ringEffect || 'off';
  const opacity = settings?.characterOpacity || 1;
  const zoom = settings?.characterZoom || 1;

  const sizeMap = {
    small: '120px',
    medium: '200px',
    large: '280px',
    xlarge: '340px',
  };

  const glowMap = {
    off: 'none',
    soft: '0 0 20px rgba(255, 20, 147, 0.3)',
    medium: '0 0 40px rgba(255, 20, 147, 0.5), 0 0 60px rgba(157, 78, 221, 0.3)',
    strong: '0 0 60px rgba(255, 20, 147, 0.8), 0 0 100px rgba(157, 78, 221, 0.6)',
  };

  return (
    <div className={styles.container}>
      {ringEffect !== 'off' && (
        <div 
          className={`${styles.ring} ${styles[`ring_${ringEffect}`]} ${styles[`animate_${animationLevel}`]}`}
        />
      )}
      
      <div
        className={`${styles.character} ${styles[`state_${state}`]} ${styles[`animate_${animationLevel}`]}`}
        style={{
          width: sizeMap[characterSize as keyof typeof sizeMap],
          height: sizeMap[characterSize as keyof typeof sizeMap],
          opacity,
          transform: `scale(${zoom})`,
          boxShadow: glowMap[glowIntensity as keyof typeof glowMap],
          backgroundImage: customAvatar ? `url(${customAvatar})` : 'url(data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 240%22%3E%3C/svg%3E)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {particleIntensity !== 'off' && (
        <div className={`${styles.particles} ${styles[`particles_${particleIntensity}`]}`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.particle} />
          ))}
        </div>
      )}
    </div>
  );
};
