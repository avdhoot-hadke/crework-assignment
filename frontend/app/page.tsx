"use server";
import Sidebar from "@/components/sidebar";
import Tasks from "@/components/tasks";
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { CookiesProvider } from "next-client-cookies/server";

async function fetchData() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (!token) redirect(`/signin`);

  const response = await axios.get(`${process.env.SERVER_URL}/tasks`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}

export default async function Home() {
  const data = await fetchData();
  return (
    <CookiesProvider>
      <div className="flex h-screen ">
        <div className="border min-w-60">
          <Sidebar />
        </div>

        <div className="border flex-auto bg-[#F4F4F4] overflow-hidden">
          <Tasks userData={data} />
        </div>
      </div>
    </CookiesProvider>
  );
}
