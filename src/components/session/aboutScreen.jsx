import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";
import colors from "../../colors";
import portada from "../../assets/about.png";
import { AnchorSharp } from "@mui/icons-material";

export default function About() {
  let navigate = useNavigate();
  const { state, setState } = React.useContext(Context);
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "admin" && data.get("password") === "admin") {
      setState({ ...state, user: data.get("email"), isAdmin: true });
      navigate("/home");
    } else {
      setWrongCredentials(true);
    }
  };

  return (
    <div className="about_screen">
      <div className="pico_text">Picos</div>
      <div className="inicio_text">Inicio</div>
      <div className="info_text">"Familia Picos: Tradición Agrícola de 85 Años"</div>
      <div className="info_big_text">
        Enraizados en la pasión por la tierra y la agricultura, la familia Picos ha cultivado cítricos y productos agrícolas orgánicos 
        durante más de ocho décadas. Nuestra historia es un legado de compromiso con la calidad, el respeto por la naturaleza y la 
        sostenibilidad. Desde la primera generación hasta la actual, hemos mantenido nuestro compromiso con la excelencia agrícola y 
        la producción orgánica. Bienvenidos a nuestra historia, bienvenidos a la familia Picos.</div>
    </div>
  );
}

