import { Link, useLoaderData } from "@remix-run/react";

import { getPostListings } from "~/models/post.server";
import { json } from "@remix-run/node";
import { useOptionalAdminUser } from "~/utils";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPostListings(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;
  const adminUser = useOptionalAdminUser();

  return (
    <main>
      <h1>Posts</h1>
      {adminUser ? (
        <Link to="admin" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              prefetch="intent"
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
