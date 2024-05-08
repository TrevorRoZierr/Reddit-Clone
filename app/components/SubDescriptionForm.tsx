"use client";

import { Textarea } from "@/components/ui/textarea";
import { updatedDesription } from "../action";
import { SaveButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface SubDescription {
  subName: string;
  description: string | null | undefined;
}

const initialState = {
  message: "",
  status: "",
};

export function SubDescriptionForm({ subName, description }: SubDescription) {
  const [state, formAction] = useFormState(updatedDesription, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "green") {
      toast({
        title: "Success",
        description: state.message,
      });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form className="mt-3" action={formAction}>
      <input type="hidden" name="subName" value={subName} />
      <Textarea
        placeholder="Enter the description for your subreddit"
        maxLength={120}
        name="description"
        defaultValue={description ?? undefined}
      />
      <SaveButton />
    </form>
  );
}
