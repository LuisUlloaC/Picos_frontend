import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ContractsView from "../home/contracts";
import DocumentsView from "../home/documents";
import ReportsView from "../home/reports";
import BillsView from "../home/bills";

import "./admin.css"
import Products from "../home/products";

export default function AdminHome() {
    const [view, setView] = React.useState('home')

    return(
        <>
            {view === 'home' ? 
                <div className="admin-layout">
                    <IconButton
                    sx={{ "&:hover": { backgroundColor: "transparent"} }}
                    style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}
                    onClick={() => setView('documents')}>
                        <DescriptionOutlinedIcon style={{ fontSize: "30vh", color: "#000" }}/>
                        <span>Documento</span>
                    </IconButton>

                    <IconButton
                    sx={{ "&:hover": { backgroundColor: "transparent"} }}
                    style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}
                    onClick={() => setView('storage')}>
                        <WarehouseIcon style={{ fontSize: "30vh", color: "#000" }}/>
                        <span>Almacen</span>
                    </IconButton>

                    <IconButton
                    sx={{ "&:hover": { backgroundColor: "transparent"} }}
                    style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}
                    onClick={() => setView('bills')}>
                        <ReceiptLongOutlinedIcon style={{ fontSize: "30vh", color: "#000" }}/>
                        <span>Facturas</span>
                    </IconButton> 
                </div>
                : null
            }
            {view === 'documents' ? <DocumentsView/> : null}
            {view === 'storage' ? <Products/> : null}
            {view === 'bills' ? <BillsView/> : null}
        
        
        </>
        

    )
}