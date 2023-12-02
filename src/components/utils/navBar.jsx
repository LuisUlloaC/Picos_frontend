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
import CloseIcon from '@mui/icons-material/Close';
import { checkoutOrder } from '../../actions/bills';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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
        minWidth: '25%',
        maxWidth: '25%',
        height: '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        border: 'none',
        outline: 'none',
        pt: 2,
        px: 4,
        pb: 3,
        alignItems: 'center',
        overflowX: 'hidden',
        justifyContent: 'space-between',
        fontFamily: 'Nico Moji'

    };

    return (
        <>
            <Modal
                open={open}
            >
                <Box sx={{ ...style }}>
                    <IconButton style={{ display: 'flex', position: 'absolute', top: '2%', right: '1%', justifyContent: 'flex-end' }} onClick={() => { handleClose() }}>
                        <CloseIcon />
                    </IconButton>
                    <h2 id="child-modal-title">Revisar orden</h2>
                    <TableContainer  sx={{width: '120%', marginLeft: '15%', flexGrow: 2,  fontFamily: 'Nico Moji' }}>
                        <Table sx={{ width: '80%',}} aria-label="simple table">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontFamily: 'Nico Moji'}}>Nombre</TableCell>
                                    <TableCell sx={{ fontFamily: 'Nico Moji'}}>Cantidad</TableCell>
                                    <TableCell sx={{ fontFamily: 'Nico Moji'}}>Precio</TableCell>
                                    <TableCell ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.cart?.map((item) => (
                                    <TableRow
                                        key={item.product_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' sx={{ fontFamily: 'Nico Moji'}} component="th" scope="row">
                                            {item.productName}
                                        </TableCell>
                                        <TableCell align='center' sx={{ fontFamily: 'Nico Moji'}}>{item.amount}</TableCell>
                                        <TableCell align='center' sx={{ fontFamily: 'Nico Moji'}}>{item.price}</TableCell>
                                        <TableCell align='center' sx={{ fontFamily: 'Nico Moji'}}><DeleteIcon onClick={() => removeItem(item.product_id)} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    {state?.cart === undefined || state?.cart.length === 0 ? null :
                        <IconButton style={{ display: 'flex', fontFamily: 'nico Moji' }} onClick={() => {
                            if (checkoutOrder(api, state.cart)) {
                                setState(oldState => {
                                    console.log(state?.cart.length)
                                    return {
                                        ...oldState,
                                        cart: []
                                    }
                                })
                                handleClose();
                            } else {
                                alert('No disponible')
                            }
                        }}>
                            <span>Facturar </span>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    }
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
                                    null :
                                    <IconButton size="large" color="primary" onClick={handleOpen}>
                                        <Badge badgeContent={state?.cart?.length} color="error" >
                                            <ShoppingCartOutlinedIcon />
                                        </Badge>
                                    </IconButton>
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