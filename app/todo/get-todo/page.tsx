"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch todos here
    const Todo = async () => {
      const todo = await fetch("/api/todo/get-todo");
      if (!todo) {
        toast.error("errors");
      }

      const res = await todo.json();
      console.log(res);
      setTodos(res.data);
      setLoading(false);
    };
    Todo();
  }, []);

  return <>{loading ? <>loading.....</> : <></>}</>;
};
//this he can see the todos created by authenticated user
export default TodoPage;
