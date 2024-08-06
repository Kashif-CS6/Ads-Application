import { connectionSrt2 } from "@/lib/dbtwo";
import { User } from "@/lib/model/register";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();
  await mongoose.connect(connectionSrt2, { useNewUrlParser: true });
  const email = payload.email;
  const password = payload.password;
  const exist = await User.findOne({ email });
  console.log(exist?.email === email);
  console.log(exist?.password, password);
  if (exist?.email === email && exist?.password === password) {
    return NextResponse.json({
      success: true,
      message: "login successfully!",
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Invalid Credentials!",
    });
  }
}
