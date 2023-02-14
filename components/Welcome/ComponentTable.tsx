import useStyles from "./ComponentTable.styles";

import { Suspense, useEffect, useState } from "react";
import { createStyles, Table, ScrollArea, Center, CopyButton, Menu, Title, Text, Badge, Skeleton, Group } from "@mantine/core";
import Copy from "./Copy/Copy";
import MenuDots from "./Menu/MenuDots";
import { Part } from "@prisma/client";
import Favorite from "./Menu/Favorite";
import AddLibrary from "./Menu/AddLibrary";

function Row({ data, loading }) {
    // refactor this
    const [favorite, setFavorite] = useState(false);
    return (
        <tr>
            <td>
                <Skeleton visible={loading} radius="lg">
                    <Text weight={600} size="lg">
                        {data.name}
                    </Text>
                </Skeleton>
            </td>
            <td>
                <Skeleton visible={loading} radius="lg" width={200}>
                    <Copy copyText={data.name}>{data.name}</Copy>
                </Skeleton>
            </td>
            <td>
                <Skeleton visible={loading} radius="lg" width={80}>
                    <Badge fullWidth variant="outline" size="lg" color={data.quantity > 500 ? "green" : data.quantity > 50 ? "yellow" : "red"}>
                        {data.quantity != undefined ? data.quantity : "?"}
                    </Badge>
                </Skeleton>
            </td>
            <td>
                <Skeleton visible={loading} radius="lg">
                    {data.componentRank}
                </Skeleton>
            </td>
            <td>
                <Group style={{ justifyContent: "end" }}>
                    <AddLibrary partName={data.name} />
                    <Favorite favorite={favorite} setFavorite={(fav) => setFavorite(fav)} />
                    <MenuDots partName={data.name} partCreator={data?.user?.name} editDate={data?.dateAdded} />
                </Group>
            </td>
        </tr>
    );
}

export function ComponentTable({ data }) {
    const [loading, setLoading] = useState(true);
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const rows = data != undefined ? data.map((item: Part) => <Row key={item.id} data={item} loading={loading} />) : null;

    useEffect(() => {
        if (data != undefined) {
            setLoading(false);
        }
    }, [data]);

    return (
        <ScrollArea style={{ height: "70vh", overscrollBehavior: "none" }}>
            <Center>
                <Table sx={{ minWidth: 700, maxWidth: 1200 }}>
                    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                        <tr>
                            <th>Name</th>
                            <th>Part #</th>
                            <th>Stock</th>
                            <th>Index</th>
                            <th> </th>
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>
                </Table>
            </Center>
        </ScrollArea>
    );
}
