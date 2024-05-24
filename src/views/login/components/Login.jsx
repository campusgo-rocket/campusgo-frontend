import React, { useState } from "react";
import "./Login.css";
import driverSignup from "./../../../assets/images/driver-signup.png";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingComponent } from "../../../components/LoadingComponent/Loading";
import { signIn as AuthenticateUser } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleCreatedUser = () => {
    navigate("/profile");
  };

  const handleClose = () => {
    setIsError(false);
  };

  const signIn = (e) => {
    setIsLoading(true);
    let user = {
      email: email,
      password: password,
    };
    AuthenticateUser(user)
      .then((res) => {
        console.log(res);
        if (res !== undefined) {
          localStorage.setItem("token", res);
          setIsSuccess(true);
        } else {
          setIsError(true);
          setIsSuccess(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
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
                  onClick={signIn}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
              </div>
            </Grid>
          </Grid>
        </div>
      </FormControl>
      {isLoading && <LoadingComponent color="inherit" />}
      {!isLoading && isError && (
        <Dialog
          open={isError}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Opps! Algo ha salido mal."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por favor verifica la información y vuelve a intentarlo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "red" }} autoFocus>
              CERRAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {!isLoading && isSuccess && (
        <Dialog
          open={isSuccess}
          onClose={handleCreatedUser}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Cool! Iniciaste sesión sin problemas."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ahora vamos a hacer un recorrido!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCreatedUser}
              style={{ color: "red" }}
              autoFocus
            >
              CONTINUAR
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <img src={driverSignup} className="imageDriverRegister" />
    </div>
  );
}

export default Login;