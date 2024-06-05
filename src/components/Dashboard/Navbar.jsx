import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Outlet, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal2);

const Navbar = ({ abrir, setAbrir, pageTitle }) => {
  const datos = JSON.parse(localStorage.getItem("user"));

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

  const Navigate = useNavigate();
  const CerraSesion = () => {
    MySwal.fire({
      title: "Cerrar Sesión",
      text: "Desea salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deseo salir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Cerrando!",
          text: "Hasta pronto!",
          icon: "success",
        });
        setTimeout(() => {
          Navigate("/Dashboard/Cerrar");
        }, 500);
      }
    });
  };

  return (
    <>
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
              <div className="card flex flex-wrap gap-2 justify-content-center"></div>
              <a
                className="nav-link text-body p-0 px-3"
                icon="pi pi-check"
                onClick={CerraSesion}
              >
                <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
          </ul>
          <div className="d-flex align-items-center ">
            <Avatar
              alt="Remy Sharp"
              src={desencriptarImagenBase64(datos.ter_foto)}
              sx={{ width: 65, height: 65, marginLeft: 10 }}
            />
            <span className="nav-link-text mt-2 ">
              {datos.ter_nombre} {datos.ter_apellido}
            </span>
            <div className="d-none d-xl-block">
              {" "}
              {/* Oculta en pantallas pequeñas */}
              <a
                className="nav-link text-body p-0 px-3"
                icon="pi pi-check"
                onClick={CerraSesion}
              >
                <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <hr className="dark horizontal my-0" />
    </>
  );
};

export default Navbar;
