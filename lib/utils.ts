import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcryptjs"

import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saltAndHashPassword(password: string) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export const uploadFileWithProgress = async (file: File, folder: string, onProgress: (progress: number) => void): Promise<string> => {
  const fileName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      }, 
      (error) => {
        reject(error);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const uploadFile = async (file: File, folder: string) => {
  const fileName = `${uuidv4()}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${fileName}`);
  await uploadBytes(storageRef, file); // Upload file
  const url = await getDownloadURL(storageRef)
  return [url, `${folder}/${fileName}`];  // Get public URL
};

export const deleteFile = async (fileUrl: string): Promise<void> => {
  const fileRef = ref(storage, fileUrl);
  return deleteObject(fileRef);
};
