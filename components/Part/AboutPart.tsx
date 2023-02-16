import { GetStaticProps } from "next";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { Button, Text, Title } from "@mantine/core";

export const getStaticProps: GetStaticProps = async () => {
    const parts = await prisma.part.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return {
        props: { parts },
        revalidate: 20,
    };
};

function Loading() {
    return <div>Loading ...</div>;
}

const AboutPart = ({ parts }) => {
    /*const { data: session, status } = useSession();
    if (status === "loading") {
        return <div>Authenticating ...</div>;
    }*/
    //const userHasValidSession = Boolean(session);
    //const postBelongsToUser = session?.user?.email === props.author?.email;
    //console.log(parts[0].name);
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

export default AboutPart;
