const crearAmortizacion = `INSERT INTO amortizacion (numeroPago, abono, prestamoId) 
                        Values ($numeroPago, $abono, $prestamoId)`;
                
const consultarAmortizaciones = `SELECT c.* FROM cliente c
INNER JOIN prestamo p ON c.id = p.clienteId;`;

const consultarAmortizacion = `SELECT a.numeroPago, a.abono, p.monto, p.interes, c.nombre, DATE(a.fecha_creacion) AS fecha_amortizacion 
FROM amortizacion a 
JOIN prestamo p ON a.prestamoId = p.id 
JOIN cliente c ON p.clienteId = c.id 
WHERE c.id = $id`;


module.exports = {
    crearAmortizacion,
    consultarAmortizaciones,
    consultarAmortizacion
}