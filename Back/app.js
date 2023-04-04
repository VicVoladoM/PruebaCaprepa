let express = require("express");
let bodyParser = require("body-parser");

let app = express();
let clientes = require("./routes/clienteRoutes");
let prestamos = require("./routes/prestamosRoutes");
let amortizaciones = require("./routes/amortizacionesRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {     res.header("Access-Control-Allow-Origin", "*");     res.header(         "Access-Control-Allow-Headers",         "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"     );     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");     res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");     next(); });
app.use("/api", clientes);
app.use("/api", prestamos);
app.use("/api", amortizaciones);

module.exports = app;