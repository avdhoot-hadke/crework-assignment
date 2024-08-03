import React from "react";

export default function TopSection() {
  return (
    <>
      <h1 className="text-5xl ">Good morning, Joe!</h1>
      <div className="flex mt-6">
        <div className="flex rounded bg-white me-2 p-2">
          <img className="p-2" src="/tags.svg" alt="tags" />
          <div>
            <h1>Introducing tags</h1>
            <p className="text-[#797979] text-sm p-2">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </p>
          </div>
        </div>
        <div className="flex rounded bg-white mx-2 p-2">
          <img className="p-2" src="/share.svg" alt="tags" />
          <div>
            <h1>Share Notes Instantly</h1>
            <p className="text-[#797979] text-sm p-2">
              Effortlessly share your notes with others via email or link.
              Enhance collaboration with quick sharing options.
            </p>
          </div>
        </div>
        <div className="flex rounded bg-white ms-2 p-2">
          <img className="p-2" src="/access.svg" alt="tags" />
          <div>
            <h1>Access Anywhere</h1>
            <p className="text-[#797979] text-sm p-2">
              Sync your notes across all devices. Stay productive whether
              you&aposre on your phone, tablet, or computer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
