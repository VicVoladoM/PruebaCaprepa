const { QueryTypes } = require('sequelize');
const connectBd = require('../config/connection');
const prestamosQueries = require('../config/queries/prestamosQueries');

const crearPrestamo = (req, res) => {
    const conn = connectBd();
    let params = req.body;
    conn.query(prestamosQueries.crearPrestamo,{
        bind: params,
        type: QueryTypes.INSERT,
    })
    .then((result) => {
        res.status(200).send({prestamos: result  });
    })
    .catch((err) => {
        res.status(200).send({afectedRows: err[1] });
    });
};

const consultarPrestamos = (req, res) => {
  const conn = connectBd();
  let params = req.body;
  conn
    .query(prestamosQueries.consultarPrestamos, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      res.status(200).send({ clientes: result });
    })
    .catch((err) => {
      console.log(params);
      res.status(200).send({ afectedRows: result[1] });
    });
};

module.exports = {
    crearPrestamo,
    consultarPrestamos
}