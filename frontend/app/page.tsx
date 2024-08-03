"use server";
import Sidebar from "@/components/sidebar";
import Tasks from "@/components/tasks";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { CookiesProvider } from "next-client-cookies/server";

async function fetchData() {
  const cookieStore = cookies();
  console.log("In root page server side, all cookies", cookieStore.getAll());
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;
  console.log("In root page server side, Token from cookie:", token);
  if (!token) {
    console.log("No token found, redirecting to /signin");
    redirect(`/signin`);
  }

  try {
    const response = await axios.get(`${process.env.SERVER_URL}/tasks`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    console.log(response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error); // Debugging line
    redirect(`/signin`);
  }
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
