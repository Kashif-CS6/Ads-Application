import { connectionSrt } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connectionSrt);
    data = await Product.find();
  } catch (error) {
    data = { success: false };
    success = false;
  }
  return NextResponse.json({ result: data, success });
}

// cars route

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionSrt);
  let product = new Product(payload);
  const result = await product.save();
  return NextResponse.json({ result, success: true });
}
