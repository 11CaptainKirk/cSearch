import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Box,
    Center,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    Title,
    Badge,
    useMantineTheme,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconCircuitResistor,
    IconCircuitCapacitor,
    IconCircuitDiode,
    IconTrafficLights,
    IconBulb,
    IconCircuitDiodeZener,
    IconCircuitInductor,
    IconCircuitChangeover,
    IconCircuitVoltmeter,
    IconMicrowave,
    IconSettings,
    IconStack,
} from "@tabler/icons";
import Link from "next/link";
import Login from "../Auth/Login";
import { ColorSchemeToggle } from "../ColorSchemeToggle/colorSchemeToggle";

const useStyles = createStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan("sm")]: {
            height: 42,
            display: "flex",
            alignItems: "center",
            width: "100%",
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        "&:active": theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: -theme.spacing.md,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
        paddingBottom: theme.spacing.xl,
        borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },
}));

const mockdata = [
    {
        icon: IconCircuitResistor,
        title: "Resistors",
        description: "Resistors of all types and sizes.",
    },
    {
        icon: IconCircuitCapacitor,
        title: "Capacitors",
        description: "Capacitors of all types and sizes.",
    },
    {
        icon: IconCircuitDiode,
        title: "Diodes",
        description: "Yep, we have diodes too.",
    },
    {
        icon: IconBulb,
        title: "LEDs",
        description: "No, they're not incandescent.",
    },
    {
        icon: IconCircuitDiodeZener,
        title: "Zener Diodes",
        description: "Wow, these are fancy.",
    },
    {
        icon: IconCircuitInductor,
        title: "Inductors",
        description: "Use them in power supplies or RF.",
    },
    {
        icon: IconMicrowave,
        title: "Microcontrollers",
        description: "The brains of the operation.",
    },
    {
        icon: IconMicrowave,
        title: "Flash Memory",
        description: "Pretty important, I'd say.",
    },
    {
        icon: IconMicrowave,
        title: "Crystal Oscillators",
        description: "Keep time.",
    },
    {
        icon: IconMicrowave,
        title: "Buck Converters",
        description: "You care about efficiency ;)",
    },
    {
        icon: IconMicrowave,
        title: "Linear Regulators",
        description: "Don't tell the last guy.",
    },
];

export default function HeaderCmp() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();
    const color = useMantineTheme();

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={30}>
            <Header height={45} px="md">
                <Group position="apart" sx={{ height: "100%" }}>
                    <Title variant="gradient" size={24} weight={900} gradient={{ from: theme.colors.blue[6], to: theme.colors.cyan[3], deg: 60 }}>
                        JLC Search
                    </Title>

                    <Group sx={{ height: "100%" }} spacing="sm" className={classes.hiddenMobile}>
                        <Link href="/part/1">
                            <Button variant="subtle" radius="lg" uppercase size="sm" leftIcon={<IconStack size={20} />}>
                                My Libraries
                            </Button>
                        </Link>

                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <Link href="/part/1">
                                    <Button variant="subtle" radius="lg" uppercase size="sm" leftIcon={<IconChevronDown size={20} />}>
                                        Categories
                                    </Button>
                                </Link>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                                <Group position="apart" px="md">
                                    <Text weight={500}>Recent Categories</Text>
                                    <Anchor href="#" size="xs">
                                        View all
                                    </Anchor>
                                </Group>

                                <Divider my="sm" mx="-md" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group position="apart">
                                        <div>
                                            <Text weight={500} size="sm">
                                                Get started
                                            </Text>
                                            <Text size="xs" color="dimmed">
                                                Their food sources have decreased, and their numbers
                                            </Text>
                                        </div>
                                        <Button variant="default">Get started</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <Link href="/part/1">
                            <Button variant="subtle" radius="lg" uppercase size="sm" leftIcon={<IconBulb size={18} />}>
                                Learn More
                            </Button>
                        </Link>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <ColorSchemeToggle />
                        <Login />
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer opened={drawerOpened} onClose={closeDrawer} size="100%" padding="md" title="Navigation" className={classes.hiddenDesktop} zIndex={1000000}>
                <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Features
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
