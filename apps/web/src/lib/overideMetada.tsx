"use client"; // make this a client component

import Head from "next/head";

export default function UserHead({
  title,
  favicon,
}: {
  title: string;
  favicon: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={favicon} />
    </Head>
  );
}
