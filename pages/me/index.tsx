import type { NextPage } from "next";
import {useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import Loader from "@/components/loader";
const Me: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth/login');
    }

    if (status === "authenticated") {
      router.push('/user/'+ session?.id);
    }
  }, [status, session]);

  return <Loader/>;
};

export default Me;
