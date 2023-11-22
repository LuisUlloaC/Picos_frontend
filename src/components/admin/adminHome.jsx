import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/Description';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ContractsView from "../home/contracts";
import DocumentsView from "../home/documents";
import BillsView from "../home/bills";

import "./admin.css"
import Products from "../home/products";

import { Context } from "../context/provider";

export default function AdminHome() {
    const { state, setState } = React.useContext(Context);

    const setView = (view) => {
        setState(oldState => ({
            ...oldState,
            view: view
        }));
    }

    return(
        <>
            {state.view === 'home' ? 
                <div className="admin-layout">
                    <IconButton
                    sx={{ "&:hover": { backgroundColor: "transparent"} }}
                    style={{ display: "flex", flexDirection: "column", fontFamily: "Nico Moji" }}
                    onClick={() => setView('contracts')}>
                        <DescriptionOutlinedIcon style={{ fontSize: "30vh", color: "#000" }}/>
                        <span>Contratos</span>
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
            {state.view === 'contracts' ? <ContractsView/> : null}
            {state.view === 'storage' ? <Products/> : null}
            {state.view === 'bills' ? <BillsView/> : null}
            {state.view.startsWith('document/') ? <DocumentsView contractId={state.view.split('/')[1]} /> : null}
        
        
        </>
        

    )
}