import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


export default function ContractsView({ contratos = [] }) {
    return (
        <>
            <div className="title">Contratos</div>
            <div className="list">
                <IconButton>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                </IconButton>
                {contratos.map((contrato, index) => (
                    <div key={index}>
                        <IconButton style={{ display: 'flex', flexDirection: 'column' }}>
                            <DescriptionOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                            <span>{contrato.date}</span>
                        </IconButton>
                    </div>
                ))}
            </div>
        </>
    );
}