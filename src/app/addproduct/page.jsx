"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Addproduct = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [company, setCompany] = useState();
  const [color, setColor] = useState();
  const [category, setCategory] = useState();
  const [url, setUrl] = useState();

  localStorage.getItem("userCredentials")
    ? router.push("/addproduct")
    : router.push("/login");

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const addProduct = async () => {
    if (
      name === "" ||
      price === "" ||
      company === "" ||
      color === "" ||
      category === "" ||
      url === ""
    ) {
      return toast.error("All feilds are mandatory!");
    }
    const data = { name, price, company, color, category, url };
    console.log(data);
    let result = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      body: JSON.stringify(data),
    });
    result = await result.json();
    if (result.success) {
      toast.success("New product added!");
    }
  };
  return (
    <div>
      <form
        onSubmit={addProduct}
        className="mx-auto w-80 md:w-[80%] flex flex-col justify-center items-center"
      >
        <h1 className="font-bold text-2xl mt-10">Add Product</h1>
        <input
          type="text"
          className="py-2 px-2 ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name=""
          id=""
          required
        />
        <input
          type="text"
          className="py-2 px-2 ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name=""
          id=""
          required
        />
        <input
          type="text"
          className="py-2 px-2  ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
          placeholder="Enter company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name=""
          id=""
          required
        />
        <input
          type="text"
          className="py-2 px-2  ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
          placeholder="Enter product color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          name=""
          id=""
          required
        />
        <div>
          <select
            name="cars"
            className="py-2 px-2  ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
            id="cars"
            value={category}
            onChange={handleCategory}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value="cars">Cars</option>
            <option value="mobile">Mobiles</option>
            <option value="laptop">Laptops</option>
            <option value="other">Other</option>
          </select>
        </div>
        <input
          type="text"
          className="py-2 px-2  ouline-none rounded-md border border-gray-400 my-3 w-80 md:w-96"
          placeholder="Enter Picture url of product"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          name=""
          id=""
          required
        />
        <input
          className="py-2 px-2 rounded-md hover:bg-slate-100  ouline-none border border-gray-400 my-3 w-80 md:w-96"
          type="Submit"
          value="AddProduct"
        />
      </form>
    </div>
  );
};

export default Addproduct;
