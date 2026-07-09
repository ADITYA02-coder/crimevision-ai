import express from "express";

import {
    register,
    login,
    profile,
    verify
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";

import {
    registerValidator,
    loginValidator
} from "../validators/auth.validator.js";

import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/register",
    registerValidator,
    validate,
    register
);

router.post(
    "/login",
    loginValidator,
    validate,
    login
);

router.get(
    "/profile",
    authenticate,
    profile
);

router.get(
    "/verify",
    authenticate,
    verify
);

export default router;