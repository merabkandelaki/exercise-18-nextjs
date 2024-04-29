"use client";

import { useRouter } from "next/navigation";
import { useAuthCont } from "@/context/AuthContext";
import NavBar from "@/components/NavBar/NavBar";
import NavBarItem from "@/components/NavBar/NavBarItem/NavBarItem";
import "./AppLayout.css";
import Footer from "@/components/Footer/Footer";

function AppLayout({ children }) {
  const router = useRouter();
  const { isAuth, logout } = useAuthCont();

  const handleAuthAction = () => {
    if (isAuth) {
      logout();
      router.push("/");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="app-layout">
      <NavBar>
        <div>
          <NavBarItem title="Home" href="/" />
          <NavBarItem title="Fishes" href="/fishes" />
        </div>
        <span className="navbar-login-button" onClick={handleAuthAction}>
          {isAuth ? "Log out" : "Login"}
        </span>
      </NavBar>
      <div className="app-layout-content">{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;
