import { Card, CardContent } from "@/components/ui/card";
import NewPasswordForm from "./NewPasswordForm/NewPasswordForm";
import { SessionProvider } from "next-auth/react";

export default async function Pengaturan() {
  return (
    <SessionProvider>
      <Card className="w-full max-w-lg mx-auto">
        <CardContent>
          <NewPasswordForm />
        </CardContent>
      </Card>
    </SessionProvider>
  );
}
