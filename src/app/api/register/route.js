import { connectionSrt2 } from "@/lib/dbtwo";
import { User } from "@/lib/model/register";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await mongoose.connect(connectionSrt2);
    data = await User.find();
  } catch (error) {
    data = { success: false };
    success = false;
  }
  return NextResponse.json({ result: data, success });
}

export async function POST(request) {
  const { firstname, lastname, email, password } = await request.json();
  console.log(firstname, lastname, email, password);
  await mongoose.connect(connectionSrt2, { useNewUrlParser: true });
  // const email = payload.email;
  const exist = await User.findOne({ email });
  if (exist) {
    return NextResponse.json({
      message: "Email Already Exist",
      success: false,
      status: 400,
    });
  }
  let user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
  });
  const result = await user.save();
  return NextResponse.json({
    result,
    success: true,
    message: "User Created successfully!",
  });
}
