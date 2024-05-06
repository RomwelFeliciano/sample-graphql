import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation Login($name: String!, $password: String!) {
    login(name: $name, password: $password)
  }
`;

export default function Home() {
  // const { loading, error, data } = useQuery(GET_USERS);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [userLogin] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userLogin({ variables: { name, password } });

      const token = data.login;
      console.log(token);

      console.log("User Logged In");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-24">
      <form className="flex flex-col gap-2 text-black" onSubmit={handleLogin}>
        <input
          type="text"
          required
          placeholder="username"
          className="px-4 py-2"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="password"
          className="px-4 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-white px-4 py-2" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
