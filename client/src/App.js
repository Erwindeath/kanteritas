import React from 'react'
import {BrowserRouter,Routes,Route}from 'react-router-dom'

import ListarUsuarios  from "./components/ListarUsuarios"

import FormularioUsuario  from "./components/FormularioUsuario"

import Menu from "./components/Menu";




export default function App() {
  return (

    
   <BrowserRouter>
   <Menu />
   <Routes>

      <Route path="/" element={<ListarUsuarios/>}/>
      <Route path="/new/formulario" element={<FormularioUsuario/>}/>
      <Route path="/empleado/:cedula/edit" element={<FormularioUsuario/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}
