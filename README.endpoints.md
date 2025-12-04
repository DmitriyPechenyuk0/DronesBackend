# Full API Documentation / Повна документація API

### Коди помилок / Error codes
* **200** – OK / OK
* **201** – Created / Створено
* **400** – Bad Request / Поганий запит
* **404** – Not Found / Не знайдено
* **500** – Internal Server Error / Внутрішня помилка сервера

# Products Endpoints / Ендпоінти товарів

## 1. GET /products
Отримати список всіх товарів / Get all products
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
                "discount":50
            },
            {
                "id": 2,
                "name": "Drone X2",
                "price": 1200,
                "image": "picture",
                "discount":50
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

Отримати один товар за ID / Get product by ID

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
                    },
                    {
                        "id":2,
                        "characteristic":"characteristic",
                        "description":"description"
                    },
                    {
                        "id":3,
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

Створити новий товар / Create new product

### Body

```json
{
    "name": "Drone X5",
    "price": 1400,
    "description": "New model",
    "discount": 50,
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

Повне оновлення товару / Full update of product

### Body

```json
{
    "name": "Drone X1",
    "price": 1200,
    "image": "picture",
    "discount":50,

    "blocks":[
        {
            "header": "header",
            "description":"description",
            "image": "video",
            "details":[
                {
                    "characteristic":"characteristic",
                    "description":"description"
                },
                {
                    "characteristic":"characteristic",
                    "description":"description"
                },
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
          "blocks": [
            {
                "header": "Updated header",
                "description": "Updated description",
                "image": "Updated video",
                "details": [
                    {
                      "characteristic": "Updated characteristic",
                      "description":  "Updated description"
                    },
                    {
                      "characteristic": "Updated characteristic",
                      "description":  "description"
                    },
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

Часткове оновлення товару / Partial update of product

### Body

```json
{
    "success": true,
    "data": {
        "name": "name",
        "price": 1500,
        "description": "description",
        "discount": 10,
          "blocks": [
            {
                "header": "header",
                "description": "description",
                "image": "video",
                "details": [
                    {
                      "characteristic": "characteristic",
                      "description":  "description"
                    },
                    {
                      "characteristic": "characteristic",
                      "description":  "description"
                    },
                    {
                      "characteristic": "characteristic",
                      "description":  "description"
                    }
                ]
            }
        ]
    }
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
          "blocks": [
            {
                "header": "header",
                "description": "description",
                "image": "Updated video",
                "details": [
                    {
                      "characteristic": "Updated characteristic",
                      "description":  "description"
                    },
                    {
                      "characteristic": "characteristic",
                      "description":  "description"
                    },
                    {
                      "characteristic": "characteristic",
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

Видалити товар / Delete product

### Body

```json
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Drone X1",
        "price": 1200,
        "image": "picture",
        "discount":50,
        "blocks":[
            {
                "id": 1,
                "header": "header",
                "description":"description",
                "image": "video",
                "details":[
                    {
                        "id":1,
                        "characteristic":"characteristic",
                        "description":"description"
                    },
                    {
                        "id":2,
                        "characteristic":"characteristic",
                        "description":"description"
                    },
                    {
                        "id":3,
                        "characteristic":"characteristic",
                        "description":"description"
                    }
                ]
            }
        ] 
    } 
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
