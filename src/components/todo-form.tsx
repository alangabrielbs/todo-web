import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { useTasks } from "@/stores/use-tasks";

const formSchema = z.object({
  title: z
    .string({
      required_error: "O título é obrigatório",
    })
    .min(1, {
      message: "O título é obrigatório",
    })
    .max(80, { message: "O título deve ter no máximo 100 caracteres" }),
});

export const TodoForm = () => {
  const { getAllTasks } = useTasks();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post("/tasks", values);
      form.reset();
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-start w-full gap-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="w-full" {...field} />
                </FormControl>
                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <Button type="submit">
            + <span className="sr-only">Add</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
