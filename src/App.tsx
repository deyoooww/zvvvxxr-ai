import React, { useState, useEffect } from 'react';
import { Home } from '@/pages/Home';
import { Chat } from '@/pages/Chat';
import { Profile } from '@/pages/Profile';
import { Customize } from '@/pages/Customize';
import { Conversation, AISettings } from '@/types';
import { useAISettings } from '@/hooks/useDB';
import { db } from '@/db/db';

type Page = 'home' | 'chat' | 'profile' | 'customize' | 'study' | 'tools';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();
  const { settings, saveSettings } = useAISettings();

  // Initialize default settings on first load
  useEffect(() => {
    const initializeSettings = async () => {
      try {
        const existingSettings = await db.aiSettings.get('default');
        if (!existingSettings) {
          const defaultSettings: AISettings = {
            name: 'Zee',
            avatar: undefined,
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
          };
          await saveSettings(defaultSettings);
        }
      } catch (error) {
        console.error('Error initializing settings:', error);
      }
    };

    initializeSettings();
  }, [saveSettings]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleOpenChat = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentPage('chat');
  };

  const handleBack = () => {
    if (currentPage === 'chat') {
      setCurrentPage('home');
      setSelectedConversation(undefined);
    } else if (currentPage === 'customize') {
      setCurrentPage('profile');
    } else if (['profile', 'study', 'tools'].includes(currentPage)) {
      setCurrentPage('home');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
      )}
      {currentPage === 'chat' && (
        <Chat 
          conversation={selectedConversation}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'profile' && (
        <Profile 
          onBack={handleBack}
          onNavigate={handleNavigate}
          onCustomize={() => setCurrentPage('customize')}
        />
      )}
      {currentPage === 'customize' && (
        <Customize 
          onBack={handleBack}
          settings={settings || undefined}
          onSave={saveSettings}
        />
      )}
    </div>
  );
}

export default App;
