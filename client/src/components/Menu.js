import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import {Link,useNavigate} from "react-router-dom";
export default function Menu() {
    const navigate= useNavigate()
  return (
    <Box sx={{flexGrow:1}}>
        <AppBar position='static'color='transparent'>
            <Container>
                <Toolbar>
                    <Typography variant='h6' sx={{flexGrow:1}}>
                     <Link to="/" style={{textDecoration:"none",colors:"#FFFF"}}>
                     Home
                     </Link>
                    </Typography>
                    <Button variant='contained' onClick={()=> navigate("/new/formulario")}>Agregar nuevo</Button>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
  )
}
