import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TableFooter,
  styled,
  Modal,
  Typography,
} from "@mui/material";
import ModalPrestamo from "../components/ModalPrestamo";
import Button from "@mui/material/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";

const columns = [
  { id: "nombre", label: "CLIENTE" },
  { id: "monto", label: "MONTO" },
  { id: "plazo", label: "PLAZO" },
  { id: "acciones", label: "ACCIONES" },
];

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
}));

const Prestamos = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [amortizacion, setAmortizacion] = useState([]);

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/obtener-prestamos",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data) {
        setClientes(data.clientes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenModalEdit = (event, row) => {
    fetch(`http://localhost:8000/api/obtener-amortizacion/${row.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAmortizacion(data.amortizacion);
        console.log("amortizacion",data.amortizacion)
      })
      .catch((error) => {
        console.error(error);
      });
    setOpenModal(true);
  };

  const filteredClientes = clientes.filter((cliente) => {
    const nombreCompleto = cliente.nombre + " " + cliente.apellido;
    return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const sumInteres = amortizacion.interes;
  
  const sumAbono = amortizacion.reduce((total, row) => total + row.abono, 0);
  
  function refreshTable (data) {
    if(data){
      loadClientes();
    }
  }

  return (
    <Box width="70%" margin="auto">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <ModalPrestamo refreshTable={refreshTable}/>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClientes.map((row) => (
              <TableRow key={row.id} id={row.id}>
                <TableCell>{row.nombre} {row.apellido}</TableCell>
                <TableCell>{row.monto}</TableCell>
                <TableCell>{row.plazo}</TableCell>
                <TableCell>
                  <Button onClick={(event) => handleOpenModalEdit(event, row)}>
                    <VisibilityIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Box sx={{ bgcolor: "background.paper", p: 2, width: 600 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Detalles del préstamo
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>NO.PAGO</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>PRESTAMO</TableCell>
                  <TableCell>INTERES</TableCell>
                  <TableCell>ABONO</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amortizacion.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.numeroPago}</TableCell>
                    <TableCell>
                      {row.fecha_amortizacion.slice(0, -14)}
                    </TableCell>
                    <TableCell>{row.monto}</TableCell>
                    <TableCell>{row.interes}</TableCell>
                    <TableCell>{row.abono}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell>TOTAL:</TableCell>
                  <TableCell>{""}</TableCell>
                  <TableCell>{sumInteres}</TableCell>
                  <TableCell>{sumAbono}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default Prestamos;
