import Prisma, { Part } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const { name } = req.body;
    console.log(req.body);
    const result = await prisma.part.create({
        data: {
            name: name,
        },
    });
    res.status(200).json(result);
}
