import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


export default function StorageCard({ image = '../../assets/portada.png', productName = 'product', price = '0', aviableCuantity = '0' }) {
    return (
        <Card sx={{ width: '15%', height: '40%', margin: '1%' }}>
            <CardMedia
                component="img"
                height="50%"
                image={image}
                alt=''
            />
            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{productName}</span>
                <span>{aviableCuantity}KG</span>
            </CardContent>
            <CardActions style={{ direction: 'rtl' }}>
                <IconButton>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton>
                    <EditNoteOutlinedIcon />
                </IconButton>
                <IconButton>
                    <AttachMoneyOutlinedIcon />
                    <span>{price}</span>
                </IconButton>
            </CardActions>
        </Card>
    );
}