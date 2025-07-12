"use server";

import { signIn } from "../../auth";

 const SignIn = async () => {
  await signIn("google");
};

export default SignIn;