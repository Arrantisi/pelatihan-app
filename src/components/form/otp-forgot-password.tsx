"use client";

import { SotpForgotPassword, TotpForgotPassword } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "@/utils";
import { OTPInput } from "input-otp";
import { Slot } from "../comp-58";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const OtpForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { onTrue, onFalse, value } = useBoolean();

  const form = useForm<TotpForgotPassword>({
    resolver: zodResolver(SotpForgotPassword),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
    },
  });

  const onSubmit = async (values: TotpForgotPassword) => {
    await authClient.emailOtp.resetPassword({
      email: values.email,
      password: values.password,
      otp: values.otp,
      fetchOptions: {
        onRequest: () => {
          onTrue();
        },
        onSuccess: () => {
          toast.success("Password berhasil di ganti");
          form.reset();
          redirect("/sign-in");
          onFalse();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          console.error(ctx.error.message);
          onFalse();
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col items-center space-y-4 my-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <PasswordInput
                  placeholder="password baru"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel>code otp</FormLabel>
              <FormControl>
                <OTPInput
                  containerClassName="flex items-center gap-3 has-disabled:opacity-50"
                  maxLength={6}
                  render={({ slots }) => (
                    <div className="flex gap-2">
                      {slots.map((slot, idx) => (
                        <Slot key={idx} {...slot} />
                      ))}
                    </div>
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={value}>
          {value ? <Loader2 className="animate-spin" /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default OtpForgotPassword;
