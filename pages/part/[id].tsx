import type { GetServerSideProps, GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import { Button, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";
// index.tsx

export async function getStaticPaths() {
    const parts = await prisma.part.findMany({
        select: {
            id: true,
        },
    });
    const paths = parts.map((part) => ({
        params: { id: part.id.toString() },
    }));
    return {
        paths: paths,
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const pid = context.params.id;
    const part = await prisma.part.findUnique({
        where: {
            id: Number(pid),
        },
        select: {
            id: true,
            name: true,
        },
    });
    return {
        props: { part },
        revalidate: 20,
    };
};

function Loading() {
    return <div>Loading ...</div>;
}

const Post = ({ part }) => {
    /*const { data: session, status } = useSession();
    if (status === "loading") {
        return <div>Authenticating ...</div>;
    }*/
    //const userHasValidSession = Boolean(session);
    //const postBelongsToUser = session?.user?.email === props.author?.email;
    return (
        <>
            <Link href={"/"}>
                <Button>Return Home</Button>
            </Link>
            <Link href={"/part/" + (part.id - 1 || 1)}>
                <Button>Back</Button>
            </Link>
            <Link href={"/part/" + (part.id + 1)}>
                <Button>Next</Button>
            </Link>
            <Title>{part.name}</Title>
            <Text>id: {part.id}</Text>
        </>
    );
};

export default Post;
