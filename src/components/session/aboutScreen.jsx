import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";
import "../../about.css"

export default function About() {
  let navigate = useNavigate();

  return (
    <div className="about_screen">
      <div className="pico_text">Picos</div>
      <div className="header_text" onClick={() => navigate('/')}>Inicio</div>
      <div className="infoTitle_text">"Familia Picos: Tradición Agrícola de 85 Años"</div>
      <div className="info_text">
        Enraizados en la pasión por la tierra y la agricultura, la familia Picos ha cultivado cítricos y productos agrícolas orgánicos 
        durante más de ocho décadas. Nuestra historia es un legado de compromiso con la calidad, el respeto por la naturaleza y la 
        sostenibilidad. Desde la primera generación hasta la actual, hemos mantenido nuestro compromiso con la excelencia agrícola y 
        la producción orgánica. Bienvenidos a nuestra historia, bienvenidos a la familia Picos.</div>
    </div>
  );
}

