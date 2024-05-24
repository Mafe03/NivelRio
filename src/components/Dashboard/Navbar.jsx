import React, { useState } from "react";

const Navbar = ({ abrir, setAbrir, pageTitle }) => {
  const toggleAside = () => {
    setAbrir(!abrir);
  };

  return (
    <>
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
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
          <ul className="navbar-nav  justify-content-end">
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

              <a href="javascript:;" className="nav-link text-body p-0 px-3">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center"></li>
          </ul>
        </div>
      </nav>
      <hr className="dark horizontal my-0" />
    </>
  );
};

export default Navbar;
