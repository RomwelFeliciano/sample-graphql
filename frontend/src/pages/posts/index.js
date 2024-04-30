import { useQuery, gql, useReactiveVar } from "@apollo/client";
import { globalVar } from "../../lib/cache";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";

const GET_ALL_POSTS = gql`
  query {
    getPosts {
      id
      title
      content
      user_id
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const animal = useReactiveVar(globalVar);

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center pt-44 gap-4">
      <BackButton />
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
              <td>
                {user_id} {animal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
