import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { CopyButton, Tooltip, ActionIcon, Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck } from "@tabler/icons";

export default function Copy({ children, id }) {
    const clipboard = useClipboard();
    return (
        <Button
            variant="light"
            fullWidth
            rightIcon={clipboard.copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
            radius="xl"
            size="md"
            styles={{
                root: { height: 28 },
            }}
            onClick={async () => {
                clipboard.copy(children);
                const res = await fetch("/api/part/rank", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: id,
                    }),
                });
            }}>
            {children}
        </Button>
    );
}
