import * as React from "react";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { createNewContractIssue, getContracts } from "../../actions/contracts";
import ContratoBg from '../../assets/contratoBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useFormik } from "formik";
import * as Yup from "yup";


export default function ContractsView() {
    const { setState, api } = useContext(Context);
    const [contracts, setContracts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const style = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '40%',
        maxWidth: '40%',
        height: '60%',
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

    const formik = useFormik({
        initialValues: {
            template_id: "3",
            bank_office: "",
            bank_location: "",
            bank_name: "",
            account_number: "",
        },
        validationSchema: Yup.object({
            template_id: Yup.string(),
            bank_office: Yup.string(),
            bank_location: Yup.string(),
            bank_name: Yup.string(),
            account_number: Yup.string(),
        }),
        onSubmit: async (values) => {
            await createNewContractIssue(api, values.template_id,
                values.bank_office, values.bank_location, values.bank_name, values.account_number
            );
            formik.setFieldValue("bank_office", '')
            formik.setFieldValue("bank_location", '')
            formik.setFieldValue("bank_name", '')
            formik.setFieldValue("account_number", '')
            setLoading(true)
        }
    })


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
    }, [api, loading])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Agregar producto</h2>
                    <div style={{
                        display: 'flex', width: '80%', height: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly'
                    }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Número de cuenta: </span>
                            <input className='card-input' style={{ width: '100%' }} {...formik.getFieldProps("account_number")} />
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Nombre del banco: </span>
                            <input className='card-input' style={{ width: '100%' }} {...formik.getFieldProps("bank_name")} />
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Oficina bancaria: </span>
                            <input className='card-input' style={{ width: '100%', marginRight: '5%' }} {...formik.getFieldProps("bank_office")} />
                        </div>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Ubicación del banco: </span>
                            <input className='card-input' style={{ width: '100%', marginRight: '5%' }} {...formik.getFieldProps("bank_location")} />
                        </div>
                    </div>
                    <IconButton style={{ display: 'flex' }} onClick={() => {
                        
                        formik.handleSubmit()
                        handleClose()
                    }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Modal>


            <div className="title">Contratos</div>
            <div className="list">
                <IconButton  onClick={handleOpen}>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                </IconButton>
                {contracts.map((contrato) => (
                    <div key={contrato.id}>
                        <div key={contrato.id} onClick={() => {if(contrato.active){
                            setView('document/')
                        }}} style={{
                            display: 'flex', width: '13%', height: '35%', margin: '1%',
                            borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', cursor: contrato.active ? 'pointer' : 'default' 
                        }}>
                            <img src={ContratoBg} alt='img' style={{ display: 'flex', height: '50%', width: '50%', padding: '1%', marginLeft: '10%' }} />
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
                    </div>

                ))}
            </div>
        </>
    );
}