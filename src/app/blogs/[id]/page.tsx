'use client'
import useSWR, { Fetcher } from 'swr';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


// import '@/style/card.module.css'
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },

};

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `https://book-manage-0fy7.onrender.com/api/books/${params.id}`,
        // "http://localhost:8000/blogs/${params.id}",

        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }

    const http = "https://book-manage-0fy7.onrender.com"
    const src = data?.image_url
    const img = http.concat(src)

    const handleMouseEnter = (e: any) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
    };

    const handleMouseLeave = (e: any) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
    };




    return (
        <div>
            <h1>Detail Product</h1>
            <div style={styles.container} >

                <Grid container spacing={2}
                // sx={{ height: "1000px" 
                // }}
                >
                    <Grid item>
                        <ButtonBase sx={{ width: 500, height: 500 }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <Img sx={{ width: 500, height: 450 }}
                                alt="complex" src={img} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2} sx={{ textAlign: "center" }}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" sx={{

                                    fontWeight: "bold",
                                    fontSize: "30px",
                                    fontFamily: "Helvetica",
                                }}>
                                    {data?.title}
                                </Typography>
                                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.5)' }} />
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    <Rating sx={{ justifyContent: 'center' }} name="half-rating" defaultValue={2.5} precision={3} />
                                    <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center", color: "#faaf00", fontWeight: "bold", fontSize: "25px" }}  >
                                        3
                                    </Typography>


                                </Box>
                                <Typography variant="body2" gutterBottom sx={{ fontSize: "30px" }}>
                                    {data?.description}
                                </Typography>
                                <Typography variant="body2"
                                    sx={{
                                        color: "red",
                                        fontWeight: "bold",
                                        fontSize: "30px",
                                        fontFamily: "Helvetica",
                                        marginTop: "50px",
                                    }}>
                                    {data?.price}
                                    <LocalAtmIcon></LocalAtmIcon>
                                </Typography>

                                <Button variant="contained"
                                    sx={{
                                        backgroundColor: "red",
                                        padding: "20px",
                                        paddingLeft: "50px",
                                        paddingRight: "50px",
                                        fontWeight: "bold",

                                    }}>
                                    <AddShoppingCartIcon></AddShoppingCartIcon>
                                    Mua Ngay
                                </Button>

                                <div>
                                    <Typography sx={{
                                        textAlign: "center",
                                        marginRight: "0",
                                        marginTop: "10px",
                                        fontWeight: "bold",
                                        fontSize: "20px"
                                    }}>Thông tin chung
                                    </Typography>
                                    <Box>
                                        <Typography sx={{
                                            textAlign: "left",
                                            marginRight: "0",
                                            marginTop: "10px",
                                            fontWeight: "bold",
                                            fontSize: "20px"
                                        }}>
                                            Tác Giả : <span style={{
                                                textAlign: "left",
                                                marginRight: "0",
                                                marginTop: "10px",
                                                fontSize: "18px",
                                                fontWeight: "normal"

                                            }}>{data?.author}</span>
                                        </Typography>

                                        <Typography sx={{
                                            textAlign: "left",
                                            marginRight: "0",
                                            marginTop: "10px",
                                            fontWeight: "bold",
                                            fontSize: "20px"
                                        }}>
                                            Mô Tả: <span style={{
                                                textAlign: "left",
                                                marginRight: "0",
                                                marginTop: "10px",
                                                fontSize: "18px",
                                                fontWeight: "normal"

                                            }}>{data?.description}</span>
                                        </Typography>

                                        <Typography sx={{
                                            textAlign: "left",
                                            marginRight: "0",
                                            marginTop: "10px",
                                            fontWeight: "bold",
                                            fontSize: "20px"
                                        }}>
                                            Sản phẩm còn: <span style={{
                                                textAlign: "left",
                                                marginRight: "0",
                                                marginTop: "10px",
                                                fontSize: "18px",
                                                fontWeight: "normal"

                                            }}>{data?.quantity_in_stock}</span>
                                        </Typography>


                                    </Box>
                                </div>


                            </Grid>
                            <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">

                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        </div >
    )
}
export default ViewDetailBlog