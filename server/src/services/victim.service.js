import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create Victim
 */
export const createVictim = async (victimData) => {

    const crimeCase = await prisma.caseMaster.findFirst({
        where: {
            id: victimData.caseId,
            deleted: false
        }
    });

    if (!crimeCase) {
        throw new ApiError(404, "Case not found");
    }

    const victim = await prisma.victim.create({
        data: victimData
    });

    return victim;
};

/**
 * Get All Victims
 */
export const getAllVictims = async (query) => {

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = query.search || "";
    const gender = query.gender;
    const status = query.status;

    const where = {
        deleted: false
    };

    if (search) {
        where.OR = [
            {
                fullName: {
                    contains: search
                }
            },
            {
                occupation: {
                    contains: search
                }
            }
        ];
    }

    if (gender) {
        where.gender = gender;
    }

    if (status) {
        where.status = status;
    }

    const total = await prisma.victim.count({
        where
    });

    const victims = await prisma.victim.findMany({

        where,

        include: {
            case: {
                select: {
                    id: true,
                    firNumber: true,
                    crimeNumber: true,
                    title: true
                }
            }
        },

        skip,

        take: limit,

        orderBy: {
            createdAt: "desc"
        }

    });

    return {
        victims,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };

};
/**
 * Get Victim By ID
 */
export const getVictimById = async (id) => {

    const victim = await prisma.victim.findFirst({

        where: {
            id: Number(id),
            deleted: false
        },

        include: {
            case: {
                select: {
                    id: true,
                    firNumber: true,
                    crimeNumber: true,
                    title: true
                }
            }
        }

    });

    if (!victim) {
        throw new ApiError(404, "Victim not found");
    }

    return victim;
};

/**
 * Get Victims By Case
 */
export const getVictimsByCase = async (caseId) => {

    return await prisma.victim.findMany({

        where: {
            caseId: Number(caseId),
            deleted: false
        },

        include: {
            case: {
                select: {
                    id: true,
                    firNumber: true,
                    crimeNumber: true,
                    title: true
                }
            }
        },

        orderBy: {
            createdAt: "desc"
        }

    });

};

/**
 * Update Victim
 */
export const updateVictim = async (id, data) => {

    await getVictimById(id);

    const updateData = {};

    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.occupation !== undefined) updateData.occupation = data.occupation;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.injuryType !== undefined) updateData.injuryType = data.injuryType;
    if (data.statement !== undefined) updateData.statement = data.statement;
    if (data.status !== undefined) updateData.status = data.status;

    return await prisma.victim.update({

        where: {
            id: Number(id)
        },

        data: updateData

    });

};

/**
 * Soft Delete Victim
 */
export const deleteVictim = async (id) => {

    await getVictimById(id);

    await prisma.victim.update({

        where: {
            id: Number(id)
        },

        data: {
            deleted: true
        }

    });

    return true;
};