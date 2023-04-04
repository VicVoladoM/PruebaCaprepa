const crearPrestamo = `INSERT INTO prestamo (monto, interes, pagoQuincenal, plazo, clienteId)
                        VALUES($monto, $interes, $pagoQuincenal, $plazo, $clienteId)`;

const consultarPrestamos = `SELECT c.id, c.nombre, c.apellido, c.email, c.telefono, DATE_FORMAT(c.fecha_creacion, '%Y-%m-%d') as fecha_creacion, p.monto, p.interes, p.pagoQuincenal, p.plazo, DATE_FORMAT(p.fecha_creacion, '%Y-%m-%d') as fecha_prestamo
FROM cliente c
INNER JOIN prestamo p ON c.id = p.clienteId`;

module.exports = {
    crearPrestamo,
    consultarPrestamos,
}
