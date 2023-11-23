import * as React from "react";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { createNewContractIssue, getContractInfo, getContracts } from "../../actions/contracts";
import ContratoBg from '../../assets/contratoBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import { useFormik } from "formik";
import * as Yup from "yup";


export default function IssuesView({contractId}) {
    const { setState, api } = useContext(Context);
    const [issues, setIssues] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [pfdUrl, setPdfUrl] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setLoading(true);
        (async () => {
            //let pdf = await getBillSummaryPDFByDate(api, currentYear, currentMonth + 1);
            setPdfUrl(pdf.result);
            setLoading(false);
        })();

    };
    const handleClose = () => {
        if (!loading) {
            URL.revokeObjectURL(pfdUrl);
            setOpen(false);
        }
        
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
            let response = await getContractInfo(api, contractId);
            if (response?.sucess) {
                setIssues(response.result.issues);
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
                    <h2 id="child-modal-title">Obteniendo archivo...</h2>
                    {loading ? null :
                        <>
                        <IconButton href={pfdUrl} download='issue.pdf' style={{ display: 'flex' }} sx={{ height: '50%', width: '18%' }} >
                            <SimCardDownloadIcon sx={{ height: '100%', width: '100%' }} />
                        </IconButton>
                        </>
                    }
                </Box>
            </Modal>


            <div className="title">Contratos</div>
            <div className="list">
                <IconButton  onClick={handleOpen}>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                </IconButton>
                {issues.map((issue) => (
                    <>
                        <div onClick={() => {""}} style={{
                            display: 'flex', width: '13%', height: '35%', margin: '1%',
                            borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', cursor:'pointer'}}>
                            <img src={ContratoBg} alt='img' style={{ display: 'flex', height: '50%', width: '50%', padding: '1%', marginLeft: '10%' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%', width: '100%' }}>
                                <span>Fecha:</span> <span>{(issue.date).split('T')[0]}</span>
                            </div>
                        </div>
                    </>

                ))}
            </div>
        </>
    );
}