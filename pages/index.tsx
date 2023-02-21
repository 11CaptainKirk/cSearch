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
import Data from "../components/Data/Data";

export default function HomePage() {
    //console.log(data);
    return (
        <Box sx={{ overflow: "hidden" }}>
            <HeaderCmp />
            <Data />
        </Box>
    );
}
