import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'



const FormularioUsuario = () => {
    const [datos, selecionarDatos] = useState({
        cedula: "",
        nombres: "",
        apellidos: "",
        email: ""
    });


    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.cedula) {
            cargarDatos(params.cedula);
        }
    }, [params.cedula]);

    //funcion par obtener valores de los textField
    const handleChange = e => {
        selecionarDatos({ ...datos, [e.target.name]: e.target.value })
    }
    const cargarDatos = async (cedula) => {
        const result = await fetch('http://localhost:5000/task/' + cedula);
        const data = await result.json();
        selecionarDatos({ cedula: data.cedula, nombres: data.nombres, apellidos: data.apellidos, email: data.email });
        setEditing(true);
    }
    //insertar los datos en la base

    // eslint-disable-next-line
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                const response = await fetch(
                    "http://localhost:5000/task/" + params.cedula,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(datos),
                    }
                );
                await response.json();
            } else {
                const response = await fetch("http://localhost:5000/task", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(datos),

                });
                await response.json();
               
            }

            setLoading(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };


    //validacion cuando cargue el componente
    useEffect(() => {
        if (params.cedula) {
            cargarDatos(parseInt(params.cedula, 10));
        }
    }, [params.cedula]);
    return (
        
        <Grid container direction='column' alignItems='center' justifyContent='center'>
            <Grid item xs={3}>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: '#BBDAF0',
                    padding: '3rem',
                    marginBottom: ".7rem",
                }}>
                    <Typography variant='5' textAlign='center' color='black'>
                        {editing ? "Actualizar empleado" : "Crear Empleado"}
                    </Typography>
                    <CardContent>

                        <form onSubmit={handleSubmit}>
                            <TextField variant="outlined"  label='Ingrese número de cédula' sx={{
                                display: 'block',
                                margin: 'none',
                                
                            }} type='number'
                                name="cedula"
                                value={datos.cedula}
                                onChange={handleChange}

                                inputProps={{ maxLength: 10, minLength: 10 }} onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                            >

                            </TextField>
                            <TextField id="outlined-basic" variant="outlined" label='Nombres' sx={{
                                display: 'block',
                                margin: 'none'
                            }} required name="nombres" value={datos.nombres} onChange={handleChange}>


                            </TextField>
                            <TextField id="outlined-basic" variant="outlined" label="Apellidos" sx={{
                                display: 'block',
                                margin: 'none'
                            }} required name="apellidos" value={datos.apellidos} onChange={handleChange}></TextField>

                            <TextField id="outlined-basic" variant="outlined" label='Email' sx={{
                                display: 'block',
                                margin: '.$rem 0'
                            }} type='email' required name="email" value={datos.email} onChange={handleChange}></TextField>

                            <Button variant='contained' color='primary' type='submit' disabled={
                                !datos.cedula || !datos.apellidos || !datos.email || !datos.nombres
                            } >
                                {loading ? (<CircularProgress>
                                    color='white'
                                    size={24}
                                </CircularProgress>) : ('Guardar')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
        
    );
}
export default FormularioUsuario;