import { GetStaticProps } from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { Button, Text, Title } from "@mantine/core";

const PartCrud = ({ parts }) => {
    const x = parts.map((part) => <Title>{part.name}</Title>);
    return (
        <>
            <Link href={"/"}>
                <Button>Back</Button>
            </Link>
            {x}
        </>
    );
};

export default PartCrud;
