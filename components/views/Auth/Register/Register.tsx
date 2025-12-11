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
import { useRegister } from "./useRegister";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export default function Register() {
  const { form, handleFormRegister, visibility, toggleVisibility, isPending } =
    useRegister();
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                className={cn("flex flex-col gap-3", {
                  "gap-1": Object.keys(form.formState.errors).length > 0,
                })}
                onSubmit={form.handleSubmit(handleFormRegister)}
              >
                <div className="flex gap-4 justify-center items-center">
                  <Image
                    src={"/assets/logo/logo_riau.svg"}
                    width={40}
                    height={40}
                    alt="Logo Riau"
                  />
                  <Image
                    src={"/assets/logo/logo_rsud.png"}
                    width={65}
                    height={65}
                    alt="Logo RSUD"
                  />
                </div>
                <div className="text-lg font-bold text-center">Register</div>
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Lengkap"
                          {...field}
                          value={field.value ?? ""}
                          autoComplete="false"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          autoComplete="false"
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
                            type={visibility.password ? "text" : "password"}
                            aria-invalid={
                              form.formState.errors.password ? "true" : "false"
                            }
                            autoComplete="false"
                          />
                          <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={() => toggleVisibility("password")}
                            aria-label={
                              visibility.password
                                ? "Hide password"
                                : "Show password"
                            }
                            aria-pressed={visibility.password}
                            aria-controls="password"
                          >
                            {visibility.password ? (
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
                            placeholder="Password"
                            value={field.value ?? ""}
                            type={
                              visibility.confirmPassword ? "text" : "password"
                            }
                            aria-invalid={
                              form.formState.errors.confirmPassword
                                ? "true"
                                : "false"
                            }
                            autoComplete="false"
                          />
                          <button
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10  =focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={() => toggleVisibility("confirmPassword")}
                            aria-label={
                              visibility.confirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            aria-pressed={visibility.confirmPassword}
                            aria-controls="password"
                          >
                            {visibility.confirmPassword ? (
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
                <Button
                  disabled={isPending}
                  className="bg-primary hover:bg-primary/90 w-full mt-4"
                  type="submit"
                >
                  {isPending ? <Spinner variant="circle" /> : "Register"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
