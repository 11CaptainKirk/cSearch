import { Button, TextInput, Card, Center, Space, Modal, Flex, Select, ActionIcon, Tooltip } from "@mantine/core";
import { GetServerSideProps } from "next";
import { Part } from "@prisma/client";
import { useForm } from "@mantine/form";

import { Suspense, useEffect, useState } from "react";
import { IconHash, IconPlus } from "@tabler/icons";
import useSWR from "swr";
import { ComponentType } from "@prisma/client";
import { getServerSideProps } from "../../../pages/drafts";

function sendPart(part: String, componentTypeId: Number) {
    fetch("/api/create/part", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            partNumber: part,
            componentTypeId: componentTypeId,
        }),
    });
}

export default function CreatePart() {
    const { data, error, isLoading } = useSWR("/api/category", { refreshInterval: 100000 });
    let parsedData = [{ value: "JOE", label: "BILL" }];
    parsedData = data?.map((item) => {
        return { value: String(item.id), label: item.name };
    });
    console.log(parsedData);

    /*const data = [
        { value: "Resistor", label: "Resistor" },
        { value: "Capacitor", label: "Capacitor" },
        { value: "Inductor", label: "Inductor" },
        { value: "Diode", label: "Diode" },
    ];*/
    //console.log(data);
    const form = useForm({
        initialValues: {
            partNum: "",
            categoryId: "",
        },

        validate: {
            partNum: (value) => (value.length < 1 ? "Invalid input" : null),
            categoryId: (value) => null,
        },
    });

    //const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    return (
        <>
            <Center>
                <Tooltip label="Create Part" position="top" color="blue" withArrow>
                    <ActionIcon variant="outline" radius="lg" size="xl" color="blue" onClick={() => setOpen(true)}>
                        <IconPlus />
                    </ActionIcon>
                </Tooltip>
            </Center>
            <Modal
                title="Create Part"
                centered
                overlayBlur={5}
                overlayOpacity={0.3}
                radius="lg"
                opened={open}
                onClose={() => {
                    setOpen(false);
                }}>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Flex direction="column" gap="md">
                        {
                            <Select
                                data={parsedData}
                                searchable
                                creatable
                                placeholder="Select a Category"
                                getCreateLabel={(query) => `+ Create ${query}`}
                                {...form.getInputProps("categoryId")}
                                onCreate={async (query) => {
                                    let res = await fetch("/api/category", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            name: query,
                                        }),
                                    });
                                    console.log(res);
                                    parsedData.push({ value: "2", label: query });
                                }}
                            />
                        }
                        <TextInput withAsterisk label="JLC Part #" placeholder="C1010101" {...form.getInputProps("partNum")} icon={<IconHash size={14} />} />
                        <Space h="md" />
                    </Flex>
                    <Center>
                        <Button type="submit" variant="outline" onClick={() => sendPart(form.values.partNum, Number(form.values.categoryId))}>
                            Create Part
                        </Button>
                    </Center>
                </form>
            </Modal>
        </>
    );
}
