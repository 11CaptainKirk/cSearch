import { Part } from "@prisma/client";

export default async function handler(req, res) {
    const numResults = req.query["number"];
    const order = req.query["order"];
    //console.log(number);
    const result: Part[] = await prisma.part.findMany({
        take: Number(numResults),
        orderBy: {
            rank: "desc",
            //quantity: "desc",
        },
        include: {
            user: true,
        },
    });
    console.log(result);
    res.json(result);
}
