import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Context } from '../context/provider';


export default function NavBar() {
    const { state } = React.useContext(Context)

    return (
            <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: 'transparent'}}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" color="primary">
                            <Badge color="error">
                                <ShoppingCartTwoToneIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" color="primary">
                            <Badge color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
    );
}