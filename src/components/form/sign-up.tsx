"use client";

import { SsignUp, TsignUp } from "@/schema";
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
import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { onTrue, onFalse, value } = useBoolean();

  const form = useForm<TsignUp>({
    resolver: zodResolver(SsignUp),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (values: TsignUp) => {
    try {
      const {} = await authClient.signUp.email({
        email: values.email,
        name: `${values.firstName} ${values.lastName}`,
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
            onFalse();
          },
        },
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 space-y-4 w-full max-w-sm"
      >
        <div className="flex items-center gap-3">
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nama Depan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nama Belakang" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
                    className="absolute top-2 right-1.5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IconEye size={20} />
                    ) : (
                      <IconEyeOff size={20} />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                  />
                  <span
                    className="absolute top-2 right-1.5 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <IconEye size={20} />
                    ) : (
                      <IconEyeOff size={20} />
                    )}
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

export default SignUpForm;
