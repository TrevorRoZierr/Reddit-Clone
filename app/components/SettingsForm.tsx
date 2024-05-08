"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { updateUsername } from "../action";
import { SubmitButtons } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const initialState = {
  message: "",
  status: "",
};

export function SettingsForm({
  username,
}: {
  username: string | null | undefined;
}) {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Successful :)",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error :(",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <h1 className="tracking-tight font-extrabold text-3xl">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground">
        In this setting page you can change your username
      </p>
      <Input
        name="username"
        defaultValue={username ?? undefined}
        required
        min={2}
        maxLength={21}
        className="mt-2"
      />

      {state?.status === "error" ?? (
        <p className="text-red-500 mt-1">This username is already taken</p>
      )}

      <div className="w-full flex mt-5 gap-x-5 justify-end">
        <Button variant="secondary" asChild type="button">
          <Link href="/">Cancel</Link>
        </Button>
        <SubmitButtons text="Change Username" />
      </div>
    </form>
  );
}
