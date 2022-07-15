const { Router } = require('express');
const pool = require('../database');
const { getAllData, getAnyData, createUsuario,crearUsuarioLogin, deleteDataUser, updateDataUser } = require('../controllers/task.controllers');

const router = Router();


router.get('/task', getAllData)


router.get('/task/:id', getAnyData)


router.post('/task', createUsuario)
router.post('/task2', crearUsuarioLogin)
router.delete('/task/:id', deleteDataUser)

router.put('/task/:id', updateDataUser)

module.exports = router;