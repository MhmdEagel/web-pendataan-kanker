"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useLogin } from "./useLogin";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";

export default function Login() {
  const {
    form,
    handleFormLogin,
    isVisible,
    handleVisibility,
    isPending,
    showTwoFactor,
  } = useLogin();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-6 "
                onSubmit={form.handleSubmit(handleFormLogin)}
              >
                <div className="flex gap-4 justify-center items-center">
                  <Image
                    src={"/assets/logo/logo_riau.svg"}
                    width={60}
                    height={60}
                    alt="Logo IZI"
                  />
                  <Image
                    src={"/assets/logo/logo_rsud.jpg"}
                    width={75}
                    height={75}
                    alt="Logo IZI"
                  />
                </div>
                <div className="text-xl font-bold text-center">
                  Pendataan Pasien Kanker
                </div>
                {showTwoFactor ? (
                  <>
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
                  </>
                ) : null}

                {!showTwoFactor ? (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                className="pe-9"
                                placeholder="Password"
                                value={field.value ?? ""}
                                type={isVisible ? "text" : "password"}
                                aria-invalid={
                                  form.formState.errors.password
                                    ? "true"
                                    : "false"
                                }
                              />
                              <button
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                type="button"
                                onClick={handleVisibility}
                                aria-label={
                                  isVisible ? "Hide password" : "Show password"
                                }
                                aria-pressed={isVisible}
                                aria-controls="password"
                              >
                                {isVisible ? (
                                  <Eye
                                    size={16}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                  />
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
                ) : null}
                <Button
                  className="bg-primary hover:bg-primary/90 w-full"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Spinner variant="circle" color="white" />
                  ) : showTwoFactor ? (
                    "Konfirmasi"
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
