import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { CopyButton, Tooltip, ActionIcon, Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck } from "@tabler/icons";

export default function Copy({ children, copyText }) {
    const clipboard = useClipboard();
    return (
        <Button
            variant="light"
            fullWidth
            rightIcon={clipboard.copied ? <IconCheck size={20} stroke={1.5} /> : <IconCopy size={20} stroke={1.5} />}
            radius="xl"
            size="md"
            styles={{
                root: { paddingRight: 14, height: 28 },
                rightIcon: { marginLeft: 22 },
            }}
            onClick={() => clipboard.copy(children)}>
            {children}
        </Button>
    );
}
