let express = require("express");
let prestamoController = require("../controllers/prestamo.js");
let api = express.Router();

api.post("/crear-prestamo", prestamoController.crearPrestamo);
api.get("/obtener-prestamos", prestamoController.consultarPrestamos);
//api.put("/editar-cliente/:id", clienteController.editarCliente);

module.exports = api;