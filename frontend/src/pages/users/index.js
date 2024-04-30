import { useQuery, gql, useMutation } from "@apollo/client";
import Spinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";
import { useState } from "react";

const GET_ALL_USERS = gql`
  query {
    getUsers {
      id
      name
      age
      job
    }
  }
`;

const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
      job
    }
  }
`;

export default function Users() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [formInput, setFormInput] = useState({
    name: "",
    age: 0,
    job: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const input = { ...formInput, age: parseInt(formInput.age, 10) };

      await createUser({ variables: { input } });
      await refetch();
      setFormInput({
        name: "",
        age: 0,
        job: "",
      });
    } catch (error) {
      console.error("Error creating user:", err);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormInput({ ...formInput, [name]: value });
  }

  if (loading) return <Spinner />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center py-44 gap-4">
      <div className="bg-sky-500 p-4 rounded">
        <form className="flex gap-3 text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            className="px-4 py-2 rounded-md"
            name="name"
            value={formInput.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            min={1}
            placeholder="age"
            className="px-4 py-2 rounded-md"
            name="age"
            value={formInput.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="job"
            className="px-4 py-2 rounded-md"
            name="job"
            value={formInput.job}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <BackButton />
      <table className="table w-[800px] text-center text-2xl">
        <thead>
          <tr className="border-2 border-sky-700 h-20 bg-neutral-900">
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Job</th>
          </tr>
        </thead>
        <tbody>
          {data.getUsers.map(({ id, name, age, job }) => (
            <tr
              className="border-2 border-sky-700 h-20 bg-neutral-900"
              key={id}
            >
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
