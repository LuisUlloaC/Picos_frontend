import * as React from "react";
import '../../login.css'
import { useNavigate } from "react-router-dom";
import { Context } from "../context/provider";
import LogoUserLogin from "../../assets/logo-userLogin";
import { userLogin } from '../../actions/auth';

export default function LoginScreen() {
  let navigate = useNavigate();
  const { state, setState, api } = React.useContext(Context)
  const [wrongCredentials, setWrongCredentials] = React.useState(false)

  React.useEffect(() => {
    if (state.access) {
      navigate("/home");
    }
  })


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    (async () => {
    const response = await userLogin(
      api,
      data.get('username'),
      data.get('password'),
    )
    if (response.sucess) {
      let token = response.state_data.access.split(".")[1];
      while (token.length % 4 !== 0) {
        token += '=';
      };
      response.state_data.role = JSON.parse(atob(token)).role;
      setState(response.state_data);
      navigate("/home");
    } else {
      setWrongCredentials(true);
    }
    })()

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
