import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import fetcher from "../utils/fetcher";

export default function Card({ v }) {
  const { data } = useSWR(
    `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${v.video}`,
    fetcher
  );

  if (!data) {
    return (
      <div>
        <div className="relative aspect-video bg-neutral-700"></div>
        <div className="mt-2 bg-neutral-700">&nbsp;</div>
        <div className="mb-4">&nbsp;</div>
      </div>
    );
  }

  return (
    <Link href={`/${v.id}`} className="block first:pt-0">
      <div className="relative aspect-video">
        <Image
          alt=""
          src={data.thumbnail_url}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mt-2">{data.title}</div>
      <div className="text-neutral-500 mb-4">{data.author_name}</div>
    </Link>
  );
}