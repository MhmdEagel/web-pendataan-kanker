import { Suspense } from "react";
import StatusTable from "./StatusTable";

export default function StatusTableLayer() {
  return (
    <Suspense fallback={<div>loading...</div>}>
        <StatusTable />
    </Suspense>
  )
}
