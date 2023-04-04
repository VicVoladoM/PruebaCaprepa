const crearCliente = `INSERT INTO cliente (nombre, apellido, email, telefono) 
                        Values ($nombre, $apellido, $email, $telefono)`;

const editarCliente = `UPDATE CLIENTE SET nombre = $nombre, apellido = $apellido, email = $email WHERE id = $id`;

const eliminarCliente = `DELETE FROM cliente WHERE id = $id;`;

const obtenerClientes = `SELECT * FROM cliente;`;

const obtenerClienteById = `SELECT * FROM cliente WHERE ID = $id;`;

const obtenerclientesConPrestamo = `SELECT c.*, p.monto, p.pagoQuincenal, p.plazo, p.id as prestamoId, 
(SELECT COUNT(*) FROM amortizacion a WHERE a.prestamoId = p.id) as numAmortizaciones
FROM cliente c 
INNER JOIN prestamo p 
ON c.id = p.clienteId;`;

module.exports = {
  crearCliente,
  editarCliente,
  eliminarCliente,
  obtenerClientes,
  obtenerClienteById,
  obtenerclientesConPrestamo,
};
