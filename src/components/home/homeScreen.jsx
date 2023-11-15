import * as React from "react";
import '../../home.css'
import { useNavigate } from "react-router-dom";
import NavBar from "../utils/navBar";
import Products from "./products";
import StorageView from "./storage";

export default function HomeScreen() {
  let navigate = useNavigate();

  return (
    <div className="home-container">
        <div className="home-header">
            <NavBar/>
        </div>
        <StorageView/>
    </div>
  );
}

