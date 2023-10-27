'use client'
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
// import UpdateUser from './update.user';
interface Iprops {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    users: IUser[]
    data: string

}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function User(props: Iprops) {

    // const users = useSelector((state: RootState) => state.user.users);
    // // const [value, setValue] = useState(blogs)
    // const [userData, setUserData] = useState<any>(null); // Sử dụng state để lưu thông tin người dùng

    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //         const parsedUserData = JSON.parse(user);
    //         setUserData(parsedUserData); // Cập nhật state với thông tin người dùng từ localStorage
    //     }
    // }, []);
    const { users } = props

    return (
        <div>
            <div className='mb-3'
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>User</h3>
                <Button variant="contained" color="success" > <Link href='./registration'>Add New</Link></Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No </StyledTableCell>
                            <StyledTableCell align="right">First Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Phone</StyledTableCell>
                            <StyledTableCell align="right">Password</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(users?.map((row, index) => {
                            return (
                                <StyledTableRow key={++index}>
                                    <StyledTableCell component="th" scope="row">
                                        {++index}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.userName}</StyledTableCell>
                                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                                    <StyledTableCell align="right">{row.phone}</StyledTableCell>
                                    <StyledTableCell align="right">{row.password}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button variant="contained" sx={{ marginRight: "10px" }}

                                        // onClick={() => {
                                        //     setShowModalUpdate(true);
                                        // }}
                                        >
                                            Edit
                                        </Button>
                                        <Button variant="contained" color="warning" >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* <UpdateUser
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate} blog={null} setBlog={function (value: IBlog | null): void {
                    throw new Error('Function not implemented.');
                }}
            /> */}

        </div >


    );
}

export default User;