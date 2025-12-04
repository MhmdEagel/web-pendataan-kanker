import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DashboardNavItem({
  isActive,
  children,
  href
}: {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter()
  return (
    <div
      className={cn(
        "p-3 flex-1 gap-1.5 inline-flex items-center justify-center relative h-full whitespace-nowrap cursor-pointer",
        {
          "bg-accent text-primary after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:block after:bg-primary after:content-[''] ":
            isActive,
        }
      )}

      onClick={() => {router.push(href)}}
    >
      {children}
    </div>
  );
}
