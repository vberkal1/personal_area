import React, { MouseEventHandler, MouseEvent } from 'react';
import { ThemeProvider } from '@emotion/react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    createTheme,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip
} from '@mui/material';

type Nullable<T> = T | undefined | null;

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
    },
});

type NavbarProps = {
    login: string;
    logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({login, logout}) => {
    const [anchorElUser, setAnchorElUser] = React.useState<Nullable<Element>>(null);

    const handleOpenUserMenu: MouseEventHandler = (event: MouseEvent): void => {
        setAnchorElUser(event?.currentTarget);
    };

    const handleCloseUserMenu = (): void => {
        setAnchorElUser(null);
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ mr: 2 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            {login}
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={logout} key={'SimpleDialog'}>
                                    Выйти
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Navbar;