import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/Auth";
import AppRoutes from "./routes/AppRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f73378",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      main: "#f73323",
    },
  },
});

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

// ReactDOM.createRoot(document.getElementById("root")!).render(

// );
