import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import { Conversation, Message, AISettings } from '@/types';
import { Composer } from '@/components/Composer';
import { BottomNav } from '@/components/BottomNav';
import { ArrowLeft, Menu } from 'lucide-react';
import { useAISettings, useConversations } from '@/hooks/useDB';
import { v4 as uuidv4 } from 'uuid';

interface ChatProps {
  conversation?: Conversation;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export const Chat: React.FC<ChatProps> = ({ conversation, onBack, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>(conversation?.messages || []);
  const [currentConversation, setCurrentConversation] = useState<Conversation | undefined>(conversation);
  const { settings } = useAISettings();
  const { saveConversation } = useConversations();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const aiName = settings?.name || 'Zee';
  const aiAvatar = settings?.avatar;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleSendMessage = async (message: string) => {
    if (!currentConversation) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      conversationId: currentConversation.id,
      content: message,
      role: 'user',
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: uuidv4(),
        conversationId: currentConversation.id,
        content: getZeeResponse(message, aiName),
        role: 'assistant',
        timestamp: Date.now(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      const updatedConversation: Conversation = {
        ...currentConversation,
        messages: finalMessages,
        updatedAt: Date.now(),
      };

      setCurrentConversation(updatedConversation);
      saveConversation(updatedConversation);
    }, 500);
  };

  const getZeeResponse = (message: string, name: string): string => {
    const responses = [
      `okee, aku bantu ${message.toLowerCase()}`,
      `mauu, kita kerjain bareng yuk`,
      `sini aku lihat dulu...`,
      `boleh banget! ayo kita mulai`,
      `iyaa, gampang kok. tunggu yaa`,
      `nahh, gituu deh caranya`,
      `aku bantuin yaa, tenang aja`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!currentConversation) {
    return <div className={styles.loading}>Percakapan tidak ditemukan</div>;
  }

  return (
    <div className={styles.container}>
      {/* Chat Header */}
      <header className={styles.header}>
        <button className={styles.back} onClick={onBack} aria-label="Kembali">
          <ArrowLeft size={24} />
        </button>
        <div className={styles.header_info}>
          <img 
            src={aiAvatar || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 48 48%22%3E%3Crect fill=%22%239d4edd%22 width=%2248%22 height=%2248%22/%3E%3C/svg%3E'}
            alt={aiName}
            className={styles.avatar}
          />
          <div>
            <h1 className={styles.name}>{aiName}</h1>
            <p className={styles.status}>Online</p>
          </div>
        </div>
        <button className={styles.menu} aria-label="Menu">
          <Menu size={24} />
        </button>
      </header>

      {/* Messages Container */}
      <div className={styles.messages_container} ref={scrollContainerRef}>
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`${styles.message} ${styles[msg.role]}`}
          >
            <div className={styles.message_content}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <Composer 
        onSendMessage={handleSendMessage}
        aiName={aiName}
      />

      {/* Bottom Nav */}
      <BottomNav onNavigate={onNavigate} />
    </div>
  );
};
