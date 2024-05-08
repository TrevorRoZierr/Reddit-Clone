import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1000px] mx-auto mt-4 mb-10 gap-x-10 flex">
      <div className="w-[65%] flex flex-col gap-y-5">
        <Skeleton className="w-full h-[1000px] border" />
      </div>
      <div className="w-[35%]">
        <Skeleton className="w-full h-[300px] border" />
      </div>
    </div>
  );
}
