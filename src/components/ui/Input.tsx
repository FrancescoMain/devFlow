import { forwardRef, useImperativeHandle, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  "w-full rounded-lg border bg-background text-foreground transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
      state: {
        default: "border-border",
        error: "border-red-500 focus:ring-red-500/50",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export interface InputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<InputHandle, InputProps>(
  ({ className, size, state, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => innerRef.current?.focus(),
      clear: () => {
        if (innerRef.current) innerRef.current.value = "";
      },
      getValue: () => innerRef.current?.value ?? "",
    }));

    return (
      <input
        ref={innerRef}
        className={cn(inputVariants({ size, state }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export { Input, inputVariants };