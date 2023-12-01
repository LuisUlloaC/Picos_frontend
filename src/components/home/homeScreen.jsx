import * as React from "react";
import '../../home.css'
import NavBar from "../utils/navBar";
import Products from "./products";
import { Context } from "../context/provider";
import AdminHome from "../admin/adminHome";
import NoWorkingScreen from "../utils/noWorking";

export default function HomeScreen() {
  const { state } = React.useContext(Context);
  const date = new Date();
  const day = date.getDay();

  return (
    <div className="home-container">
      <div className="home-header">
        <NavBar />
      </div>
          {state.role === "admin"
          ? <AdminHome />
          : 
          <>
          {(day === 3 || day === 4) ? <NoWorkingScreen message="Cerrado" /> :
            <Products />
          }
        </>
      }
    </div>
  );
}

