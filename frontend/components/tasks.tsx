"use client";
import { useContext, useEffect } from "react";
import TopSection from "./topSection";
import { AddTaskContext, UserContext } from "@/app/context";
import { Coming_Soon } from "next/font/google";
import TaskSection from "./taskSection";
import AddTask from "./addTask";

export default function Tasks({ userData }: { userData: any }) {
  const { addShow, setAddShow } = useContext(AddTaskContext);
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(userData);
  }, [user]);

  const handleOnDragEnd = () => {};
  return (
    <div className="h-full overflow-y-scroll overflow-x-hidden relative">
      <TopSection />

      <TaskSection />
      {addShow ? (
        <div className="absolute top-0 right-0 bg-white   w-1/3 transition ease-in-out duration-500">
          <AddTask />
        </div>
      ) : (
        <div className="absolute overflow-hidden top-0 right-0 bg-white translate-x-full  w-1/3 transition ease-in-out duration-500">
          <AddTask />
        </div>
      )}
    </div>
  );
}
