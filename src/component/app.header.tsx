'use client'
import Link from 'next/link'
import App from 'next/app';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import { Container } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/redux/searchSlice';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react'
import { loginSuccess } from '@/redux/userSlice';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
};



function AppHeader() {
    const router = useRouter();
    const session = useSession();
    // console.log(session);
    // console.log(session.data?.user?.name);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch()
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [searchQuerry, setSearchQuerry] = useState('')
    // const user = useSelector((state) => state.PokemonSearch); // <== if you want to select pokemonData it should be state.PokemonSearch.data.data

    const user = useSelector((state: RootState) => state.user.user);

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const storedUser = localStorage.getItem('user');

    const handleLogOut = () => {
        dispatch(loginSuccess(null));

    }

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addTodo(searchQuerry))
        localStorage.setItem('searchData', searchQuerry);
        router.push(`/search`);
    };

    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
        ;
        toast.success("Đăng nhập thành công");
    }


    return (

        // <AppBar position="static" sx={{
        //     backgroundImage: 'url("https://image.slidesdocs.com/responsive-images/background/blue-education-cute-books-child-book-powerpoint-background_cff8a912a2__960_540.jpg")',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center', // Thay đổi cho phù hợp với yêu cầu
        //     backgroundRepeat: 'no-repeat',
        //     color: 'black', // Màu chữ
        //     textDecoration: 'none'

        // }}>
        //     <Toolbar variant="dense" >
        //         <Grid container spacing={3}>
        //             <Grid item xs={6} md={7.5} sx={{ display: "flex", justifyContent: "right" }}>
        //                 <Link href="/" style={{ textDecoration: 'none' }} >
        //                     <Box sx={{
        //                         display: 'flex', alignItems: 'center', color: "black", textDecoration: "none"
        //                         ,
        //                     }}>
        //                         <Typography sx={{
        //                             fontFamily: "Helvetica",
        //                             fontSize: '30px',
        //                             justifyContent: 'center',
        //                             padding: '15px',
        //                             paddingLeft: '35px',
        //                             alignItems: 'center',
        //                             display: 'inline-flex',
        //                             marginRight: '50px',
        //                             fontWeight: "bold",
        //                             '&:hover': {
        //                                 opacity: "0.5"
        //                             }

        //                         }}>
        //                             <AutoStoriesIcon sx={{ fontSize: "30px", marginRight: '10px', }} />
        //                             Mọt <span style={{ color: 'greenyellow', padding: "10px" }}>  sách ! </span>
        //                             <br />
        //                         </Typography>
        //                     </Box>
        //                     <span style={{ fontFamily: "arial", textAlign: 'center', fontSize: "15px", justifyContent: "center", color: 'rgb(169,169,169)', marginTop: "10px" }}>
        //                         Định hình phong cách đọc theo riêng bạn !
        //                     </span>
        //                 </Link>
        //             </Grid>
        //             <Grid item xs={6} md={4.5} sx={{ display: "flex", justifyContent: "right" }}>

        //                 {user &&
        //                     <Box sx={{ display: 'inline-flex', marginLeft: 'auto' }} >
        //                         <div style={{ display: 'flex', alignItems: 'center' }}>
        //                             <span style={{ marginRight: '10px', fontWeight: "bold" }}>{storedUser}</span>
        //                             <Tooltip title="Open settings">
        //                                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        //                                     <Avatar src="/broken-image.jpg" />
        //                                 </IconButton>
        //                             </Tooltip>

        //                         </div>
        //                         <Menu
        //                             sx={{ mt: '45px' }}
        //                             id="menu-appbar"
        //                             anchorEl={anchorElUser}
        //                             anchorOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             keepMounted
        //                             transformOrigin={{
        //                                 vertical: 'top',
        //                                 horizontal: 'right',
        //                             }}
        //                             open={Boolean(anchorElUser)}
        //                             onClose={handleCloseUserMenu}
        //                         >
        //                             <div>
        //                                 <Link href='/login' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
        //                                     <MenuItem>
        //                                         <Typography textAlign="center" onClick={handleLogOut}>Logout</Typography>
        //                                     </MenuItem>
        //                                 </Link>
        //                                 <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
        //                                     <MenuItem>
        //                                         <Typography textAlign="center" onClick={handleCloseUserMenu}>Profile</Typography>
        //                                     </MenuItem>
        //                                 </Link>
        //                                 <Link href='/manager' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
        //                                     <MenuItem>
        //                                         <Typography textAlign="center" onClick={handleCloseUserMenu}>Manage</Typography>
        //                                     </MenuItem>
        //                                 </Link>
        //                             </div>

        //                         </Menu>
        //                     </Box>
        //                 }{!user &&
        //                     <div>
        //                         <Link href='/login' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
        //                             <MenuItem>
        //                                 <Typography textAlign="center">Login</Typography>
        //                             </MenuItem>
        //                         </Link>
        //                         <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
        //                             <MenuItem>
        //                                 <Typography textAlign="center" onClick={handleCloseUserMenu}>Registration</Typography>
        //                             </MenuItem>
        //                         </Link>
        //                     </div>

        //                 }


        //             </Grid>

        //             <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>

        //                 <form onSubmit={onSearch} style={{ width: '400px', textAlign: 'center' }}>
        //                     <Input
        //                         style={inputStyle}
        //                         value={searchQuerry}
        //                         placeholder="Search..."
        //                         inputProps={{ 'aria-label': 'search' }}
        //                         onChange={(e) => setSearchQuerry(e.target.value)}


        //                     />
        //                     <IconButton color="inherit" style={iconButtonStyle} onClick={onSearch}>
        //                         <SearchIcon color="primary" />
        //                     </IconButton>

        //                 </form>

        //             </Grid>



        //             <Grid item xs={12} sx={{ display: "flex" }}>
        //                 <Stack direction="row" spacing={3}>
        //                     <Link href="/" color="inherit">
        //                         <Button
        //                             variant="contained"
        //                             sx={{
        //                                 paddingLeft: "50px",
        //                                 paddingRight: "50px",
        //                                 fontSizeL: "20px",
        //                                 fontWeight: 700,
        //                                 marginRight: '100px',
        //                             }}
        //                         >
        //                             Bixso
        //                         </Button>
        //                     </Link>
        //                     <Link href="/blogs">
        //                         <Button variant="outlined" sx={{ backgroundColor: 'white' }}>Blogs</Button>
        //                     </Link>
        //                     <Link href="/contact">
        //                         <Button variant="outlined" sx={{ backgroundColor: 'white', color: "" }}>Contact</Button>
        //                     </Link>
        //                 </Stack>
        //             </Grid>
        //         </Grid>
        //     </Toolbar >

        // </AppBar >


        <AppBar position="static" sx={{ backgroundColor: "#186F65" }}>
            <Toolbar>
                <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={3}>
                        <Link href="/" style={{ textDecoration: 'none' }} >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', color: "white", textDecoration: "none"

                            }}>
                                <Typography sx={{
                                    fontFamily: "Helvetica",
                                    fontSize: '30px',
                                    justifyContent: 'center',
                                    paddingLeft: '35px',
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                    marginRight: '50px',
                                    fontWeight: "bold",
                                    '&:hover': {
                                        opacity: "0.5"
                                    }

                                }}>
                                    <AutoStoriesIcon sx={{ fontSize: "30px", marginRight: '10px', }} />
                                    Mọt <span style={{ color: 'greenyellow', paddingLeft: "10px" }}>  sách ! </span>
                                    <br />
                                </Typography>
                            </Box>
                            <span style={{ fontFamily: "arial", textAlign: 'center', fontSize: "15px", justifyContent: "center", color: 'rgb(169,169,169)', marginTop: "" }}>
                                Định hình phong cách đọc theo riêng bạn !
                            </span>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Search >
                            <form onSubmit={onSearch} style={{ width: '400px' }}>
                                <SearchIconWrapper color="inherit" onClick={onSearch}>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    style={inputStyle}
                                    value={searchQuerry}
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setSearchQuerry(e.target.value)}
                                />
                            </form>
                        </Search>
                    </Grid>



                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                        {user &&
                            <div>
                                <Link href="/blogs">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: '#FFC502',
                                        marginRight: "3px",
                                        color: "#F5F5F5",
                                        fontWeight: "bold",
                                        border: " 1px solid #F0000000"
                                    }}>Products</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: '#FFC502',
                                        marginRight: "3px",
                                        color: "#F5F5F5",
                                        fontWeight: "bold",
                                        border: " 1px solid #F0000000"
                                    }}>Contact</Button>
                                </Link>
                                <Link href="/manager">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: '#FFC502',
                                        marginRight: "3px",
                                        color: "#F5F5F5",
                                        fontWeight: "bold",
                                        border: " 1px solid #F0000000"
                                    }}>Manage</Button>
                                </Link>
                            </div>
                        }
                        {!user &&
                            <div>
                                <Link href="/blogs">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: '#FFC502',
                                        marginRight: "3px",
                                        color: "#F5F5F5",
                                        fontWeight: "bold",
                                        border: " 1px solid #F0000000"
                                    }}>Products</Button>
                                </Link>
                                <Link href="/contact">
                                    <Button variant="outlined" sx={{
                                        backgroundColor: '#FFC502',
                                        marginRight: "3px",
                                        color: "#F5F5F5",
                                        fontWeight: "bold",
                                        border: " 1px solid #F0000000"
                                    }}>Contact</Button>
                                </Link>
                            </div>
                        }
                    </Grid>

                    <Grid item xs={2} sx={{ marginLeft: "auto" }}>
                        {user &&

                            <Box sx={{ display: 'inline-flex', marginLeft: 'auto' }} >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '10px', fontWeight: "bold" }}>{storedUser}</span>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src="/broken-image.jpg" />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div>
                                        <Link href='/login' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" onClick={handleLogOut}>Logout</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" onClick={handleCloseUserMenu}>Profile</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link href='/manager' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" onClick={handleCloseUserMenu}>Manage</Typography>
                                            </MenuItem>
                                        </Link>
                                    </div>

                                </Menu>
                            </Box>


                        }{!user &&

                            <Box sx={{ display: 'inline-flex', marginLeft: 'auto' }} >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Open settings" >
                                        <Button variant="outlined" sx={{ backgroundColor: 'white', color: "A4907C" }}>
                                            <SettingsIcon color="primary"></SettingsIcon>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                Tài Khoản
                                            </IconButton>
                                        </Button>
                                    </Tooltip>

                                </div>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div>
                                        <Link href='/login' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" onClick={handleLogOut}>Login</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>
                                                <Typography textAlign="center" onClick={handleCloseUserMenu}>Registrator</Typography>
                                            </MenuItem>
                                        </Link>
                                    </div>

                                </Menu>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >






    );
}


export default AppHeader;