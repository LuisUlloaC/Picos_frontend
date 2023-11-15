import * as React from "react";
import '../../home.css'
import { useNavigate } from "react-router-dom";
import NavBar from "../utils/navBar";
import ContractsView from "./contracts";
import DocumentsView from "./documents";
import ReportsView from "./reports";
import { useEffect } from "react";
import { Context } from "../context/provider";
import AdminHome from "../admin/adminHome";
import Products from "./products";

export default function HomeScreen() {
  let navigate = useNavigate();
  const {state, setState} = React.useContext(Context);

  useEffect(() => {
    if (state === false) {
        navigate("/login");
    }
  })

  return (
    <div className="home-container">
        <div className="home-header">
            <NavBar/>
        </div>
        {state.isAdmin
        ? <AdminHome />
        :<Products/>
        }
    </div>
  );
}

