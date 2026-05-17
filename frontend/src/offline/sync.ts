import { db } from './db.js';
import api from '../api/api.js';
import toast from 'react-hot-toast';

let isSyncing = false;

export async function syncOfflineData() {
  if (isSyncing || !navigator.onLine) return;

  const pendingOps = await db.syncQueue
    .where('status')
    .equals('pending')
    .toArray();

  if (pendingOps.length === 0) return;

  isSyncing = true;
  const toastId = toast.loading('Sincronizando dados offline...');

  try {
    // Sort by timestamp to ensure correct order
    const sortedOps = pendingOps.sort((a, b) => a.timestamp - b.timestamp);

    for (const op of sortedOps) {
      try {
        await db.syncQueue.update(op.id!, { status: 'syncing' });

        await api({
          url: op.url.replace("/api", ""),
          method: op.method,
          data: op.data,
          headers: {
            'X-Skip-Sync-Queue': 'true'
          }
        });

        await db.syncQueue.delete(op.id!);
      } catch (error) {
        console.error('Error syncing operation', op, error);
        await db.syncQueue.update(op.id!, { status: 'pending' });
        // If it's a real server error (not network), we might want to skip it
        // but for now we just stop the loop to avoid infinite failure
        break;
      }
    }
    toast.success('Sincronização concluída!', { id: toastId });
  } catch (error) {
    toast.error('Falha na sincronização automática.', { id: toastId });
  } finally {
    isSyncing = false;
  }
}

// Set up listeners
window.addEventListener('online', syncOfflineData);

// Periodically check for sync
setInterval(syncOfflineData, 30000); // every 30s
