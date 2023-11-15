import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";
import LogoUserLogin from "../../assets/logo-userLogin";

export default function LoginScreen() {
  let navigate = useNavigate();
  const { state, setState } = React.useContext(Context);
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("username"));
    if (data.get("username") === "admin" && data.get("password") === "admin") {
      setState({ ...state, user: data.get("username"), isAdmin: true });
      navigate("/home");
    } else {
      setWrongCredentials(true);
    }
  };

  return (
    <div className="login-layout">
      <div
        className="header_text"
        style={{ color: "black" }}
        onClick={() => navigate("/")}
      >
        Inicio
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
          <LogoUserLogin className="logo" width="100%" height="100%" />
          <div className="login-box">
            <input
              className="login-input"
              type="text"
              name="username"
              placeholder="Usuario"
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Contraseña"
            />
            <button className="button" type="submit" value="Sign in" />
          </div>
      </form>
    </div>
  );
}
