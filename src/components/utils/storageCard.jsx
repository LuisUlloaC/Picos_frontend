import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { deleteProduct } from '../../actions/products';



export default function StorageCard({ image = '../../assets/portada.png', name = 'product', price = '0', stock = '0', api }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '20%',
        maxWidth: '20%',
        height: '40%',
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

    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Editar producto</h2>
                    <div style={{display: 'flex', width: '80%', height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'}}>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Nombre: </span>
                            <input className='card-input' defaultValue={name} style={{width: '50%'}} />
                        </div>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Cantidad: </span>
                            <input className='card-input' defaultValue={stock} style={{width: '50%'}} />
                        </div>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Precio: </span>
                            <div style={{display: 'flex' , width: '56%', justifyContent: 'space-between'}}>
                            <input className='card-input' defaultValue={price} style={{width: '100%', marginRight: '5%'}} />
                            <AttachMoneyOutlinedIcon />
                            </div>
                        </div>
                    </div>
                    <IconButton style={{display: 'flex'}}>
                    <ArrowForwardIosIcon/>
                    </IconButton>
                </Box>
            </Modal>

            <Card sx={{ maxWidth: '20%', height: '40%', margin: '1%' }}>
                <CardMedia
                    component="img"
                    height="50%"
                    image={image}
                />
                <CardContent style={{ display: 'flex', flexDirection: 'column', height: '15%' }}>
                    <span>{name}</span>
                    <span>{stock}KG</span>
                </CardContent>
                <CardActions style={{ display: 'flex', direction: 'rtl', minHeight: '20%', alignItems: 'center' }}>
                    <IconButton onClick={(async () => await deleteProduct(api))}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <EditNoteOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachMoneyOutlinedIcon />
                        <span>{price}</span>
                    </IconButton>
                </CardActions>
            </Card>
        </>
    );
}