import * as React from "react";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { getContracts } from "../../actions/contracts";
import Pdfbg from '../../assets/pdfBg.png';


export default function ContractsView() {
    const { setState, api } = useContext(Context);
    const [contracts, setContracts] = React.useState([]);

    const setView = (view) => {
        setState(oldState => ({
            ...oldState,
            view: view
        }));
    }


    React.useEffect(() => {
        (async () => {
            let response = await getContracts(api);
            if (response?.sucess) {
                setContracts(response.result.contracts);
            }
        })();
    }, [api])
    return (
        <>
            <div className="title">Contratos</div>
            <div className="list">
                <IconButton>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                </IconButton>
                {contracts.map((contrato) => (
                    <>
                        <div onClick={() => {console.log('')}} style={{
                            display: 'flex', width: '13%', height: '35%', marginLeft: '2%',
                            borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)'
                        }}>
                            <img src={Pdfbg} style={{ display: 'flex', height: '50%', width: '50%', padding: '1%' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', height: '10%', width: '100%', justifyContent: 'space-evenly' }}>
                                <span>Estado:</span> <span>{contrato.active ? 'activo' : 'cerrado'}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%', width: '100%' }}>
                                <span>Fecha:</span> <span>{(contrato.date).split('T')[0]}</span>
                            </div>
                            {'' === 'abierto' ?
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                                    <span style={{
                                        padding: '1.5%',
                                        marginBottom: '2%',
                                        backgroundColor: '#fff',
                                        color: 'black',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        borderRadius: '8px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transitionDuration: '0.4s',
                                        boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.19)'
                                    }} >Cambiar estado</span>
                                </div> : null

                            }
                        </div>
                    </>

                ))}
            </div>
        </>
    );
}