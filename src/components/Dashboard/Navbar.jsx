import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { Toast } from "primereact/toast";
import { useMountEffect } from 'primereact/hooks';


const Navbar = ({ abrir, setAbrir, pageTitle }) => {
  const datos = JSON.parse(localStorage.getItem("user"));
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  

  const toggleAside = () => {
    setAbrir(!abrir);
  };

  const desencriptarImagenBase64 = (encodedString) => {
    try {
      const imageUrl = `data:image/jpeg;base64,${encodedString}`;
      return imageUrl;
    } catch (error) {
      console.error("Error al desencriptar la imagen:", error);
      return null;
    }
  };

  const cerrarSesion = () => {
    mostrarConfirmacion();
  };

  const mostrarConfirmacion = () => {
    setShowConfirmDialog(true);
  };

  const toast = useRef(null);
 const accept = () => {
  toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
};

const reject = () => {
  toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
};

const confirm1 = () => {
  confirmDialog({
      group: 'headless',
      message: 'Desea salir?',
      header: 'Cerrar Sesión',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept,
      reject
  });
};

  return (
    <>
        <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                        <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                            <Button
                                label="Salir?"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-8rem"
                            ></Button>
                            <Button
                                label="Cancelar"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-8rem"
                            ></Button>
                        </div>
                    </div>
                )}
            />
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
      >
        <div className="container-fluid py-1 px-3 d-flex justify-content-between align-items-center">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm">
                <a className="opacity-5 text-dark" href="javascript:;">
                  Pages
                </a>
              </li>
              <li
                className="breadcrumb-item text-sm text-dark active"
                aria-current="page"
              >
                {pageTitle}
              </li>
            </ol>
            <h6 className="font-weight-bolder mb-0">{pageTitle}</h6>
          </nav>

          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-xl-none mt-2 ps-3 d-flex align-items-center">
              <a
                href="javascript:;"
                className="nav-link text-body p-0"
                id="iconNavbarSidenav"
                onClick={toggleAside}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </a>
              <div className="card flex flex-wrap gap-2 justify-content-center">
              
            </div>
           
              <a  className="nav-link text-body p-0 px-3"onClick={confirm1} icon="pi pi-check">
                <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center"></li>
          </ul>
          <div className="d-flex align-items-center " >
            <Avatar
              alt="Remy Sharp"
              src={desencriptarImagenBase64(datos.ter_foto)}
              sx={{ width: 65, height: 65}}
            />
            <span className="nav-link-text mt-2 ">
              {datos.ter_nombre} {datos.ter_apellido}
            </span>
            <a href="javascript:;" className="nav-link text-body p-0 px-3 d-sm-none" icon="pi pi-check" label="Confirm" onClick={confirm1}>
                <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer"></i>
              </a>
          </div>
          
        </div>
      </nav>
      <hr className="dark horizontal my-0" />

      
    </>
  );
};

export default Navbar;
