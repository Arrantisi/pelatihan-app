"use client";

import { SsignIn, TsignIn } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useBoolean } from "@/hooks/use-boolean";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { onTrue, onFalse, value } = useBoolean();

  const form = useForm<TsignIn>({
    resolver: zodResolver(SsignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (values: TsignIn) => {
    const {} = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onRequest() {
          onTrue();
        },
        onSuccess() {
          toast.success("berhasil login");
          onFalse();
        },
        onError(ctx) {
          console.error(ctx.error.message);
          toast.error(ctx.error.message);
          onFalse();
        },
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 space-y-4 w-full max-w-sm"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <span
                    className="absolute top-1.5 right-1.5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IconEye /> : <IconEyeOff />}
                  </span>
                </div>
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

export default SignInForm;
