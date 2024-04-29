"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { loginUser } from "../services/authApi";
import { useAuthCont } from "../context/AuthContext";
import "../auth/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthCont();

  const navigate = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await loginUser({
        email,
        password,
      });

      if (res?.accessToken) {
        login(res.accessToken, res.user);
        navigate.push("/fishes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h3 className="login-title">Login</h3>
      <form onSubmit={handleLogin} className="form">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
        <div className="title-register-head">
          <Link href="/auth/register" className="title-register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
