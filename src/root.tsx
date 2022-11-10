// @refresh reload
// import { Routes } from "@solidjs/router";
import { Suspense } from "solid-js";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Html, Body, FileRoutes, Routes, Head, Meta, Scripts, Title, Link } from "solid-start";
import App from "./App";

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>Solid Experience</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta name="theme-color" content="#000000"/>
                <Link rel="shortcut icon" type="image/ico" href="/src/assets/favicon.ico"/>
            </Head>
            <Body>
                <ErrorBoundary>
                    <Suspense>
                        <Routes>
                            <FileRoutes />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
                <Scripts />
            </Body>
        </Html>
    );
}
