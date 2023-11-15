import StorageCard from "../utils/storageCard";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import IconButton from '@mui/material/IconButton';


export default function StorageView() {
    return (
        <>
        <div className="title">Almacen</div>
        <div className="list">
            <IconButton>
                <AddOutlinedIcon style={{fontSize: '20vh', color: '#000'}} />
            </IconButton>
          <StorageCard/>
        </div>
        </>
    );
  }