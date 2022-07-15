const pool = require('../database');

const getAllData = async (req, res, next) => {
  try {
    const resultado = await pool.query('SELECT *FROM tbl_empleado');

    res.json(resultado.rows);
  } catch (error) {
    next(error);
  }
}

const getAnyData = async (req, res, next) => {

  try {
    const { id } = req.params

    const resultado = await pool.query('Select * FROM tbl_empleado WHERE cedula= $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        message: 'Tarea no encontrada'
      });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    next(error);
  }
}

const createUsuario = async (req, res, next) => {
  const { cedula, nombres, apellidos, email } = req.body;
  try {
    const result = await pool.query("INSERT INTO tbl_empleado (cedula,nombres,apellidos,email) VALUES ($1,$2,$3,$4) RETURNING *",
      [cedula, nombres, apellidos, email]);
    res.json(result.rows[0]);

  } catch (error) {
    next(error);

  }
};


const crearUsuarioLogin = async (req, res, next) => {
  const { idusuario, usuario, contrasena, tipousuario } = req.body;
  try {
    const result = await pool.query("INSERT INTO tbl_user (idusuario,usuario,contrasena,tipousuario) VALUES ($1,$2,$3,$4) RETURNING *",
      [idusuario, usuario, contrasena, tipousuario]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};


const deleteDataUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const resultado = await pool.query('DELETE FROM tbl_empleado WHERE cedula= $1', [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({
        message: 'Tarea no eliminada o no encontrada'
      });
    }
    res.json({ message: 'Usuario eliminado con exito' });
  } catch (error) {
    next(error);
  }
}

const updateDataUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombres, apellidos, email } = req.body;

    const resultado = await pool.query('UPDATE tbl_empleado SET nombres=$1,apellidos=$2,email=$3 WHERE cedula= $4 RETURNING *'
      , [nombres, apellidos, email, id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAllData,
  getAnyData,
  createUsuario,
  crearUsuarioLogin,
  deleteDataUser,
  updateDataUser
}