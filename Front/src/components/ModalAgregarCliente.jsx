import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";

function ModalAgregarCliente(props) {

  const { refreshTable } = props;

  const [openModal, setOpenModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    refreshTable(true)
    setOpenModal(false);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
  };

  const handleGuardar = () => {
    const cliente = { nombre, apellido, email, telefono };
    fetch("http://localhost:8000/api/crear-cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo guardar el cliente");
        }
        console.log("Cliente guardado exitosamente");
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
        alert("Error al guardar el cliente");
      });
  };

  const BlueButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#87CEFA",
    color: "#fff",
    height: "100%",
  }));

  return (
    <>
      <BlueButton variant="outlined" onClick={handleOpenModal}>
        Agregar Cliente
      </BlueButton>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Nuevo Cliente
          </Typography>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Teléfono"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleCloseModal} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleGuardar} color="primary">
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalAgregarCliente;



