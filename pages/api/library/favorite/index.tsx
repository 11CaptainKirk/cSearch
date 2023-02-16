import { Part } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    if (req.method === "GET") {
        //
    } else if (req.method === "POST") {
        const { userId, partId, isFavorite } = req.body;

        const updateType = isFavorite ? "connect" : "disconnect";

        const result = await prisma.library.upsert({
            where: {
                name_userId: {
                    name: "Favorites",
                    userId: userId,
                },
            },
            update: {
                parts: {
                    [updateType]: {
                        id: partId,
                    },
                },
            },
            create: {
                name: "Favorites",
                user: {
                    connect: {
                        id: userId,
                    },
                },
                parts: {
                    [updateType]: {
                        id: partId,
                    },
                },
            },
        });
        console.log(result);
        res.json(result);
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
