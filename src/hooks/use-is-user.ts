import { useAuth, useUser } from "@clerk/nextjs";

export const useisUserAuthenticated = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (user && isSignedIn) {
    return true;
  }

  return false;
};
