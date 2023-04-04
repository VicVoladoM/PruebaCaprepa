import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <AppBar
      position="static"
      sx={{ width: "100%", marginBottom: "1.5rem", backgroundColor: "#1976d2" }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <div sx={{ width: "70%" }}>
          <Button color="inherit" component={Link} to={"/"}>
            Clientes
          </Button>
          <Button color="inherit" component={Link} to={"/prestamos"}>
            Prestamos
          </Button>
          <Button color="inherit" component={Link} to={"/montos"}>
            Montos
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
