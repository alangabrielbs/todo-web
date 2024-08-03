import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { create } from "zustand";

const initialState = {
  loading: true,
  success: false,
  error: false,
  data: {
    completeTasks: 0,
    incompleteTasks: 0,
    tasks: [],
  },
  errorData: null,
};

export type Task = {
  id: string;
  title: string;
  description: string | null;
  done: boolean;
  duration: number | null;
  created_at: string;
  updated_at: string;
  session_id: string;
};

type DataResponse = {
  completeTasks: number;
  incompleteTasks: number;
  tasks: Task[];
};

type TasksStore = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: DataResponse;
  errorData: string | null;
  getAllTasks: () => Promise<void>;
};

export const useTasks = create<TasksStore>((set) => ({
  ...initialState,

  getAllTasks: async () => {
    set({ loading: true });

    try {
      const res = await api.get("/tasks");

      set({
        success: true,
        data: res.data,
      });
    } catch (err: AxiosError | any) {
      set({ ...initialState, error: true, errorData: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
