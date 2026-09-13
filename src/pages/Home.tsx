import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Header } from '@/components/Header';
import { ZeeCharacter } from '@/components/ZeeCharacter';
import { QuickActions } from '@/components/QuickActions';
import { Composer } from '@/components/Composer';
import { BottomNav } from '@/components/BottomNav';
import { useAISettings, useConversations } from '@/hooks/useDB';
import { Conversation, Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface HomeProps {
  onNavigate?: (page: string) => void;
  onOpenChat?: (conversation: Conversation) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenChat }) => {
  const { settings, loading: settingsLoading } = useAISettings();
  const { saveConversation } = useConversations();
  const [characterState, setCharacterState] = useState<'idle' | 'thinking' | 'listening' | 'working' | 'success' | 'error' | 'happy'>('idle');

  const aiName = settings?.name || 'Zee';
  const aiAvatar = settings?.avatar;

  const handleSendMessage = async (message: string) => {
    setCharacterState('thinking');
    
    // Create new conversation
    const conversationId = uuidv4();
    const userMessage: Message = {
      id: uuidv4(),
      conversationId,
      content: message,
      role: 'user',
      timestamp: Date.now(),
    };

    const assistantMessage: Message = {
      id: uuidv4(),
      conversationId,
      content: getZeeResponse(message, aiName),
      role: 'assistant',
      timestamp: Date.now() + 1000,
    };

    const conversation: Conversation = {
      id: conversationId,
      title: message.substring(0, 50),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [userMessage, assistantMessage],
      aiName: aiName,
      aiAvatar: aiAvatar,
    };

    await saveConversation(conversation);
    setCharacterState('success');
    setTimeout(() => setCharacterState('idle'), 1000);
    onOpenChat?.(conversation);
  };

  const getZeeResponse = (message: string, name: string): string => {
    const responses = [
      `okee, aku bantu ${message.toLowerCase()}`,
      `mauu, kita kerjain bareng yuk`,
      `sini aku lihat dulu...`,
      `boleh banget! ayo kita mulai`,
      `iyaa, gampang kok. tunggu yaa`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (settingsLoading) {
    return <div className={styles.loading}>Memuat...</div>;
  }

  return (
    <div className={styles.container}>
      <Header aiName={aiName} aiAvatar={aiAvatar} settings={settings} />
      
      <div className={styles.content}>
        <div className={styles.character_section}>
          <ZeeCharacter 
            settings={settings || undefined}
            state={characterState}
            customAvatar={aiAvatar}
          />
        </div>

        <div className={styles.greeting}>
          <h2>Heyy, aku {aiName}.</h2>
          <p>Mau ngapain hari inii?</p>
        </div>

        <QuickActions onActionClick={(action) => {
          console.log('Action clicked:', action);
          setCharacterState('thinking');
          setTimeout(() => setCharacterState('idle'), 1500);
        }} />
      </div>

      <Composer 
        onSendMessage={handleSendMessage}
        aiName={aiName}
        onPlusClick={() => console.log('Plus clicked')}
        onMicClick={() => {
          setCharacterState('listening');
          setTimeout(() => setCharacterState('idle'), 2000);
        }}
      />

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
};
