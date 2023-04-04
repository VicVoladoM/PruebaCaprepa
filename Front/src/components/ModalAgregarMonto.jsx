import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

function ModalEditarCliente(props) {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [telefono, setTelefono] = useState();
  const [modalSecond, setmodalSecond] = useState(false);

  const { selectedRow, openmodalprop, getFromChildEdit } = props;

  useEffect(() => {
    
    if (selectedRow !== null) {
      setNombre(selectedRow.nombre);
      setApellido(selectedRow.apellido);
      setEmail(selectedRow.email);
      setTelefono(selectedRow.telefono);
    }
  }, [selectedRow]);

  useEffect(() => {
    if (openmodalprop) {
      setmodalSecond(true);
      return;
    }
    if (openmodalprop === false) {
      setmodalSecond(false);
      return;
    }
  }, [openmodalprop]);

  const handleCloseModal = () => {
    setmodalSecond(false);
    getFromChildEdit(false);
  };

  const handleSaveModal = async () => {
    console.log("guardado" + selectedRow.nombre);
    try {
      const response = await fetch(
        `http://localhost:8000/api/editar-cliente/${selectedRow.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            email,
            telefono,
          }),
        }
      );
      if (response.ok) {
        handleCloseModal();
      } else {
        console.error("Error al guardar el cliente");
      }
    } catch (error) {
      console.error("Error al guardar el cliente", error);
    }
  };

  return (
    <>
      <Modal open={modalSecond} onClose={handleCloseModal}>
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
            Editar Clientes
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
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleCloseModal}
              sx={{ mr: 2 }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveModal}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalEditarCliente;
