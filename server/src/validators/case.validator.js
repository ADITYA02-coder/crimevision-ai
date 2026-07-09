import { body } from "express-validator";

export const createCaseValidator = [
  body("crimeNumber").trim().notEmpty().withMessage("Crime Number is required"),

  body("firNumber").trim().notEmpty().withMessage("FIR Number is required"),

  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),
  body("crimeDateTime")
    .isISO8601()
    .withMessage("Valid Crime DateTime required"),

  body("district").notEmpty().withMessage("District required"),

  body("policeStation").notEmpty().withMessage("Police Station required"),

  body("crimeType").notEmpty().withMessage("Crime Type required"),

  body("crimeSubType").notEmpty().withMessage("Crime Sub Type required"),
];

export const updateCaseValidator = createCaseValidator;
