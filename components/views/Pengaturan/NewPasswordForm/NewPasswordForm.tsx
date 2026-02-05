"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNewPasswordForm } from "./useNewPasswordForm";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function NewPasswordForm() {
  const {
    form,
    visibility,
    handleVisibility,
    handleNewPassword,
    isPending,
    showTwoFactor,
  } = useNewPasswordForm();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => handleNewPassword(data))}
        className="flex flex-col gap-4"
      >
        {showTwoFactor ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode OTP</FormLabel>
                <div className="mx-auto">
                  <InputOTP autoFocus maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Lama</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pe-9"
                        placeholder="Password Lama"
                        value={field.value ?? ""}
                        type={visibility.oldPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => handleVisibility("oldPassword")}
                        aria-label={
                          visibility.oldPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={visibility.oldPassword}
                        aria-controls="password"
                      >
                        {visibility.oldPassword ? (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pe-9"
                        placeholder="Password Baru"
                        value={field.value ?? ""}
                        type={visibility.newPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => handleVisibility("newPassword")}
                        aria-label={
                          visibility.newPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={visibility.newPassword}
                        aria-controls="password"
                      >
                        {visibility.newPassword ? (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="pe-9"
                        placeholder="Password Lama"
                        value={field.value ?? ""}
                        type={visibility.confirmPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={() => handleVisibility("confirmPassword")}
                        aria-label={
                          visibility.confirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        aria-pressed={visibility.confirmPassword}
                        aria-controls="password"
                      >
                        {visibility.confirmPassword ? (
                          <Eye size={16} strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <EyeOff
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="ml-auto">
          {showTwoFactor ? (
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <Spinner variant="circle" color="white" />
              ) : (
                "Verifikasi"
              )}
            </Button>
          ) : (
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <Spinner variant="circle" color="white" />
              ) : (
                "Ubah Password"
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
