"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { firstname, lastname, email, password };
    let result = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    result = await result.json();
    if (result.success) {
      toast.success("User Register Successfully!");
      router.push("/login");
    }
    // console.log(result);
  };
  return (
    <div className="mx-auto w-80 md:w-96 flex flex-col gap-4 border p-4 mt-16">
      <h1 className="text-center font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Enter user first name"
          className="py-2 border px-2 border-md"
          required
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Enter user last name"
          className="py-2 border px-2 border-md"
          required
        />
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
          value="Register"
        />
        <p className="text-sm text-center">
          Click on{" "}
          <Link
            className="text-center text-sm font-bold underline"
            href="/login"
          >
            Login
          </Link>{" "}
          if you have already account
        </p>
      </form>
    </div>
  );
};

export default Register;
