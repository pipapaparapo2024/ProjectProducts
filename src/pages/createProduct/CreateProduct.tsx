import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../hooks/useProductStore";
export const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProductStore()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !image || !category) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert("Пожалуйста, введите корректную цену!");
      return;
    }

    addProduct({
      title,
      description,
      image,
      category,
      price: priceValue,
    });

    // Очистка формы
    setTitle("");
    setDescription("");
    setImage("");
    setCategory("");
    setPrice("");

    navigate("/products");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Создание товара
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            required
          />

          <TextField
            label="URL изображения"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          <TextField
            label="Цена"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{ min: 0, step: 0.01 }}
            required
          />
          
          <TextField
            label="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <Button variant="contained" type="submit" size="large">
            Создать товар
          </Button>

          <Button variant="text" onClick={() => navigate("/products")}>
            Назад к товарам
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};