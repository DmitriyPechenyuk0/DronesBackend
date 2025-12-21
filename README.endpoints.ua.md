# Повна документація API

### Коди помилок 
* **200** – OK
* **201** – Створено
* **400** – Поганий запит
* **404** – Не знайдено
* **500** – Внутрішня помилка сервера

# Ендпоінти товарів

## 1. GET /products
Отримати список всіх товарів 
### Response

**200**

```json
{ 
    "success": true,
    "data": {
        "products":[
            {
                "id": 1,
                "name": "Drone X1",
                "price": 1200,
                "image": "picture",
                "discount":50,
                "category": {
                    "id": 1,
                    "name": "drone"
                }
            },
            {
                "id": 2,
                "name": "Thermal Cam T2",
                "price": 1500,
                "image": "picture",
                "discount":10,
                "category": {
                    "id": 2,
                    "name": "thermal"
                }
            }
        ]  
    }
}
```


**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 2. GET /products/:id

Отримати один товар за ID 

### Response

**200**

```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Drone X1",
        "price": 1200,
        "image": "picture",
        "discount":50,
        "category": {
            "id": 1,
            "name": "drone"
        },
        "blocks":[
            {
                "id": 1,
                "header": "header",
                "description":"description",
                "image": "picture"
            },
            {
                "id": 2,
                "header": "header",
                "description":"description",
                "image": "video",
                "details":[
                    {
                        "id":1,
                        "characteristic":"characteristic",
                        "description":"description"
                    }
                ]
            }
        ] 
    } 
}
```

**404**

```json
{
  "success": false,
  "message": "Product not found"
}
```

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 3. POST /products

Створити новий товар 

### Body

```json
{
    "name": "Drone X5",
    "price": 1400,
    "description": "New model",
    "discount": 50,
    "category_id": 1,
    "blocks": [
        {
            "header": "header",
            "description": "description",
            "image": "picture",
            "details": [
                {
                "characteristic": "characteristic",
                "description": "description"
                }
            ]
        }
    ]
}
```

### Response

**201**

