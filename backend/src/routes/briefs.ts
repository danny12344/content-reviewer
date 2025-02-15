import { Router } from "express";
import { getBriefs } from "../controllers/briefsController";

const router = Router();
router.get("/", getBriefs);

export default router;
