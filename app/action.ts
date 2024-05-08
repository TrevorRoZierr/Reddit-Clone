"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const username = formData.get("username") as string;

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: username,
      },
    });

    return {
      message: "Successfully updated name...",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Username already exists in the database",
          status: "error",
        };
      }
    }
    throw e;
  }
}

export async function createCommunity(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const name = formData.get("name") as string;

  try {
    const data = await prisma.subreddit.create({
      data: {
        name: name,
        userId: user.id,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This name is already taken",
          status: "error",
        };
      }
    }
    throw e;
  }

  return redirect("/");
}

export async function updatedDesription(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const subName = formData.get("subName") as string;
    const description = formData.get("description") as string;

    await prisma.subreddit.update({
      where: {
        name: subName,
      },
      data: {
        description: description,
      },
    });

    return {
      message: "Successfully updated the description!",
      status: "green",
    };
  } catch (e) {
    return {
      message: "Failed to update the description",
      status: "error",
    };
  }
}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const title = formData.get("title") as string;
  const subName = formData.get("subName") as string;
  const imageURL = formData.get("imageURL") as string | null;

  await prisma.post.create({
    data: {
      title: title,
      imageString: imageURL ?? undefined,
      subName: subName,
      userId: user.id,
      textContent: jsonContent ?? undefined,
    },
  });

  return redirect("/");
}

export async function handleVote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as TypeOfVote;

  const vote = await prisma.vote.findFirst({
    where: {
      postId: postId,
      userId: user.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });

      return revalidatePath("/");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });

      return revalidatePath("/");
    }
  }

  await prisma.vote.create({
    data: {
      voteType: voteDirection,
      userId: user.id,
      postId: postId,
    },
  });

  return revalidatePath("/");
}

export async function createComment(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const comment = formData.get("comment") as string;
  const postId = formData.get("postId") as string;

  const data = await prisma.comment.create({
    data: {
      text: comment,
      userId: user.id,
      postId: postId,
    },
  });

  revalidatePath(`post/${postId}`);
}
