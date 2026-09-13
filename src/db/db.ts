import Dexie, { Table } from 'dexie';
import { Conversation, Project, AISettings } from '@/types';

export class ZVVVXXRDb extends Dexie {
  conversations!: Table<Conversation>;
  projects!: Table<Project>;
  aiSettings!: Table<AISettings>;

  constructor() {
    super('ZVVVXXR_AI_DB');
    this.version(1).stores({
      conversations: '++id, createdAt, updatedAt',
      projects: '++id, createdAt, updatedAt',
      aiSettings: 'id',
    });
  }
}

export const db = new ZVVVXXRDb();
