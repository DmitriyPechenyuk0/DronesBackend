import { Router } from "express";
import { CategoryController } from "./category.controller";

const controller = new CategoryController();
const router = Router();

router.get("/categories", (req, res) => controller.getAll(req, res));
router.get("/categories/:id", (req, res) => controller.getById(req, res));
router.post("/categoties", (req, res) => controller.create(req, res));
router.put("/categories/:id", (req, res) => controller.update(req, res));
router.delete("/categories/:id", (req, res) => controller.delete(req, res));

export default router;
