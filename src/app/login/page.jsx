"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  localStorage.getItem("userCredentials")
    ? router.push("/")
    : router.push("/login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    let result = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(result);
    result = await result.json();
    if (result.success === false) {
      toast.error("Invalid Credentials");
    } else if (result.success) {
      toast.success("Login Successfully!");
      localStorage.setItem("userCredentials", email);
      router.push("/");
    } else {
      console.log({ result });
      toast.warning("Try Again!");
    }
  };
  return (
    <div className="mx-auto w-80 md:w-96 flex flex-col gap-4 border p-4 mt-16 shadow-md">
      <h1 className="text-center font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="py-2 border px-2 border-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="py-2 border px-2 border-md"
        />
        <input
          className="bg-orange-600 py-1 rounded-md text-white cursor-pointer"
          type="submit"
          value="Login"
        />
        <Link className="text-center font-bold " href="/register">
          Create one
        </Link>
      </form>
    </div>
  );
};

export default Login;
