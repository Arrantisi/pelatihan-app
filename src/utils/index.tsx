import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export const PasswordInput = ({
  placeholder = "password",
  showPassword,
  setShowPassword,
  field,
}: {
  placeholder?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}) => {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
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
  );
};
