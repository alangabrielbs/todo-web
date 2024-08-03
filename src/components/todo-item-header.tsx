import { cn } from "@/lib/utils";
import { Task } from "@/stores/use-tasks";
import { Checkbox } from "./ui/checkbox";

export const TodoItemHeader = ({
  item,
  onUpdate,
}: {
  item: Task;
  onUpdate: ({ task }: { task: Task }) => void;
}) => (
  <>
    <Checkbox
      className="rounded-md size-5"
      checked={item.done}
      onCheckedChange={() => onUpdate({ task: { ...item, done: !item.done } })}
    />
    <p
      className={cn("text-sm font-semibold truncate", {
        "line-through": item.done,
      })}
    >
      {item.title}
    </p>
  </>
);
