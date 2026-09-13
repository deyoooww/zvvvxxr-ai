import React, { useState, useRef, useEffect } from 'react';
import styles from './Composer.module.css';
import { Plus, Mic, Send } from 'lucide-react';

interface ComposerProps {
  onSendMessage?: (message: string, attachments?: any[]) => void;
  onPlusClick?: () => void;
  onMicClick?: () => void;
  disabled?: boolean;
  aiName?: string;
}

export const Composer: React.FC<ComposerProps> = ({ 
  onSendMessage,
  onPlusClick,
  onMicClick,
  disabled = false,
  aiName = 'Zee'
}) => {
  const [message, setMessage] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const viewport = window.visualViewport;
      if (viewport) {
        const keyboardH = window.innerHeight - viewport.height;
        setKeyboardHeight(Math.max(0, keyboardH));
      }
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div 
      className={styles.composer}
      style={{
        paddingBottom: `calc(max(1rem, env(safe-area-inset-bottom)) + ${keyboardHeight}px)`,
      }}
    >
      <div className={styles.container}>
        <button 
          className={styles.button} 
          onClick={onPlusClick}
          disabled={disabled}
          aria-label="Tambah file atau media"
        >
          <Plus size={20} />
        </button>
        
        <div className={styles.input_wrapper}>
          <textarea
            ref={textareaRef}
            className={styles.input}
            placeholder={`Ketik apa aja ke ${aiName}...`}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            aria-label="Pesan"
          />
        </div>

        <button 
          className={styles.button} 
          onClick={onMicClick}
          disabled={disabled}
          aria-label="Suara"
        >
          <Mic size={20} />
        </button>
        
        <button 
          className={`${styles.button} ${styles.send} ${!message.trim() ? styles.disabled : ''}`}
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          aria-label="Kirim pesan"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
