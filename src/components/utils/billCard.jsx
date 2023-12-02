import * as React from 'react';
import { Context } from '../context/provider';
import Pdfbg from '../../assets/pdfBg.png';
import { closeBill, getBillPDF } from '../../actions/bills';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function BillCard({ id, date, status }) {
    const [statusValue, setStatusValue] = React.useState(status);
    const { api } = React.useContext(Context);
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);

    const [pfdUrl, setPdfUrl] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        setLoading(true);
        (async () => {
            let pdf = await getBillPDF(api, id);
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
        minWidth: '22%',
        maxWidth: '22%',
        height: '15%',
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


    React.useEffect(() => { })

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <IconButton style={{ display: 'flex', position: 'absolute', top: '2%', right: '1%', justifyContent: 'flex-end' }} onClick={() => { handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                    <h2 id="child-modal-title">Generando factura</h2>
                    {loading ? null :
                        <IconButton href={pfdUrl} download={'factura ' + id + ' ' + date + '.pdf'} style={{ display: 'flex' }} sx={{ height: '50%', width: '18%' }} >
                            <SimCardDownloadIcon sx={{ height: '100%', width: '100%' }} />
                            <span>Descargar </span>
                        </IconButton>
                    }
                </Box>
            </Modal>



            <div style={{
                display: 'flex', width: '13%', height: '40%', marginLeft: '2%',
                borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)'
            }}>
                <img onClick={() => { handleOpen(); }} alt='bill' src={Pdfbg} style={{ display: 'flex', minHeight: '50%', width: '50%', padding: '1%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '20%', width: '100%' }}>
                    <span>{id}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '30%', width: '100%' }}>
                    <span>Fecha:</span> <span>{date}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', height: '10%', width: '100%', justifyContent: 'space-evenly' }}>
                    <span>Estado:</span> <span>{statusValue}</span>
                </div>
                {statusValue === 'abierto' ?
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                        <span style={{
                            padding: '1.5%',
                            marginBottom: '2%',
                            backgroundColor: '#ff0000',
                            color: 'white',
                            textAlign: 'center',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            transitionDuration: '0.4s',
                            boxShadow: '0 6px 10px 0 rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.19)'
                        }} onClick={() => { closeBill(api, id); setStatusValue('entregado') }} >Entregar</span>
                    </div> : null

                }
            </div>
        </>
    );
}