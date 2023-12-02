import * as React from "react";
import IconButton from '@mui/material/IconButton';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { getContractInfo, getIssuePDF } from "../../actions/contracts";
import { getTemplates } from "../../actions/templates";
import ContratoBg from '../../assets/contratoBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';


export default function IssuesView({ contractId }) {
    const { api, state, setState } = useContext(Context);
    const [issues, setIssues] = React.useState([]);
    const [templates, setTemplates] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [pfdUrl, setPdfUrl] = React.useState(false);
    const [issueDate, setIssueDate] = React.useState('');

    const handleOpen = (issueId, date) => {
        setIssueDate(date)
        setOpen(true);
        setLoading(true);
        (async () => {
            let pdf = await getIssuePDF(api, issueId);
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
        minWidth: '30%',
        maxWidth: '30%',
        height: '25%',
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
        (async () => {
            if(!state.ContractData){
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
            let templates = await getTemplates(api);
            let response = await getContractInfo(api, contractId);
            if (response?.sucess) {
                let orderedList = response.result.issues.sort((a, b) => a.id - b.id);
                setIssues(orderedList);
                setTemplates(templates.result);
            }
        })();
    }, [api, loading, contractId])

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Obteniendo documento</h2>
                    {loading ? null :
                        <>
                            <IconButton href={pfdUrl} download={`issue ${issueDate}.pdf`} style={{ display: 'flex' }} sx={{ height: '50%', width: '25%' }} >
                                <SimCardDownloadIcon sx={{ height: '100%', width: '100%' }} />
                                <span>Descargar</span>
                            </IconButton>
                        </>
                    }
                </Box>
            </Modal>


            <div className="title">Historial</div>
            <div className="list">
                {issues.map((issue) => (
                    <div key={issue.id} onClick={() => { handleOpen(issue.id, (issue.date).split('T')[0]) }} style={{
                        display: 'flex', width: '15%', height: '40%', margin: '1%',
                        borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                        boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', cursor: 'pointer'
                    }}>
                        <img src={ContratoBg} alt='img' style={{ display: 'flex', minHeight: '50%', width: '50%', padding: '1%', marginLeft: '10%' }} />
                        {templates.map(element => {
                            if (element.id === issue.template) {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%', width: '95%', textAlign: 'center', marginBottom: '2%' }}>
                                        <span>{element.name}</span>
                                    </div>
                                )
                            }
                        })}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40%', width: '100%' }}>
                            <span>{issue.number}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%', width: '100%' }}>
                            <span>Fecha:</span> <span>{(issue.date).split('T')[0]}</span>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
}