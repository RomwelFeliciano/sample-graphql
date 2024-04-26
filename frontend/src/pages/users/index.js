import { GET_ALL_USERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

export default function Users() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center p-56 gap-4">
      {data.getUsers.map(({ name, age, job }) => (
        <div className="flex justify-center items-center gap-1 bg-sky-300 text-black px-4 py-2 rounded-md">
          <span>{name}</span> | <span>{age}</span> | <span>{job}</span>
        </div>
      ))}
    </div>
  );
}
