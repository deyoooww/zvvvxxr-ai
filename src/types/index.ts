export interface Message {
  id: string;
  conversationId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  attachments?: Attachment[];
  edited?: boolean;
  editedAt?: number;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'file';
  name: string;
  url?: string;
  size?: number;
  mimeType?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  aiName: string;
  aiAvatar?: string;
  pinned?: boolean;
  archived?: boolean;
}

export interface AISettings {
  name: string;
  avatar?: string;
  characterSize: 'small' | 'medium' | 'large' | 'xlarge';
  characterPosition: { x: number; y: number };
  characterZoom: number;
  characterOpacity: number;
  glowIntensity: 'off' | 'soft' | 'medium' | 'strong';
  particleIntensity: 'off' | 'low' | 'medium' | 'high';
  animationLevel: 'off' | 'low' | 'medium' | 'high';
  ringEffect: 'off' | 'subtle' | 'holographic';
  visualStyle: 'default' | 'soft' | 'neon' | 'holographic' | 'cyber' | 'cute' | 'minimal' | 'cinematic';
  wallpaperMode: 'default' | 'preset' | 'custom';
  wallpaperPreset?: string;
  wallpaperCustom?: string;
  wallpaperOpacity: number;
  wallpaperBlur: number;
  wallpaperBrightness: number;
  wallpaperScope: 'chat-only' | 'entire-app';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  updatedAt: number;
  files: ProjectFile[];
  html: string;
  css: string;
  js: string;
  versions: ProjectVersion[];
  currentVersion: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'html' | 'css' | 'js' | 'json';
  content: string;
}

export interface ProjectVersion {
  id: string;
  name: string;
  timestamp: number;
  html: string;
  css: string;
  js: string;
}

export type Intent = 
  | 'GENERAL_CHAT'
  | 'HOMEWORK'
  | 'STUDY'
  | 'IMAGE'
  | 'DOCUMENT'
  | 'CODING'
  | 'WEBSITE'
  | 'WRITING'
  | 'TRANSLATION'
  | 'RESEARCH'
  | 'CALCULATION'
  | 'CREATIVE'
  | 'UTILITY'
  | 'OTHER';
