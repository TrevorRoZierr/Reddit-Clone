"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButtons } from "./SubmitButtons";
import { createComment } from "../action";
import { useRef } from "react";

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      className="mt-5"
      action={async (FormData) => {
        await createComment(FormData);
        ref.current?.reset();
      }}
      ref={ref}
    >
      <input type="hidden" name="postId" value={postId} />
      <Label>Comment below:</Label>
      <Textarea
        placeholder="What are your throughts?"
        className="w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButtons text="Comment" />
    </form>
  );
};

export default CommentForm;
