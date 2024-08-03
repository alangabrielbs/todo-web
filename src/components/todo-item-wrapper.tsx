import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";

export const TodoItemWrapper = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => (
  <HoverCard openDelay={100}>
    <HoverCardTrigger asChild>
      <div
        className={cn("flex items-center gap-x-2", {
          "opacity-50 pointer-events-none": loading,
        })}
      >
        {children}
      </div>
    </HoverCardTrigger>
  </HoverCard>
);
