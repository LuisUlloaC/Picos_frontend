import * as React from "react";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { getContracts } from "../../actions/contracts";


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
                    <div key={contrato.id}>
                        <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                            style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nico Moji' }}
                            onClick={() => { setView('document/' + contrato.id) }}>
                            <DescriptionOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                            <span>{(contrato.date).split("T")[0]}</span>
                        </IconButton>
                    </div>
                ))}
            </div>
        </>
    );
}