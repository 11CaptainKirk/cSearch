export default async function handler(req, res) {
    const userId = req.query.id;
    const result = await prisma.library.findFirst({
        where: {
            userId: userId,
            name: "Favorites",
        },
        include: {
            parts: true,
        },
    });
    console.log(result);
    res.json(result);
}
