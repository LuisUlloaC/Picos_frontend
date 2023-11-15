import * as React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';

import DescriptionOutlinedIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

import "./admin.css"

export default function AdminHome() {
    const navigate = useNavigate()
    return(
        <div className="admin-layout">

                <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent"} }}
                style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}>
                    <DescriptionOutlinedIcon style={{ fontSize: "30vh", color: "#000" }}/>
                    <span>Documento</span>
                </IconButton>

                <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent"} }}
                style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}>
                    <WarehouseIcon style={{ fontSize: "30vh", color: "#000" }}/>
                    <span>Almacen</span>
                </IconButton>

                <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent"} }}
                style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}>
                    <ReceiptLongOutlinedIcon style={{ fontSize: "30vh", color: "#000" }}/>
                    <span>Facturas</span>
                </IconButton>

        </div>
    )
}