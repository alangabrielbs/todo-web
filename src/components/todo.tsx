import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { api } from "@/lib/axios";
import { Task, useTasks } from "@/stores/use-tasks";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";
import { ScrollArea } from "./ui/scroll-area";

export const Todo = () => {
  const { getAllTasks, data, loading } = useTasks();

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async ({ task }: { task: Task }) => {
    try {
      await api.put(`/tasks/${task.id}`, task);
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Card className="max-w-[350px] w-full bg-white relative z-10">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TodoForm />

        <ScrollArea className="h-[400px]">
          <div className="w-full space-y-3">
            {data.tasks.map((item) => (
              <TodoItem
                item={item}
                key={item.id}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                loading={loading}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
