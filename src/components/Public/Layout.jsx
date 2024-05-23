import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";

const Layaout = () => {
  const { Autenticado } = UseAuth();
  
  return !Autenticado.ter_num_id ? <Outlet /> : <Navigate to={"/Dashboard"} />;
};

export default Layaout;
