import '../../reports.css';
import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


export default function ReportsView({ documentos = [] }) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => 2000 + i);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonth = new Date().getMonth();

    return (
        <>
            <div className="title">Reportes</div>
            <div className='selector-container'>
                <div className='selector' >
                <label for="years">Elija un año:</label>
                <select className='dropdown' value={currentYear} names="years">
                    {years.map((year) => (
                        <option className='options' key={year} value={year}>{year}</option>
                    ))}
                </select>
                </div>
                <div className='selector' >
                <label for="cars">Elija un mes:</label>
                <select className='dropdown' value={months[currentMonth]}>
                    {months.map((month, index) => (
                        <option className='options' key={index} value={month}>{month}</option>
                    ))}
                </select>
                </div>
            </div>
            <div className="list">
                {documentos.map((documento, index) => (
                    <div key={index}>
                        <IconButton
                            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                            style={{ display: 'flex', flexDirection: 'row' }}>
                            <DescriptionOutlinedIcon style={{ fontSize: '10vh', color: '#000' }} />
                            <span>{documento.name}</span>
                        </IconButton>
                    </div>
                ))}
            </div>
        </>
    );
}