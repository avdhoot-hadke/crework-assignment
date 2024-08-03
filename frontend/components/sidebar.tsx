"use client";
import { AddTaskContext, UserContext } from "@/app/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function Sidebar() {
  const { user } = useContext(UserContext);
  const { addShow, setAddShow } = useContext(AddTaskContext);

  const router = useRouter();
  const cookies = useCookies();

  function getInitials(user: any) {
    return user?.name
      .split(" ")
      .map((word: string) => word[0])
      .join("");
  }
  const initials = getInitials(user);

  const handleLogOut = () => {
    cookies.remove("token");
    router.push("/signin");
  };

  const handleAddTask = () => {
    setAddShow((prev) => !prev);
  };
  return (
    <div className="flex flex-col mx-2 pt-4 bg-white h-full fixed">
      <div className="flex items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {initials}
          </span>
        </div>
        <h2 className="ms-2">{user?.name}</h2>
      </div>
      <div className="flex mt-2">
        <img className="" src="/bell.svg" alt="bell" />
        <img className="ps-4" src="/radial.svg" alt="radial" />
        <img className="ps-4" src="/chevron.svg" alt="chevron" />
        <button
          type="submit"
          className="bg-[#F4F4F4] text-[#797979] hover:bg-neutral-300 py-2 px-4 ms-auto rounded"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col  text-[#797979]">
        <div className="flex p-2 mt-4 bg-[#F4F4F4]">
          <img className="pe-2" src="/home.svg" alt="home" />
          Home
        </div>
        <div className="flex p-2 mt-1">
          <img className="pe-2" src="/board.svg" alt="board" />
          Board
        </div>
        <div className="flex p-2 mt-1">
          <img className="pe-2" src="/settings.svg" alt="settings" />
          Setting
        </div>
        <div className="flex p-2 mt-1">
          <img className="pe-2" src="/teams.svg" alt="teams" />
          Teams
        </div>
        <div className="flex p-2 mt-1">
          <img className="pe-2" src="/chart.svg" alt="chart" />
          Analytics
        </div>
        <button
          type="submit"
          className="flex justify-center items-center h-12 mt-4 text-white bg-gradient-to-b from-[#4C38C2]  
          to-[#2F2188] rounded-md hover:from-[#9C93D4] hover:to-[#4B36CC]  hover:from-[0%] hover:to-[100%]"
          onClick={handleAddTask}
        >
          Create new task
          <img className="ps-2" src="/add.svg" alt="add" />
        </button>
      </div>
      <button
        type="submit"
        className="flex items-center mb-4 p-2 bg-[#F4F4F4] text-[#797979] mt-auto rounded"
      >
        <img className="ps-2" src="/download.svg" alt="download" />
        <div className="flex flex-col items-start">
          <h1 className="text-lg">Download</h1>
          <p className=" text-sm">Get the full experience</p>
        </div>
      </button>
    </div>
  );
}
