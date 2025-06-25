/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OTPInput, SlotProps } from "input-otp";

import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";

type InputOtpProps = {
  maxLength?: number;
  field: ControllerRenderProps<any, any>;
};

export default function InputOtp({ maxLength = 6, field }: InputOtpProps) {
  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={maxLength}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
        {...field}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-input bg-background text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
