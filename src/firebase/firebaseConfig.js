// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyD3z1kN1Yi1HPl69csJTcT72lpDqXHHgnw",
  authDomain: "notificaciones-plantas.firebaseapp.com",
  projectId: "notificaciones-plantas",
  storageBucket: "notificaciones-plantas.appspot.com",
  messagingSenderId: "698212747648",
  appId: "1:698212747648:web:96a41cff67f62515d9d965",
  measurementId: "G-MKBXVZ54W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.warn('Service Worker is not supported in this browser.');
}

export { messaging, onMessage };
