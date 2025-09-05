import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, Button, Fade, CircularProgress } from "@mui/material";
import { ExitToApp, Person } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Profile() {
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/usuarios/perfil"); // interceptor agrega token automáticamente
        setUserData(res.data.data); // <- atención aquí: res.data.data
      } catch (err) {
        console.error(err);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Fade in={true} timeout={800}>
        <Container component="main" maxWidth="sm">
          <Paper elevation={10} sx={{ padding: 6, textAlign: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Box sx={{ mb: 3 }}>
                  <Person sx={{ fontSize: 60, color: "#667eea" }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  ¡Hola, {userData?.nombre || "Usuario"}!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  Correo: {userData?.email || "No disponible"}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => { logout(); navigate("/login"); }}
                  startIcon={<ExitToApp />}
                >
                  Cerrar sesión
                </Button>
              </>
            )}
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
}
