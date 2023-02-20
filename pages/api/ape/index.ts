import { Part } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
    const numResults = req.query["number"];
    const order = req.query["order"];
    //console.log(number);
    const result: Part[] = await prisma.part.findMany();
    res.json(result);
}
