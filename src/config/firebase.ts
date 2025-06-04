// config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB16pGhSDX2IqFbzGsA5Y6032bgr6Osnjo",
  authDomain: "karsiv-3645b.firebaseapp.com",
  projectId: "karsiv-3645b",
  storageBucket: "karsiv-3645b.appspot.com",
  messagingSenderId: "877182637116",
  appId: "1:877182637116:web:c182e6e3f00d1a32f4df39",
  measurementId: "G-6HK2CG2K0D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
