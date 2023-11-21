import * as React from 'react';
import ProductCard from "../utils/card";
import { Context } from "../context/provider";
import { getProducts } from "../../actions/products";
import StorageCard from "../utils/storageCard";
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Products() {
  const [loading, setLoading] = React.useState(true);
  const { state, setState, api } = React.useContext(Context);
  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

  const addToCart = (productId, amount) => {
    setState(oldState => {
      let oldCart = oldState.card;
      let found = false;
      for (let element of oldCart) {
        if (element.productId === productId) {
          element.ammount += amount;
          found = true;
        }
      }
      if (!found) {
        oldCart = oldCart.concat({productId: productId, amount: amount})
      }
      return (oldCart)
    })
  }

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



    React.useEffect(() => {
    (async () => {
      let response = await getProducts(api);
      if (response?.sucess) {
        setProducts(response.result.products);
        setLoading(false);
      }
    })();
  },[]);

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
                  <form >


                    <h2 id="child-modal-title">Agregar producto</h2>
                    <div style={{display: 'flex', width: '80%', height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'}}>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Nombre: </span>
                            <input className='card-input' style={{width: '50%'}} />
                        </div>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Cantidad: </span>
                            <input className='card-input' style={{width: '50%'}} />
                        </div>
                        <div style={{ display: 'flex', width: '100%',justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <span>Precio: </span>
                            <div style={{display: 'flex' , width: '56%', justifyContent: 'space-between'}}>
                            <input className='card-input' style={{width: '100%', marginRight: '5%'}} />
                            <AttachMoneyOutlinedIcon />
                            </div>
                        </div>
                    </div>
                    <IconButton style={{display: 'flex'}}>
                    <ArrowForwardIosIcon/>
                    </IconButton>
                  </form>
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
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    api={api}
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
