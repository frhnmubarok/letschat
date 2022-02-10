/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript, Title } from "next/document";
import { CssBaseline } from "@nextui-org/react";

export default function Document() {
  return (
    <Html className="bg-slate-100">
      <Head>
        {CssBaseline.flush()}
        <title>LetsChat</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
