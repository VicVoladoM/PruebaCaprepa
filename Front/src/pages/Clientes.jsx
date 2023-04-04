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
} from "@mui/material";
import ModalAgregarCliente from "../components/ModalAgregarCliente";
import ModalEditarCliente from "../components/ModalEditarCliente";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DialogEliminar from "../components/DialogEliminar";

const columns = [
  { id: "nombre", label: "NOMBRE" },
  { id: "apellido", label: "APELLIDO" },
  { id: "email", label: "EMAIL" },
  { id: "telefono", label: "TELEFONO" },
  { id: "acciones", label: "ACCIONES" },
];

const TableHeader = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
}));

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModalProp, setopenModalProp] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    try {
      const response = await fetch(
        "http://localhost:8000/api/obtener-clientes",
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
    setopenModalProp(true);
    console.log("Selected info: ", row);
    setSelectedRow(row);
  };

  const handleOpenModalDelete = (event, row) => {
    setOpenModalDelete(true);
    console.log("Selected infoToDelete: ", row);
    setSelectedRow(row);
  };

  const filteredClientes = clientes.filter((cliente) => {
    const nombreCompleto = cliente.nombre + " " + cliente.apellido;
    return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function getFromChildEdit(data) {
    console.log("edit ",data)
    if(data === false){
      loadClientes()
    }
    setopenModalProp(data);
  }

  function getFromChilDelete(data) {
    setOpenModalDelete(data);
  }

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
        <ModalAgregarCliente 
          refreshTable={refreshTable}
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
                <TableCell>{row.telefono}</TableCell>
                <TableCell>
                  <Button onClick={(event) => handleOpenModalEdit(event, row)}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={(event) => handleOpenModalDelete(event, row)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogEliminar
        selectedRow={selectedRow}
        openDialog={openModalDelete}
        getFromChildDelete={getFromChilDelete}
      />
      <ModalEditarCliente
        selectedRow={selectedRow}
        openmodalprop={openModalProp}
        getFromChildEdit={getFromChildEdit}
      />
    </Box>
  );
};

export default Clientes;
