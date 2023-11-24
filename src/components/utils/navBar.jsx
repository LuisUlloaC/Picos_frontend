import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Context } from '../context/provider';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { checkoutOrder } from '../../actions/bills';
import ErrorAlert from './errorAlert';



export default function NavBar({ day }) {
    const { state, setState, api } = React.useContext(Context)
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (!state.access) {
            navigate("/login");
        }
    }, [state, navigate])

    const logout = () => {
        setState({})
    }

    const setView = (view) => {
        setState(oldState => ({
            ...oldState,
            view: view,
        }))
    }

    function removeItem(product_id) {
        setState(prevState => {
            return {
                ...prevState,
                cart: prevState.cart.filter(item => item.product_id !== product_id)
            };
        });
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


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title">Revisar orden</h2>
                    <div className="hide-scrollbar" style={{
                        display: 'flex', width: '130%', height: '100%',
                        flexDirection: 'column',
                        overflowY: 'scroll',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <div style={{ display: 'flex', width: '105%', height: '20%', justifyContent: 'space-evenly' }}>
                            <span>Nombre</span>
                            <span>Cantidad</span>
                            <span>Precio</span>
                        </div>
                        {state.cart?.map((item) => (
                            <div key={item.product_id} onClick={() => removeItem(item.product_id)} style={{ display: 'flex', width: '120%', height: '20%', justifyContent: 'space-evenly' }}>
                                <span>{item.productName}</span>
                                <span>{item.amount}</span>
                                <span>{item.price}</span>
                            </div>
                        ))}

                    </div>
                    <IconButton style={{ display: 'flex' }} onClick={() => {
                        if (checkoutOrder(api, state.cart).sucess) {
                            handleClose();
                        } else {
                            console.log('pepo')
                            alert('No disponible')
                        }
                    }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Modal>

            <AppBar position="static" elevation={0} sx={{ flexGrow: 1, backgroundColor: 'transparent' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex', width: '95%' } }}>
                        {state.role === 'admin'
                            ?
                            <>

                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    {state.view.startsWith('document/') ?
                                        <IconButton size="large" color="primary" onClick={((e) => setView('contracts'))}>
                                            <Badge color="error">
                                                <ArrowBackIosIcon />
                                            </Badge>
                                        </IconButton> : null
                                    }
                                    {state.view.startsWith('issues/') ?
                                        <IconButton size="large" color="primary" onClick={((e) => setView('document/' + state.view.split('/')[1]))}>
                                            <Badge color="error">
                                                <ArrowBackIosIcon />
                                            </Badge>
                                        </IconButton> : null
                                    }
                                </div>
                                <IconButton size="large" color="primary" onClick={((e) => setView('home'))}>
                                    <Badge color="error">
                                        <HomeOutlinedIcon />
                                    </Badge>
                                </IconButton>
                            </>
                            :
                            <>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} />
                                {(day === 3 || day === 4) ?
                                    <IconButton size="large" color="primary" onClick={handleOpen}>
                                        <Badge color="error" >
                                            <ShoppingCartOutlinedIcon />
                                        </Badge>
                                    </IconButton>
                                    : null
                                }
                            </>
                        }


                        <IconButton size="large" color="primary" onClick={logout}>
                            <Badge color="error">
                                <LogoutOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}