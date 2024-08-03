"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthComponent({ type }: { type: string }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(values);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/${type}`,
        values,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      setError(false);
      router.push("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const toggleShow = () => {
    setShow(!show);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-t from-[#AFA3FF] to-[#ffffff] ">
      <div className="bg-white w-[40rem] h-[30rem] flex flex-col items-center justify-center rounded-xl p-12">
        <h1 className=" text-5xl mb-6">
          Welcome to <span className=" text-[#4534AC]">Workflo!</span>
        </h1>
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col justify-center items-center"
          >
            {type == "signup" && (
              <input
                className="w-[33rem] focus:outline-[#999999] px-4  bg-[#EBEBEB] py-3 my-2  rounded-md"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Full name"
                required
              />
            )}
            <input
              className="w-[33rem] focus:outline-[#999999] px-4  bg-[#EBEBEB] py-3 my-2  rounded-md"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
            <div className="relative w-[33rem] ">
              <input
                className="w-full focus:outline-[#999999] px-4  bg-[#EBEBEB] py-3 my-2  rounded-md"
                type={show ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <img
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                src="/eye.svg"
                alt="eye"
                onClick={toggleShow} // Use the toggleShow function
              />
            </div>

            <button
              type="submit"
              className="w-[33rem] px-4  text-white bg-gradient-to-b from-[#4C38C2]  to-[#2F2188]  py-3 my-2  rounded-md hover:from-[#9C93D4] hover:to-[#4B36CC]  hover:from-[0%] hover:to-[100%]"
            >
              {type === "signup" ? "Sign up" : "Login"}
            </button>
          </form>
          {type === "signup" ? (
            <p className="mt-4">
              Already have a account?{" "}
              <Link className=" text-[#0054A1]" href="/signin">
                Log in.
              </Link>
            </p>
          ) : (
            <p className="mt-4">
              Don&apost have an account? Create a
              <Link className=" text-[#0054A1]" href="/signup">
                {" "}
                new account.
              </Link>
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-600">
              Incorrect Credentials, please try again
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
