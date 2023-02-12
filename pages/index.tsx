import React from "react";
import type { GetServerSideProps } from "next";

import { Welcome } from "../components/Welcome/welcome";
import { ColorSchemeToggle } from "../components/ColorSchemeToggle/colorSchemeToggle";

export default function HomePage() {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
        </>
    );
}
