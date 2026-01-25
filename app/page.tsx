// In a client component (must have "use client" at the top)
"use client";

import { useSession, signIn } from "next-auth/react"; // or useSession from "@auth/nextjs/react" for v5+
import { useRouter } from "next/navigation"; // or 'next/router' for Pages Router

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  // Handle loading state
  // Handle unauthenticated state (e.g., redirect to login page)
  if (status === "unauthenticated") {
    // You could also use a redirect callback in NextAuth config
    return (
      <>
        <button
          onClick={() => {
            router.push("/auth/signin");
          }}
        >
          signIn
        </button>
      </>
    ); // or render a "not logged in" message
  }

  // Handle authenticated state

  return (
    <div>
      <p>todo</p>
      <button
        onClick={() => {
          router.push("/todo/create-todo");
        }}
        className="p-1 bg-red-500 rounded-lg"
      >
        create
      </button>
    </div>
  );
}
