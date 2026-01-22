"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const createTodo = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  const router = useRouter();
  const create = async () => {
    const todo = await axios.post("/api/todo/create-todo", {
      day,
      date,
      task,
    });
    if (todo) {
      toast.success("TODO Created");
      router.push("todo/get-todo");
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
        }}
      >
        create
      </button>
    </div>
  );
};

export default createTodo;
