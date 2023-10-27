import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import Link from 'next/link';
import axios from 'axios';
// import data from '@/db.json'

const fetcher = () => fetch("https://book-manage-0fy7.onrender.com/api/books").then((res) => res.json())

// const data = [
//     {
//         "title": "a",
//         "author": "a",
//         "content": "a",
//         "id": 1
//     },
//     {
//         "title": "ababa",
//         "author": "bababaaaaaaaaaa",
//         "content": "aaaaaa",
//         "id": 2
//     }
// ]

function Blog() {

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const { data, error, isLoading } = useSWR(
        "https://vuquanghuydev.pythonanywhere.com/api/book/", fetcher,
        {
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
            <Typography variant="h5" component="div" align='center'>
                Home
            </Typography>

            {data?.map((item: any) => (
                <Box key={item.id}>
                    <Accordion expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${item.id}bh-content`}
                            id={`panel${item.id}bh-header`}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {item.author}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.title} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item.content}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </div>

    );

}

export default Blog