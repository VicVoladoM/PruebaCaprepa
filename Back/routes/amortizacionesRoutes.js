let express = require("express");
let amortizacionController = require("../controllers/amortizacion.js");
let api = express.Router();

api.post("/crear-monto", amortizacionController.crearAmortizacion);
api.get("/obtener-amortizacion/:id", amortizacionController.consultarAmortizacion);

module.exports = api;