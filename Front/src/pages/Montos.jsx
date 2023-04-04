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
  styled,
  Modal,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

const columns = [
  { id: "nombre", label: "NOMBRE" },
  { id: "apellido", label: "APELLIDO" },
  { id: "email", label: "EMAIL" },
  { id: "monto", label: "PRESTAMO" },
  { id: "acciones", label: "ACCIONES" },
];

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
}));

const AddMontoButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#2196f3",
  color: "white",
  "&:hover": {
    backgroundColor: "#003E80",
  },
}));

const Montos = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [numeroPago, setNumeroPago] = useState(0);
  const [abono, setAbono] = useState(0);
  const [prestamoId, setPrestamoId] = useState();
  const [plazo, setPlazo] = useState();
  const [pagoQuincenal, setpagoQuincenal] = useState();


  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/obtener-clientes-prestamo",
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNumeroPago("");
    setPrestamoId("");
    setPlazo("");
    setpagoQuincenal("")
    loadClientes()
    setOpen(false);
  };

  const handleOpenModalMonto = (event, row) => {
    console.log("Selected infoInRow: ", row);
    setNumeroPago(row.numAmortizaciones + 1);
    setPrestamoId(row.prestamoId);
    setPlazo(row.plazo);
    setpagoQuincenal(row.pagoQuincenal)
    setSelectedRow(row);
    console.log("Plazo ",row.plazo)
    console.log("amort ",row.numAmortizaciones)
    handleOpen();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMonto = {
      numeroPago: numeroPago,
      abono: pagoQuincenal,
      prestamoId: prestamoId,
      
    };

    if (plazo >= numeroPago) {
      fetch("http://localhost:8000/api/crear-monto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMonto),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Solicitud POST exitosa:", data);
          handleClose();
        })
        .catch((error) => {
          console.error("Error en la solicitud POST:", error);
        });
    } else {
      alert("El número de pago es mayor o igual que el plazo.");
    }
  };

  const filteredClientes = clientes.filter((cliente) => {
    const nombreCompleto = cliente.nombre + " " + cliente.apellido;
    return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.apellido}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.monto}</TableCell>
                <TableCell>
                  <AddMontoButton
                    onClick={(event) => handleOpenModalMonto(event, row)}
                  >
                    Agregar Monto
                  </AddMontoButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose} sx={{ mt: 50 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                ¿El Cliente Realizo el Pago?
              </Typography>
              <TextField
                label="Monto"
                type="number"
                variant="outlined"
                value={pagoQuincenal}
                fullWidth
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleClose}>
                  No, Cancelar
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ ml: 2 }}
                >
                  Si, Guardar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default Montos;
