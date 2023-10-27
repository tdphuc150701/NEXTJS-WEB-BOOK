"use client"

import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import Stack from '@mui/material/Stack'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
interface Iprops {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}



//cú pháp ts image_u
function CreateModal(props: Iprops) {
    const { showModalCreate, setShowModalCreate } = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImg_url] = useState('');
    const [price, setPrice] = useState('');
    const [quantity_in_stock, setQuantinyInStock] = useState('');
    const [publication_date, setPublicationDate] = useState('');

    // if (!title) {
    //     toast.error('Title cannot be empty');
    //     return;
    // }

    // if (!author) {
    //     toast.error('Author cannot be empty');
    //     return;
    // }

    // if (!description) {
    //     toast.error('description cannot be empty');
    //     return;
    // }
    // // if (!image_url) {
    // //     toast.error('image_url cannot be empty');
    // //     return;
    // // }
    // if (!price) {
    //     toast.error('price cannot be empty');
    //     return;
    // }

    // // fetch("http://localhost:8000/blogs",

    const handleSummit = (e: any) => {
        e.preventDefault()

        // setPublicationDate(publication_date.split('-').reverse().join('-'))
        console.log(title, author, description, price, quantity_in_stock, publication_date, image_url);


        // fetch("https://book-manage-0fy7.onrender.com/api/books/",
        fetch("https://vuquanghuydev.pythonanywhere.com/api/book/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ title, author, description, price, quantity_in_stock, publication_date, image_url })
            })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Create success!")
                    // handleCloseModal();
                    mutate("https://vuquanghuydev.pythonanywhere.com/api/book/")
                    console.log(res);
                }
            })
            .catch(error => {
                // Bắt lỗi ở đây và xử lý nó
                console.error("Error:", error);
                toast.error("Error: " + error.message);
            }
            )
    };




    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setImg_url("");
        setPrice("");
        setShowModalCreate(false);

    };

    return (
        <div>
            <Dialog
                open={showModalCreate}
                onClose={() => setShowModalCreate(false)}
                fullWidth
                maxWidth="sm"
                color='primary'
            >
                <form onSubmit={handleSummit}>
                    <DialogTitle>Add New Book</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} margin={2}>

                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                label="Author"
                                variant="outlined"
                                fullWidth
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}

                            />

                            <TextField
                                label="Quantity_in_stock"
                                variant="outlined"
                                fullWidth
                                value={quantity_in_stock}
                                onChange={(e) => setQuantinyInStock(e.target.value)}
                            />

                            <TextField
                                label="Publication_date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={publication_date}
                                onChange={(e) => setPublicationDate(e.target.value)}
                            />

                            <TextField
                                type='file'
                                autoFocus
                                value={image_url === "" ? image_url : null}
                                fullWidth
                                variant="outlined"
                            // onChange={(e) => setImg_url(`static/images/books/${e.target.files?.[0].name}`)} 
                            // onChange={(e) => setImg_url({ e.target.files?.[0].name })}


                            />

                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

        </div>
    );
}

export default CreateModal;