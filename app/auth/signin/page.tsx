"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const Login = async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("SignIn result:", result);
      if (result?.ok) {
        toast.success("logged in successfully!");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Login failed: " + (result?.error || "Unknown error"));
        router.push("/");
        router.refresh();
      }
    } catch (e) {
      console.error("Login error:", e);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <div>
        <input
          placeholder="email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={Login}>log in</button>
    </>
  );
};

export default SignIn;
