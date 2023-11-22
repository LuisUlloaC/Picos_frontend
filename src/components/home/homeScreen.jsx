import * as React from "react";
import '../../home.css'
import NavBar from "../utils/navBar";
import Products from "./products";
import { Context } from "../context/provider";
import AdminHome from "../admin/adminHome";

export default function HomeScreen() {
  const { state } = React.useContext(Context);
  

  return (
    <div className="home-container">
        <div className="home-header">
            <NavBar/>
        </div>
        {state.role === "admin"
        ? <AdminHome />
        :<Products/>
        }
    </div>
  );
}

