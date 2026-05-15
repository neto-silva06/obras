import Dexie, { type Table } from 'dexie';

export interface SyncOperation {
  id?: number;
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  data: any;
  timestamp: number;
  status: 'pending' | 'syncing' | 'failed';
}

export interface CachedData {
  key: string; // e.g., 'works', 'materials', 'work-diary-1-2023-10-27'
  data: any;
  timestamp: number;
}

export class ObrasDB extends Dexie {
  syncQueue!: Table<SyncOperation>;
  cache!: Table<CachedData>;

  constructor() {
    super('ObrasDB');
    this.version(1).stores({
      syncQueue: '++id, status, timestamp',
      cache: 'key'
    });
  }
}

export const db = new ObrasDB();
