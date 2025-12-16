# Повна документація API

## Коди помилок

* **200** – OK (Успішне виконання)
* **201** – Створено (Ресурс успішно створено)
* **400** – Поганий запит (Помилка валідації / некоректні дані)
* **401** – Неавторизовано (Потрібен токен)
* **404** – Не знайдено (Ресурс не існує)
* **500** – Внутрішня помилка сервера

---

# Ендпоінти користувачів

## 1. POST /users/register

Зареєструвати нового користувача

### Body

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "Іван Петров"
}
```

### Response

**201**

```json
{
  "success": true,
  "data": {
    "id": 101,
    "email": "user@example.com",
    "name": "Іван Петров",
    "token": "jwt-token"
  }
}
```

**400**

```json
{
  "success": false,
  "message": "Validation error"
}
```

---

## 2. POST /users/login

Аутентифікація користувача

### Body

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

### Response

**200**

```json
{
  "success": true,
  "data": {
    "id": 101,
    "email": "user@example.com",
    "name": "Іван Петров",
    "token": "jwt-token"
  }
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 3. GET /users/me

Отримати інформацію про поточного користувача

### Response

**200**

```json
{
  "success": true,
  "data": {
    "id": 101,
    "email": "user@example.com",
    "name": "Іван Петров",
    "role": "customer"
  }
}
```

**401**

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## 4. PUT /users/me

Повне оновлення інформації про поточного користувача

### Body

```json
{
  "email": "new_email@example.com",
  "name": "Петро Іваненко"
}
```

### Response

**200**

```json
{
  "success": true,
  "data": {
    "id": 101,
    "email": "new_email@example.com",
    "name": "Петро Іваненко"
  }
}
```

**400**

```json
{
  "success": false,
  "message": "Validation error: Email is already taken"
}
```

---

## 5. PATCH /users/me/password

Оновлення пароля поточного користувача

### Body

```json
{
  "current_password": "securepassword123",
  "new_password": "supernewsecurepassword"
}
```

### Response

**200**

```json
{
  "success": true,
  "message": "Password successfully updated"
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid current password"
}
```

---

## 6. DELETE /users/me

Видалення облікового запису поточного користувача

### Response

**200**

```json
{
  "success": true,
  "data": null,
  "message": "User account successfully deleted"
}
```

**401**

```json
{
  "success": false,
  "message": "Unauthorized"
}
```
