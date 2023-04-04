let express = require("express");
let clienteController = require("../controllers/cliente.js");
let api = express.Router();

api.get("/obtener-clientes", clienteController.obtenerClientes);
api.get("/obtener-clientes-prestamo", clienteController.obtenerclientesConPrestamo);
api.post("/crear-cliente", clienteController.crearCliente);
api.delete("/eliminar-cliente/:id", clienteController.eliminarCliente);
api.put("/editar-cliente/:id", clienteController.editarCliente);
api.get("/obtener-clienteById/:id", clienteController.obtenerClienteById);


module.exports = api;