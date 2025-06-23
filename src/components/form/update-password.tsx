import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { SchangePassword, TchagePassword } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const FormUpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { onTrue, onFalse, value } = useBoolean();
  const route = useRouter();

  const form = useForm<TchagePassword>({
    resolver: zodResolver(SchangePassword),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = async (values: TchagePassword) => {
    const { newPassword, currentPassword } = values;

    await authClient.changePassword({
      currentPassword,
      newPassword,
      fetchOptions: {
        onRequest() {
          onTrue();
        },
        onSuccess() {
          toast.success("password berhasil di ganti");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password sekarang</FormLabel>
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password baru</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="password"
                      type={showNewPassword ? "text" : "password"}
                      {...field}
                    />
                    <span
                      className="absolute top-2 right-1.5 text-muted-foreground"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
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
                <FormLabel>confirm password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="confirm password"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                    />
                    <span
                      className="absolute top-2 right-1.5 text-muted-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
          <FormDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </FormDescription>
          <span className="w-full flex justify-end">
            <Button
              type="submit"
              disabled={value}
              className="p-2 text-xs w-1/5"
            >
              {value ? <Loader2 className="animate-spin" /> : "update name"}
            </Button>
          </span>
        </form>
      </Form>
    </div>
  );
};

export default FormUpdatePassword;
