# Movie Search App

Это приложение для поиска информации о фильмах с использованием React, TypeScript, Vite, React Router, Axios, Material UI и [открытого API](https://kinopoiskapiunofficial.tech/).

## Установка и запуск

1. Клонируйте репозиторий и установите зависимости:
   ```
   git clone https://github.com/Prizzz/VK-trainee.git
   cd VK-trainee
   npm install
   ```

2. Создайте файл .env на основе .env.default

3. Запуск:
   ```
   npm run dev
   ```
   Откройте браузер и перейдите по адресу http://localhost:5173/.

Также вы можете открыть [deploy](https://vk-trainee.vercel.app/) проекта

#### Особенности
1. На странице отображается по 20 фильмов, вместо 50 (из-за особенностей используемого API)
2. Нет возможности фильтрации сразу по нескольким жанрам. Только по одному конкретному (из-за ограничений используемого API)