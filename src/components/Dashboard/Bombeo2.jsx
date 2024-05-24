import * as React from "react";
import { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Asegúrate de importar correctamente el componente Navbar
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Aside from "./Aside";

const VISIBLE_FIELDS = ["name", "country", "isAdmin"];

const Bombeo2 = () => {
  const [abrir, setAbrir] = useState(false);
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Actualiza la fecha y hora cada segundo

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES');
  };

  return (
    <>
     <Aside abrir={abrir} setAbrir={setAbrir} />
    <Navbar abrir={abrir} setAbrir={setAbrir}  pageTitle="Bombeo N°2" /> {/* Asegúrate de pasar las props correctamente */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="card-body pt-0 p-3 bg-gradient-primary3" >
            <div className="nivel-rio">
              <h6 className="mb-0">NIVEL RÍO</h6>
              <span className="text-xs">RÍO LA VIEJA</span>
            </div>
            <span className="text-xs">Mts (900.00-920.00)</span>
            <hr className="horizontal dark my-3" />
            <h5 className="mb-0 text-center">RESUMEN ÚLTIMO DÍA</h5>
            <div className="text-center"><span className=" text-xs ">
            Fecha: {formatDate(currentDateTime)} - Hora: {formatTime(currentDateTime)}
          </span></div>
            
          </div>

          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center">
  <h6 className="text-white text-capitalize ps-3 mb-0">Mínimo</h6>
  <div className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2" style={{ width: "40%" }}>
    <h6 className="text-white text-capitalize mb-0">Mínimo</h6>
  </div>
</div>

<div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center">
  <h6 className="text-white text-capitalize ps-3 mb-0">Máximo</h6>
  <div className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2" style={{ width: "40%" }}>
    <h6 className="text-white text-capitalize mb-0">Máximo</h6>
  </div>
</div>
<div className="bg-gradient-primary1 shadow-primary border-radius-lg pt-3 pb-3 mt-2 d-flex align-items-center">
  <h6 className="text-white text-capitalize ps-3 mb-0">Promedio</h6>
  <div className="ms-auto bg-gradient-primary2 shadow-primary border-radius-lg pt-2 pb-1 ps-3 mr-2" style={{ width: "40%" }}>
    <h6 className="text-white text-capitalize mb-0">Promedio</h6>
  </div>
</div>
              </div>
              <div className="card-body px-0 pb-2">
                <Box sx={{ height: 400, width: 1 }}>
                  <DataGrid
                    {...data}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                      },
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer py-4">
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
      </footer>
    </>
  );
};

export default Bombeo2;
