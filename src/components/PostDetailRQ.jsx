import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const fetchPostDetails = (postId) => {
  return axios.get(`http://localhost:4000/posts/${postId}`);
};

export default function PostDetailRQ() {
  const { postId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostDetails(postId),
  });

  if (isLoading) {
    return <div>Page is loading</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  const { title, body } = data?.data || {};
  return (
    <div className="post-details-container">
      <div className="post-details-title">{title}</div>
      <div className="post-details-body">{body}</div>
    </div>
  );
}
