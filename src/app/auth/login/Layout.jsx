"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function Layout({ children }) {
  const router = useRouter();

  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
