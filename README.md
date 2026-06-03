# 🏛 Domus — Платформа недвижимости

Учебный проект по дисциплине «Фронтенд-разработка». Платформа для поиска и продажи недвижимости.

## Стек технологий

- **React 18** + React Router v6
- **React Bootstrap 2.x** + Bootstrap 5
- **react-slick** — слайдеры
- **rc-slider** — range-слайдеры для фильтров
- **Chart.js** + react-chartjs-2 — диаграммы
- **Leaflet** + react-leaflet — карты
- **Formik** + Yup — формы и валидация
- **react-qr-code** — QR-код

## Установка и запуск

```bash
npm install
npm start
```

## Сборка

```bash
npm run build
```

## Деплой на Vercel

1. Залейте репозиторий на GitHub
2. Подключите к Vercel
3. Настройки по умолчанию работают автоматически

## Структура проекта

```
src/
├── components/
│   ├── Navbar/          — Sticky navbar с избранным
│   ├── Footer/          — Подвал сайта
│   ├── PropertyCard/    — Карточка объекта с мини-каруселью
│   ├── FilterSidebar/   — Панель фильтров с range-слайдерами
│   ├── Calculator/      — Ипотечный калькулятор + Doughnut chart
│   ├── ContactForm/     — Formik-форма с Yup валидацией
│   ├── MapView/         — Карты офисов и объектов (Leaflet)
│   └── QRCode/          — Генерация и скачивание QR
├── pages/
│   ├── Home.jsx         — Главная (Hero, Features, Hot Deals, Stats)
│   ├── Catalog.jsx      — Каталог (Grid/List/Map views)
│   ├── PropertyDetail.jsx — Детальная страница объекта (+10 бонус)
│   ├── Mortgage.jsx     — Ипотечный калькулятор
│   ├── Contacts.jsx     — Контакты + карта + QR
│   ├── Favorites.jsx    — Избранное (+5 бонус)
│   └── NotFound.jsx     — 404 страница
├── context/
│   └── FavoritesContext.js — Context API + localStorage
└── data/
    └── properties.js    — 8 объектов недвижимости
```

## Критерии оценки (100 баллов)

| Критерий | Статус |
|---|---|
| Все 5 страниц реализованы | ✅ |
| Каталог: Range-слайдеры + Фильтрация | ✅ |
| Каталог: Split-view (Карта + Список) | ✅ |
| Ипотечный калькулятор + Chart.js | ✅ |
| Formik + Yup + Карта с маркерами | ✅ |
| QR-код + скачивание | ✅ |
| Роутинг React Router v6 | ✅ |
| Деплой + Адаптивность | ✅ |
| Качество верстки | ✅ |

## Бонусы

| Бонус | Статус |
|---|---|
| Страница /catalog/:id с галереей | ✅ +10 |
| Избранное через Context API + localStorage | ✅ +5 |
| Переключатель валют (₸/$/₽) | ✅ +5 |
