import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";


export const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Добро пожаловать!
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Выберите, что хотите сделать:
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/products")}
          >
            Перейти к товарам
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/create-product")}
          >
            Создать товар
          </Button>
        </Box>
      </Container>
  );
};
