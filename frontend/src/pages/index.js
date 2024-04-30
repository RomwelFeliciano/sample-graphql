import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";

const GET_ALL_POSTS = gql`
  query {
    getPosts {
      id
      title
    }
  }
`;

export default function Home() {
  const [postID, setPostID] = useState("no-selected-post");
  const { data } = useQuery(GET_ALL_POSTS);

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
        <div className="flex flex-col-reverse gap-6">
          <Link href={`/posts/${postID}`}>
            <button className="bg-sky-500 transition-all duration-300 ease-in-out hover:bg-sky-700 w-[400px] rounded-md px-4 py-2">
              Specific Post with Comments
            </button>
          </Link>
          <select
            className="w-[400px] cursor-pointer px-2 py-2 rounded-md text-2xl text-black border-none focus:outline-none"
            value={postID}
            onChange={(e) => setPostID(e.target.value)}
          >
            <option disabled value={"no-selected-post"}>
              Choose a post...
            </option>
            {data &&
              data.getPosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
          </select>
        </div>
      </div>
    </main>
  );
}
