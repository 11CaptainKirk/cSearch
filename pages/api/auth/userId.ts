import { Part, User } from "@prisma/client";

export default async function handler(req, res) {
    const email = req.query["email"];
    console.log(email);
    const result: User = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    console.log(result);
    res.json(result);
}
