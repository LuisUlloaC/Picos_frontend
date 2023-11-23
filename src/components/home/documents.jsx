import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Context } from '../context/provider';
import { getTemplates } from "../../actions/templates";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createContractIssue } from "../../actions/contracts";


export default function DocumentsView({contractId}) {
    const { api, state, setState } = React.useContext(Context);
    const [documents, setDocuments] = React.useState();
    const [open, setOpen] = React.useState(false);
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
            contract_id: contractId,
            template_id: "",
            bank_office: "",
            bank_location: "",
            bank_name: "",
            account_number: "",
        },
        validationSchema: Yup.object({
            contract_id: Yup.string(),
            template_id: Yup.string(),
            bank_office: Yup.string(),
            bank_location: Yup.string(),
            bank_name: Yup.string(),
            account_number: Yup.string(),
        }),
        onSubmit: async (values) => {
            await createContractIssue(api, values.contract_id, values.template_id,
                values.bank_office, values.bank_location, values.bank_name, values.account_number
            );
            formik.setFieldValue("bank_office", '')
            formik.setFieldValue("bank_location", '')
            formik.setFieldValue("bank_name", '')
            formik.setFieldValue("account_number", '')
        }
    })


    React.useEffect(() => {

        (async () => {
            let response = await getTemplates(api);
            if (response.sucess) {
                setDocuments(response.result);
            }
        })();
    }, [api])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Agregar a contrato</h2>
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


            <div className="title">Documentos</div>
            <div style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
                width: '80%', height: '80%'
            }}>
                {documents?.map((documento) => 
                documento.id === '3' ? <></> : 
                    <div key={documento.id} style={{ display: 'flex', width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            onClick={() => {
                                handleOpen();
                                formik.setFieldValue("template_id", documento.id);
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
                        onClick={() => { setView('issues/'+contractId)}}
                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                        style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Nico Moji' }}>
                        <DescriptionOutlinedIcon style={{ fontSize: '10vh', color: '#000' }} />
                    </IconButton>
                    <span style={{ display: 'flex', maxWidth: '20%' }}>Contrato</span>
                </div>
            </div>
        </>
    );
}