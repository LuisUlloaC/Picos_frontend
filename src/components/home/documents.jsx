import * as React from "react";
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Context } from '../context/provider';
import { getTemplates } from "../../actions/templates";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../utils/errorAlert";
import { createContractIssue } from "../../actions/contracts";


export default function DocumentsView({ contractId }) {
    const { api, setState } = React.useContext(Context);
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

    const validationSchema = Yup.object().shape({
        bank_office: Yup.string().required('Oficina bancaria requerido').test('no-digits', 'Oficina bancaria solo se admiten letras', value => !/\d/.test(value)),
        bank_location: Yup.string().required('Ubicación del banco').test('no-digits', 'Ubicacion del banco solo se admiten letras', value => !/\d/.test(value)),
        bank_name: Yup.string().required('Nombre del banco requerido').test('no-digits', 'Nombre del banco solo admite letras', value => !/\d/.test(value)),
        account_number: Yup.string().required('Número de cuenta requerido').matches(/^[0-9]+$/, 'Número de cuenta solo admite números'),
    });

    React.useEffect(() => {

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
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Agregar contrato</h2>
                    <Formik
                        initialValues={{
                            contract_id: contractId,
                            template_id: templateId,
                            bank_office: "",
                            bank_location: "",
                            bank_name: "",
                            account_number: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async values => {
                            await createContractIssue(api, values.contract_id, values.template_id,
                                values.bank_office, values.bank_location, values.bank_name, values.account_number
                            );
                            setLoading(true);
                            handleClose();
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
                                        <option className='options' value="">Select...</option>
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
                                <IconButton type="submit" style={{ display: 'flex' }}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Form>
                        )}
                    </Formik>
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
                                    setTemplateId(documento.id);
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
                    <span style={{ display: 'flex', maxWidth: '20%' }}>Contrato</span>
                </div>
            </div>
        </>
    );
}