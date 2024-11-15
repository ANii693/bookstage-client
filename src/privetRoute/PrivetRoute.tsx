
"use client"
import Preloader from "@/components/common/Preloader";
import useGlobalContext from "@/hooks/use-context";
import { childrenType } from "@/interFace/interFace";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivetRoute = ({ children }: childrenType) => {
  const { user, loading } = useGlobalContext();

  const router = useRouter();
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showLoader) {
    return <Preloader/>
  }

  if (user?.email) {
    return <>{children}</>;
  }

  router.replace("/login");
  return null;
};

export default PrivetRoute;
