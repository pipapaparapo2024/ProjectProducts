import React, { useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../hooks/useProductStore";
import { PageWrapper } from "../../shared/PageWrapper";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error, getProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products.length, getProducts]);

  const product = products.find(p => p.id === Number(id));

  if (loading) {
    return (
      <PageWrapper>
        <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Container>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Container sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </PageWrapper>
    );
  }

  if (!product) {
    return (
      <PageWrapper>
        <Container sx={{ mt: 4 }}>
          <Alert severity="warning">Товар не найден</Alert>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/products")}
          >
            Вернуться к списку товаров
          </Button>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/products")}
          sx={{ mb: 3 }}
        >
          ← Назад к товарам
        </Button>

        <Card>
          <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
            {/* Изображение товара */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: "contain",
                  p: 4,
                  backgroundColor: "#f5f5f5"
                }}
              />
            </Box>

            {/* Информация о товаре */}
            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <CardContent sx={{ p: 4, height: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Категория */}
                  <Chip
                    label={product.category}
                    color="primary"
                    variant="outlined"
                    sx={{ alignSelf: "flex-start", mb: 2 }}
                  />

                  {/* Заголовок */}
                  <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    {product.title}
                  </Typography>

                  {/* Рейтинг */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Rating
                      value={product.rating.rate}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {product.rating.rate} ({product.rating.count} отзывов)
                    </Typography>
                  </Box>

                  {/* Цена */}
                  <Typography variant="h3" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
                    ${product.price}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Описание */}
                  <Typography variant="body1" paragraph sx={{ flexGrow: 1 }}>
                    {product.description}
                  </Typography>

                </Box>
              </CardContent>
            </Box>
          </Box>
        </Card>

        {/* Дополнительная информация */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Детали товара
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Информация о доставке
                </Typography>
                <Typography variant="body2">
                  • Бесплатная доставка от $50<br />
                  • Доставка за 2-3 рабочих дня<br />
                  • Возврат в течение 30 дней
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Гарантия
                </Typography>
                <Typography variant="body2">
                  • Гарантия качества<br />
                  • Техническая поддержка 24/7<br />
                  • Официальная гарантия производителя
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
};