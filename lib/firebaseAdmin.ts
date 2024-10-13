import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

if (!getApps().length) {
    initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
}

const storage = getStorage();

export { storage };
