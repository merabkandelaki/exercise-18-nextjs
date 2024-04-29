"use client";
import { useRouter } from "next/navigation";
import CreateFishForm from "@/components/CreateFishForm/CreateFishForm";
import { useAuthCont } from "@/context/AuthContext";

export default function CreateFish() {
  const router = useRouter();
  const { isAuth } = useAuthCont();

  if (!isAuth) {
    router.push("/auth/login");
  }

  return <CreateFishForm />;
}
