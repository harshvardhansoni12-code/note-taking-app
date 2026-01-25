"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const createTodo = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const create = async () => {
    const todo = await axios.post("/api/todo/create-todo", {
      day,
      date,
      task,
    });
    if (todo) {
      toast.success("TODO Created");
    }
  };
  return (
    <div>
      <input
        placeholder="date"
        type="text"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="day"
        type="text"
        onChange={(e) => {
          setDay(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="task"
        type="text"
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          create();
          router.push("/todo/get-todo");
        }}
      >
        create
      </button>
    </div>
  );
};

export default createTodo;
