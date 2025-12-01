import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-[400px] flex justify-center items-center">
        <Spinner className="size-32" variant="circle" />
    </div>
  )
}
