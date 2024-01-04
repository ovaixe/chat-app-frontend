// ProtectedRoute.js
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to the login page if the user is not authenticated
      router.push("/");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
