
import { db, storage } from '../firebaseConfig';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FirestoreProduct, Product } from '../types';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  },

  async uploadImage(file: File): Promise<string> {
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async createProduct(product: Omit<FirestoreProduct, 'createdAt' | 'updatedAt'>): Promise<string> {
    const productsRef = collection(db, 'products');
    const now = new Date().toISOString();
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: now,
      updatedAt: now
    });
    return docRef.id;
  },

  async updateProduct(id: string, updates: Partial<FirestoreProduct>): Promise<void> {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  async deleteProduct(id: string): Promise<void> {
    const productRef = doc(db, 'products', id);
    await deleteDoc(productRef);
  }
};
