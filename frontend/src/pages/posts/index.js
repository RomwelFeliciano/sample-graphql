import { GET_ALL_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function Posts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center pt-44 gap-4">
      <Link href={"/"}>Go back</Link>
      <table className="table w-[800px] text-center text-2xl">
        <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
          <th>User ID</th>
        </tr>
        <tbody>
          {data.getPosts.map(({ id, title, content, user_id }) => (
            <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
              <td>{id}</td>
              <td>{title}</td>
              <td>{content}</td>
              <td>{user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
