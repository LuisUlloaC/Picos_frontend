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
import { deleteProduct, deleteProductImage, editProduct, uploadProductImage } from '../../actions/products';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../utils/errorAlert";
import { getProductImage } from '../../actions/products';



export default function StorageCard({ image = '', name = 'product', price = '0', stock = '0', api, id = 0, setLoading }) {
    const [open, setOpen] = React.useState(false);
    const [imageURL, setImageURL] = React.useState('../../assets/portada.png');
    const fileInput = React.useRef(null);
    const [file, setFile] = React.useState(false);

    const handleButtonClick = () => {
        if (fileInput.current !== null) {
            fileInput.current.click();
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        (async () => {
            let result = await getProductImage(api, image);
            setImageURL(result.result);
            setLoading(false);
        })()
    })

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nombre requerido')
            .max(10, 'Nombre no puede tener más de 10 caracteres'),
        price: Yup.string()
            .required('Precio requerido')
            .matches(/^[0-9]+$/, 'Precio solo admite números')
            .max(4, 'Precio no puede tener más de 4 caracteres'),
        stock: Yup.string()
            .required('Cantidad requerida')
            .matches(/^[0-9]+$/, 'Cantidad solo admite números')
            .max(6, 'Cantidad no puede tener más de 6 caracteres'),
    });

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
                    <Formik
                        initialValues={{
                            id: id,
                            name: name,
                            price: price,
                            stock: stock,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async values => {
                            let imageId = (await uploadProductImage(api, file)).result;
                            await editProduct(api, id, values.name, values.stock, values.price, imageId);
                            await deleteProductImage(api, image);
                            setLoading(true)
                            handleClose()
                        }}

                        style={{
                            display: 'flex', width: '80%', height: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}

                    >
                        {({ errors, touched }) => (
                            <Form style={{
                                display: 'flex', width: '80%', height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly'
                            }}>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Nombre: </span>
                                    <Field className='card-input' name="name" />
                                    {errors.name && touched.name && <ErrorAlert errorBody={errors.name} />}
                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Imagen: </span>
                                    <button className='card-input' onClick={() => { handleButtonClick() }}
                                        style={{ width: '45%', alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        Seleccionar...
                                    </button>
                                    <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} />

                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Cantidad: </span>
                                    <Field className='card-input' name="stock" />
                                    {errors.stock && touched.stock && <ErrorAlert errorBody={errors.stock} />}
                                </div>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <span>Precio: </span>
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                                        <Field className='card-input' name="price" />
                                        <AttachMoneyOutlinedIcon />
                                        {errors.price && touched.price && <ErrorAlert errorBody={errors.price} />}
                                    </div>
                                </div>
                                <IconButton type="submit" style={{ display: 'flex', fontFamily: 'Nico Moji' }}>
                                    <span>Editar </span>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>

            <Card sx={{ maxWidth: '20%', height: '40%', margin: '1%' }}>
                <CardMedia
                    component="img"
                    height="50%"
                    image={imageURL}
                />
                <CardContent style={{ display: 'flex', flexDirection: 'column', height: '15%' }}>
                    <span>{name}</span>
                    <span>{stock}KG</span>
                </CardContent>
                <CardActions style={{ display: 'flex', direction: 'rtl', minHeight: '20%', alignItems: 'center' }}>
                    <IconButton onClick={(async () => {
                        await deleteProduct(api, id);
                        await deleteProductImage(api, image)
                        setLoading(true)
                    })}>
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