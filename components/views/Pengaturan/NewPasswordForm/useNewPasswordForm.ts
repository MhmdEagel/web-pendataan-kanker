import { newPasswordAction } from "@/actions/new-password";
import { useCurrentUser } from "@/lib/auth";
import { newPasswordSchema } from "@/schemas/new-password";
import { INewPassword } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useNewPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { user } = useCurrentUser();

  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleVisibility = (
    identifier: "oldPassword" | "newPassword" | "confirmPassword",
  ) => {
    if (identifier === "oldPassword") {
      setVisibility((prevValue) => ({
        ...prevValue,
        oldPassword: !prevValue.oldPassword,
      }));
    } else if (identifier === "newPassword") {
      setVisibility((prevValue) => ({
        ...prevValue,
        newPassword: !prevValue.newPassword,
      }));
    } else {
      setVisibility((prevValue) => ({
        ...prevValue,
        confirmPassword: !prevValue.confirmPassword,
      }));
    }
  };

  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
  });

  const handleNewPassword = async (data: INewPassword) => {
    const { newPassword, oldPassword, code } = data;
    setIsPending(true);
    const res = await newPasswordAction({
      newPassword,
      oldPassword,
      code,
      email: user?.email,
    });

    if (res.twoFactor) {
      setShowTwoFactor(res.twoFactor);
      toast.success("email berhasil dikirim");
      setIsPending(false);
      return;
    }

    if (res.status !== "success") {
      toast.success(res.message);
      setIsPending(false);
      setShowTwoFactor(false);
      return;
    }

    toast.error(res.message);
    setShowTwoFactor(false);
    setIsPending(false);
  };

  return {
    form,
    isPending,
    handleVisibility,
    visibility,
    handleNewPassword,
    showTwoFactor,
  };
};
