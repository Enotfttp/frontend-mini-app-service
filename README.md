# frontend-mini-app-service

Kanban-доска в стиле Trello, построенная по архитектуре **Feature-Sliced Design (FSD)**.

## Стек

| Категория | Библиотека |
|---|---|
| Сборка | Vite 6 + TypeScript 5.7 |
| UI | React 18 + MUI 7 (dark mode) |
| Роутинг | React Router DOM 7 |
| Серверное состояние | TanStack React Query 5 |
| Клиентское состояние | Zustand 5 (persist → localStorage) |
| HTTP-клиент | Axios 1.8 |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Стилизация | MUI sx + styled-components 5 |

---

## Быстрый старт

```bash
# Установить зависимости
npm install

# Создать файл окружения
cp .env .env.development

# Запустить dev-сервер (порт 3000)
npm run dev
```

---

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер с hot-reload |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Превью production-сборки (порт 3001) |
| `npm run eslint` | Проверка линтером |
| `npm run eslint:fix` | Автоисправление lint-ошибок |
| `npm run format` | Форматирование через Prettier |
| `npm run lint:all` | Eslint fix + Prettier |

---

## Переменные окружения

Создайте `.env.development` на основе `.env.example`:

```env
VITE_API_URL=http://localhost:8080
VITE_APP_STAND=development
```

| Переменная | Описание |
|---|---|
| `VITE_API_URL` | Базовый URL backend API |
| `VITE_APP_STAND` | Среда (`development` / `production`) — влияет на отображение деталей ошибок |

---

## Архитектура (FSD)

```
src/
├── app/                        # Инициализация приложения
│   ├── AppRouter.tsx           # createBrowserRouter + ErrorBoundary
│   └── providers/
│       ├── config/
│       │   ├── routes.tsx      # Декларация маршрутов
│       │   └── routesPath.ts   # Константы путей
│       └── errorBoundary/
│           ├── ErrorBoundary.tsx         # Class-компонент (React tree errors)
│           ├── RouterErrorBoundary.tsx   # useRouteError (router-level errors)
│           └── NotFoundPage.tsx          # Страница 404
│
├── pages/
│   └── BoardPage/              # Страница канбан-доски (AppBar + KanbanBoard)
│
├── widgets/
│   └── kanban-board/           # Полная доска с DnD-логикой
│       ├── KanbanBoard.tsx     # DndContext, DragOverlay, обработчики drag
│       ├── KanbanColumn.tsx    # Колонка: useSortable(type=column)
│       └── KanbanCard.tsx      # Карточка: useSortable(type=card)
│
├── features/
│   ├── add-column/             # Форма добавления новой колонки
│   └── add-card/               # Inline-форма добавления карточки
│
├── entities/
│   └── board/
│       └── model/
│           ├── types.ts        # ICard, IColumn
│           └── store.ts        # Zustand store (persist)
│
└── shared/
    ├── api/
    │   ├── axiosInstance.ts    # axiosClient (raw) + axiosInstance (wrapper)
    │   ├── interceptors.ts     # Bearer token, 401 refresh queue
    │   └── error.ts            # ApiError, ValidationError
    └── utils/
        └── storage.ts          # localStorage helpers
```

### Правила импортов (FSD)

Слои могут импортировать **только из нижележащих слоёв**:

```
app → pages → widgets → features → entities → shared
```

---

## Drag & Drop

Реализован через `@dnd-kit` с двумя сортируемыми контекстами:

- **Горизонтальный** (`horizontalListSortingStrategy`) — для колонок
- **Вертикальный** (`verticalListSortingStrategy`) — для карточек внутри колонки

Каждый перетаскиваемый элемент передаёт `data.type: 'card' | 'column'` для различения в обработчиках.

| Обработчик | Ответственность |
|---|---|
| `onDragStart` | Сохранить активный элемент для `DragOverlay` |
| `onDragOver` | Кросс-колоночное перемещение карточки (real-time обновление store) |
| `onDragEnd` | Сортировка внутри колонки + сортировка колонок |

Состояние доски сохраняется в `localStorage` через `zustand/middleware/persist` (ключ `mini-app-board`).

---

## HTTP-клиент и интерсепторы

```
shared/api/
├── axiosClient      ← raw Axios instance (используется в interceptors)
├── axiosInstance    ← функция-обёртка с CancelToken (используется в API-слое)
└── setupInterceptors() ← вызывается один раз в src/index.tsx
```

Интерсептор запроса автоматически добавляет `Authorization: Bearer <token>` из `localStorage`.  
Интерсептор ответа обрабатывает `401` с очередью повторных запросов (`failedQueue`).

> Для подключения реального refresh-токена замените `TODO` в `interceptors.ts`.

---

## ErrorBoundary

Два уровня защиты:

| Компонент | Уровень | Что ловит |
|---|---|---|
| `ErrorBoundary` | React tree | Unhandled ошибки в компонентах |
| `RouterErrorBoundary` | Router | Ошибки маршрутов (`errorElement`) |

В режиме `VITE_APP_STAND=development` `RouterErrorBoundary` показывает детали ошибки.
