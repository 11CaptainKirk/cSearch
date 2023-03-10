import { Part } from "@prisma/client";

export default async function handler(req, res) {
    const { id } = req.body;
    const result = await prisma.part.update({
        where: {
            id: Number(id),
        },
        data: {
            rank: {
                increment: 1,
            },
        },
    });
    console.log(result);
    res.json(result);
}
