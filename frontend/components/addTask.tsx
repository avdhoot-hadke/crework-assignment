import { AddTaskContext, UserContext } from "@/app/context";
import axios from "axios";
import React, { useContext, useState } from "react";

export default function AddTask() {
  const { addShow, setAddShow } = useContext(AddTaskContext);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: undefined,
    deadline: undefined,
  });
  const handleAddTask = () => {
    setAddShow((prev) => !prev);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("task:", task);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-task`,
        task,
        {
          withCredentials: true,
        }
      );
      setError(false);

      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/tasks`, {
        withCredentials: true,
      });
      console.log("Updated User", response.data);
      setUser(response.data);
      setAddShow((prev) => !prev);
      window.location.reload();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className=" bg-white h-screen">
      <img
        className=" cursor-pointer"
        src="/close.svg"
        alt="close"
        onClick={handleAddTask}
      />
      <div className="ms-4 w-[22rem] ">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className=" text-4xl py-4 outline-none w-full"
          required
        />
        <div className="flex py-2">
          <img className="pe-4" src="/status.svg" alt="download" />
          <label className="flex w-72 justify-between">
            <p className="">Status</p>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              // defaultValue="Not selected"
              className="text-[#797979] outline-none w-40"
              required
            >
              <option value="">Not selected</option>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>
        <div className="flex py-2">
          <img className="pe-4" src="/priority.svg" alt="download" />
          <label className="flex  w-72 justify-between">
            <p className="">Priority</p>
            <select
              name="priority"
              // defaultValue="Not selected"
              value={task.priority}
              onChange={handleChange}
              className="text-[#797979] outline-none w-40"
            >
              <option value="">Not selected</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </label>
        </div>
        <div className="flex py-2">
          <img className="pe-4" src="/date.svg" alt="download" />
          <div className="flex  w-72 justify-between">
            <p className="">Deadline</p>
            <input
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              placeholder="Date"
              className="text-[#797979] outline-none w-40"
            />
          </div>
        </div>
        <div className="flex py-2">
          <img className="pe-4" src="/pen.svg" alt="download" />
          <div className="flex  w-72 justify-between">
            <p className="">Description</p>
            <input
              type="textarea"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Not Given"
              className="text-[#797979] outline-none  w-40"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center h-12 mt-4 p-2 text-white bg-gradient-to-b from-[#4C38C2]  
          to-[#2F2188] rounded-md hover:from-[#9C93D4] hover:to-[#4B36CC]  hover:from-[0%] hover:to-[100%]"
          onClick={handleSubmit}
        >
          Add
          <img className="ps-2" src="/add.svg" alt="add" />
        </button>
        {error && (
          <p className="mt-4 text-red-600">
            Incorrect Credentials, please try again
          </p>
        )}
      </div>
    </div>
  );
}
