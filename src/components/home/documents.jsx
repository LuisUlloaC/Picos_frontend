import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Context } from '../context/provider';
import { getTemplates } from "../../actions/templates";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { createContractIssue } from "../../actions/contracts";


export default function DocumentsView({ contractId }) {
    const { api, setState, state } = React.useContext(Context);
    const [documents, setDocuments] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [templateId, setTemplateId] = React.useState();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const setView = (view) => {
        setState(oldState => ({
            ...oldState,
            view: view
        }));
    }


    const style = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '30%',
        maxWidth: '30%',
        height: '20%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        border: 'none',
        outline: 'none',
        pt: 2,
        px: 4,
        pb: 3,
        alignItems: 'center'

    };

    React.useEffect(() => {
        if (!state.ContractData) {
            setState(oldState => ({
                ...oldState,
                ContractData: {
                    bank_office: "12345678",
                    bank_name: "BANDEC",
                    bank_location: "ciudad",
                    account_number: "12345678"
                }
            }));
        }
        (async () => {
            let response = await getTemplates(api);
            if (response.sucess) {
                setDocuments(response.result);
            }
        })();
    }, [api, loading])

    return (
        <>
            <Modal
                open={open}
            >
                <Box sx={{ ...style }}>
                    <IconButton style={{ display: 'flex', position: 'absolute', top: '2%', right: '1%', justifyContent: 'flex-end' }} onClick={() => { handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                    <h2 id="child-modal-title">Suplemento creado</h2>
                    <div style={{ marginTop: '2%', marginBottom: '4%' }}>Descargar en historial</div>
                </Box>
            </Modal>


            <div className="title">Documentos</div>
            <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                width: '80%', height: '80%'
            }}>
                {documents?.map((documento) =>
                    documento.id === '3' ? <></> :
                        <div key={documento.id} style={{ display: 'flex', width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                            <IconButton
                                onClick={async () => {
                                    await createContractIssue(api, contractId, documento.id, state.ContractData.bank_office, state.ContractData.bank_location,
                                        state.ContractData.bank_name, state.ContractData.account_number);
                                    handleOpen()
                                }}
                                sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                                style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Nico Moji' }}>
                                <DescriptionOutlinedIcon style={{ fontSize: '10vh', color: '#000' }} />
                            </IconButton>
                            <span style={{ display: 'flex', maxWidth: '20%' }}>{documento.name}</span>
                        </div>
                )}
                <div style={{ display: 'flex', width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        onClick={() => { setView('issues/' + contractId) }}
                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Nico Moji' }}>
                        <DescriptionOutlinedIcon style={{ fontSize: '10vh', color: '#000' }} />
                    </IconButton>
                    <span style={{ display: 'flex', maxWidth: '20%' }}>Historial</span>
                </div>
            </div>
        </>
    );
}