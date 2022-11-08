import Head from "next/head";
import useSWR from "swr";
import Header from "../components/Header";
import Layout from "../components/Layout";
import fetcher from "../utils/fetcher";
import YouTube from "react-youtube";
import { opts } from "../utils/yt";
import { useEffect, useState } from "react";
import classNames from "classnames";

export default function Track({ id }) {
  const { data } = useSWR("/tracks.json", fetcher);
  const { data: video } = useSWR(
    () =>
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${
        data.find((v) => v.id === id).video
      }`,
    fetcher
  );

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!data) {
    return "Загрузка...";
  }

  return (
    <>
      <Head>
        <title>{video ? video.title + " - " : ""}YouBeat</title>
      </Head>
      <Header />
      <Layout>
        {mount && (
          <YouTube
            iframeClassName={classNames({
              "w-full aspect-video rounded-2xl": mount,
            })}
            videoId={data.find((v) => v.id === id).video}
            opts={opts}
          />
        )}
        <div className="flex">
          <button className="font-bold select-none text-xl text-black bg-red-500 w-full">
            D
          </button>
          <button className="font-bold select-none text-xl text-black bg-yellow-500 w-full">
            F
          </button>
          <button className="font-bold select-none text-xl text-black bg-green-500 w-full">
            J
          </button>
          <button className="font-bold select-none text-xl text-black bg-blue-500 w-full">
            K
          </button>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  return {
    props: { id },
  };
}
