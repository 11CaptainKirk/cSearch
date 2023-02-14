import { ActionIcon, Badge, Button, Center, Chip, Flex, Group, Menu, Space, Stack, Text, useMantineTheme } from "@mantine/core";
import dateFormat from "dateformat";
import {
    IconDots,
    IconSettings,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconArrowsLeftRight,
    IconTrash,
    IconCopy,
    IconPencil,
    IconHeart,
    IconBook,
    IconEdit,
    IconNewSection,
} from "@tabler/icons";

export default function MenuDots({ partName, partCreator, editDate }) {
    const theme = useMantineTheme();
    return (
        <Menu shadow="md" width={250}>
            <Menu.Target>
                <ActionIcon color={"blue"}>
                    <IconDots />
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
                <Space h="sm" />
                <Stack spacing="xs" align="flex-start" sx={{ marginLeft: 10 }}>
                    <Badge
                        leftSection={
                            <Center>
                                <IconNewSection size={14} />{" "}
                            </Center>
                        }
                        color="blue">
                        {partCreator}
                    </Badge>
                    <Badge
                        leftSection={
                            <Center>
                                <IconEdit size={14} />
                            </Center>
                        }
                        color="blue">
                        {dateFormat(editDate, "mm/dd/yy hh:MM TT")}
                    </Badge>
                </Stack>
                <Space h="sm" />
                <Menu.Divider />
                <Menu.Item icon={<IconHeart size={14} />}>Favorite</Menu.Item>
                <Menu.Item icon={<IconBook size={14} />}>Add to Library</Menu.Item>
                <Menu.Item icon={<IconPencil size={14} />}>Edit Part</Menu.Item>
                <Menu.Item icon={<IconCopy size={14} />}>Duplicate Part</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" icon={<IconTrash size={14} />}>
                    Delete part
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
