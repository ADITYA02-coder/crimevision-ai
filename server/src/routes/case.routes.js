import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {

    createCaseValidator,
    updateCaseValidator

} from "../validators/case.validator.js";

import {

    createCase,
    getAllCases,
    getCase,
    updateCase,
    deleteCase

} from "../controllers/case.controller.js";

const router = express.Router();

router.use(authenticate);

router.post(
    "/",
    authorize("ADMIN", "INVESTIGATOR"),
    createCaseValidator,
    validate,
    createCase
);

router.get(
    "/",
    getAllCases
);

router.get(
    "/:id",
    getCase
);

router.put(
    "/:id",
    authorize("ADMIN", "INVESTIGATOR"),
    updateCaseValidator,
    validate,
    updateCase
);

router.delete(
    "/:id",
    authorize("ADMIN"),
    deleteCase
);

export default router;