import * as React from "react";
import { useState, useEffect,useRef  } from "react";
import Navbar from "./Navbar"; // Asegúrate de importar correctamente el componente Navbar
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Aside from "./Aside";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import EventRepeatTwoToneIcon from '@mui/icons-material/EventRepeatTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const VISIBLE_FIELDS = ["Fecha", "Hora", "Lectura"];

const Inicio = () => {
  const [abrir, setAbrir] = useState(false);
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  /*  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  ); */

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Actualiza la fecha y hora cada segundo

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-ES");
  };

  const [maximo, SetMaximo] = useState([]);

  const ListarMaximo = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicoMinMax/4/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    const datosOrdenados = data.historicoMinMax.sort(
      (a, b) => b.lectura - a.lectura
    ); // Ordenar datos en orden descendente
    const ultimoMaximo = datosOrdenados[0]; // Obtener el primer dato (máximo)
    SetMaximo([ultimoMaximo]);
  };

  useEffect(() => {
    ListarMaximo();
  }, []);

  const [minimo, SetMinimo] = useState([]);

  const ListarMinimo = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicoMinMax/1/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    const datosOrdenados = data.historicoMinMax.sort(
      (a, b) => a.lectura - b.lectura
    ); // Ordenar datos en orden ascendente
    const ultimoMinimo = datosOrdenados[0]; // Obtener el primer dato (mínimo)
    SetMinimo([ultimoMinimo]); // Guarda los datos del máximo en el estado
  };

  useEffect(() => {
    ListarMinimo();
  }, []);

  const [promedio, SetPromedio] = useState([]);

  const ListarPromedio = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicoMinMax/7/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    //console.log(data.historicoMinMax[0]);
    SetPromedio(data.historicoMinMax); // Guarda los datos del máximo en el estado
  };

  useEffect(() => {
    ListarPromedio();
  }, []);

  const [lecturas, setLecturas] = useState([]);

  const ListarLecturas = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicoLecturas/1/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    const lecturasConId = data.historico.map((lectura, index) => ({
      ...lectura,
      id: index + 1, // Podrías usar cualquier valor único aquí
    }));
    setLecturas(lecturasConId);
  };

  useEffect(() => {
    ListarLecturas();
  }, []);
  //const rows = React.useMemo(() => lecturas, [lecturas]);

  // Obtener las claves de los datos, excluyendo 'id'
  const keys =
    lecturas.length > 0
      ? Object.keys(lecturas[0]).filter((key) => key !== "id")
      : [];

  // Ordenar las claves por 'Fecha', 'Hora' y 'Lectura'
  keys.sort((a, b) => {
    if (a === "fecha") return -1;
    if (b === "fecha") return 1;
    if (a === "hora") return -1;
    if (b === "hora") return 1;
    return -1; // Para cualquier otra columna, ordenar primero
  });

  // Generar las columnas y ajustar el tamaño según el nombre de la columna
  const columns = keys.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre de la columna
    width: key === "fecha" ? 151 : key === "hora" ? 100 : 120, // Ajustar el tamaño de la columna
  }));

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [semanas, setSemana] = useState([]);

  const ListarSemana = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicoLecturas/2/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    const lecturasConId = data.historico.map((lectura, index) => ({
      ...lectura,
      id: index + 1, // Podrías usar cualquier valor único aquí
    }));
    setSemana(lecturasConId);
  };

  useEffect(() => {
    ListarSemana();
  }, []);
  //const rows = React.useMemo(() => lecturas, [lecturas]);

  // Obtener las claves de los datos, excluyendo 'id'
  const key =
    semanas.length > 0
      ? Object.keys(semanas[0]).filter((key) => key !== "id")
      : [];

  // Ordenar las claves por 'Fecha', 'Hora' y 'Lectura'
  key.sort((a, b) => {
    if (a === "fecha") return -1;
    if (b === "fecha") return 1;
    if (a === "hora") return -1;
    if (b === "hora") return 1;
    return -1; // Para cualquier otra columna, ordenar primero
  });

  // Generar las columnas y ajustar el tamaño según el nombre de la columna
  const column = key.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre de la columna
    width: key === "fecha" ? 151 : key === "hora" ? 100 : 120, // Ajustar el tamaño de la columna
  }));

  const [mes, setMes] = useState([]);

  const ListarMes = async () => {
    const request = await fetch(
      "http://181.204.95.204:8080/datasnap/rest/TServerMethods/historicolecturas/3/44/23/3",
      {
        method: "GET",
      }
    );
    const data = await request.json();
    const lecturasConId = data.historico.map((lectura, index) => ({
      ...lectura,
      id: index + 1, // Podrías usar cualquier valor único aquí
    }));
    setMes(lecturasConId);
  };

  useEffect(() => {
    ListarMes();
  }, []);
  //const rows = React.useMemo(() => lecturas, [lecturas]);

  // Obtener las claves de los datos, excluyendo 'id'
  const ke =
    mes.length > 0 ? Object.keys(mes[0]).filter((key) => key !== "id") : [];

  // Ordenar las claves por 'Fecha', 'Hora' y 'Lectura'
  ke.sort((a, b) => {
    if (a === "fecha") return -1;
    if (b === "fecha") return 1;
    if (a === "hora") return -1;
    if (b === "hora") return 1;
    return -1; // Para cualquier otra columna, ordenar primero
  });

  // Generar las columnas y ajustar el tamaño según el nombre de la columna
  const colum = ke.map((key) => ({
    field: key,
    headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar el nombre de la columna
    width: key === "fecha" ? 151 : key === "hora" ? 100 : 118, // Ajustar el tamaño de la columna
  }));

  //////////////////////////////////////////////////////////////////////////////////////////////////
  const toastRef = useRef(null);
  const [errorShown, setErrorShown] = useState(false);
  
  useEffect(() => {
    const apiUrl = 'http://192.168.72.25:8080/datasnap/rest/TServerMethods/alarmaCaracteristica/44';
  
    const toastOptions = {
      position: "top-right",
      autoClose: false, // Mantener la notificación hasta que se cierre manualmente
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
  
        if (!data || !data.alarma || data.alarma.length === 0) {
          console.error('No se encontraron datos válidos en la respuesta de la API');
          return;
        }
  
        const firstAlarm = data.alarma[0];
  
        if (!firstAlarm.valorMuestra || !firstAlarm.nivelAlerta || !firstAlarm.fecha_hora_alarma) {
          console.error('valorMuestra, nivelAlerta o fecha_hora_alarma no se encuentran en los datos de la API');
          return;
        }
  
        const { valorMuestra, nivelAlerta, fecha_hora_alarma, esAlarma } = firstAlarm;
        const message = `Nivel Alerta: ${nivelAlerta}. \nFecha y Hora: ${fecha_hora_alarma}. \nValor de Muestra: ${valorMuestra}. `;
  
        // Define el color del toast basado en nivelAlerta
        let toastColor;
        if (nivelAlerta === 'AMARILLA') {
          toastColor = '#FFCC00'; // Amarillo
        } else if (nivelAlerta === 'NARANJA') {
          toastColor = '#FFA500'; // Naranja
        } else if (nivelAlerta === 'ROJA') {
          toastColor = '#FF0000'; // Rojo
        } else {
          toastColor = '#FFFFFF'; // Blanco por defecto si el nivelAlerta no coincide
        }
  
        const customToastOptions = {
          ...toastOptions,
          style: { backgroundColor: toastColor, color: '#000000', whiteSpace: 'pre-wrap'}, // Estilo personalizado
        };
  
        // Crear la notificación si no existe
        if (!toastRef.current) {
          toastRef.current = toast.info(message, customToastOptions);
        } else {
          // Actualizar la notificación existente
          toast.update(toastRef.current, {
            render: message,
            ...customToastOptions,
          });
        }
  
        // Reiniciar el estado de errorShown
        setErrorShown(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        // Mostrar la notificación de error solo si no se ha mostrado antes
        if (!errorShown) {
          setErrorShown(true);
          toast.error('Error al obtener los datos', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    };
  
    const intervalId = setInterval(fetchData, 60 * 1000); // Actualizar cada 1 minuto
  
    fetchData(); // Realiza una solicitud inmediata cuando el componente se monta
  
    return () => clearInterval(intervalId);
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Aside abrir={abrir} setAbrir={setAbrir} />
      <Navbar abrir={abrir} setAbrir={setAbrir} pageTitle="Bombeo N°2" />{" "}
      {/* Asegúrate de pasar las props correctamente */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="card-body pt-0 p-3 text-center bg-gradient-primary3 ">
            <div className="nivel-rio">
              <h6 className="mb-0">OPERACIÓN DIARIA ESTACIÓN DE BOMBEO N°2</h6>
              <span className="text-xs">
                ESTACIÓN BOMBEO RIO LA VIEJA - BOMBEO N°2
              </span>
            </div>
          </div>
          <div className="card-body pt-0 p-3 bg-gradient-primary3 mt-1">
            <div className="nivel-rio">
              <h6 className="mb-0">NIVEL RÍO</h6>
              <span className="text-xs">RÍO LA VIEJA</span>
            </div>
            <span className="text-xs">Mts (900.00-920.00)</span>
            <hr className="horizontal dark my-3" />
            <h5 className="mb-0 text-center">RESUMEN ÚLTIMO DÍA</h5>
            <div className="text-center">
              <span className=" text-xs ">
                Fecha: {formatDate(currentDateTime)} - Hora:{" "}
                {formatTime(currentDateTime)}
              </span>
            </div>
          </div>

          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center">
                  {minimo.map((min) => {
                    return (
                      <>
                        <h6 className="text-white text-capitalize ps-3 mb-0 ">
                          Mínimo
                          <span
                            className="text-white text-xs "
                            style={{ display: "block", width: "100%" }}
                          >
                            Fecha: {min.fecha}
                          </span>
                        </h6>
                        <div
                          className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2"
                          style={{ width: "44%" }}
                        >
                          <h6 className="text-white text-capitalize mb-0 text-end mr-2">
                            {min.lectura}
                          </h6>
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center">
                  {maximo.map((maxi) => {
                    return (
                      <>
                        <h6 className="text-white text-capitalize ps-3 mb-0 ">
                          Máximo
                          <span
                            className="text-white text-xs"
                            style={{ display: "block", width: "100%" }}
                          >
                            Fecha: {maxi.fecha}
                          </span>
                        </h6>

                        <div
                          className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2"
                          style={{ width: "44%" }}
                        >
                          <h6 className="text-white text-capitalize mb-0 text-end mr-2">
                            {maxi.lectura}
                          </h6>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center ">
                  {promedio.map((prom) => {
                    return (
                      <>
                        <h6 className="text-white text-capitalize ps-3 mb-0">
                          Promedio
                          <span
                            className="text-white text-xs"
                            style={{ display: "block", width: "100%" }}
                          >
                            Fecha: {prom.fecha}
                          </span>
                        </h6>
                        <div
                          className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2"
                          style={{ width: "44%" }}
                        >
                          <h6 className="text-white text-capitalize mb-0 text-end mr-2">
                            {prom.lectura.toFixed(2)}
                          </h6>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="card-body px-0 pb-2 ">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <BottomNavigationAction
                  label="Día"
                  icon={<EventRepeatTwoToneIcon />}
                  {...a11yProps(0)}
                />
                <BottomNavigationAction
                  label="Semana"
                  icon={<DateRangeTwoToneIcon />}
                  {...a11yProps(1)}
                />
                <BottomNavigationAction
                  label="Mes"
                  icon={<CalendarMonthTwoToneIcon />}
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
                <CustomTabPanel value={value} index={0}>
                  <h6 className="ps-2 mb-0 text-center">
                    Historico del día
                  </h6>

                  <Box sx={{ height: 600, width: 1, marginTop: "2%" }}>
                    <DataGrid
                      rows={lecturas}
                      columns={columns}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                    />
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <h6 className="ps-2 mb-0 text-center">
                    Historico de la semana
                  </h6>

                  <Box sx={{ height: 600, width: 1, marginTop: "2%" }}>
                    <DataGrid
                      rows={semanas}
                      columns={column}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                    />
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <h6 className="ps-2 mb-0 text-center">
                    Historico del mes
                  </h6>

                  <Box sx={{ height: 600, width: 1, marginTop: "2%" }}>
                    <DataGrid
                      rows={mes}
                      columns={colum}
                      disableColumnFilter
                      disableColumnSelector
                      disableDensitySelector
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                        },
                      }}
                    />
                  </Box>
                </CustomTabPanel>
                <ToastContainer />
              </div>
            </div>
           
          </div>
        </div>
      </div>
      {/*    <footer className="footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © {new Date().getFullYear()}, Emcartago{" "}
                <i className="fa fa-heart"></i> Niveles del Río.
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default Inicio;
