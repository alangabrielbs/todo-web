import { Task } from "@/stores/use-tasks";
import { formatDistanceToNowStrict } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash } from "lucide-react";
import { Description } from "./todo-description";
import { TodoTitle } from "./todo-title";
import { Button } from "./ui/button";
import { HoverCardContent } from "./ui/hover-card";

type TodoItemProps = {
  item: Task;
  onDelete: (id: string) => void;
  onUpdate: ({ task }: { task: Task }) => void;
  loading?: boolean;
};

export const TodoItemContent = ({
  item,
  onDelete,
  onUpdate,
}: TodoItemProps) => (
  <HoverCardContent
    side="top"
    sideOffset={24}
    alignOffset={0}
    className="rounded-lg shadow-md w-[318px]"
  >
    <div className="w-full space-y-2">
      <div>
        <span className="text-xs text-muted-foreground">
          Criado{" "}
          {formatDistanceToNowStrict(new Date(item.created_at).setHours(-2), {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <TodoTitle
          title={item.title}
          done={item.done}
          onBlur={(title) => onUpdate({ task: { ...item, title } })}
        />
      </div>
      <Description
        description={item.description}
        onBlur={(description) => onUpdate({ task: { ...item, description } })}
      />
      <div className="flex items-center gap-x-2">
        <Button
          className="text-xs"
          variant="outline-destructive"
          onClick={() => onDelete(item.id)}
        >
          <Trash className="size-4" />
          <span className="sr-only">Apagar</span>
        </Button>
        <Button
          className="w-full text-xs"
          variant="outline"
          onClick={() => onUpdate({ task: { ...item, done: !item.done } })}
        >
          {item.done ? "Marcar como não concluído" : "Marcar como feito"}
        </Button>
      </div>
    </div>
  </HoverCardContent>
);
