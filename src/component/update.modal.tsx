import React, { useEffect, useState } from 'react';
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
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    setBlog: (value: IBlog | null) => void;
    blog: IBlog | null
}

function UpdateModal(props: Iprops) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImg_url] = useState('');
    const [price, setPrice] = useState('');
    const [quantity_in_stock, setQuantinyInStock] = useState('');
    const [publication_date, setPublicationDate] = useState('');

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setImg_url(blog.image_url)
            setDescription(blog.description)
            setPrice(blog.price.toString())
            setQuantinyInStock(blog.quantity_in_stock.toString());
            setPublicationDate(blog.publication_date.toString())

        }
    }, [blog]);



    const handleSummit = (e) => {
        e.preventDefault();
        if (!title) {
            toast.error('Title cannot be empty');
            return;
        }

        if (!author) {
            toast.error('Author cannot be empty');
            return;
        }

        if (!description) {
            toast.error('description cannot be empty');
            return;
        }
        // if (!image_url) {
        //     toast.error('image_url cannot be empty');
        //     return;
        // }
        if (!price) {
            toast.error('price cannot be empty');
            return;
        }



        if (!quantity_in_stock) {
            toast.error('Quantity cannot be empty');
            return;
        }
        if (!publication_date) {
            toast.error('Publication date cannot be empty');
            return;
        }
        // fetch(`http://localhost:8000/blogs/${id}`,
        fetch(`https://book-manage-0fy7.onrender.com/api/books/${id}/`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, description, price, image_url, quantity_in_stock, publication_date }),
            })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    toast.warning('Update Success!');
                    handleCloseModal();
                    mutate('https://book-manage-0fy7.onrender.com/api/books/');
                    console.log(res)
                }
            })
            .catch(error => {

                console.error("Error:", error);
                toast.error("Error: " + error.message);
            }
            );

    };

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setDescription('');
        setPrice('');
        setImg_url('')
        setQuantinyInStock('');
        setPublicationDate('')
        setBlog(null);
        setShowModalUpdate(false);
    };

    return (
        <div>
            <Dialog
                open={showModalUpdate}
                onClose={() => handleCloseModal()}
                fullWidth
                maxWidth="sm"
                color='primary'
            >
                <DialogTitle>Add New Book</DialogTitle>
                <form onSubmit={handleSummit}>
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
                                label="Img"
                                autoFocus
                                value={image_url}

                                fullWidth
                                variant="outlined"
                                onChange={(e) => setImg_url(e.target.value)}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="warning" type='submit'>
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

export default UpdateModal;