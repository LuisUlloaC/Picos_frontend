import * as React from "react";
import '../../reports.css';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { createNewContractIssue, getContracts, getIssuePDF } from "../../actions/contracts";
import ContratoBg from '../../assets/contratoBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../utils/errorAlert";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';


export default function ContractsView() {
    const { state, setState, api } = useContext(Context);
    const [contracts, setContracts] = React.useState([]);
    const [contractDate, setContractDate] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [openDownloader, setOpenDownloader] = React.useState(false);
    const [pfdDownloadUrl, setPdfDownloadUrl] = React.useState(false);
    const [pdfPreviewUrl, setPdfpreviewUrl] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDownloader = (contract_id) => {
        setOpenDownloader(true);
        setLoading(true);
        (async () => {
            let pdf = await getIssuePDF(api, contract_id);
            setPdfDownloadUrl(pdf.result);
            setPdfpreviewUrl(pdf.edgeURL);
            setLoading(false);
        })();
    };
    const handleCloseDownloader = () => {
        setOpenDownloader(false);
    };


    const style = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '30%',
        maxWidth: '30%',
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

    const validationSchema = Yup.object().shape({
    bank_office: Yup.string()
       .required('Oficina bancaria requerido')
       .matches(/^[0-9]+$/, 'Oficina bancaria solo admite números')
       .max(4, 'Oficina bancaria no puede tener más de 4 caracteres'),
   bank_location: Yup.string()
       .required('Ubicación del banco')
       .test('no-digits', 'Ubicacion del banco solo se admiten letras', value => !/\d/.test(value))
       .max(15, 'Ubicación del banco no puede tener más de 15 caracteres'),
   bank_name: Yup.string()
       .required('Nombre del banco requerido')
       .test('no-digits', 'Nombre del banco solo admite letras', value => !/\d/.test(value)),
   account_number: Yup.string()
       .required('Número de cuenta requerido')
       .matches(/^[0-9]+$/, 'Número de cuenta solo admite números')
       .max(16, 'Número de cuenta no puede tener más de 16 caracteres'),
    });



    const setView = (view) => {
        setState(oldState => ({
            ...oldState,
            view: view
        }));
    }


    React.useEffect(() => {
        (async () => {
            let response = await getContracts(api);
            setContracts(response.result.contracts);
            setLoading(false);
        })();
    }, [loading])

    return (
        <>

            <Modal
                open={openDownloader}
                onClose={handleCloseDownloader}
            >
                <Box sx={{ ...style, height: '20%' }}>
                    <h2 id="child-modal-title">Documento creado</h2>
                    <><a href={pdfPreviewUrl} target="_blank">Visualizar</a></>
                    {loading ? null :
                        <>
                            <IconButton href={pfdDownloadUrl} download={`contract ${contractDate}.pdf`} style={{ display: 'flex' }} sx={{ height: '50%', width: '15%' }} >
                                <SimCardDownloadIcon sx={{ height: '100%', width: '100%' }} />
                                <span>Descargar</span>
                            </IconButton>
                        </>
                    }
                </Box>
            </Modal>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Agregar contrato</h2>
                    <Formik
                        initialValues={{
                            template_id: "3",
                            bank_office: "",
                            bank_location: "",
                            bank_name: "",
                            account_number: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async values => {
                            handleClose()
                            const contract_id = await createNewContractIssue(api, values.template_id,
                                values.bank_office, values.bank_location, values.bank_name, values.account_number
                            )
                            handleOpenDownloader(contract_id.response.data.issue_id);
                            var today = new Date().toJSON().slice(0, 10);
                            setContractDate(today)
                            if(!state.ContractData){
                                setState(oldState => ({
                                    ...oldState,
                                    ContractData: {
                                        bank_office: values.bank_office,
                                        bank_name: values.bank_name,
                                        bank_location: values.bank_location,
                                        account_number: values.account_number
                                    }
                                }));
                            }else{
                                setState(oldState => {
                                    let contract = oldState.ContractData;
                                    contract.bank_location = values.bank_location;
                                    contract.bank_name = values.bank_name;
                                    contract.bank_office = values.bank_office;
                                    contract.account_number = values.account_number;
                                    console.log('here')
                                    return ({
                                        ...oldState,
                                        ContractData: contract
                                    })
                                });
                            }
                            setLoading(true);
                        }}

                        style={{
                            display: 'flex', width: '80%', height: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}

                    >
                        {({ errors, touched }) => (
                            <Form style={{
                                display: 'flex', width: '80%', height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Número de cuenta: </span>
                                    <Field className='card-input' name="account_number" />
                                    {errors.account_number && touched.account_number && <ErrorAlert errorBody={errors.account_number} />}
                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Nombre del banco: </span>
                                    <Field className='card-input' style={{
                                        border: 'none', outline: 'none',
                                        borderRadius: 8, width: '40%', textAlign: 'center'
                                    }} name="bank_name" as="select">
                                        <option className='options' value="">Seleccionar</option>
                                        <option className='options' value="BPA">BPA</option>
                                        <option className='options' value="BANDEC">BANDEC</option>
                                    </Field>
                                    {errors.bank_name && touched.bank_name && <ErrorAlert errorBody={errors.bank_name} />}
                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Oficina bancaria: </span>
                                    <Field className='card-input' name="bank_office" />
                                    {errors.bank_office && touched.bank_office && <ErrorAlert errorBody={errors.bank_office} />}
                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Ubicación del banco: </span>
                                    <Field className='card-input' name="bank_location" />
                                    {errors.bank_location && touched.bank_location && <ErrorAlert errorBody={errors.bank_location} />}
                                </div>
                                <IconButton type="submit" style={{ display: 'flex', fontFamily: 'Nico Moji' }}>
                                    <span>Crear</span>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>


            <div className="title">Contratos</div>
            <div className="list">
                <IconButton onClick={handleOpen}>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                </IconButton>
                {contracts.map(contrato => (
                    <div key={contrato.id} onClick={() => {
                        setView('document/' + contrato.id)
                    }} style={{
                        display: 'flex', width: '13%', height: '35%', margin: '1%',
                        borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', cursor: contrato.active ? 'pointer' : 'default'
                    }}>
                        <img src={ContratoBg} alt='img' style={{ display: 'flex', minHeight: '50%', width: '50%', padding: '1%', marginLeft: '10%' }} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', height: '25%', width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <span>{contrato.number}</span>
                        </div>
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

                ))}
            </div>
        </>
    );
}