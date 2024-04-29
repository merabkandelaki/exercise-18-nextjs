"use client";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }) {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="text-center">
      <h1>Something went wrong 😥</h1>
      <p>{error}</p>
      <button onClick={() => handleNavigate("/")}>Go to Home</button>
    </div>
  );
}
