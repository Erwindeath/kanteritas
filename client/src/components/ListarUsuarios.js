import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

const ListarUsuarios = () => {
  const [tasks, setTasks] = useState([]);
 
 
  const navigate = useNavigate();
    
  const loadTasks = async () => {
    const response = await fetch("http://localhost:5000/task");
    const data = await response.json();
    setTasks(data);
  };
  //funcion para eliminar un empleado por el número de cedula
  const handleDelete = async (cedula) => {
    try {
      await fetch(`http://localhost:5000/task/${cedula}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.cedula !== cedula));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Empleados</h1>
      {tasks.map((task) => (
        <Card
          style={{
            marginBottom: ".7rem",
           
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: "black",textDecoration:'inherit'
              }}
            >
              <Typography>{task.cedula}</Typography>
              <Typography>{task.nombres}</Typography>
              <Typography>{task.apellidos}</Typography>
              <Typography>{task.email}</Typography>
            </div>
            <div >
              <Button
                variant="contained"
                color='primary'
                onClick={() => navigate(`/empleado/${task.cedula}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.cedula)}
                style={{ marginLeft: ".5rem" }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ListarUsuarios;