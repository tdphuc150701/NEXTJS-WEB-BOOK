'use client'
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { addTodo } from '@/redux/userSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { mutate } from "swr"
interface IProps {
    event: string;
    userName: string;
    phone: number;


}


const RegistrationForm = (props: IProps) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setuserNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordlError] = useState('');
    const dispatch = useDispatch()
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "https://vuquanghuydev.pythonanywhere.com/api/user/user/",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }
    const users = data
    const handleuserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updateduserName = event.target.value;
        setUsername(updateduserName);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    const handleuserNameBlur = (userName: string) => {
        const user = users.find((user: any) => user.username === userName)
        if (userName.trim() === '') {
            setuserNameError("Vui lòng nhập thông tin");
            return false;
        } else if (userName.length < 5) {
            setuserNameError("Thông tin phải có ít nhất 5 ký tự");
            return false;

        }
        else if (user) {
            setuserNameError("Đã tồn tại userName này");
            return false;
        }
        else {
            setuserNameError('');
            return true;
        }

    }
    const handlePhoneBlur = (phone: any) => {
        const phones = phone.toString();
        const regexPhone = /^(0\d{9,10}|84\d{8,9})$/

        if (phones.trim() === '') {
            setPhoneError("Vui lòng nhập thông tin");
            return false;
        } else if (!regexPhone.test(phones)) {
            setPhoneError("Đầu phải có 0 và có ít nhất 10 số");
            return false;
        }
        else {
            setPhoneError("");
            return true;

        }
    }

    const handleEmailBlur = (email: string) => {
        const user = users.find((user: any) => user.email === email)

        const regexEmail = /^\S+@\S+\.\S+$/;

        if (email.trim() === '') {
            setEmailError("Vui lòng nhập thông tin");
            return false;
        } else if (!regexEmail.test(email)) {
            setEmailError("Phải là kí tự và có @ vd aaa@gmail.com");
            return false;
        }
        else if (user) {

            setEmailError("Đã trùng Email vui lòng nhập Email khác");
            return false;


        }
        else {
            setEmailError('');
            return true;

        }
    }

    const handlePasswordBlur = (password: string) => {

        if (username.trim() === '') {
            setPasswordlError("Vui lòng nhập thông tin");
            return false;
        } else if (password.length < 5) {
            setPasswordlError("Thông tin phải có ít nhất 5 ký tự");
            return false;
        } else {
            setPasswordlError('');
            return true
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Thực hiện xử lý đăng ký ở đây, ví dụ kiểm tra thông tin và tạo tài khoản người dùng mới.
        if (!handleuserNameBlur(username)
            // || !handlePhoneBlur(phone)
            || !handleEmailBlur(email) || !handlePasswordBlur(password)) {
            toast.error('Regis failed')
            return false;

        }
        else {
            fetch('http://localhost:8000/users',
                // fetch('https://vuquanghuydev.pythonanywhere.com/api/user/register/',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        toast.success('Regis success!');
                        // dispatch(addTodo({ userName, phone, email, password }))
                        mutate('https://vuquanghuydev.pythonanywhere.com/api/user/register/');

                        return true;
                    }
                });
        }

    }


    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    return (
        <div>
            <h2 style={{ marginTop: "10px", textAlign: "center" }}>Registrator</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleuserNameChange}
                    onBlur={() => handleuserNameBlur(username)}
                    margin="normal"
                    error={!!userNameError}
                    helperText={userNameError}
                />
                <TextField
                    type="number"
                    label="Number"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handlePhoneBlur(phone)}
                    margin="normal"
                    error={!!phoneError}
                    helperText={phoneError}
                />
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleEmailBlur(email)}
                    margin="normal"
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    type={passwordShown ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handlePasswordBlur(password)}
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePassword} edge="end">
                                    {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={!!passwordError}
                    helperText={passwordError}

                />
                <Button type="submit" variant="contained" color="primary">
                    Đăng ký
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;