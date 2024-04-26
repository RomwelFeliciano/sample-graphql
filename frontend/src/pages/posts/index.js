import { GET_ALL_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function Posts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center p-56 gap-4">
      {data.getPosts.map(({ title, content }) => (
        <div className="flex justify-center items-center gap-1 bg-sky-300 text-black px-4 py-2 rounded-md">
          <span>{title}</span> | <span>{content}</span>
        </div>
      ))}
    </div>
  );
}
