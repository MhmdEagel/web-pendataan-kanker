import loginUser from "@/actions/login";
import { loginSchema } from "@/schemas/login";
import { ILogin } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const handleVisibility = () => setIsVisible(!isVisible);
  const handleFormLogin = async (data: ILogin) => {
    try {
      setIsPending(true);
      const res = await loginUser(data);
      if (res.success) {
        form.reset();
        toast.success(res.success);
        router.replace("/dashboard")
      }
      if (res.error) {
        form.reset();
        toast.error(res.error);
      }
      if (res.twoFactor) {
        setShowTwoFactor(true);
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setIsPending(false);
    }
  };
  return {
    form,
    isVisible,
    isPending,
    handleVisibility,
    showTwoFactor,
    handleFormLogin,
  }; 
};
