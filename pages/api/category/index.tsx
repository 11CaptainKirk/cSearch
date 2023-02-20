export default async function handler(req, res) {
    if (req.method === "GET") {
        const result = await prisma.componentType.findMany();
        res.json(result);
    } else if (req.method === "POST") {
        const { name } = req.body;
        const result = await prisma.componentType.create({
            data: {
                name: name,
            },
        });
        res.json(result);
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
