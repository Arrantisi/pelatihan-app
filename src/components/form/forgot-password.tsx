"use client";

import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { Temail, Semail } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ForgotPassword = () => {
  const { onTrue, onFalse, value } = useBoolean();
  const route = useRouter();

  const form = useForm<Temail>({
    resolver: zodResolver(Semail),
    defaultValues: {
      email: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = async (values: Temail) => {
    await authClient.emailOtp.sendVerificationOtp({
      email: values.email,
      type: "forget-password",
      fetchOptions: {
        onRequest() {
          onTrue();
        },
        onSuccess() {
          onFalse();
          route.push("/otp-forgot-password");
          form.reset();
        },
        onError(ctx) {
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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 my-4 w-full max-w-sm"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="youremail@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={value} className="w-full">
          {value ? <Loader2 className="animate-spin" /> : "kirim code"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
