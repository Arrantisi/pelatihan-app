"use client";

import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { Semail, Temail } from "@/schema";
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
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";

const FormChangeEmail = () => {
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
    await authClient.changeEmail({
      newEmail: values.email,
      fetchOptions: {
        onRequest() {
          onTrue();
        },
        onSuccess() {
          toast.success("email berhasil di ganti");
          onFalse();
          route.refresh();
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
    <div className="shadow-sm rounded-sm p-4 bg-sidebar">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing.
          </FormDescription>
          <span className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={value}
              className="p-2 text-xs w-1/5"
            >
              {value ? <Loader2 className="animate-spin" /> : "update Email"}
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default FormChangeEmail;
