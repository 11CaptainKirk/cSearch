import { ActionIcon, Text, Center, Menu, useMantineTheme, ScrollArea, Select, Space } from "@mantine/core";
import { IconBook, IconBookDownload, IconCopy, IconHeart, IconPencil, IconTrash } from "@tabler/icons";

export default function AddLibrary({ partName }) {
    const theme = useMantineTheme();
    return (
        <Menu shadow="md" width={250} withArrow>
            <Menu.Target>
                <ActionIcon color={"blue"}>
                    <IconBookDownload />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>
                    <Center>
                        <Text span tt="uppercase" size="xs" weight={600} color={theme.colors.blue[4]}>
                            {partName}
                        </Text>
                    </Center>
                </Menu.Label>
                <Select
                    searchable
                    creatable
                    label="Add to Library"
                    maxDropdownHeight={280}
                    placeholder="Select library"
                    icon={<IconBook size={14} />}
                    sx={{ margin: 10 }}
                    nothingFound="No frameworks found"
                    data={[
                        { value: "react", label: "React" },
                        { value: "ng", label: "Angular" },
                        { value: "svelte", label: "Svelte" },
                        { value: "vue", label: "Vue" },
                    ]}
                />
            </Menu.Dropdown>
        </Menu>
    );
}
