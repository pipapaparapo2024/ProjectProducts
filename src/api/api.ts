import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.yourdomain.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log(
      `[API Success] ${response.config.method?.toUpperCase()} ${
        response.config.url
      }:`,
      response
    );
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Не авторизован - перенаправляем на логин и чистим токен
          console.error("Ошибка 401: Не авторизован");
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;

        case 403:
          // Нет доступа
          console.error("Ошибка 403: Доступ запрещен");
          break;

        case 404:
          // Не найдено
          console.error("Ошибка 404: Ресурс не найден", error.config.url);
          break;

        case 500:
          // Ошибка сервера
          console.error("Ошибка 500: Внутренняя ошибка сервера");
          break;

        default:
          console.error(`Необработанная HTTP ошибка: ${status}`, data);
      }
    } else if (error.request) {
      console.error("Ошибка сети: Ответ не получен", error.request);
    } else {
      console.error("Ошибка при настройке запроса", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
