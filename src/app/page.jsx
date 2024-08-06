"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [userCredentials, setUserCredentials] = useState();
  const [category, setSelectedcategory] = useState("all");

  useEffect(() => {
    const userData = localStorage.getItem("userCredentials");
    console.log("On main page........................");
    console.log(userData);
    setUserCredentials(userData);
  }, []);

  const getProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/product");
      const data = await res.json();
      if (data.success) {
        return data.result;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProduct();
      setProducts(products);
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <main className="flex flex-col justify-center py-24 min-h-screen gap-20">
      <div className="flex flex-wrap md:flex-nowrap mx-4 lg:mx-0  justify-center md:justify-between gap-8 md:gap-0 ">
        <h1 className="font-serif font-[300] text-2xl">
          Welcome to Advertisment.org
        </h1>

        {userCredentials && (
          <Link
            href={"/addproduct"}
            className="bg-orange-400 h-fit px-4 rounded-md cursor-pointer  text-sm underline text-white p-2 font-bold py-3"
          >
            Add Product
          </Link>
        )}
      </div>
      <div>
        <h1 className="font-bold text-xl mx-2 md:mx-4 lg:mx-0 md:text-2xl">
          Categories
        </h1>
        <div className="mx-0 md:mx-4 lg:mx-0 flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-4 my-4">
          <button
            onClick={() => setSelectedcategory("cars")}
            className="border px-6 bg-orange-400 text-white rounded-xl py-1"
          >
            Cars
          </button>
          <button
            onClick={() => setSelectedcategory("mobile")}
            className="border px-6 bg-orange-400 text-white rounded-xl py-1"
          >
            Mobiles
          </button>
          <button
            onClick={() => setSelectedcategory("laptop")}
            className="border px-6 bg-orange-400 text-white rounded-xl py-1"
          >
            Laptops
          </button>
          <button
            onClick={() => setSelectedcategory("other")}
            className="border px-6 bg-orange-400 text-white rounded-xl py-1"
          >
            Other Services
          </button>
        </div>
      </div>
      <div className="my-10 flex gap-4 flex-wrap mx-0 md:mx-4 lg:mx-0">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <div
              key={index}
              className="border border-rounded border-yellow-400 w-80 mx-auto md:mx-0  md:w-full bg-contain md:bg-cover h-96  md:h-[40vh] lg:h-[60vh] rounded-md md:rounded-2xl  flex flex-col justify-end p-10 items-end gap-1"
              style={{
                backgroundImage: `url(${item.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h1 className="font-bold text-white text-xl md:text-4xl bg-blue-500 p-1">
                {item.name}
              </h1>
              <p className="text-xl md:text-4xl font-bold text-red-600">{item.price}</p>
              <p className="text-xl md:text-4xl font-bold bg-yellow-600 p-1">
                {item.company}
              </p>
              <p className="text-xl md:text-4xl font-bold text-white underline bg-blue-600 p-1">
                {item.category}
              </p>
              <p className="text-xl md:text-4xl font-bold text-red-600">{item.color}</p>
            </div>
          ))
        ) : (
          <p>Loading . . . .</p>
        )}
      </div>
    </main>
  );
}
