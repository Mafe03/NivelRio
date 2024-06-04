import { useState } from "react";
import { PrimeReactProvider } from "primereact/api";

// src/App.jsx

import React, { useEffect } from "react";
import Routing from "./router/Routing";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig"; // Asegúrate de que la ruta es correcta
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message"; // Asegúrate de que la ruta es correcta
import "react-toastify/dist/ReactToastify.css";

//import React, { useEffect } from 'react';
import Routing from './router/Routing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';






async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      const token = await getToken(messaging, { vapidKey: VITE_APP_VAPID_KEY });
      console.log("Token generated: ", token);
    } catch (error) {
      console.error("Error getting token: ", error);
    }
  } else if (permission === "denied") {
    alert("You denied the notification");
  }
}


function App() {
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [lastAlarmDateTime2, setLastAlarmDateTime2] = useState(null);

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      toast(<Message notification={payload.notification} />);
    });
  }

 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>

      <PrimeReactProvider>
        <Routing />
        <ToastContainer />
      </PrimeReactProvider>
      <Routing />
      <ToastContainer />

    </>
  );


export default App;
