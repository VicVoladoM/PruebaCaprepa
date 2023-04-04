import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Grid,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#87CEFA",
  color: "#fff",
  height: "100%",
}));

const ModalPrestamo = (props) => {
  const { refreshTable } = props;

  const [cliente, setCliente] = useState("");
  const [monto, setMonto] = useState();
  const [plazo, setPlazo] = useState("");
  const [pagoQuincenal, setpagoQuincenal] = useState("");

  const [open, setOpen] = useState(false);
  const [opcionesClientes, setOpcionesClientes] = useState([]);

  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    setCliente("");
    setMonto("");
    setPlazo("");
    refreshTable(true)
    setOpen(false);
  };
  const handleSubmit = (event) => {
    const aPagar = (monto / plazo) + ((monto * .11) / 2)
    console.log("apagar ",aPagar)
    event.preventDefault();
    const objetoFormulario = {
      clienteId: cliente,
      monto: monto,
      plazo: plazo,
      interes: monto * .11,
      pagoQuincenal: aPagar
    };
    console.log("OBJETO DEL FORMULARIO", objetoFormulario);
    console.log("PagoQuincenal", objetoFormulario.pagoQuincenal);

    fetch("http://localhost:8000/api/crear-prestamo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objetoFormulario),
    })
      .then((response) => response.json())
      .then((data) => {
        handleClose();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/obtener-clientes")
      .then((response) => response.json())
      .then((data) => {
        setOpcionesClientes(data.clientes);
      });
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <BlueButton variant="contained" onClick={handleOpen}>
        Agregar Prestamos
      </BlueButton>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              backgroundColor: "white",
              width: 400,
              borderRadius: 4,
              p: 3,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Cliente"
                    value={cliente}
                    onChange={(event) => setCliente(event.target.value)}
                  >
                    {opcionesClientes.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.nombre} {option.apellido}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="number"
                    value={monto}
                    onChange={(event) => setMonto(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plazo (en meses)"
                    type="number"
                    value={plazo}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      if (
                        inputValue === "" ||
                        (parseInt(inputValue) >= 1 &&
                          parseInt(inputValue) <= 12)
                      ) {
                        setPlazo(inputValue);
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" type="submit">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModalPrestamo;
