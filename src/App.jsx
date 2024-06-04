import React, { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";

// src/App.jsx

import Routing from "./router/Routing";// Asegúrate de que la ruta es correcta
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message"; // Asegúrate de que la ruta es correcta
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";


/* async function requestPermission() {
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
} */

function App() {
  
  const [lastAlarmDateTime2, setLastAlarmDateTime2] = useState(null);

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    toast(<Message notification={payload.notification} />);

    useEffect(() => {
      const apiUrl =
        "http://192.168.72.25:8080/datasnap/rest/TServerMethods/alarmaCaracteristica/44";

      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Error en la solicitud");
          }
          const data = await response.json();

          if (!data || !data.alarma || data.alarma.length === 0) {
            console.error(
              "No se encontraron datos válidos en la respuesta de la API"
            );
            return;
          }

          const firstAlarm = data.alarma[0];

          if (
            !firstAlarm.valorMuestra ||
            !firstAlarm.nivelAlerta ||
            !firstAlarm.fecha_hora_alarma
          ) {
            console.error(
              "valorMuestra, nivelAlerta o fecha_hora_alarma no se encuentran en los datos de la API"
            );
            return;
          }

          const { valorMuestra, nivelAlerta, fecha_hora_alarma, esAlarma } =
            firstAlarm;

          // Verificar si es una alarma
          if (esAlarma) {
            const message = `Nivel Alerta: ${nivelAlerta}. \nFecha y Hora: ${fecha_hora_alarma}. \nValor de Muestra: ${valorMuestra}. `;

            const notification = new Notification("Nueva alarma", {
              body: message,
              icon: "logo.png", // Opcional: icono de la notificación
            });

            // Manejar evento de clic en la notificación
            notification.onclick = () => {
              // Hacer algo cuando el usuario hace clic en la notificación
              console.log("El usuario hizo clic en la notificación");
            };

            // Actualizar la fecha y hora de la última alarma solo si cambió
            const newAlarmDateTime = new Date(fecha_hora_alarma);
            if (!lastAlarmDateTime2 || newAlarmDateTime > lastAlarmDateTime2) {
              setLastAlarmDateTime2(newAlarmDateTime);
            }
          }
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

      const intervalId = setInterval(fetchData, 2 * 60 * 1000); // Actualizar cada 2 minutos
      fetchData(); // Realizar una solicitud inmediata cuando el componente se monta

      // Limpiar el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }, []); // No necesitas lastAlarmDateTime2 como dependencia

    useEffect(() => {
      // Solicitar permiso al usuario para recibir notificaciones
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") {
            console.warn("El usuario no ha permitido las notificaciones");
          }
        });
      }
    }, []);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
      <>
        <PrimeReactProvider>
          <Routing />
          <ToastContainer />
        </PrimeReactProvider>
      </>
    );
  });
}

export default App;
