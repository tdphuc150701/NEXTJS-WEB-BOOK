'use client'
import TableComponent from "@/component/app.table"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
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
import useSWR from 'swr';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Console, log } from "console";


interface Iprops {
    blogs: IBlog[]
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

function SearchPage() {



    const search = useSelector((state: RootState) => state.blog.blogs);
    // Lọc ra các phần tử là chuỗi



    const fetcher = () => fetch("https://book-manage-0fy7.onrender.com/api/books/").then((res) => res.json())
    const { data, error, isLoading } = useSWR(
        "https://book-manage-0fy7.onrender.com/api/books/",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }

    const filteredData = data?.filter((row: any) => {
        if (typeof search === 'string') {
            const lowercaseSearch = search.toLowerCase();
            return lowercaseSearch === '' || row.title.toLowerCase().includes(lowercaseSearch);
            // Sử dụng lowercaseSearch để so sánh hoặc thực hiện các tác vụ khác
        }

    });


    return (
        <div>
            <TableComponent blogs={filteredData} data={""}
            />
        </div>
    );
}

export default SearchPage;