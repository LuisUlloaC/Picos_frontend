import * as React from 'react';
import { getBillSummaryByDate, getBillSummaryPDFByDate, getBills } from '../../actions/bills';
import '../../reports.css';
import BillCard from '../utils/billCard';
import { Context } from '../context/provider';
import Pdfbg from '../../assets/pdfBg.png';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import IconButton from '@mui/material/IconButton';


export default function BillsView() {
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
    const years = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
    const [loading, setLoading] = React.useState(true)
    const [bills, setBills] = React.useState([])
    const { api } = React.useContext(Context);
    const [open, setOpen] = React.useState(false);
    const [pdfPreviewUrl, setPdfpreviewUrl] = React.useState(false);
    const [pfdUrl, setPdfUrl] = React.useState(false);
    
    const handleOpen = () => {
        setOpen(true);
        setLoading(true);
        (async () => {
            let pdf = await getBillSummaryPDFByDate(api, currentYear, currentMonth + 1);
            setPdfUrl(pdf.result);
            setPdfpreviewUrl(pdf.edgeURL);
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
            let resultBills = [];
            let allBills = await getBills(api);
            let closedBills = await getBillSummaryByDate(api, currentYear, currentMonth + 1);

            for (let elem of allBills.result.bills) {
                if (elem.date.startsWith(currentYear + '-' + String(currentMonth + 1).padStart(2, '0'))) {
                    if (closedBills.result.bills.some(bill => bill.id === elem.id)) {
                        elem.status = 'cerrado';
                    } else {
                        elem.status = 'abierto';
                    }
                    resultBills.push(elem);
                }
            }

            if (allBills?.sucess && closedBills?.sucess) {
                setBills(resultBills);
            }
        })();
    }, [api, currentMonth, currentYear]);

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style, height: '20%' }}>
                    <h2 id="child-modal-title">Obteniendo documento</h2>
                    <a href={pdfPreviewUrl} target="_blank">Visualizar</a>
                    {loading ? null :
                        <>
                        <IconButton href={pfdUrl} download={'resumen '+ String(currentMonth+1) +'-'+ currentYear+'.pdf'} style={{ display: 'flex' }} sx={{ height: '50%', width: '18%' }} >
                            <SimCardDownloadIcon sx={{ height: '100%', width: '100%' }} />
                            <span>Descargar</span>
                        </IconButton>
                        </>
                    }
                </Box>
            </Modal>


            <div className="title">Facturas</div>
            <div className='selector-container'>
                <div className='selector' >
                    <label for="years">Elija un año:</label>
                    <select className='dropdown' defaultValue={currentYear} names="years" onChange={e => { setCurrentYear(e.target.value) }}>
                        {years.map((year) => (
                            <option className='options' key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className='selector' >
                    <label for="cars">Elija un mes:</label>
                    <select className='dropdown' defaultValue={months[currentMonth]} onChange={e => { setCurrentMonth(months.indexOf(e.target.value)) }}>
                        {months.map((month, index) => (
                            <option className='options' key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="list">
                {bills.length !== 0 ? 
                <div onClick={() => {handleOpen();
                }} style={{
                    display: 'flex', width: '13%', height: '40%', marginLeft: '2%',
                    borderRadius: 8, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
                    boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)'
                }}>
                    <img src={Pdfbg} alt='pdf' style={{ display: 'flex', minHeight: '50%', width: '50%', padding: '1%' }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', height: '60%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <span>Resumen</span>
                    </div>
                </div>
                : null    
            }
                {bills.map((bill) => (
                    <BillCard key={bill.id} id={bill.id} date={bill.date} status={bill.status} />
                ))}
            </div>
        </>
    );
}