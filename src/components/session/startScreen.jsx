import * as React from "react";
import { useNavigate } from "react-router-dom";


export default function StartScreen() {
  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="centered-text">Centro Comercial Picos</div>
      <div className="bottom-text">85 años cultivando la excelencia</div>
      <div className="header_text">
        <span className="spaced-word" onClick={() => navigate('/login')}>Inicio</span>
        <span onClick={() => navigate('/about')}>Info</span>
      </div>
    </div>
  );
}

