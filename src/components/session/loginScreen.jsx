import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";

export default function SignInSide() {
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
    <div className="container">
      <div className="centered-text">Centro Comercial Picos</div>
      <div className="bottom-text">85 años cultivando la excelencia</div>
      <div className="top-text"><span className="spaced-word">Inicio</span> Info</div>
    </div>
  );
}

