"use client";
import { useToast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

export default function CopyLink({ id }: { id: string }) {
  const { toast } = useToast();
  async function copyToClipboard() {
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: "Success",
      description: "Link copied to clipboard"
    });
  }

  return (
    <button className="flex items-center gap-x-1" onClick={copyToClipboard}>
      <Share className="w-4 h-4 text-muted-foreground" />
      <p className="text-muted-foreground text-xs font-medium">Share</p>
    </button>
  );
}
