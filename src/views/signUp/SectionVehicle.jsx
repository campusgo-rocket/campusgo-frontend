import React from "react";

import { useUser } from "../../contexts/userContext";

function SectionVehicle() {

    const { uid } = useUser();

    const data = {
        "id_driver": "nays8PlHMEp43XGgQkzw",
        "color": "negro",
        "make": "chevrolet",
        "model": "sail",
        "plate_number": "ABC123",
        "type_vehicle": "carro",
        "year": 2015
    }

    return (
        <>
            <p>Section Vehicle: {uid}</p>
            <p>Ejemplo ID driver: {data.id_driver}</p>
            <p>Ejemplo color: {data.color}</p>
            <p>Ejemplo marca: {data.make}</p>
            <p>Ejemplo modelo: {data.model}</p>
            <p>Ejemplo número de placa: {data.plate_number}</p>
            <p>Ejemplo tipo de vehículo: {data.type_vehicle}</p>
            <p>Ejemplo año: {data.year}</p>
        </>
    )
}

export { SectionVehicle };