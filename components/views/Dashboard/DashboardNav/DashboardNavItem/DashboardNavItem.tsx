import { cn } from "@/lib/utils";

export default function DashboardNavItem({
  isActive,
  setIsActive,
  children,
  href,
}: {
  isActive: boolean;
  href: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-3 flex-1 gap-1.5 inline-flex items-center justify-center relative h-full whitespace-nowrap cursor-pointer",
        {
          "bg-accent text-primary after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-0.5 after:block after:bg-primary after:content-[''] ":
            isActive,
        }
      )}
      onClick={() => setIsActive(href)}
    >
      {children}
    </div>
  );
}
