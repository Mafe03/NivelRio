
import { useState } from 'react'
import Routing from './router/Routing'
import { PrimeReactProvider } from 'primereact/api';

// src/App.jsx
import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebaseConfig';  // Asegúrate de que la ruta es correcta
import { toast, ToastContainer } from 'react-toastify';
import Message from './components/Message';  // Asegúrate de que la ruta es correcta
import 'react-toastify/dist/ReactToastify.css';

const { VITE_APP_VAPID_KEY } = import.meta.env;

async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    try {
      const token = await getToken(messaging, { vapidKey: VITE_APP_VAPID_KEY });
      console.log('Token generated: ', token);
    } catch (error) {
      console.error('Error getting token: ', error);
    }
  } else if (permission === 'denied') {
    alert('You denied the notification');
  }
}


function App() {
  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      toast(<Message notification={payload.notification} />);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>

      <PrimeReactProvider >
    <Routing/>
    </PrimeReactProvider>

      <ToastContainer />
      <Routing />

    </>
  );
}

export default App;
