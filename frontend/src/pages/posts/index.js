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
  const arrayID = useReactiveVar(globalVar);

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  function handleCat() {
    globalVar("Cat");
  }

  return (
    <div className="flex flex-col justify-center items-center pt-44 gap-4">
      <BackButton />
      <button onClick={handleCat}>Click Me to be a Cat</button>
      <table className="table w-[800px] text-center text-2xl">
        <thead>
          <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {data.getPosts.map(({ id, title, content, user_id }) => (
            <tr
              className="border-2 border-sky-700 h-20 bg-neutral-900"
              key={id}
            >
              <td>{id}</td>
              <td>{title}</td>
              <td>{content}</td>
              <td>
                {user_id} {arrayID}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
