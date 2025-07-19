// src/firebase/auth.ts
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app); // Export ekledik

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
  }
};