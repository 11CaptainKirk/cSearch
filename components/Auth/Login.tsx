import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Title, Text, UnstyledButton, Box, Badge, Flex, Spoiler, Loader, Center } from "@mantine/core";

export default function Login() {
    const { data: session, status } = useSession();

    return (
        <Box>
            <Flex justify={"end"}>
                {status === "loading" && (
                    <Box style={{ width: 150 }}>
                        <Center>
                            <Loader scale="xl" variant="dots" />
                        </Center>
                    </Box>
                )}
                {status === "unauthenticated" && (
                    <UnstyledButton onClick={() => signIn()}>
                        <Badge style={{ width: 150 }} variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }} size="lg">
                            SIGN IN
                        </Badge>
                    </UnstyledButton>
                )}
                {status === "authenticated" && (
                    <>
                        <UnstyledButton onClick={() => signOut()}>
                            <Badge
                                sx={{
                                    width: 150,
                                }}
                                variant="gradient"
                                size="lg">
                                {session.user.name}
                            </Badge>
                        </UnstyledButton>
                    </>
                )}
            </Flex>
        </Box>
    );
}
