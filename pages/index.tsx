import React, { Suspense, useEffect } from "react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Button, Box, Grid, Flex, Space, Text } from "@mantine/core";
import { ComponentTable } from "../components/Welcome/ComponentTable";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/colorSchemeToggle";
import Link from "next/link";
import Login from "../components/Auth/Login";
import CreateType from "../components/createType/CreateType";
import useSwr from "swr";
import CreatePart from "../components/Welcome/CreatePart/CreatePart";
import { Part } from "@prisma/client";
import HeaderCmp from "../components/Header/HeaderCmp";
import FileLoad from "../components/FileLoad/FileLoad";

const preData = [];
for (let i = 0; i < 100; i++) {
    preData.push({});
}

export default function HomePage() {
    let retData;
    let numResults = 30;
    const { data, error, isLoading } = useSwr(`/api/part?number=${numResults}`, { refreshInterval: 1000 });
    retData = data;
    //console.log(data);
    return (
        <Box sx={{ overflow: "hidden" }}>
            <HeaderCmp />

            <Flex justify="center" direction="row" gap="xl">
                <CreateType />
                <CreatePart />
                <FileLoad />

                <Box
                    component="a"
                    sx={{
                        color: "white",
                        height: 50,
                        fontSize: 0.01,
                        margin: -12,
                        transition: "all 0.3s ease-in-out",
                        ":hover": {
                            color: "red",
                            fontSize: 80,
                            transition: "all 0.3s ease-in-out",
                        },
                    }}
                    href="https://www.youtube.com/watch?v=3aR993bmzIY"
                    target="_Blank">
                    Super Secret Button
                </Box>

                <Link href={"/part/1"}>
                    <Button>Test</Button>
                </Link>
            </Flex>
            <Space h="xl" />
            <ComponentTable data={retData != undefined ? retData : preData} />
            <Button
                onClick={() => {
                    numResults += 10;
                }}>
                More Options
            </Button>
            <Box sx={{ height: 100 }} />
        </Box>
    );
}
