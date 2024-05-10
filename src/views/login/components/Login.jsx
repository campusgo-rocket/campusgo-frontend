import React, { useState } from "react";
import "./Login.css";
import { FormControl, Grid } from "@mui/material";
import { postUser } from "./../../../services/authService";
import driverSignup from "./../../../assets/images/driver-signup.png";

function FormSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [typeUser, setTypeUser] = useState("passenger");
  const [documentType, setDocumentType] = useState("CC");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeIdUser = (e) => {
    setIdUser(e.target.value);
  };

  const saveUser = () => {
    let user = {
      email: email,
      password: password,
    };
    postUser(user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
                <a href="signup">
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

export default FormSignUp;
