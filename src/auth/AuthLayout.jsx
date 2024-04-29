"use client";
import { useRouter } from "next/navigation";
import Modal from "../components/Modal/Modal";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  return <Modal onClose={() => router.back()}>{children}</Modal>;
};

export default AuthLayout;
