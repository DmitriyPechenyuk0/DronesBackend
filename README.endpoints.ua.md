
# Повна документація API

# [Ендпоінти продуктів](#ендпоінти-продуктів-1)
# [Ендпоінти категорій]()
# [Ендпоінти юзера](#product-endpoints)

### Коди помилок 
* **200** – OK
* **201** – Створено
* **400** – Поганий запит
* **404** – Не знайдено
* **500** – Внутрішня помилка сервера

# Ендпоінти продуктів
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

# Ендпоінти юзера

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
    "token": "jwt.token"
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

## 3. GET /users/me/contact-data

Отримати контактні дані користувача

``` 
{
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
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
    "firstname": "Іван",
    "lastname": "Петров",
    "middlename": "Александрович",
    "birthdate": "15/01/2001",
    "number": "+380991160302"
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

## 4. PATCH /users/me/contact-data

Змінити контактні дані користувача
```
{
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}
```

```json
Body

{
    "email": "user@example.com",
    "firstname": "Іван",
    "lastname": "Петров",
    "middlename": "Александрович",
    "birthdate": "15/01/2001",
    "number": "+380991160302"
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

## 5. GET /users/me/orders

Усі замовлення користувача

{
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

### Response

**200**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": 1,
        "name": "Іван",
        "surname": "Петренко",
        "middleName": "Олександрович",
        "email": "ivan.petrenko@example.com",
        "phoneNumber": "+380501234567",
        "deliveryAddress": "м. Дніпро, вул. Шевченка, буд. 15, під. 2, кв. 45",
        "commentForOrder": "Передзвоніть за 30 хвилин до доставки",
        "novaPostOrderNumber": "59000123456789",
        "departureNumber": "20450987654321",
        "typeOfPayment": "card",
        "priceReduced": 2500,
        "fullPrice": 3000,
        "userId": 1,
        "addressId": 1,
        "user": {
          "id": 1,
          "username": "ivan_petrenko",
          "email": "ivan.petrenko@example.com",
          "phoneNumber": "+380501234567",
          "name": "Іван",
          "surname": "Петренко",
          "middleName": "Олександрович",
          "birthday": "1990-05-15T00:00:00.000Z"
        },
        "address": {
          "id": 1,
          "city": "Дніпро",
          "street": "вул. Шевченка",
          "houseNumber": "15",
          "entrance": "2",
          "flat": "45"
        },
        "orderDetails": [
          {
            "id": 1,
            "quantity": 2,
            "price": 1200,
            "productId": 10,
            "product": {
              "id": 10,
              "name": "Ноутбук ASUS",
              "price": 25000,
              "discount": 10,
              "amount": 5,
              "categoryId": 1,
              "category": {
                "id": 1,
                "title": "Ноутбуки",
                "image": "/images/categories/laptops.jpg"
              }
            }
          },
          {
            "id": 2,
            "quantity": 1,
            "price": 600,
            "productId": 15,
            "product": {
              "id": 15,
              "name": "Мишка Logitech",
              "price": 600,
              "discount": null,
              "amount": 20,
              "categoryId": 2,
              "category": {
                "id": 2,
                "title": "Периферія",
                "image": "/images/categories/peripherals.jpg"
              }
            }
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
  "message": "Server error"
}
```

---

## 7. PATCH users/recovery

Створення recovery у юзера

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

## 8. PATCH users/recovery/:code

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
  "data": {}
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