import { body } from "express-validator";

export const createVictimValidator = [

    body("caseId")
        .isInt({ min: 1 })
        .withMessage("Valid Case ID is required"),

    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Victim name is required"),

    body("gender")
        .isIn(["MALE", "FEMALE", "OTHER"])
        .withMessage("Invalid gender"),

    body("age")
        .isInt({ min: 0, max: 120 })
        .withMessage("Invalid age"),

    body("occupation")
        .optional()
        .isString(),

    body("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),

    body("address")
        .optional()
        .isString(),

    body("injuryType")
        .optional()
        .isString(),

    body("statement")
        .optional()
        .isString(),

    body("status")
        .optional()
        .isIn(["ALIVE", "INJURED", "DECEASED"])
];

export const updateVictimValidator = [

    body("fullName").optional().trim(),

    body("gender")
        .optional()
        .isIn(["MALE", "FEMALE", "OTHER"]),

    body("age")
        .optional()
        .isInt({ min: 0, max: 120 }),

    body("occupation").optional(),

    body("phone")
        .optional()
        .isMobilePhone("any"),

    body("email")
        .optional()
        .isEmail(),

    body("address").optional(),

    body("injuryType").optional(),

    body("statement").optional(),

    body("status")
        .optional()
        .isIn(["ALIVE", "INJURED", "DECEASED"])
];