import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="relative">
      <Skeleton className="h-[440px] bg-slate-200" />
      <div className="absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center">
        <Spinner variant="circle" size={64} />
      </div>
    </div>
  )
}
