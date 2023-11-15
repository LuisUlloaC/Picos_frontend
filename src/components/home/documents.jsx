import IconButton from '@mui/material/IconButton';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';


export default function DocumentsView({ documentos = [] }) {
    return (
        <>
            <div className="title">Documentos</div>
            <div className="list">
                {documentos.map((documento, index) => (
                    <div key={index}>
                        <IconButton
                        sx={{ '&:hover': { backgroundColor: 'transparent', fontFamily: 'Nico Moji' } }}  
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