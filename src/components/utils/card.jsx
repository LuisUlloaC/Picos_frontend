import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';


export default function ProductCard({image = '../../assets/portada.png', productName = 'product', price = '0', aviableCuantity = '0'}) {
    return (
        <Card sx={{ width: '15%', height: '40%', margin: '1%' }}>
            <CardMedia
                component="img"
                height="50%"
                image={image}
            />
            <CardContent>
                <span>{aviableCuantity}KG</span>
            </CardContent>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <AttachMoneyOutlinedIcon />
                    <span>{price}</span>
                </IconButton>
                <input className='card-input' type='text' />
                <IconButton>
                    <AddShoppingCartOutlinedIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}