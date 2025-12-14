import express from "express";
import { ProductController } from "./product.controller";

const ProductRouter: express.Router = express.Router();

ProductRouter.get("/products", ProductController.getAll);
ProductRouter.get("/products/:id", ProductController.getById);
ProductRouter.post("/products", ProductController.create);
// ProductRouter.patch("/products/:id", ProductController.fullUpdate);
// ProductRouter.patch("/products/:id", ProductController.partialUpdate);
// ProductRouter.delete("/products/:id", ProductController.delete);

export { ProductRouter };
