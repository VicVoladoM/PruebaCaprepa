const { QueryTypes } = require("sequelize");
const connectBd = require("../config/connection");
const clientesQueries = require("../config/queries/clientesQueries");

const crearCliente = (req, res) => {
  const conn = connectBd();
  let params = req.body;
  conn
    .query(clientesQueries.crearCliente, {
      bind: params,
      type: QueryTypes.INSERT,
    })
    .then((result) => {
      res.status(200).send({ cliente: result });
    })
    .catch((err) => {
      res.status(200).send({ afectedRows: result[1] });
    });
};

const editarCliente = (req, res) => {
  const conn = connectBd();
  let params = req.body;
  params.id = req.params.id;
  conn
    .query(clientesQueries.editarCliente, {
      type: QueryTypes.UPDATE,
      bind: params,
    })
    .then((result) => {
      res.status(200).send({ cliente: result });
    })
    .catch((err) => {
      res.status(200).send({ errorCode: 404, errorMessage: err });
    });
};

const eliminarCliente = (req, res) => {
  const conn = connectBd();
  let id = req.params.id;
  if (id)
    conn
      .query(clientesQueries.eliminarCliente, {
        bind: { id },
        type: QueryTypes.DELETE,
      })
      .then((result) => {
        res.status(200).send({ changes: result });
      })
      .catch((err) => {
        res.status(200).send({ errorCode: 404, errorMessage: err });
      });
  else
    return res
      .status(200)
      .send({ errorCode: 403, errorMessage: "id is missing krnal :(" });
};

const obtenerClientes = (req, res) => {
  const conn = connectBd();
  let params = req.body;
  conn
    .query(clientesQueries.obtenerClientes, {
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

const obtenerclientesConPrestamo = (req, res) => {
  const conn = connectBd();
  let params = req.body;
  conn
    .query(clientesQueries.obtenerclientesConPrestamo, {
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

const obtenerClienteById = (req, res) => {
  const conn = connectBd();
  let id = req.params.id;

  if (id)
    conn
      .query(clientesQueries.obtenerClienteById, {
        bind: { id },
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        res.status(200).send({ ...result[0] });
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
  crearCliente,
  editarCliente,
  eliminarCliente,
  obtenerClientes,
  obtenerClienteById,
  obtenerclientesConPrestamo
};
