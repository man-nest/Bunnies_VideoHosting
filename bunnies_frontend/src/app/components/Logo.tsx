import Image from 'next/image';

import { Box, Typography } from '@mui/material';


interface Props {
    drawer?:boolean;
}


export default function Logo({drawer = false}: Props) : JSX.Element {
    const display = drawer ? {md: 'flex'} : {xs: 'none', md: 'flex'};

    return (
        <>
            <Image
                src='https://firebasestorage.googleapis.com/v0/b/bunnies-aad60.appspot.com/o/images%2Frabbit.png?alt=media&token=0dda2f0d-94a7-423b-8aa2-7fe4ee36112d&_gl=1*1uwulz5*_ga*NzczNzY4MTgwLjE2OTY2MDQyMTQ.*_ga_CW55HF8NVT*MTY5NjYwNDIxNC4xLjEuMTY5NjYwNDQzNy4xOS4wLjA.'
                width={45}
                height={45}
                alt="Picture of the author"
                className='flex mr-4 ml-4'
            />
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ 
                    display: display,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                Bunnies
            </Typography>
        </>
    )
}