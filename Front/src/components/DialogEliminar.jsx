import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function DialogEliminar(props) {

  const [open, setOpen] = useState(false);
  const { selectedRow ,openDialog, getFromChildDelete } = props;

  useEffect(() => {
    if (openDialog) {
        setOpen(true);
      return;
    }
    if (openDialog === false) {
        setOpen(false);
      return;
    }
  }, [openDialog]);

  const hadleCloseDialog = () => {
    setOpen(false)
    getFromChildDelete(false)
  }
  
  const handleConfirm = () => {
    fetch( `http://localhost:8000/api/eliminar-cliente/${selectedRow.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Hubo un problema al eliminar el cliente.");
        }
        setOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
    hadleCloseDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={hadleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <p>¿Seguro que deseas eliminar?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={hadleCloseDialog}>Cancelar</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogEliminar;
