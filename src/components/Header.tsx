import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const fav = () => {
    navigate("/favorits");
  };

  const home = () => {
    navigate("/home");
  };

  const { logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ padding: 0 }} color="secondary">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="logo" width={100} />
            <Box display="flex" alignItems="center">
              <Button color="inherit" onClick={home}>
                Home
              </Button>
              <Button color="inherit" onClick={fav}>
                Favorites
              </Button>
            </Box>
            <Box>
              <IconButton
                color="inherit"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Header;
