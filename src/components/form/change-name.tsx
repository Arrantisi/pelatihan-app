import { SchangeName, TchageName } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useBoolean } from "@/hooks/use-boolean";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormChangeName = () => {
  const { onTrue, onFalse, value } = useBoolean();
  const route = useRouter();

  const form = useForm<TchageName>({
    resolver: zodResolver(SchangeName),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = async (values: TchageName) => {
    await authClient.updateUser({
      name: `${values.firstName} ${values.lastName}`,
      fetchOptions: {
        onRequest() {
          onTrue();
        },
        onSuccess() {
          toast.success("nama berhasil di ganti");
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama depan</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Nama belakang</FormLabel>
                <FormControl>
                  <Input {...field} />
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

export default FormChangeName;
