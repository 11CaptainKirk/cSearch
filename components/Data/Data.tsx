import React, { useState, useEffect, useContext, useReducer } from "react";
import { Box, Flex, Button, Space } from "@mantine/core";
import { ComponentTable } from "../Welcome/ComponentTable";
import Link from "next/link";
import Login from "../Auth/Login";
import CreateType from "../createType/CreateType";
import useSwr from "swr";
import CreatePart from "../Welcome/CreatePart/CreatePart";
import { Part } from "@prisma/client";
import HeaderCmp from "../Header/HeaderCmp";
import FileLoad from "../FileLoad/FileLoad";
import Filter from "../Filter/Filter";

const preData = [];
for (let i = 0; i < 100; i++) {
    preData.push({});
}

export default function Data() {
    let retData;
    const [numResults, setNumResults] = React.useState(5);
    const { data, error, isLoading } = useSwr(`/api/part?number=${numResults}`);
    retData = data;
    return (
        <Box sx={{ overflow: "hidden" }}>
            <Flex justify="center" direction="row" gap="xl">
                <Filter category="resistor" />
                <CreateType />
                <CreatePart />
                <FileLoad />

                <Link href={"/part/1"}>
                    <Button>Test</Button>
                </Link>
            </Flex>
            <Space h="xl" />
            <ComponentTable data={retData != undefined ? retData : preData} isLoading={isLoading} />
            <Button
                onClick={() => {
                    setNumResults(numResults + 5);
                }}>
                More Options
            </Button>
            <Box sx={{ height: 100 }} />
        </Box>
    );
}
