// src/firebase/config.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ... diğer config bilgileriniz
};

// Export ekleyin:
export const app = initializeApp(firebaseConfig);