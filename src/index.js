const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const rutas = require('./routes/routes.task')

const app = express();

app.use(cors()); //comunicacion con el back de manera simple
app.use(morgan('dev'));

app.use(express.json());

app.use(rutas);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })

});
app.listen(5000);

console.log("Servidor corriendo");