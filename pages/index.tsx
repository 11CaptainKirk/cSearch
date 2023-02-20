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
import Filter from "../components/Filter/Filter";

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
                <Filter />
                <CreateType />
                <CreatePart />
                <FileLoad />

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
