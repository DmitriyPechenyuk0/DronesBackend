import express from "express";
import { ProductController } from "./product.controller";

const ProductRouter: express.Router = express.Router();

ProductRouter.get("/products", ProductController.getAll);
// PostRouter.get("/products/:id", ProductController.getById);
// PostRouter.post("/products", ProductController.create);
// PostRouter.patch("/products/:id", ProductController.fullUpdate);
// PostRouter.patch("/products/:id", ProductController.partialUpdate);
// PostRouter.delete("/products/:id", ProductController.delete);

export { ProductRouter };
