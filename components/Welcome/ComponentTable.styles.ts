import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
    header: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        transition: "box-shadow 150ms ease",

        "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));
