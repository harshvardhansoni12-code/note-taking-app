"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const signUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignUp = async () => {
    const result = await axios.post("/api/v1/signup", {
      name,
      email,
      password,
    });
    if (result) {
      toast.success("signed up");
    } else {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <input
        placeholder="name"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="email"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button onClick={SignUp}>sign up</button>
    </>
  );
};

export default signUp;
