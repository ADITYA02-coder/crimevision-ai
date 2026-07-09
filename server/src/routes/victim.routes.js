import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createVictim,
    getAllVictims,
    getVictimById,
    getVictimsByCase,
    updateVictim,
    deleteVictim
} from "../controllers/victim.controller.js";

import {
    createVictimValidator,
    updateVictimValidator
} from "../validators/victim.validator.js";

const router = express.Router();

router.use(authenticate);

/**
 * Create Victim
 */
router.post(
    "/",
    authorize("ADMIN", "INVESTIGATOR"),
    createVictimValidator,
    validate,
    createVictim
);

/**
 * Get All Victims
 */
router.get(
    "/",
    getAllVictims
);

/**
 * Get Victims By Case
 */
router.get(
    "/case/:caseId",
    getVictimsByCase
);

/**
 * Get Victim By ID
 */
router.get(
    "/:id",
    getVictimById
);



/**
 * Update Victim
 */
router.put(
    "/:id",
    authorize("ADMIN", "INVESTIGATOR"),
    updateVictimValidator,
    validate,
    updateVictim
);

/**
 * Delete Victim
 */
router.delete(
    "/:id",
    authorize("ADMIN"),
    deleteVictim
);

export default router;