import { useState, useEffect } from 'react';
import { db } from '@/db/db';
import { Conversation, AISettings, Project } from '@/types';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const data = await db.conversations.orderBy('updatedAt').reverse().toArray();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async (conversation: Conversation) => {
    try {
      await db.conversations.put(conversation);
      loadConversations();
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await db.conversations.delete(id);
      loadConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return { conversations, loading, saveConversation, deleteConversation, loadConversations };
};

export const useAISettings = () => {
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await db.aiSettings.get('default');
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: AISettings) => {
    try {
      await db.aiSettings.put({ ...newSettings, id: 'default' });
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return { settings, loading, saveSettings, loadSettings };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await db.projects.orderBy('updatedAt').reverse().toArray();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (project: Project) => {
    try {
      await db.projects.put(project);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await db.projects.delete(id);
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return { projects, loading, saveProject, deleteProject, loadProjects };
};
