/* eslint-disable @next/next/no-img-element */
'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link'
import { toast } from 'react-toastify';
import { mutate } from "swr"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import '@/styles/app.css'
import { log } from 'console';

interface Iprops {
    blogs: IBlog[]
    data: string

}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

function TableComponent(props: Iprops) {
    const { blogs } = props;
    // const [value, setValue] = useState(blogs)
    const [blog, setBlog] = useState<IBlog | null>(null)
    const [expanded, setExpanded] = React.useState(false);

    return (
        <div>
            <Grid container spacing={3} sx={{ mb: 5 }} >
                {blogs?.map((row) => {

                    const http = "https://book-manage-0fy7.onrender.com"
                    const src = row.image_url
                    const img = http.concat(src)
                    return (
                        < Grid key={row.id} item md={3} sx={{ mb: 5 }} >
                            <Box className="blog-card" sx={{ width: '100%', textAlign: 'center' }}
                            >
                                <img
                                    // src={row.image_url}
                                    src={img}
                                    alt="Mô tả hình ảnh"

                                    width="100%" // Điều chỉnh chiều rộng
                                    height="100%" // Điều chỉnh chiều cao
                                />



                                <Typography mt={2} variant='h6' sx={{ fontWeight: "bold", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {row.title}
                                </Typography>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <Typography variant='body2' >
                                        {row.content}
                                    </Typography>
                                </Collapse>
                                <Typography variant='h5' sx={{ fontWeight: "bold", color: 'red', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}  >
                                    {row.price} $
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    <Rating sx={{ justifyContent: 'center' }} name="half-rating" defaultValue={2.5} precision={row.rate} />
                                    <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}  >
                                        {row.count}
                                    </Typography>


                                </Box>
                                {/* <Box>
                                <Button variant="contained" className='' onClick={() => {
                                    // setBlog(row);
                                    // setShowModalUpdate(true);
                                }}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="warning" onClick={() => handlDeleteBlog(row.id)}>
                                    Delete
                                </Button>
                            </Box> */}
                                <Link href={`/blogs/${row.id}`} className='btn btn-danger mx-3' style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="warning" className="view-button" sx={{ padding: "20px", paddingLeft: "30px", paddingRight: "30px" }}>
                                        View
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>)
                })}
            </Grid>
        </div >
    );
}

export default TableComponent;