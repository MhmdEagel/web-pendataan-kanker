import { Suspense } from "react";
import PatientMapDataLayer from "../PatientMapDataLayer/PatientMapDataLayer";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientMap() {
  return (
    <Suspense fallback={<Skeleton className="h-82 bg-slate-200" />}>
      <PatientMapDataLayer />
    </Suspense>
  );
}
