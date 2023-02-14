export default async function handler(req, res) {
    const { name } = req.body;
    const result = await prisma.componentType.create({
        data: {
            name: name,
        },
    });
    res.json(result);
}
