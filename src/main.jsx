import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Importa los estilos de PrimeReact
import 'primeicons/primeicons.css';  

//////LOGIN///////
import "./assets/vendor2/bootstrap/css/bootstrap.min.css";
import "./assets/fonts2/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/fonts2/iconic/css/material-design-iconic-font.min.css";
import "./assets/vendor2/animate/animate.css";
import "./assets/vendor2/css-hamburgers/hamburgers.min.css";
import "./assets/vendor2/select2/select2.min.css";
import "./assets/css2/util.css";
import "./assets/css2/main.css";



///////Dashboard///////

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import "https://kit.fontawesome.com/42d5adcbca.js";
import "./assets/css/material-dashboard.css?v=3.1.0";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
