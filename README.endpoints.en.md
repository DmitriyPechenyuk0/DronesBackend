
# Full API Documentation

### Коди помилок / Error codes
* **200** – OK
* **201** – Created
* **400** – Bad Request
* **404** – Not Found 
* **500** – Internal Server Error

# Products Endpoints / Ендпоінти товарів

## 1. GET /products
Get all products
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

Get product by ID

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

Create new product

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

Full update of product

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

Partial update of product

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

Delete product

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

# Categories Endpoints

## 1. GET /categories
Get all categories

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
Get category by ID

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
Create category

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
Update category

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
Delete category

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
