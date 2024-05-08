"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { ImageIcon, ImageOff, Notebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { createPost } from "@/app/action";

const rules = [
  {
    id: 1,
    text: "Drink Water",
  },
  {
    id: 2,
    text: "Take bath",
  },
  {
    id: 3,
    text: "Eat Food",
  },
  {
    id: 4,
    text: "Exercise Daily",
  },
  {
    id: 5,
    text: "Sleep Well",
  },
];

export default function CreatePostPage({ params }: { params: { id: string } }) {
  const [imageURL, setImageURL] = useState<null | string>(null);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [title, setTitle] = useState<null | string>(null);

  const createPostReddit = createPost.bind(null, { jsonContent: json });

  return (
    <div className="max-w-[1000px] flex mx-auto gap-x-10 mt-4">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1 className="font-semibold">
          Subreddit:{" "}
          <Link className="text-primary" href={`/r/${params.id}`}>
            {params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              <Notebook className="w-4 h-4 mr-2" />
              Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <ImageIcon className="w-4 h-4 mr-2" />
              Media
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostReddit}>
                <input
                  type="hidden"
                  name="imageURL"
                  value={imageURL ?? undefined}
                />
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Input
                    required
                    name="title"
                    placeholder="Title"
                    value={title ?? undefined}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TipTapEditor setJson={setJson} json={json} />
                </CardHeader>
                <CardFooter>
                  <SubmitButtons text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {imageURL === null ? (
                  <UploadDropzone
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImageURL(res[0].url);
                    }}
                    onUploadError={(err: Error) => {
                      alert("Error");
                    }}
                  />
                ) : (
                  <Image
                    src={imageURL}
                    alt="ImageURL"
                    height={400}
                    width={500}
                    className="w-full h-80 object-contain rounded-lg"
                  />
                )}
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[35%]">
        <Card className="flex flex-col p-4">
          <div className="flex items-center gap-x-2">
            <Image src={pfp} alt="pfp" className="h-10 w-10" />
            <h1 className="font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-2" />

          <div className="flex flex-col gap-y-5 mt-5">
            {rules.map((item) => (
              <div key={item.id}>
                <p className="text-sm font-medium">
                  {item.id}. {item.text}
                </p>
                <Separator className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
