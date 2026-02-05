import { auth } from "@/auth";
import { useSession } from "next-auth/react";

const getCurrentUser = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};
export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    status, // "loading" | "authenticated" | "unauthenticated"
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
};

export default getCurrentUser;
