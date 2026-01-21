"use client";
import { useState } from "react";
import axios from "axios";
const createTodo = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  const create = async () => {};
  return (
    <div>
      <input
        placeholder="date"
        type="text"
        onChange={(e) => {
          setDay(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="day"
        type="day"
        onChange={(e) => {
          setDate(e.target.value);
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
      <input
        placeholder="status"
        type="boolean"
        onChange={(e) => {
          setStatus(status);
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
