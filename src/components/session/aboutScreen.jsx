import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";

export default function About() {
  let navigate = useNavigate();
  const { state, setState } = React.useContext(Context);
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  return (
    <div className="about_screen">
      <div className="centered-text">Picos</div>
    </div>
  );
}

