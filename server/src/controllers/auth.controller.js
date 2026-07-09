import * as authService from "../services/auth.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {

    try {

        const result = await authService.registerUser(req.body);

        res.status(201).json(
            new ApiResponse(
                201,
                "User Registered Successfully",
                result
            )
        );

    } catch (error) {
        next(error);
    }

};

export const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const result = await authService.loginUser(
            email,
            password
        );

        res.json(
            new ApiResponse(
                200,
                "Login Successful",
                result
            )
        );

    } catch (error) {
        next(error);
    }

};

export const profile = async (req, res) => {

    const { password, ...safeUser } = req.user;

    res.json(
        new ApiResponse(
            200,
            "Profile fetched successfully",
            safeUser
        )
    );

};

export const verify = async (req, res) => {

    res.json({
        success: true,
        message: "Token is valid",
        user: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }
    });

};