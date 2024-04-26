"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [id, setId] = useState();

  return (
    <main className="flex flex-col pt-24">
      <div className="h-96 flex flex-col items-center justify-center gap-6 text-black text-2xl">
        <Link href={"/users"}>
          <button className="bg-sky-500 transition-all duration-300 ease-in-out hover:bg-sky-700 w-[400px] rounded-md px-4 py-2">
            Users Page
          </button>
        </Link>
        <Link href={"/posts"}>
          <button className="bg-sky-500 transition-all duration-300 ease-in-out hover:bg-sky-700 w-[400px] rounded-md px-4 py-2">
            Posts Page
          </button>
        </Link>
        <div>
          <Link href={`/posts/${id ? id : "no-id"}`}>
            <button className="bg-sky-500 transition-all duration-300 ease-in-out hover:bg-sky-700 w-[400px] rounded-md px-4 py-2">
              Specific Post with Comments
            </button>
          </Link>
          <div className="flex justify-center items-center flex-col gap-2">
            <label className="text-2xl">Put user ID here</label>
            <input
              type="number"
              min={1}
              placeholder="Enter Post ID Number..."
              className="w-[400px] px-2 py-2 rounded-md text-2xl text-black border-none focus:outline-none"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
