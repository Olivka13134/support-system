# Support System

Это API для работы с обращениями, написанное на Node.js с использованием Express.js и TypeScript. Оно позволяет создавать обращения, изменять их статус, а также фильтровать по датам и статусам.

## Стек технологий

- **Node.js** — серверная платформа.
- **Express.js** — фреймворк для создания API.
- **TypeScript** — язык программирования, обеспечивающий строгую типизацию.
- **Sequelize** — ORM для работы с базой данных.
- **MySQL** — база данных для хранения информации о запросах.

### 4. **Описание файлов и их назначения**

- **`src/app.ts`**: Основной файл, где настраивается сервер Express и подключаются все маршруты.
- **`src/controllers/requestController.ts`**: В этом файле находятся функции, которые обрабатывают HTTP-запросы. Они принимают запросы от клиента, передают данные в сервисы и отправляют ответы.
- **`src/models/requestModel.ts`**: Модель Sequelize для обращения. Здесь описана структура данных в базе данных, например, поля `subject`, `text`, `status`, и методы взаимодействия с БД.
- **`src/routes/requestRoutes.ts`**: Здесь описаны все маршруты для API, которые отправляют запросы в контроллеры для обработки.
- **`src/services/requestService.ts`**: Сервисы отвечают за бизнес-логику приложения. Они обрабатывают запросы от контроллеров и взаимодействуют с базой данных.
- **`src/database.ts`**: Конфигурация базы данных с использованием Sequelize.
- **`src/config.ts`**: Настройки, такие как параметры подключения к базе данных или другие глобальные конфигурации.

## Установка и запуск

1. **Клонировать репозиторий**:
   ```bash
   git clone https://github.com/your-username/support-system.git
   cd support-system

2. **Установить зависимости**:
    ```bash
    npm install

3. **Создать файл **`.env`** **:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=support_system
    PORT=3000

4. **Запустить сервер в режиме разработки**:
    ```bash
    npm run start:dev

Сервер будет доступен на **`http://localhost:3000`**

Пример использования
1. Создание нового обращения (POST /api/requests)

Запрос:
```json
{
  "subject": "Technical Issue",
  "text": "My computer is not starting."
}
```
Ответ:
```json
{
  "id": 1,
  "subject": "Technical Issue",
  "text": "My computer is not starting.",
  "status": "new",
  "createdAt": "2023-05-13T14:12:00.000Z",
  "updatedAt": "2023-05-13T14:12:00.000Z"
}
```

2. Взять обращение в работу (PUT /api/requests/:id/start)
Запрос:
```json
{
  "id": 1
}
```
Ответ:
```json
{
  "id": 1,
  "subject": "Technical Issue",
  "text": "My computer is not starting.",
  "status": "in_progress",
  "createdAt": "2023-05-13T14:12:00.000Z",
  "updatedAt": "2023-05-13T14:13:00.000Z"
}
```

3. Завершить обращение (PUT /api/requests/:id/complete)
Запрос:
```json
{
  "solution": "The issue was fixed by restarting the computer."
}
```
Ответ:
```json
{
  "id": 1,
  "subject": "Technical Issue",
  "text": "My computer is not starting.",
  "status": "completed",
  "solution": "The issue was fixed by restarting the computer.",
  "createdAt": "2023-05-13T14:12:00.000Z",
  "updatedAt": "2023-05-13T14:14:00.000Z"
}
```

4. Отменить обращение (PUT /api/requests/:id/cancel)
Запрос:
```json
{
  "reason": "User no longer needs support."
}
```
Ответ:
```json
{
  "id": 1,
  "subject": "Technical Issue",
  "text": "My computer is not starting.",
  "status": "canceled",
  "cancelReason": "User no longer needs support.",
  "createdAt": "2023-05-13T14:12:00.000Z",
  "updatedAt": "2023-05-13T14:15:00.000Z"
}
```

5. Получить список обращений с фильтрацией по датам (GET /api/requests?startDate=2023-05-01&endDate=2023-05-15)
Ответ:
```json
[
  {
    "id": 1,
    "subject": "Technical Issue",
    "text": "My computer is not starting.",
    "status": "completed",
    "solution": "The issue was fixed by restarting the computer.",
    "createdAt": "2023-05-13T14:12:00.000Z",
    "updatedAt": "2023-05-13T14:14:00.000Z"
  }
]
```

6. Отменить все обращения в статусе "в работе" (POST /api/requests/cancel-in-progress)
Ответ:
```json
[
  {
    "id": 2,
    "subject": "Another Issue",
    "text": "I can't connect to the internet.",
    "status": "canceled",
    "createdAt": "2023-05-12T12:00:00.000Z",
    "updatedAt": "2023-05-12T12:01:00.000Z"
  }
]
```

7. Получить все незакрытые обращения (GET /api/requests/open)
Ответ:
```json
[
  {
    "id": 1,
    "subject": "Technical Issue",
    "text": "My computer is not starting.",
    "status": "new",
    "createdAt": "2023-05-13T14:12:00.000Z",
    "updatedAt": "2023-05-13T14:12:00.000Z"
  },
  {
    "id": 2,
    "subject": "Another Issue",
    "text": "I can't connect to the internet.",
    "status": "in_progress",
    "createdAt": "2023-05-12T12:00:00.000Z",
    "updatedAt": "2023-05-12T12:01:00.000Z"
  }
]
```