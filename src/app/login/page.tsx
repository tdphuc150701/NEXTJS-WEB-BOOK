'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { authenticateUser } from '@/redux/userSlice';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/userSlice';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link'
import axios from 'axios';
import { mutate } from 'swr';




interface Iprops {
    users: IUser[]
    onLoginSuccess: () => void;

}
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const LoginForm = (props: Iprops) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    // const users = useSelector((state: RootState) => state.user.users);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const [passwordError, setPasswordlError] = useState('');
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/users",
        // "https://vuquanghuydev.pythonanywhere.com/api/user/login/",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return (
            <Box sx={{
                color: "black",
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <LinearProgressWithLabel value={progress} />
                <Typography>...Loadding</Typography>
            </Box>
        );
    }
    if (error) {
        return (
            <Box sx={{
                color: "black",
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <LinearProgressWithLabel value={progress} />
                <Typography>...Loadding</Typography>
            </Box>
        );
    }



    const users = data


    const handleLogin = async (event: { preventDefault: () => void; }) => {

        event.preventDefault();
        const user = users.find((user: any) => user.email === email)
        if (!user) {
            setEmailError("Tài khoản không chính xác");
            toast.error("Login Failed")

        }
        else if (user.password !== password) {
            setPasswordlError("Mật khẩu không chính xác");
            toast.error("Login Failed")

        }

        else if (user && user.password === password) {
            // dispatch(authenticateUser(user));
            toast.success(" Login success")
            dispatch(loginSuccess(user));
            localStorage.setItem('user', user.userName);
            router.push('/');

        }


    };

    return (

        <div>
            <h2 style={{ marginTop: "10px", textAlign: "center" }}>Login</h2>
            <form onSubmit={handleLogin}>
                <TextField
                    label="User"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    error={!!passwordError}
                    helperText={passwordError}
                />


                <Button
                    sx={{ marginTop: "10px" }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>


            </form>
            <Divider light />

            <p style={{
                textAlign: "center",
                fontWeight: "bold",
                borderTop: "1px solid black",
                marginLeft: "100px",
                marginRight: "100px",
                paddingTop: "10px"
            }}>Or</p>
            <Button
                variant="contained"
                sx={{}}
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/login' })}
                fullWidth
            >

                Login with Google
            </Button>

            <Link href="../registration" style={{ display: 'flex', justifyContent: "space-between" }}>
                <Button sx={{
                    marginLeft: 'auto',
                    marginRight: '0', // Đảm bảo không có khoảng cách bên phải }}>

                }}>

                    Registration

                </Button>
            </Link>


        </div >

    );
};

export default LoginForm;