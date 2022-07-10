import type { NextPage } from "next";

import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login')
  });

  return <>logout</>;
};

export default Logout;
