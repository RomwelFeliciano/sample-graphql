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

const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      name
      age
      job
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export default function Users() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [formInput, setFormInput] = useState({
    id: "",
    name: "",
    age: "",
    job: "no-selected-job",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const input = { ...formInput, age: parseInt(formInput.age, 10) };

      if (formInput.id) {
        // If formInput has an id, it means we're updating an existing user
        await updateUser({ variables: { updateUserId: formInput.id, input } });
      } else {
        delete input.id;
        await createUser({ variables: { input } });
      }

      await refetch();
      setFormInput({
        id: "",
        name: "",
        age: "",
        job: "no-selected-job",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  }

  function getUserData(user) {
    setFormInput(user);
  }

  async function handleDeleteUser(id) {
    try {
      await deleteUser({ variables: { deleteUserId: id } });
      await refetch();
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
            required
            onChange={handleInputChange}
          />
          <input
            type="number"
            min={1}
            placeholder="age"
            className="px-4 py-2 rounded-md"
            name="age"
            value={formInput.age}
            required
            onChange={handleInputChange}
          />
          <select
            className="px-4 py-2 rounded-md"
            name="job"
            value={formInput.job}
            required
            onChange={handleInputChange}
          >
            <option disabled value="no-selected-job">
              Select job...
            </option>
            <option value="Doctor">Doctor</option>
            <option value="Engineer">Engineer</option>
            <option value="IT Department">IT Department</option>
            <option value="Tambay">Tambay</option>
            <option value="Teacher">Teacher</option>
          </select>

          <button
            className="bg-sky-800 hover:bg-sky-950 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-md"
            type="submit"
          >
            {!formInput.id ? "Submit" : "Edit"}
          </button>
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
            <th colSpan={2}>Action</th>
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
              <td
                className="cursor-pointer"
                onClick={() => getUserData({ id, name, age, job })}
              >
                Edit
              </td>
              <td
                className="cursor-pointer"
                onClick={() => handleDeleteUser(id)}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
