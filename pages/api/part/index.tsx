import { Part } from "@prisma/client";

export default async function handler(req, res) {
    const { category } = req.body;
    const result: Part[] = await prisma.part.findMany({
        orderBy: {
            id: "asc",
        },
        include: {
            user: true,
        },
    });
    console.log(result);
    res.json(result);
}
