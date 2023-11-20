import * as React from "react";
import '../../home.css'
import { useNavigate } from "react-router-dom";
import NavBar from "../utils/navBar";
import ContractsView from "./contracts";
import DocumentsView from "./documents";
import ReportsView from "./reports";
import Products from "./products";
import BillsView from "./bills";
import { useEffect } from "react";
import { Context } from "../context/provider";
import AdminHome from "../admin/adminHome";

export default function HomeScreen() {
  const { state, setState } = React.useContext(Context);
  const [view, setView] = React.useState('home');
  

  return (
    <div className="home-container">
        <div className="home-header">
            <NavBar/>
        </div>
        {/*state.role*/ "admin" === "admin"
        ? <AdminHome view={view} setView={setView} />
        :<Products/>
        }
    </div>
  );
}

