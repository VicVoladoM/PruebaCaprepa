const { QueryTypes } = require('sequelize');
const connectBd = require('../config/connection');
const amortizacionesQueries = require('../config/queries/amortizacionesQueries');

const crearAmortizacion = (req, res) => {
    const conn = connectBd();
    let params = req.body;
    params.id = req.params.id;
    conn.query(amortizacionesQueries.crearAmortizacion, {
        type: QueryTypes.UPDATE,
        bind: params
    })
    .then((result) => {
        res.status(200).send({amortizacion: result});
    })
    .catch((err) => {
        res.status(200).send({ errorCode: 404, errorMessage: err });
    })
};

const consultarAmortizacion = (req, res) => {
    const conn = connectBd();
    let id = req.params.id;
  
    if (id)
      conn
        .query(amortizacionesQueries.consultarAmortizacion, {
          bind: { id },
          type: QueryTypes.SELECT,
        })
        .then((result) => {
          res.status(200).send({ amortizacion: result });
        })
        .catch((err) => {
          res
            .status(200)
            .send({ errorCode: 404, errorMessage: err.original.message });
        });
    else
      return res
        .status(200)
        .send({ errorCode: 403, errorMessage: "id is missing :(" });
  };

module.exports = {
    crearAmortizacion,
    consultarAmortizacion
}