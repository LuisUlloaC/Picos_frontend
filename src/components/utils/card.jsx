import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Context } from '../context/provider';


export default function ProductCard({ image = '../../assets/portada.png',id , name = 'product', price = 0, stock = '0' }) {
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const { setState } = React.useContext(Context);

    const addToCart = (amount, price) => {
        setState(oldState => {
            let oldCart = oldState.cart;
            let found = false;
            for (let element of oldCart) {
                if (element.product_id === id) {
                    element.amount += Number(amount);
                    element.price += Number(price)*Number(amount    )
                    found = true;
                }
            }
            if (!found) {
                oldCart = oldCart.concat({ product_id: id, productName: name, amount: Number(amount), price: Number(price)*Number(amount) })
            }
            return ({
                ...oldState,
                cart: oldCart
            })
        })
    }

    return (
        <Card sx={{ width: '14%', height: '40%', margin: '1%' }}>
            <CardMedia
                component="img"
                height="50%"
                image={image}
            />
            <CardContent style={{ display: 'flex', flexDirection: 'row', height: '20%', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ display: 'flex', flexWrap: 'wrap' }}>{name}</span>
                    <span>{stock}KG</span>
                </div>

                <IconButton onClick={() => {addToCart(inputValue, price)}}>
                    <AddShoppingCartOutlinedIcon />
                </IconButton>
            </CardContent>
            <CardActions style={{ display: 'flex', flexDirection: 'column', height: '10%', }}>
                <div style={{ display: 'flex', width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5%' }}>
                    <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                        <AttachMoneyOutlinedIcon />
                        <span>{price}</span>
                    </IconButton>
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        <input className='card-input' type='text' value={inputValue} onChange={handleInputChange} />
                        <span>KG</span>
                    </div>
                </div>
            </CardActions>
        </Card>
    );
}