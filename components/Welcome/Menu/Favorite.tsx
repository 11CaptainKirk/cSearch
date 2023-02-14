import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconHeart } from "@tabler/icons";

export default function Favorite({ favorite, setFavorite }) {
    const theme = useMantineTheme();
    let strokeColor = favorite ? theme.colors.red[5] : theme.colors.gray[4];
    let fillColor = favorite ? theme.colors.red[5] : "none";
    return (
        <ActionIcon color="red" onClick={() => setFavorite(!favorite)}>
            <IconHeart size={22} fill={fillColor} color={strokeColor} />
        </ActionIcon>
    );
}
