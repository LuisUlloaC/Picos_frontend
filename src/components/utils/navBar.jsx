import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Context } from '../context/provider';


export default function NavBar() {
    const { state, setState } = React.useContext(Context)

    const logout = () => {
        setState(false)
    }

    return (
            <AppBar position="static" elevation={0} sx={{ flexGrow: 1, backgroundColor: 'transparent'}}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {state.isAdmin
                        ? 
                        <IconButton size="large" color="primary">
                            <Badge color="error">
                                <HomeOutlinedIcon/>
                            </Badge>
                        </IconButton>
                        :
                        <IconButton size="large" color="primary">
                            <Badge color="error">
                            <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </IconButton>}
                        
                        
                        <IconButton size="large" color="primary" onClick={logout}>
                            <Badge color="error">
                                <LogoutOutlinedIcon/>
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
    );
}