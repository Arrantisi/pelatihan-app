import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CountdownTimerOtp = () => {
  const [secondLeft, setSecondLeft] = useState(300);

  useEffect(() => {
    if (secondLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondLeft]);

  if (secondLeft === 0) {
    toast.warning("waktu otp telah habis");
    redirect("/forgot-password");
  }

  const minute = Math.floor(secondLeft / 60)
    .toString()
    .padStart(2, "0");
  const second = (secondLeft % 60).toString().padStart(2, "0");

  return (
    <div className="w-full text-center text-xs mt-1">
      code otp akan expired dalam waktu {minute}:{second}
    </div>
  );
};

export default CountdownTimerOtp;