```json
{
    "success": true,
    "data": {
        "id": 5,
        "name": "new name",
        "price": 1400,
        "description": "New description",
        "discount": 50,
        "category": {
            "id": 1,
            "name": "drone"
        },
        "blocks": [
            {
                "header": "new header",
                "description": "new description",
                "image": "new picture",
                "details": [
                    {
                    "characteristic": "new characteristic",
                    "description": "new description"
                    }
                ]
            }
        ]
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

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 4. PUT /products/:id

Повне оновлення товару

### Body

```json
{
    "name": "Drone X1",
    "price": 1200,
    "image": "picture",
    "discount":50,
    "category_id": 1,
    "blocks":[
        {
            "header": "header",
            "description":"description",
            "image": "video",
            "details":[
                {
                    "characteristic":"characteristic",
                    "description":"description"
                }
            ]
        }
    ]
}
```

### Response

**200**

```json
{
    "success": true,
    "data": {
        "name": "Updated name",
        "price": 1500,
        "description": "Updated description",
        "discount": 10,
        "category": {
            "id": 1,
            "name": "drone"
        },
        "blocks": [
            {
                "header": "Updated header",
                "description": "Updated description",
                "image": "Updated video",
                "details": [
                    {
                      "characteristic": "Updated characteristic",
                      "description":  "Updated description"
                    }
                ]
            }
        ]
    }
}
```

**404**

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 5. PATCH /products/:id

Часткове оновлення товару

### Body

```json
{
    "name": "name",
    "price": 1500,
    "description": "description",
    "discount": 10,
    "category_id": 2,
    "blocks": [
        {
            "header": "header",
            "description": "description",
            "image": "video",
            "details": [
                {
                  "characteristic": "characteristic",
                  "description":  "description"
                }
            ]
        }
    ]
}
```

### Response

**200**

```json
{
    "success": true,
    "data": {
        "name": "Updated name",
        "price": 1500,
        "description": "Updated description",
        "discount": 10,
        "category": {
            "id": 2,
            "name": "thermal"
        },
        "blocks": [
            {
                "header": "header",
                "description": "description",
                "image": "Updated video",
                "details": [
                    {
                      "characteristic": "Updated characteristic",
                      "description":  "description"
                    }
                ]
            }
        ]
    }
}
```

**404**

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## 6. DELETE /products/:id

Видалити товар 

### Body

```json
{
    "id": 1
}
```

### Response

**200**

```json
{
  "success": true,
  "data": null
}
```

**404**

```json
{
  "success": false,
  "message": "Product not found"
}
```

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

# Ендпоінти категорій

## 1. GET /categories
Отримати список всіх категорій 

### Response

**200**

```json
{
    "success": true,
    "data": {
            "categories":[
            {
                "id": 1,
                "name": "drone"
            },
            {
                "id": 2,
                "name": "thermal"
            }
        ]
    }
}
```

**500**

```json
{
    "success": false,
    "message": "Server error"
}
```

---

## 2. GET /categories/:id
Отримати категорію за ID 

### Response

**200**

```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "drone"
    }
}
```

**404**

```json
{
    "success": false,
    "message": "Category not found"
}
```

**500**

```json
{
    "success": false,
    "message": "Server error"
}
```

---

## 3. POST /categories
Створити категорію 

### Body

```json
{
    "categories":[
        {
            "id": 1,
            "name": "drone"
        },
        {
            "id": 2,
            "name": "thermal"
        }
    ]
}
```

### Response

**201**

```json
{
  "success": true,
  "data": {
    "categories":[
        {
            "id": 1,
            "name": "new drone"
        },
        {
            "id": 2,
            "name": "new thermal"
        }
    ]
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

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 4. PUT /categories/:id
Оновити категорію 

### Body

```json
{
"categories":[
        {
            "id": 1,
            "name": "drone"
        },
        {
            "id": 2,
            "name": "thermal"
        }
    ]
}
```

### Response

**200**

```json
{
    "success": true,
    "data": {
        "categories":[
            {
                "id": 1,
                "name": "Updated drone"
            },
            {
                "id": 2,
                "name": "Updated thermal"
            }
        ]
    }
}
```

**404**

```json
{
  "success": false,
  "message": "Category not found"
}
```

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 5. DELETE /categories/:id
Видалити категорію 

### Body

```json
{
  "id": 1
}
```

### Response

**200**

```json
{
  "success": true,
  "data": null
}
```

**404**

```json
{
  "success": false,
  "message": "Category not found"
}
```

**500**

```json
{
  "success": false,
  "message": "Server error"
}
```

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
  "data": {}
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
    "firstname": "Іван",
    "secound": "Петров",
    "thirdname": "Александровіч",
    "birthdate": "15/01/2001",
    "number": "+380/99/116/03/02"
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

## 4. GET /users/me/addresses

Адреса користувача

### Response

**200**

```json
{
  "success": true,
  "data": [
    {
      "id": 1, 
      "city": "Dnipro",
      "street": "Marshal Malinovsky St.",
      "house": "114",
      "apartment": "42",
      "entrance": "3"
    },
    {
      "id": 2,
      "city": "Kyiv",
      "street": "Khreshchatyk St.",
      "house": "1",
      "apartment": "67",
      "entrance": 4
    }
  ]
}
```

**400**

```json
{
  "success": false,
  "message": ""
}
```

---

## 5. PATCH users/recovery

Оновлення пароля поточного користувача

### Body

```json
{
  "email": "user@example.com"
}
```

### Response

**200**

```json
{
  "success": true,
  "message": ""
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid email"
}
```

---

## 6. PATCH users/recovery/:code

Оновлення пароля поточного користувача

### Body

```json
{
  "password": "passwordexample123"
}
```

### Response

**200**

```json
{
  "success": true,
  "message": ""
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

## 7. GET users/me/order

Перегляд статусу замовлення, оновленння інформації кожні 1-5 хвилин, SHORT POLLING запрос

### Response

**200**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "2",
      "firstname": "Юрія",
      "lastname": "Павленко",
      "phone": "+380/99/123/45/68"
    },
    "orders": [
      {
        "orderId": "30349",
        "orderDate": "20.04.2023",
        "trackingNumber": "20030040050000",
        "deliveryAddress": "Нова Пошта до відділення, Дніпро, Відділення №1: вул. Маршала Малиновського, 114",
        "paymentMethod": "Накладений платіж",
        "item": {
            "id": "1",
            "name": "DJI Mini 4K",
            "image": "/shared/img/orders/drones/DjiMini4K.jpg"
            "quantity": 1,
        },
        "summary": {
          "totalOriginal": 29990,
          "savings": 1005,
          "totalToPay": 28985
        }
      }
    ]
  }
}

```

**401**

```json
{
  "success": false,
  "data": {},
}
```

**404**

```json
{
  "success": false,
  "message": "Активних замовлень не знайдено"
}
```

---

## 8. POST /support

сторінка для звертання у підтримку сервісу

### Response

**200**

```json
{
  "success": true,
  "data": {
        "name": "Іван",
        "number": "+380/99/116/03/02",
        "email": "user@example.com",
        "description": "Потрібна допомога у повертанні замовлення DJI Mini 4K",
    }
}
```

**401**

```json
{
  "success": false,
  "data": {},
}
```

---

## 9. PATCH users/me/modification

Оновлення данних поточного користувача

### Body

```json
{
    "firstName": "Анастасія",
    "secoundname": "Павленко",
    "thirdmame": "Александрівна",
    "birthDate": "1995-05-20",
    "phone": "+380991234568",
    "email": "anastasia.p@example.com"
}
```

### Response

**200**

```json
{
  "success": true,
  "message": ""
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid email"
}
```

---

## 10. PATCH /users/me/addresses/modification

Оновлення данних поточного користувача

### Body

```json
{
    "addressId": "123",
    "city": "Дніпро",
    "street": "вул. Маршала Малиновського",
    "houseNumber": "114",
    "apartment": "12",
    "entrance": "11",
    "isDefault": true
}
```

### Response

**200**

```json
{
  "success": true,
  "message": ""
}
```

**400**

```json
{
  "success": false,
  "message": "Invalid email"
}
```

---
