import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
  /** Narrow reading width (680px) instead of full container */
  narrow?: boolean;
}

export function Container({ children, className, narrow, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12 lg:px-20",
        narrow ? "max-w-[680px]" : "max-w-[1400px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
