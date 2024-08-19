import { IDBPDatabase, openDB } from 'idb';

let db: IDBPDatabase | null = null;

async function openDatabase() {
  if (!db) {
    db = await openDB('SharedContentDB', 1, {
      upgrade(db) {
        db.createObjectStore('sharedContent', { keyPath: 'id' });
      },
    });
  }
  return db;
}

interface SharedData {
  id: string;
  title: string;
  text: string;
  url: string;
  images?: {
    name: string;
    type: string;
    data: ArrayBuffer;
  }[];
}

export async function getSharedData(): Promise<SharedData | null> {
  const db = await openDatabase();

  const contents = await db.getAll('sharedContent');

  return contents[0] ?? null;
}

export async function deleteSharedData() {
  const db = await openDatabase();

  await db.clear('sharedContent');
}
