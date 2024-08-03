import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const Description = ({
  description,
  onChangeValue,
  onBlur,
}: {
  description: string | null;
  onChangeValue?: (value: string) => void;
  onBlur?: (value: string) => void;
}) => {
  const [height, setHeight] = useState("auto");
  const [value, setValue] = useState(description ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.scrollHeight <= 200) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [value]);

  const handleChange = ({
    target: { value: currentValue },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    onChangeValue?.(currentValue);
    setValue(currentValue);
  };

  const handleBlur = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }

    if (value.trim() === description) return;
    onBlur?.(value);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder="Adicionar descrição..."
      style={{ height }}
      onBlur={handleBlur}
      spellCheck={false}
      className="min-h-0 p-1 -mx-1 border-none resize-none "
    />
  );
};
