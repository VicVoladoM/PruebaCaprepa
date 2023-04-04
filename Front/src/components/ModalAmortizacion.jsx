import { useState, useEffect } from 'react';
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ModalAmortizacion = (props) => {

  const [open, setOpen] = useState(false);
  const [amortizacionData, setAmortizacionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedRow, openmodalprop, getFromChildState } = props;

  useEffect(() => {
    const fetchAmortizacionData = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/obtener-amortizacion/${selectedRow.id}`);
      const data = await response.json();
      setAmortizacionData(data);
      setLoading(false);
    };

    if (openmodalprop && selectedRow) {
      fetchAmortizacionData();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [openmodalprop, selectedRow]);

  const handleCloseDialog = () => {
    setOpen(false);
    getFromChildState(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseDialog}
        onClick={handleCloseDialog}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <div>Cargando datos...</div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO. PAGO</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>PRESTAMO</TableCell>
                  <TableCell>INTERES</TableCell>
                  <TableCell>ABONO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {amortizacionData?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.noPago}</TableCell>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.abono}</TableCell>
                    <TableCell>{row.interes}</TableCell>
                    <TableCell>{row.abono}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Modal>
    </>
  );
};

export default ModalAmortizacion;




