import Spinner from "@/components/Spinner";
import { GET_ALL_USERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Users() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center pt-44 gap-4">
      <Link href={"/"}>Go back</Link>
      <table className="table w-[800px] text-center text-2xl">
        <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Job</th>
        </tr>
        <tbody>
          {data.getUsers.map(({ id, name, age, job }) => (
            <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{job}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
