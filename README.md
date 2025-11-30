# Drones

- [English](README.md)
- [Днепровский диалект](README.dp.md)
- [Українська](README.uk.md)

## Технологии

- Node.js
- Express.js
- SQLite / MySQL
- JWT
- Bcrypt

## Установка
```bash
git clone https://github.com/DmitriyPechenyuk0/DronesBackend.git
cd DronesBackend
npm install
cp .env.example .env
npm run dev
```

## Структура проекта
```
каминг сун
```

## Правила написания кода

### Именование

**Файлы:** - dot-case: `user.controller.ts`, `auth.middleware.ts`

**Переменные и функции:** 
- camelCase: `userId`, `getUserById()`
- Константы: UPPER_SNAKE_CASE - `MAX_ATTEMPTS`
- Булевые: `isActive`, `hasPermission`, `canEdit`

**Классы** - PascalCase - `UserService` `DatabaseConnection`


### Основные принципы

2. **DRY** - не дублировать код
3. **Простота чтения** - избегать вложенных if
5. **Деструктуризация** объектов
7. **Обработка всех ошибок** через try-catch
8. **Валидация** всех входящих данных

### Структура ответов api
```javascript
// Success
{
  success: true,
  data: {}
}

// Error
{
  success: false,
  message: "Error message"
}
```

### Обязательно

- Валидация входных данных
- JWT для авторизации
- Bcrypt для паролей

## Переменные окружения

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

## Команды

```bash
npm run dev      # Разработка
npm start        # Продакшн
```

