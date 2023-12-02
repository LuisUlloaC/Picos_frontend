import * as React from 'react';
import ProductCard from "../utils/card";
import { Context } from "../context/provider";
import { createProduct, getProducts, uploadProductImage } from "../../actions/products";
import StorageCard from "../utils/storageCard";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ErrorAlert from "../utils/errorAlert";


export default function Products() {
  const [loading, setLoading] = React.useState(true);
  const { state, api } = React.useContext(Context);
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
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


  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    price: Yup.string().required('Precio requerido').matches(/^[0-9]+$/, 'Precio solo admite números'),
    stock: Yup.string().required('Cantidad requerida').matches(/^[0-9]+$/, 'Cantidad solo admite números'),
  });


  React.useEffect(() => {
    (async () => {
      let response = await getProducts(api);
      if (response?.sucess) {
        setProducts(response.result.products);
        setLoading(false);
      }
    })();
  }, [api, loading]);

  return (
    <>
      {state.role !== "admin" ? (
        <>
          <div className="title">Disponibilidad en campo</div>
          <div className="list">
            {loading ?
              <span className="heartbeat">Cargando...</span>
              :
              products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    id={product.id}
                  />
                );
              })

            }
          </div>
        </>
      ) :
        <>

          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={{ ...style }}>
              <h2 id="child-modal-title">Agregar producto</h2>
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                  stock: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async values => {
                  let imageId = (await uploadProductImage(api, file)).result;
                  await createProduct(api, values.name, values.stock, values.price, imageId)
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
                      <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                      <Field className='card-input' name="price" />
                      <AttachMoneyOutlinedIcon/>
                      {errors.price && touched.price && <ErrorAlert errorBody={errors.price} />}
                      </div>
                    </div>
                    <IconButton type="submit" style={{ display: 'flex', fontFamily: 'Nico Moji' }}>
                      <span>Añadir </span>
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>



          <>
            <div className="title">Disponibilidad en campo</div>
            <div className="list">
              {loading ?
                <span className="heartbeat">Cargando...</span>
                :
                <>
                  <IconButton onClick={handleOpen}>
                    <AddOutlinedIcon style={{ fontSize: '20vh', color: '#000' }} />
                  </IconButton>

                  {products.map((product) => {
                    return (
                      <StorageCard
                        key={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        api={api}
                        id={Number(product.id)}
                        setLoading={setLoading}
                      />
                    );
                  })
                  }
                </>
              }
            </div>
          </>
        </>}
    </>
  );
}
