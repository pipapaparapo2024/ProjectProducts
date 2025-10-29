import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Каталог товаров',
      description: 'Просматривайте полный каталог товаров с детальной информацией'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: 'Избранное',
      description: 'Сохраняйте понравившиеся товары в избранное для быстрого доступа'
    },
    {
      icon: <EditIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Редактирование',
      description: 'Легко редактируйте информацию о товарах через удобный интерфейс'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Умный поиск',
      description: 'Находите нужные товары с помощью мощной системы поиска'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            mb: 6
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            Добро пожаловать в Магазин
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
              mb: 4
            }}
          >
            Откройте для себя мир качественных товаров с удобным управлением и современным интерфейсом
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              backgroundColor: 'white',
              color: '#667eea',
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: 4
              },
              transition: 'all 0.3s ease'
            }}
          >
            Перейти к товарам
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            color="white"
            gutterBottom
            sx={{ mb: 4, fontWeight: 'bold' }}
          >
            Возможности приложения
          </Typography>
          
          {/* CSS Grid layout */}
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr',
                lg: '1fr 1fr'
              },
              gap: 3
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography
            variant="h5"
            color="white"
            gutterBottom
            sx={{ mb: 3, fontWeight: 'bold' }}
          >
            Начните работу прямо сейчас
          </Typography>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              borderColor: 'white',
              color: 'white',
              fontSize: '1rem',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'white',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Начать покупки
          </Button>
        </Box>
      </Container>
    </Box>
  );
};