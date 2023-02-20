import useStyles from "./ComponentTable.styles";
import { useSession } from "next-auth/react";

import styled from "@emotion/styled";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import {
    createStyles,
    Table,
    ScrollArea,
    Center,
    CopyButton,
    Menu,
    Title,
    Text,
    Badge,
    Skeleton,
    Group,
    Loader,
    Flex,
    Space,
    Box,
    Grid,
    SimpleGrid,
    Divider,
    Stack,
    Card,
} from "@mantine/core";
import Copy from "./Copy/Copy";
import MenuDots from "./Menu/MenuDots";
import { Library, Part } from "@prisma/client";
import Favorite from "./Menu/Favorite";
import AddLibrary from "./Menu/AddLibrary";
import DownloadPart from "./Menu/DownloadPart";
import useSwr from "swr";
import Filter from "../Filter/Filter";
import { useTimeout } from "@mantine/hooks";

const CardFancy = styled.div`
    margin-right: auto;
    margin-left: auto;
    box-shadow: 0 5px 10px rgba(20, 20, 20, 0.075);
    border-radius: 20px;
    width: 85%;
    padding: 10px 20px;
    backdrop-filter: blur(12px);
    ${/* @ts-ignore*/ false};
    background-color: ${({ theme }) => (theme.colorScheme === "dark" ? "rgba(40, 50, 60, 0.2)" : "rgba(240, 245, 250, 0.3)")};
  }
     ;
`;

const fetcherWithArgs = ({ url, args }) => fetch(url, args).then((res) => res.json().catch((err) => console.error(err))); // second ...args causes error

function Row({ data, loading, favorite }: { data: Part | any; loading: boolean; favorite: any }) {
    const PartImage = styled(Image)({
        borderRadius: 10,
        transition: "all 0.3s ease-in-out",
        margin: -0,
        filter: "invert(0)",
        "&:hover": {
            transform: "scale(3) translate(10px, 20px)",
            transition: "all 0.3s ease-in-out",
        },
    });

    // refactor this
    let thisPartisFavorite = false;
    useEffect(() => {
        thisPartisFavorite = favorite?.parts.find((x: Part) => x.id == data.id);
        setFavorite(thisPartisFavorite);
    }, [favorite]);

    const [isFavorite, setFavorite] = useState(thisPartisFavorite);
    let colorX = "gray";
    let stockLoading = false;
    colorX = data.quantity == undefined ? "gray" : data.quantity > 500 ? "green" : data.quantity > 100 ? "yellow" : data.quantity > 10 ? "orange" : "red";
    stockLoading = data.quantity < 300 ? true : false; // temporary for testing !WOW

    console.log(data.imageURL);
    return (
        <Grid columns={20} grow gutter={15}>
            <Grid.Col span={2}>
                <Skeleton visible={loading} p={5} radius="md">
                    <Box sx={{ margin: -10 }}>
                        {data != undefined ? (
                            <PartImage
                                src={data?.imageURL || "https://assets.lcsc.com/images/lcsc/900x900/20180914_MDD-Microdiode-Electronics--MB10S_C2488_front.jpg"}
                                width={80}
                                height={80}
                                alt={"wow"}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </Box>
                </Skeleton>
            </Grid.Col>
            <Grid.Col span={5}>
                <Skeleton visible={loading} p={5} radius="md">
                    <Text weight={600} size="lg" color="dark-gray">
                        {data.name != undefined ? data.name : "Loading..."}
                    </Text>
                </Skeleton>
            </Grid.Col>
            <Grid.Col span={2}>
                <Skeleton visible={loading} radius="md" p={5} width={"100%"}>
                    <Copy id={data.id}>
                        <Text>{data.JLCPartNumber}</Text>
                    </Copy>
                </Skeleton>
            </Grid.Col>
            <Grid.Col span={1}>
                <Skeleton visible={loading} radius="md" p={5} width={90}>
                    <Flex direction="row">
                        <Text size="md" weight={800} color={colorX}>
                            {data.quantity != undefined ? data.quantity : "?"}
                        </Text>
                        <Space w="xs" />
                        <Center>{stockLoading && <Loader variant="oval" color={colorX} size={13} />}</Center>
                    </Flex>
                </Skeleton>
            </Grid.Col>

            <Grid.Col span={2}>
                <Skeleton visible={loading} radius="md" p={5} width={60}>
                    <Text>{data.packageType != undefined ? data.packageType : "Loading..."}</Text>
                </Skeleton>
            </Grid.Col>
            <Grid.Col span={3}>
                <Group style={{ justifyContent: "end" }}>
                    <DownloadPart />
                    <AddLibrary partName={data.name} />
                    <Favorite
                        favorite={isFavorite}
                        setFavorite={async (fav) => {
                            setFavorite(fav);
                            const res = await fetch(`/api/library/favorite/`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    userId: "cle2h78am000inqd6ery6eick",
                                    isFavorite: fav,
                                    partId: data.id,
                                }),
                            });
                            console.log(res);
                        }}
                    />
                    <MenuDots partName={data.name} partCreator={data?.user?.name} editDate={data?.dateAdded} />
                </Group>
            </Grid.Col>
        </Grid>
    );
}

function TableHead() {
    return (
        <Box sx={{ width: "100%" }}>
            <CardFancy>
                <Center>
                    <Grid columns={18} sx={{ width: "100%", padding: 10 }} grow gutter={15}>
                        <Grid.Col span={2}>
                            <Box>
                                <Title order={4} color="blue">
                                    Image
                                </Title>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <Box>
                                <Title order={4} color="blue">
                                    Name
                                </Title>
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Title order={4} color="blue">
                                JLC Part #
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Title order={4} color="blue">
                                Stock
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Title order={4} color="blue">
                                Package
                            </Title>
                        </Grid.Col>
                        <Grid.Col span={3}>
                            <Title align="end" order={4}></Title>
                        </Grid.Col>
                    </Grid>
                </Center>
            </CardFancy>
        </Box>
    );
}

export function ComponentTable({ data }) {
    const { data: session } = useSession();
    const user = useSwr(`/api/auth/userId?email=${session?.user.email}`);

    const favoriteData = useSwr(`/api/library/favorite/${user.data?.id}`);
    //console.log(favoriteData.data);
    const [loading, setLoading] = useState(true);
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    let rows = null;
    rows =
        data != undefined
            ? data.map((item: Part) => (
                  <Flex key={item.id} direction="column" sx={{ width: "100%" }}>
                      <Row key={item.id} data={item} loading={loading} favorite={favoriteData.data} />
                      <Space h="xs" />
                      <Divider />
                      <Space h="xs" />
                  </Flex>
              ))
            : null;
    useEffect(() => {
        if (data != undefined) {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
    }, [data]);

    return (
        <>
            <Flex direction="column" sx={{ width: "100%" }}>
                <Flex sx={{ position: "relative", top: 50, zIndex: 10 }}>
                    <TableHead />
                </Flex>
                <ScrollArea style={{ height: "60vh", overscrollBehavior: "none" }}>
                    <Space h="xl" />
                    <Space h="xl" />
                    <Space h="xl" />

                    <Center>
                        <Flex direction="column" sx={{ width: "80%" }}>
                            {rows}
                        </Flex>
                    </Center>
                </ScrollArea>
            </Flex>
        </>
    );
}
