<<<<<<< HEAD
import { useState } from 'react'
import Routing from './router/Routing'
import { PrimeReactProvider } from 'primereact/api';
=======
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
>>>>>>> 5b0e9f52d990d396d9112541c70c12059c7f2739

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
<<<<<<< HEAD
      <PrimeReactProvider >
    <Routing/>
    </PrimeReactProvider>
=======
      <ToastContainer />
      <Routing />
>>>>>>> 5b0e9f52d990d396d9112541c70c12059c7f2739
    </>
  );
}

export default App;
