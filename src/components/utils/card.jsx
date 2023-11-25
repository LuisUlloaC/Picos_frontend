import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Context } from '../context/provider';
import { getProductImage } from '../../actions/products';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../utils/errorAlert";

export default function ProductCard({ image, id, name = 'product', price = 0, stock = '0' }) {

    const { setState, api } = React.useContext(Context);

    const [imageURL, setImageURL] = React.useState('../../assets/portada.png');

    React.useEffect(() => {

        (async () => {
            let result = await getProductImage(api, image);
            setImageURL(result.result);
        })()
    })
    const addToCart = (amount, price) => {
        setState(oldState => {
            let oldCart = oldState.cart;
            let found = false;
            for (let element of oldCart) {
                if (element.product_id === id) {
                    element.amount += Number(amount);
                    element.price += Number(price) * Number(amount)
                    found = true;
                }
            }
            if (!found) {
                oldCart = oldCart.concat({ product_id: id, productName: name, amount: Number(amount), price: Number(price) * Number(amount) })
            }
            return ({
                ...oldState,
                cart: oldCart
            })
        })
    }

    const validationSchema = Yup.object().shape({
        amount: Yup.number().typeError('La cantidad a comprar debe de ser un número').required('Cantidad requerida').max(stock, `No puede comprar más de ${stock}KG`)
    });

    return (
        <Card sx={{ width: '14%', height: '40%', margin: '1%' }}>
            <CardMedia
                component="img"
                height="50%"
                image={imageURL}
            />
            <Formik
                initialValues={{
                    amount: null,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, {resetForm}) => {
                    addToCart(values.amount, price);
                    resetForm();
                    
                }}>

                {({ errors, touched }) => (
                    <Form style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                        <CardContent style={{ display: 'flex', flexDirection: 'row', height: '20%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ display: 'flex', flexWrap: 'wrap' }}>{name}</span>
                                <span>{stock}KG</span>
                            </div>

                            <IconButton type="submit">
                                <AddShoppingCartOutlinedIcon />
                            </IconButton>
                        </CardContent>
                        <CardActions style={{ display: 'flex', flexDirection: 'column', height: '10%', }}>
                            <div style={{ display: 'flex', width: '100%', height: '10%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5%' }}>
                                <IconButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
                                    <AttachMoneyOutlinedIcon />
                                    <span>{price}</span>
                                </IconButton>
                                <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end'}}>
                                    <Field className='card-input' name="amount" />
                                    {errors.amount && touched.amount && <ErrorAlert errorBody={errors.amount} />}
                                    <span>KG</span>
                                </div>
                            </div>
                        </CardActions>
                    </Form>
                )}
            </Formik>
        </Card>
    );
}