import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Container, Paper, Typography, Button, Fade } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PageBienvenida() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}>
      <Fade in={true} timeout={800}>
        <Container component="main" maxWidth="sm">
          <Paper elevation={10} sx={{ padding: 6, textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
              ¡Bienvenido, {user?.nombre || user?.name || "Usuario"}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Nos alegra tenerte de vuelta. Serás redirigido al perfil en breve...
            </Typography>
            <Button
              variant="contained"
              onClick={() => { logout(); navigate("/login"); }}
              startIcon={<ExitToApp />}
            >
              Cerrar sesión
            </Button>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
}
