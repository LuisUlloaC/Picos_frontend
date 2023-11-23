import * as React from "react";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Context } from '../context/provider';
import { useContext } from 'react';
import { getContractInfo, getIssuePDF } from "../../actions/contracts";
import ContratoBg from '../../assets/contratoBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';


export default function IssuesView({contractId}) {
    const { api } = useContext(Context);
    const [issues, setIssues] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [pfdUrl, setPdfUrl] = React.useState(false);

    const handleOpen = (issueId) => {
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


    React.useEffect(() => {
        (async () => {
            let response = await getContractInfo(api, contractId);
            if (response?.sucess) {
                setIssues(response.result.issues);
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
                {issues.map((issue) => (
                        <div key={issue.id} onClick={() => {handleOpen(issue.id)}} style={{
                            display: 'flex', width: '13%', height: '35%', margin: '1%',
                            borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                            boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)', cursor:'pointer'}}>
                            <img src={ContratoBg} alt='img' style={{ display: 'flex', height: '50%', width: '50%', padding: '1%', marginLeft: '10%' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%', width: '100%' }}>
                                <span>Fecha:</span> <span>{(issue.date).split('T')[0]}</span>
                            </div>
                        </div>

                ))}
            </div>
        </>
    );
}