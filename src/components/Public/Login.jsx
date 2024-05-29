import React, { useState } from 'react';
import logo from "../../assets/images/logo.png";
import HelperForm from "../../helper/HelperForm";
import withReactContent from "sweetalert2-react-content";
import Swal2 from "sweetalert2";
import Alerta from './Alerta';

const MySwal = withReactContent(Swal2);

const Login = () => {
    const [cedula, setCedula] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const { form, cambiar } = HelperForm({});

    const handleCedulaChange = (event) => {
        const cedulaValue = event.target.value.replace(/\D/g, '');
        setCedula(cedulaValue);
    };

    const mostrarAlerta = (titulo, mensaje, icono) => {
        setAlertSeverity(icono);
        setAlertMessage(mensaje);
        setAlertOpen(true);
    };
    

    const Login = async (e) => {
        e.preventDefault();
        const request = await fetch("http://192.168.72.25:8080/datasnap/rest/TServerMethods/usuario", {
            method: "POST",
            body: JSON.stringify({
                ter_num_id: form.ter_num_id,
                ter_clave: form.ter_clave_movil 
            }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await request.json();
        console.log(data[0].usuario)
        if (data[0].usuario === "POST OK") {
            let mensaje = data.mensaje;
            localStorage.setItem("user", JSON.stringify(data[0].ter_num_id));
            mostrarAlerta("Éxito", "Biennvenido", "success");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            setCedula('');
            const pass = document.querySelector("#ter_clave_movil")
            pass.value = "";
            let mensaje = data[0].usuario;
            mostrarAlerta("Error", mensaje, "error");
        }
    };

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <div className="div d-flex justify-content-center mt-auto"><img src={logo} style={{ height: "120px" }} alt="Logo" /></div>
                        <form className="login100-form validate-form" onSubmit={Login}>
                            <span className="login100-form-title p-b-49">Niveles del Río</span>

                            <div className="wrap-input100 validate-input m-b-23" data-validate="Username is required">
                                <span className="label-input100">Cedula</span>
                                <input
                                    className="input100"
                                    type="text"
                                    name="ter_num_id"
                                    id="ter_num_id"
                                    placeholder="Cedula"
                                    onChange={(e)=>{handleCedulaChange(e), cambiar(e)}}
                                    value={cedula}
                                />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <span className="label-input100">Contraseña</span>
                                <input className="input100" type="password" name="ter_clave_movil" id="ter_clave_movil" placeholder="Contraseña" onChange={cambiar} />
                                <span className="focus-input100" data-symbol="&#xf190;"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn mt-4">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Alerta open={alertOpen} onClose={setAlertOpen} severity={alertSeverity} message={alertMessage} />
        </>
    );
}

export default Login;
