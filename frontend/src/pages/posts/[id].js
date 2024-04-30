import BackButton from "@/components/BackButton";
import ErrorPage from "@/components/ErrorPage";
import Spinner from "@/components/Spinner";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const GET_POST_WITH_COMMENTS = gql`
  query ($postID: ID!) {
    getPost(id: $postID) {
      id
      title
      content
      comments {
        id
        content
      }
    }
  }
`;

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_POST_WITH_COMMENTS, {
    variables: { postID: id },
    skip: !id,
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || !data || !data.getPost) {
    return <ErrorPage />;
  }

  const { title, content, comments } = data.getPost;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <BackButton />
      <div className="flex flex-col gap-2 w-[500px] text-xl">
        <h1 className="bg-sky-950 px-4 py-2 text-center font-bold">ID: {id}</h1>
        <h1 className="bg-sky-800 px-4 py-2">Title: {title}</h1>
        <p className="bg-sky-600 px-4 py-2">Content: "{content}"</p>
        <h2 className="bg-sky-950 px-4 py-2 text-center font-bold">Comments</h2>
        <ul>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li className="bg-sky-800 px-4 py-2" key={index}>
                ID: {comment.id} - {comment.content}
              </li>
            ))
          ) : (
            <li className="bg-red-800 px-4 py-2">No Comments</li>
          )}
        </ul>
      </div>
    </div>
  );
}
