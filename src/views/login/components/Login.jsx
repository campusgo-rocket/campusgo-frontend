import React, { useState } from "react";
import "./Login.css";
import { FormControl, Grid } from "@mui/material";
import driverSignup from "./../../../assets/images/driver-signup.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const saveUser = () => {
    let user = {
      email: email,
      password: password,
    };
    /*postUser(user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });*/
  };

  return (
    <div className="divImageContainer">
      <FormControl>
        <div className="card-form">
          <Grid container justify="center" className="poppins-light">
            <Grid item xs={12} sm={12} md={12}>
              <h2 className="title-form">Inicio de sesión</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <input
                className="input-form-lg"
                onChange={handleChangeEmail}
                placeholder="Correo Institucional"
              ></input>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <input
                className="input-form-lg"
                onChange={handleChangePassword}
                placeholder="Contraseña"
                type="password"
              ></input>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span>
                ¿Aún no te registras?{" "}
                <a onClick={handleSignup}>
                  <b>¡Hazlo ahora!</b>
                </a>
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <div className="div-bt">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={saveUser}
                >
                  Iniciar sesión
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      </FormControl>
      <img src={driverSignup} className="imageDriverRegister" />
    </div>
  );
}

export default Login;
