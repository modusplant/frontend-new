import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "error";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      helperText,
      size = "md",
      variant = "default",
      checked,
      defaultChecked,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const iconSizes = {
      sm: { width: 8, height: 6 },
      md: { width: 10, height: 7 },
      lg: { width: 12, height: 9 },
    };

    const isError = variant === "error";
    const isChecked = checked !== undefined ? checked : defaultChecked;

    return (
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center p-0.5">
            <input
              type="checkbox"
              checked={checked}
              defaultChecked={defaultChecked}
              className="sr-only"
              ref={ref}
              {...props}
            />

            <label
              htmlFor={props.id}
              className="flex cursor-pointer items-center gap-2"
            >
              {/* 체크박스 */}
              <div
                className={cn(
                  "flex items-center justify-center rounded border transition-all",
                  sizeClasses[size],
                  isChecked
                    ? isError
                      ? "border-system-alert bg-system-alert"
                      : "border-primary-50 bg-primary-50"
                    : isError
                      ? "border-system-alert bg-white"
                      : "border-neutral-70 bg-white",
                  "hover:border-primary-50",
                  className
                )}
              >
                {isChecked && (
                  <svg
                    width={iconSizes[size].width}
                    height={iconSizes[size].height}
                    viewBox="0 0 10 7"
                    fill="none"
                  >
                    <path
                      d="M1 3.5L3.5 6L9 0.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* 라벨 */}
              {label && (
                <span
                  className={cn(
                    "text-sm",
                    isError ? "text-system-alert" : "text-neutral-60"
                  )}
                  style={{ fontFamily: "Pretendard" }}
                >
                  {label}
                </span>
              )}
            </label>
          </div>
        </div>

        {/* 도움말 텍스트 */}
        {helperText && (
          <p
            className={cn(
              "ml-6 text-xs",
              isError ? "text-system-alert" : "text-neutral-60"
            )}
            style={{ fontFamily: "Pretendard" }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
