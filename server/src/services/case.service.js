import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const createCase = async (caseData, userId) => {

    const existingCrime = await prisma.caseMaster.findFirst({
        where: {
            OR: [
                { crimeNumber: caseData.crimeNumber },
                { firNumber: caseData.firNumber }
            ]
        }
    });

    if (existingCrime) {
        throw new ApiError(409, "Crime Number or FIR Number already exists");
    }

    const newCase = await prisma.caseMaster.create({
        data: {
            ...caseData,
            createdById: userId
        }
    });

    return newCase;
};

export const getAllCases = async () => {

    return await prisma.caseMaster.findMany({

        where: {
            deleted: false
        },

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }

    });

};

export const getCaseById = async (id) => {

    const crime = await prisma.caseMaster.findUnique({

        where: {
            id: Number(id)
        },

        include: {
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    role: true
                }
            }
        }

    });

    if (!crime || crime.deleted) {
        throw new ApiError(404, "Case not found");
    }

    return crime;
};

export const updateCase = async (id, data) => {

    await getCaseById(id);

    return await prisma.caseMaster.update({

        where: {
            id: Number(id)
        },

        data

    });

};

export const deleteCase = async (id) => {

    await getCaseById(id);

    await prisma.caseMaster.update({

        where: {
            id: Number(id)
        },

        data: {
            deleted: true
        }

    });

    return true;
};