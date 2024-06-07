import React from "react";
import "./TripInfo.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import person from "../../../assets/images/prueba_foto.jpg";
import location from "../../../assets/images/ubicacion.png";
import elipse from "../../../assets/images/elipse.png";
import reloj from "../../../assets/images/reloj-viaje.png";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

function TripInfo() {
  return (
    <Container
      maxWidth="xl"
      className="container poppins-light"
      sx={{ height: "82vh" }}
    >
      <Grid
        container
        spacing={1}
        className="container-child"
        sx={{ paddingRight: "0%" }}
      >
        <Grid item xs={12} sm={8} md={8}>
          <div className="h1-info font-weight-bold">Solicitud aprobada</div>
          <div className="card-form-trip">
            <Grid container justify="center" className="poppins-light">
              <Grid item xs={3} sm={3} md={3} className="content-center">
                <img src={person} className="imageDriverRegister" />
              </Grid>
              <Grid item xs={4} sm={4} md={5} className="card-info ">
                <b>Juan Carlos Arboleda, aceptó tu viaje</b>
                <div>Viernes, 19 de abril - Hora de salida 9:00 AM</div>
                <div className="dflex mt-05 font-weight-medium content-center">
                  <img src={location} className="infoImages" />
                  <div className="ml-03"> Destino: Universidad del valle</div>
                </div>
                <div className="dflex font-weight-medium mt-01 content-center">
                  <img src={elipse} />
                  <div className="ml-03">
                    Puntos clave: Cosmocentro, pasoancho
                  </div>
                </div>
              </Grid>
              <Grid item xs={4} sm={4} md={4} className="card-info">
                <div className="left-border">
                  <div className="ml-05">
                    <div className="dblock font-weight-medium">
                      Información del vehiculo:
                      <div className="font-weight-bold">
                        Kia Picanto - HDW382, rojo
                      </div>
                    </div>
                    <div className="mt-05 text-small">
                      <div className="dflex mt-05 font-weight-medium content-center">
                        <img src={elipse} />
                        <div className="ml-03">
                          Punto de encuentro: Cosmocentro
                        </div>
                      </div>
                      <div className="dflex font-weight-medium mt-01 content-center">
                        <img src={reloj} />
                        <div className="ml-03">Hora estimada: 9:20 AM</div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Chatea con Juan Carlos
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TripInfo;
