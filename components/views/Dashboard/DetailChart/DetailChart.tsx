import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DataCancerLayer from "./DataCancerLayer/DataCancerLayer";
export default function DetailChart() {
  return (
    <Suspense fallback={<LoadingChart />}>
      <DataCancerLayer />
    </Suspense>
  );
}

function LoadingChart() {
  return (
    <div className="flex flex-col gap-7 sm:flex-row items-center min-h-[420px]">
      <div className="flex flex-col items-center gap-4 min-w-[550px]">
        <Skeleton className="w-62 h-62 rounded-full bg-slate-200" />
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 bg-slate-200 rounded-none" />
            <Skeleton className="w-12 h-2.5 bg-slate-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 bg-slate-200 rounded-none" />
            <Skeleton className="w-12 h-2.5 bg-slate-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 bg-slate-200 rounded-none" />
            <Skeleton className="w-12 h-2.5 bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="flex items-center sm:items-start flex-col gap-4">
        <Skeleton className="bg-slate-200 w-34 h-4" />
        <Skeleton className="bg-slate-200 w-28 h-8" />
      </div>
    </div>
  );
}
