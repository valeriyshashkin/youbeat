import Layout from "../components/Layout";
import Header from "../components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>YouBeat</title>
      </Head>
      <Header home />
      <Layout>Привет мир</Layout>
    </>
  );
}
