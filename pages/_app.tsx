import { SessionProvider } from "next-auth/react";

import { useState } from "react";
import NextApp, { AppProps, AppContext } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { MantineProvider, ColorScheme, ColorSchemeProvider, Global } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { SWRConfig } from "swr";
import { useColorScheme } from "@mantine/hooks";
import { RouterTransition } from "../components/Loading/RouterTransision";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const { Component, pageProps } = props;
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
        setColorScheme(nextColorScheme);
        setCookie("mantine-color-scheme", nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
    };

    return (
        <>
            <Head>
                <title>JLC Search</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="shortcut icon" href="/favicon.svg" />
            </Head>

            <SWRConfig
                value={{
                    // @ts-expect-error
                    fetcher: (...args) => fetch(...args).then((res) => res.json()), // second ...args causes error

                }}>
                <SessionProvider session={pageProps.session}>
                    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                            <NotificationsProvider>
                                <RouterTransition />
                                <Component {...pageProps} />
                                <Global
                                    styles={(theme) => ({
                                        "*, *::before, *::after": {
                                            boxSizing: "border-box",
                                        },

                                        body: {
                                            overflow: "hidden",
                                        },
                                    })}
                                />
                            </NotificationsProvider>
                        </MantineProvider>
                    </ColorSchemeProvider>
                </SessionProvider>
            </SWRConfig>
        </>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const appProps = await NextApp.getInitialProps(appContext);
    return {
        ...appProps,
        colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
    };
};
