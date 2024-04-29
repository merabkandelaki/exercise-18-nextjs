"use client";

import { useRouter } from "next/navigation";
import Register from "@/auth/Register";
import Modal from "@/components/Modal/Modal";

export default function registerPage() {
  const router = useRouter();
  return (
    <Modal onClose={() => router.back()}>
      <Register />
    </Modal>
  );
}
