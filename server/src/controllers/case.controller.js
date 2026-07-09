import * as caseService from "../services/case.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createCase = async (req, res, next) => {

    try {

        const crime = await caseService.createCase(
            req.body,
            req.user.id
        );

        res.status(201).json(
            new ApiResponse(
                201,
                "Case created successfully",
                crime
            )
        );

    } catch (error) {
        next(error);
    }

};

export const getAllCases = async (req, res, next) => {

    try {

        const crimes = await caseService.getAllCases();

        res.json(
            new ApiResponse(
                200,
                "Cases fetched successfully",
                crimes
            )
        );

    } catch (error) {
        next(error);
    }

};

export const getCase = async (req, res, next) => {

    try {

        const crime = await caseService.getCaseById(
            req.params.id
        );

        res.json(
            new ApiResponse(
                200,
                "Case fetched successfully",
                crime
            )
        );

    } catch (error) {
        next(error);
    }

};

export const updateCase = async (req, res, next) => {

    try {

        const crime = await caseService.updateCase(
            req.params.id,
            req.body
        );

        res.json(
            new ApiResponse(
                200,
                "Case updated successfully",
                crime
            )
        );

    } catch (error) {
        next(error);
    }

};

export const deleteCase = async (req, res, next) => {

    try {

        await caseService.deleteCase(
            req.params.id
        );

        res.json(
            new ApiResponse(
                200,
                "Case deleted successfully"
            )
        );

    } catch (error) {
        next(error);
    }

};