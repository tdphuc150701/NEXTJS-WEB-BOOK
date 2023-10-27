'use client'
import TableComponent from "@/component/app.table"
import useSWR from 'swr';
import axios from "axios";
import { useState } from "react";
import { log } from "console";

interface Iprops {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blogs: IBlog[]
    data: string

}

const BlogsPage = (props: Iprops) => {
    // const blogs = []
    // console.log(blogs);

    // async function axiosTest() {
    //     try {
    //         const data = await axios.get("https://book-manage-0fy7.onrender.com/api/books/")
    //         const rs = data.data
    //         console.log(rs);


    //     } catch (error) {
    //         console.log("error");


    //     }

    // }
    // axiosTest()

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(

        "https://book-manage-0fy7.onrender.com/api/books/",
        // "http://localhost:8000/blogs",

        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <TableComponent blogs={data} data={""}
            />

        </div>
    )
}
export default BlogsPage