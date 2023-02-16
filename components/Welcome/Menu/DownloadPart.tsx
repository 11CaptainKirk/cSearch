import { ActionIcon, useMantineTheme } from "@mantine/core";
import { IconDownload } from "@tabler/icons";

export default function DownloadPart({}) {
    return (
        <ActionIcon color="grey" onClick={() => {}}>
            <IconDownload size={22} />
        </ActionIcon>
    );
}
