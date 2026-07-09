import express from "express";

import authRoutes from "./auth.routes.js";
import caseRoutes from "./case.routes.js";
import victimRoutes from "./victim.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cases", caseRoutes);
router.use("/victims", victimRoutes);

export default router;