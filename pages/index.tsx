import React, { Suspense, useEffect } from "react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Button, Box, Grid, Flex, Space } from "@mantine/core";
import { ComponentTable } from "../components/Welcome/ComponentTable";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/colorSchemeToggle";
import Link from "next/link";
import Login from "../components/Auth/Login";
import CreateType from "../components/createType/CreateType";
import useSwr from "swr";
import CreatePart from "../components/Welcome/CreatePart/CreatePart";
import { Part } from "@prisma/client";
import HeaderCmp from "../components/Header/HeaderCmp";

const preData = [];
for (let i = 0; i < 100; i++) {
    preData.push({});
}

export default function HomePage() {
    const { data, error, isLoading } = useSwr("/api/part", { refreshInterval: 100000 });

    console.log(data);
    return (
        <Box sx={{ overflow: "hidden" }}>
            <HeaderCmp />

            <Flex justify="center" direction="row" gap="xl">
                <CreateType />
                <CreatePart />

                <Link href={"/part/1"}>
                    <Button>Test</Button>
                </Link>
            </Flex>
            <Space h="xl" />
            <ComponentTable data={data != undefined ? data : preData} />
            <Box sx={{ height: 100 }} />
        </Box>
    );
}
