import { TodoItemContent } from "@/components/todo-item-content";
import { TodoItemHeader } from "@/components/todo-item-header";
import { TodoItemWrapper } from "@/components/todo-item-wrapper";
import { Task } from "@/stores/use-tasks";

type TodoItemProps = {
  item: Task;
  onDelete: (id: string) => void;
  onUpdate: ({ task }: { task: Task }) => void;
  loading?: boolean;
};

export const TodoItem = ({
  item,
  onDelete,
  onUpdate,
  loading,
}: TodoItemProps) => {
  return (
    <TodoItemWrapper loading={loading}>
      <TodoItemHeader item={item} onUpdate={onUpdate} />
      <TodoItemContent item={item} onDelete={onDelete} onUpdate={onUpdate} />
    </TodoItemWrapper>
  );
};
