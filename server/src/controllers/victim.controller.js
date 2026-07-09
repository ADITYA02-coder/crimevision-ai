import * as victimService from "../services/victim.service.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Create Victim
 */
export const createVictim = async (req, res, next) => {
    try {

        const victim = await victimService.createVictim(req.body);

        return res.status(201).json(
            new ApiResponse(
                201,
                "Victim created successfully",
                victim
            )
        );

    } catch (error) {
        next(error);
    }
};

/**
 * Get All Victims
 */
export const getAllVictims = async (req, res, next) => {
    try {

        const victims = await victimService.getAllVictims(req.query);

        return res.json(
            new ApiResponse(
                200,
                "Victims fetched successfully",
                victims
            )
        );

    } catch (error) {
        next(error);
    }
};

/**
 * Get Victim By ID
 */
export const getVictimById = async (req, res, next) => {
    try {

        const victim = await victimService.getVictimById(req.params.id);

        return res.json(
            new ApiResponse(
                200,
                "Victim fetched successfully",
                victim
            )
        );

    } catch (error) {
        next(error);
    }
};

/**
 * Get Victims By Case
 */
export const getVictimsByCase = async (req, res, next) => {
    try {

        const victims = await victimService.getVictimsByCase(req.params.caseId);

        return res.json(
            new ApiResponse(
                200,
                "Victims fetched successfully",
                victims
            )
        );

    } catch (error) {
        next(error);
    }
};

/**
 * Update Victim
 */
export const updateVictim = async (req, res, next) => {
    try {

        const victim = await victimService.updateVictim(
            req.params.id,
            req.body
        );

        return res.json(
            new ApiResponse(
                200,
                "Victim updated successfully",
                victim
            )
        );

    } catch (error) {
        next(error);
    }
};

/**
 * Delete Victim
 */
export const deleteVictim = async (req, res, next) => {
    try {

        await victimService.deleteVictim(req.params.id);

        return res.json(
            new ApiResponse(
                200,
                "Victim deleted successfully"
            )
        );

    } catch (error) {
        next(error);
    }
};