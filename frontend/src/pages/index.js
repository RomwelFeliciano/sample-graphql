"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [id, setId] = useState();

  return (
    <main className="flex flex-col pt-24">
      <div className="flex justify-center items-center flex-col gap-2">
        <label className="text-2xl">Put user ID here</label>
        <input
          type="text"
          placeholder="input id number..."
          className="px-2 py-2 rounded-md text-2xl text-black border-none focus:outline-none"
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="h-96 flex items-center justify-center gap-6 text-black text-2xl">
        <Link href={"/users"}>
          <button className="bg-sky-500 rounded-md px-4 py-2">
            See All Users
          </button>
        </Link>
        <Link href={"/posts"}>
          <button className="bg-sky-500 rounded-md px-4 py-2">
            See All Posts
          </button>
        </Link>
        <Link href={`/posts/${id ? id : "no-id"}`}>
          <button className="bg-sky-500 rounded-md px-4 py-2">
            See Post and Comment
          </button>
        </Link>
      </div>
    </main>
  );
}
