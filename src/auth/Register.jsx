"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { registerUser } from "../services/authApi";
import { useReducer } from "react";
import registerReducer from "./RegisterReducer";
import "../auth/Register.css";

const Register = () => {
  const [regState, dispatch] = useReducer(registerReducer, {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const res = await registerUser(regState);
      if (res?.accessToken) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <h3 className="register-title">Registration</h3>
      <form onSubmit={handleRegister} className="form-register">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={regState.email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }
            className="register-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={regState.firstName}
            onChange={(e) =>
              dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })
            }
            className="register-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={regState.lastName}
            onChange={(e) =>
              dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })
            }
            className="register-input"
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={regState.username}
            onChange={(e) =>
              dispatch({ type: 'SET_USERNAME', payload: e.target.value })
            }
            className="register-input"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={regState.password}
            onChange={(e) =>
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }
            className="register-input"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        <div className="title-login-head">
          <Link href="/auth/login" className="title-login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
