import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";

type TodoTitleProps = {
  title: string;
  done: boolean;
  onBlur?: (value: string) => void;
  onChangeValue?: (value: string) => void;
};

export const TodoTitle = ({
  title,
  done,
  onBlur,
  onChangeValue,
}: TodoTitleProps) => {
  const [height, setHeight] = useState("20px");
  const [value, setValue] = useState(title ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = ({
    target: { value: currentValue },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue?.(currentValue);
    setValue(currentValue);
  };

  const handleBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;

      setHeight(`${textareaRef.current.scrollHeight}px`);
    }

    if (value.trim() === title) return;
    onBlur?.(value);
  };

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.scrollHeight <= 200) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder="Adicionar descrição..."
      style={{ height }}
      onBlur={handleBlur}
      spellCheck={false}
      className={cn(
        "text-sm min-h-0 -mx-1 font-semibold p-0 border-none resize-none",
        {
          "line-through": done,
        }
      )}
    />
  );
};
