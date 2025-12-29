# Повна документація API

### Коди помилок

- **200** – OK
- **201** – Створено
- **400** – Поганий запит
- **404** – Не знайдено
- **500** – Внутрішня помилка сервера

# Ендпоінти товарів

## 1. GET /products

Отримати список всіх товарів

### Response

**200**

```json
{
	"success": true,
	"data": {
		"products": [
			{
				"id": 1,
				"name": "Drone X1",
				"price": 1200,
				"image": "picture",
				"discount": 50,
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
				"discount": 10,
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
		"discount": 50,
		"category": {
			"id": 1,
			"name": "drone"
		},
		"blocks": [
			{
				"id": 1,
				"header": "header",
				"description": "description",
				"image": "picture"
			},
			{
				"id": 2,
				"header": "header",
				"description": "description",
				"image": "video",
				"details": [
					{
						"id": 1,
						"characteristic": "characteristic",
						"description": "description"
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
	"discount": 50,
	"category_id": 1,
	"blocks": [
		{
			"header": "header",
			"description": "description",
			"image": "video",
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
						"description": "Updated description"
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
					"description": "description"
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
						"description": "description"
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
		"categories": [
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
	"categories": [
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
		"categories": [
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
	"categories": [
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
		"categories": [
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
