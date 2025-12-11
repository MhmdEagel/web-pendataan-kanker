import { registerUser } from "@/actions/register";
import { registerSchema } from "@/schemas/register";
import { IRegister } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useRegister() {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const handleFormRegister = async (data: IRegister) => {
    setIsPending(true);
    const res = await registerUser(data);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res.success);
    router.push("/auth/login");
    setIsPending(false);
  };

  const toggleVisibility = (identifier: "password" | "confirmPassword") => {
    if (identifier === "password") {
      setVisibility({ ...visibility, password: !visibility.password });
    } else {
      setVisibility({
        ...visibility,
        confirmPassword: !visibility.confirmPassword,
      });
    }
  };

  return {
    form,
    handleFormRegister,
    toggleVisibility,
    visibility,
    isPending,
  };
}
