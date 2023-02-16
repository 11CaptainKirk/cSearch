import { Part } from "@prisma/client";
import prisma from "../../../lib/prisma";
import JLC_Catalog from "../Data/JLC_Catalog.json";

export default async function handler(req, res) {
    const partNumber = req.query["partNumber"];
    let partName = "Not Found";
    // @ts-expect-error
    JLC_Catalog.forEach((part) => {
        if (part["Part #"] === partNumber) {
            partName = part["Comment"];
            return;
        }
    });
    if (req.method === "GET") {
        const result = await prisma.part.create({
            data: {
                JLCPartNumber: partNumber,
                name: partName,
            },
        });
        console.log(result);
        res.json(result);
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
