import React, { useEffect, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import './SideBarComponent.css';
import logo from './../../assets/images/logo-horizontal.png';
import { Profile } from "../../views/profile/Profile";
import { Travel } from "../../views/travels/Travels";
import { Requests } from "../../views/requests/Requests";
import { getUser } from "../../services/authService";
import { useUser } from "../../contexts/userContext";

import RouteList from "../../views/campusGo/passenger/routeList/components/RouteList";
import ReservationsList from "../../views/campusGo/passenger/reservationList/components/ReservationList";

const Perfil = () => <Profile />;
const Viajes = () => <Travel />;
const Solicitudes = () => <Requests />

const Rutas = () => <RouteList/>;
const Reservas = () => <Typography paragraph>Aquí va reservas</Typography>;

function SideBarComponent() {
    const drawerWidth = 240;

    const { uid } = useUser();
    const [selectedComponent, setSelectedComponent] = useState('Home');
    const [mobileOpen, setMobileOpen] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const [isDriver, setIsDriver] = useState(false);
    const [isPassenger, setIsPassenger] = useState(false);

    const navigate = useNavigate();

    const renderComponentDriver = () => {
        switch (selectedComponent) {
            case 'Home':
                return <Perfil />;
            case 'Viajes':
                return <Viajes />;
            case 'Solicitudes':
                return <Solicitudes />;
            default:
                return <Perfil />;
        }
    };

    const renderComponentPassenger = () => {
        switch (selectedComponent) {
            case 'Home':
                return <Perfil />;
            case 'Rutas':
                return <Rutas />;
            case 'Reservas':
                return <ReservationsList />;
            default:
                return <Perfil />;
        }
    }

    useEffect(() => {
        // Check if user is logged out
        if (!localStorage.getItem('uid')) {
            navigate('/login');
            window.location.reload();
        }
        getUser(uid)
        .then(res => {
            const data = res.data;
            setFirstName(data.first_name);
            setProfilePhoto(data.url_profile_photo);
            if (data.isDriver) {
                setIsDriver(true);
            } else {
                setIsPassenger(true);
            }
        })
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Container>
            <Box display="flex" alignItems="center" padding="16px" marginTop={10}>
                <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={profilePhoto}
                /><br></br>
                <Typography variant="h9" sx={{ marginLeft: 2 }} className="poppins-regular">
                    {firstName}
                </Typography>
            </Box>
            {isDriver && 
            <div style={{ overflow: 'auto' }}>
                <List>
                    {['Mi perfil', 'Viajes', 'Solicitudes'].map((text) => (
                        <ListItem button key={text} onClick={() => setSelectedComponent(text)} className="poppins-regular">
                            <ListItemText primary={text} className="poppins-regular" />
                        </ListItem>
                    ))}
                </List>
            </div>}
            {isPassenger && 
            <div style={{ overflow: 'auto' }}>
                <List>
                    {['Mi perfil', 'Rutas', 'Reservas'].map((text) => (
                        <ListItem button key={text} onClick={() => setSelectedComponent(text)} className="poppins-regular">
                            <ListItemText primary={text} className="poppins-regular" />
                        </ListItem>
                    ))}
                </List>
            </div>}
        </Container>
    );

    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ zIndex: 1201 }} sx={{ backgroundColor: '#e20001', height: '8vh' }}>
                <Toolbar>
                    <Box display={{ xs: 'flex', md: 'none' }} alignItems="center" flexGrow={1} justifyContent="space-between">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            <img className='logo-bar' src={logo} alt="" />
                        </Typography>
                        <Button onClick={logout} startIcon={<LogoutIcon />} sx={{ color: 'white' }}>
                            Cerrar sesión
                        </Button>
                    </Box>
                    <Box display={{ xs: 'none', md: 'flex' }} alignItems="center" flexGrow={1}>
                        <Typography variant="h6" noWrap>
                            <img className='logo-bar' src={logo} alt="" />
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button onClick={logout} startIcon={<LogoutIcon />} sx={{ color: 'white' }}>
                            Cerrar sesión
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    PaperProps={{
                        sx: {
                            width: drawerWidth,
                            bgcolor: '#161624',
                            color: 'white',
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            width: drawerWidth,
                            flexShrink: 0,
                            bgcolor: '#161624',
                            color: 'white',
                            display: { xs: 'none', md: 'block' },
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            {isDriver && 
                <main style={{ flexGrow: 1, padding: 24, marginLeft: { xs: 0, md: drawerWidth } }}>
                <Toolbar />
                {renderComponentDriver()}
            </main>}
            {isPassenger && 
                <main style={{ flexGrow: 1, padding: 24, marginLeft: { xs: 0, md: drawerWidth } }}>
                <Toolbar />
                {renderComponentPassenger()}
            </main>}
        </div>
    );
}

export { SideBarComponent };
