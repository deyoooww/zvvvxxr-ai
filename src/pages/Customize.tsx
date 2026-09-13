import React, { useState, useRef } from 'react';
import styles from './Customize.module.css';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ZeeCharacter } from '@/components/ZeeCharacter';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { AISettings } from '@/types';

interface CustomizeProps {
  settings?: AISettings;
  onBack?: () => void;
  onSave?: (settings: AISettings) => void;
  onNavigate?: (page: string) => void;
}

export const Customize: React.FC<CustomizeProps> = ({ 
  settings, 
  onBack,
  onSave,
  onNavigate 
}) => {
  const [customSettings, setCustomSettings] = useState<AISettings>(settings || {
    name: 'Zee',
    characterSize: 'medium',
    characterPosition: { x: 0, y: 0 },
    characterZoom: 1,
    characterOpacity: 1,
    glowIntensity: 'medium',
    particleIntensity: 'medium',
    animationLevel: 'medium',
    ringEffect: 'off',
    visualStyle: 'default',
    wallpaperMode: 'default',
    wallpaperOpacity: 1,
    wallpaperBlur: 0,
    wallpaperBrightness: 1,
    wallpaperScope: 'chat-only',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (newName: string) => {
    setCustomSettings({ ...customSettings, name: newName });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCustomSettings({ ...customSettings, avatar: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setCustomSettings({ ...customSettings, avatar: undefined });
  };

  const handleCharacterSizeChange = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
    setCustomSettings({ ...customSettings, characterSize: size });
  };

  const handleGlowChange = (glow: 'off' | 'soft' | 'medium' | 'strong') => {
    setCustomSettings({ ...customSettings, glowIntensity: glow });
  };

  const handleParticlesChange = (particles: 'off' | 'low' | 'medium' | 'high') => {
    setCustomSettings({ ...customSettings, particleIntensity: particles });
  };

  const handleAnimationChange = (animation: 'off' | 'low' | 'medium' | 'high') => {
    setCustomSettings({ ...customSettings, animationLevel: animation });
  };

  const handleSave = () => {
    onSave?.(customSettings);
    onBack?.();
  };

  const handleReset = () => {
    setCustomSettings({
      name: 'Zee',
      characterSize: 'medium',
      characterPosition: { x: 0, y: 0 },
      characterZoom: 1,
      characterOpacity: 1,
      glowIntensity: 'medium',
      particleIntensity: 'medium',
      animationLevel: 'medium',
      ringEffect: 'off',
      visualStyle: 'default',
      wallpaperMode: 'default',
      wallpaperOpacity: 1,
      wallpaperBlur: 0,
      wallpaperBrightness: 1,
      wallpaperScope: 'chat-only',
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.back} onClick={onBack} aria-label="Kembali">
          <ArrowLeft size={24} />
        </button>
        <h1>Kustomisasi AI</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className={styles.content}>
        {/* Preview */}
        <div className={styles.preview_section}>
          <h2>Preview</h2>
          <div className={styles.preview}>
            <ZeeCharacter settings={customSettings} customAvatar={customSettings.avatar} />
          </div>
        </div>

        {/* Nama AI */}
        <div className={styles.section}>
          <h3>Nama AI</h3>
          <input
            type="text"
            value={customSettings.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={styles.input}
            placeholder="Masukkan nama AI"
          />
        </div>

        {/* Foto AI */}
        <div className={styles.section}>
          <h3>Foto AI</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className={styles.hidden_input}
          />
          <button
            className={styles.upload_btn}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={18} />
            <span>Pilih Foto</span>
          </button>
          {customSettings.avatar && (
            <button className={styles.remove_btn} onClick={handleRemovePhoto}>
              <X size={18} />
              <span>Hapus Foto</span>
            </button>
          )}
        </div>

        {/* Ukuran Karakter */}
        <div className={styles.section}>
          <h3>Ukuran Karakter</h3>
          <div className={styles.button_group}>
            {['small', 'medium', 'large', 'xlarge'].map((size) => (
              <button
                key={size}
                className={`${styles.option_btn} ${customSettings.characterSize === size ? styles.active : ''}`}
                onClick={() => handleCharacterSizeChange(size as any)}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Intensitas Cahaya */}
        <div className={styles.section}>
          <h3>Intensitas Cahaya (Glow)</h3>
          <div className={styles.button_group}>
            {['off', 'soft', 'medium', 'strong'].map((glow) => (
              <button
                key={glow}
                className={`${styles.option_btn} ${customSettings.glowIntensity === glow ? styles.active : ''}`}
                onClick={() => handleGlowChange(glow as any)}
              >
                {glow.charAt(0).toUpperCase() + glow.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Intensitas Partikel */}
        <div className={styles.section}>
          <h3>Intensitas Partikel</h3>
          <div className={styles.button_group}>
            {['off', 'low', 'medium', 'high'].map((particles) => (
              <button
                key={particles}
                className={`${styles.option_btn} ${customSettings.particleIntensity === particles ? styles.active : ''}`}
                onClick={() => handleParticlesChange(particles as any)}
              >
                {particles.charAt(0).toUpperCase() + particles.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Level Animasi */}
        <div className={styles.section}>
          <h3>Level Animasi</h3>
          <div className={styles.button_group}>
            {['off', 'low', 'medium', 'high'].map((animation) => (
              <button
                key={animation}
                className={`${styles.option_btn} ${customSettings.animationLevel === animation ? styles.active : ''}`}
                onClick={() => handleAnimationChange(animation as any)}
              >
                {animation.charAt(0).toUpperCase() + animation.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttons}>
          <button className={styles.reset_btn} onClick={handleReset}>
            Reset Default
          </button>
          <button className={styles.save_btn} onClick={handleSave}>
            Simpan Perubahan
          </button>
        </div>
      </div>

      <BottomNav onNavigate={onNavigate} />
    </div>
  );
};
