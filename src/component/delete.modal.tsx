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
    DialogContentText,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

interface Iprops {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    setBlog: (value: IBlog | null) => void;
    blog: IBlog | null
}

function DeleteModal(props: Iprops) {
    const { showModalDelete, setShowModalDelete, blog, setBlog } = props;
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImg_url] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
        }
    }, [blog]);
    const handlDeleteBlog = () => {
        // fetch(`https://book-manage-0fy7.onrender.com/api/books/${id}`,
        fetch(`https://book-manage-0fy7.onrender.com/api/books/${id}/`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Delete success!")
                    mutate("https://book-manage-0fy7.onrender.com/api/books/")
                    handleCloseModal()
                }
            });


    }

    const handleCloseModal = () => {
        setShowModalDelete(false);
    };

    return (
        <div>
            <Dialog
                open={showModalDelete}
                color="primary "
                onClose={handleCloseModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure remove ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Disagree</Button>
                    <Button variant="contained" color="warning" onClick={handlDeleteBlog}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>



    );
}

export default DeleteModal;

