import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../public/banner.png";
import HelloImage from "../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "./components/CreatePost";
import prisma from "./lib/db";
import PostCard from "./components/PostCard";
import { Suspense } from "react";
import SuspenseCard from "./components/SuspenseCard";
import Pagination from "./components/Pagination";
import { unstable_noStore as noStore } from "next/cache";

async function getData(searchParam: string) {
  noStore();
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 7,
      skip: searchParam ? (Number(searchParam) - 1) * 7 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            username: true,
          },
        },
        subName: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return { count, data };
}

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="max-w-[1000px] mx-auto mt-4 flex gap-x-10 mb-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div>
        <Card>
          <Image src={Banner} alt="Banner image" />
          <div className="p-2">
            <div className="flex items-center">
              <Image
                src={HelloImage}
                alt="ImagePFP"
                className="h-16 w-10 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-muted-foreground text-sm p-2">
              Your Home Reddit frontpage. Come here to check in with your
              favorite communities!
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-y-3">
              <Button asChild>
                <Link href="/r/sameoldtreva/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
        <PostCard
          id={post.id}
          imageString={post.imageString}
          jsonContent={post.textContent}
          subName={post.subName as string}
          title={post.title}
          commentAmount={post.Comment.length}
          key={post.id}
          username={post.User?.username as string}
          voteCount={post.Vote.reduce((acc, vote) => {
            if (vote.voteType === "UP") return acc + 1;
            if (vote.voteType === "DOWN") return acc - 1;

            return acc;
          }, 0)}
        />
      ))}

      <Pagination totalPages={Math.ceil(count / 7)} />
    </>
  );
}
