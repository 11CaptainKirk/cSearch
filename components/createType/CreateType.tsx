import { Button, TextInput, Card, Center, Space } from "@mantine/core";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { useState } from "react";
import { IconHash } from "@tabler/icons";
export default function CreateType() {
    const [value, setValue] = useState("");
    return (
        <>
            <Center>
                <Card shadow="sm" radius="lg" sx={{ maxWidth: 300 }}>
                    <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} icon={<IconHash size={14} />} placeholder="Part Number" />
                    <Space h="md" />
                    <Center>
                        <Button
                            onClick={() => {
                                fetch("/api/category", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        name: value,
                                    }),
                                });
                            }}>
                            CreateType
                        </Button>
                    </Center>
                </Card>
            </Center>
        </>
    );
}
