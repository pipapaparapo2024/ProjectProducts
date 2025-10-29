import React, { useEffect, useState } from "react";
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
  IconButton,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import type { Product } from "../../types/Products";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../hooks/useProductStore";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

type ViewFilter = 'all' | 'favorites';

export const Products: React.FC = () => {
  const navigate = useNavigate();
  const { 
    products, 
    loading, 
    error, 
    getProducts, 
    deleteProduct, 
    toggleFavorite,
    updateProduct 
  } = useProductStore();

  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Сбрасываем на первую страницу при изменении фильтра или поиска
  useEffect(() => {
    setCurrentPage(1);
  }, [viewFilter, searchQuery]);

  const handleDelete = (event: React.MouseEvent, productId: number) => {
    event.stopPropagation();
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      deleteProduct(productId);
    }
  };

  const handleFavorite = (event: React.MouseEvent, productId: number) => {
    event.stopPropagation();
    toggleFavorite(productId);
  };

  const handleEdit = (event: React.MouseEvent, product: Product) => {
    event.stopPropagation();
    setEditingProduct(product);
    setEditForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
    setEditModalOpen(true);
  };

  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: ViewFilter,
  ) => {
    if (newFilter !== null) {
      setViewFilter(newFilter);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEditFormChange = (field: string, value: string | number) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, editForm);
      setEditModalOpen(false);
      setEditingProduct(null);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingProduct(null);
  };

  // Фильтруем товары в зависимости от выбранного фильтра и поискового запроса
  const filteredProducts = products.filter(product => {
    const matchesFilter = viewFilter === 'favorites' ? product.isFavorite : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Считаем количество избранных товаров
  const favoriteCount = products.filter(product => product.isFavorite).length;

  // Вычисляем индексы для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Заголовок и кнопки */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 0 }}>
          Все товары
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          {/* Фильтр */}
          <ToggleButtonGroup
            value={viewFilter}
            exclusive
            onChange={handleFilterChange}
            aria-label="фильтр товаров"
            size="small"
          >
            <ToggleButton value="all" aria-label="все товары">
              Все ({products.length})
            </ToggleButton>
            <ToggleButton value="favorites" aria-label="избранные товары">
              Избранные ({favoriteCount})
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Кнопка создания */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-product")}
          >
            Создать товар
          </Button>
        </Box>
      </Box>

      {/* Поиск */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
      </Box>

      {/* Панель управления пагинацией */}
      {filteredProducts.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            Показано {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} из {filteredProducts.length} товаров
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>На странице</InputLabel>
              <Select
                value={itemsPerPage}
                label="На странице"
                onChange={handleItemsPerPageChange}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={48}>48</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}

      {/* Сетка товаров */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3,
        mb: 4
      }}>
        {currentItems.map((product) => (
          <Card
            key={product.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4
              }
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", p: 2, backgroundColor: "#f5f5f5" }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
                onClick={(e) => handleFavorite(e, product.id)}
                size="small"
              >
                {product.isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" gutterBottom noWrap>
                {product.title}
              </Typography>

              <Chip
                label={product.category}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  mb: 2
                }}
              >
                {product.description}
              </Typography>

              <Typography variant="h5" color="primary" fontWeight="bold">
                ${product.price}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between", p: 2, pt: 0 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={(e) => handleDelete(e, product.id)}
                  size="small"
                >
                  Удалить
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={(e) => handleEdit(e, product)}
                  size="small"
                >
                  Редактировать
                </Button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={(e) => handleFavorite(e, product.id)}
                  color={product.isFavorite ? "error" : "default"}
                  size="small"
                >
                  {product.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>

      {/* Пагинация */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Сообщения когда нет товаров */}
      {filteredProducts.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {viewFilter === 'favorites' 
              ? searchQuery 
                ? "Нет избранных товаров по вашему запросу"
                : "Нет товаров в избранном"
              : searchQuery
                ? "Товары по вашему запросу не найдены"
                : "Товары не найдены"
            }
          </Typography>
          {(viewFilter === 'favorites' || searchQuery) && (
            <Button 
              variant="outlined" 
              onClick={() => {
                setViewFilter('all');
                setSearchQuery('');
              }}
              sx={{ mt: 1 }}
            >
              Посмотреть все товары
            </Button>
          )}
        </Box>
      )}

      {/* Модальное окно редактирования */}
      <Dialog 
        open={editModalOpen} 
        onClose={handleCloseEditModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Редактировать товар
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Название товара"
              value={editForm.title}
              onChange={(e) => handleEditFormChange('title', e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                fullWidth
                label="Цена"
                type="number"
                value={editForm.price}
                onChange={(e) => handleEditFormChange('price', parseFloat(e.target.value) || 0)}
              />
              <TextField
                fullWidth
                label="Категория"
                value={editForm.category}
                onChange={(e) => handleEditFormChange('category', e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              label="Описание"
              multiline
              rows={4}
              value={editForm.description}
              onChange={(e) => handleEditFormChange('description', e.target.value)}
            />
            <TextField
              fullWidth
              label="URL изображения"
              value={editForm.image}
              onChange={(e) => handleEditFormChange('image', e.target.value)}
            />
            {editForm.image && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Предпросмотр изображения:
                </Typography>
                <Box
                  component="img"
                  src={editForm.image}
                  alt="Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal}>
            Отмена
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained"
            disabled={!editForm.title || !editForm.description || !editForm.category}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};