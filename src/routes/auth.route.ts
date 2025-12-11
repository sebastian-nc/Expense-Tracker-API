import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

router.post('/login', validateSchema(LoginSchema), login);
router.post('/register', validateSchema(RegisterSchema), register);

export default router;