import { GET_POST_WITH_COMMENTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export default function SinglePost() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_POST_WITH_COMMENTS, {
    variables: { postID: id },
    skip: !id, // Skip the query if id is falsy
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data || !data.getPost) {
    return <p>Error fetching post data</p>;
  }

  const { title, content, comments } = data.getPost;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
